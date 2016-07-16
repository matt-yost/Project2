// Get UL info
var studentList = $('.student-list li');

// Create copy of studentList for use in search function
var studentCopy = studentList.clone();

// Append search bar to header
var searchHeader = "<h2>Students</h2><div class='student-search'><input class='search-box' placeholder='Search for students...'><button>Search</button></div>";
$(".page-header").html(searchHeader);

// Search Function
$(".search-box").keyup(function(){
  var searchText = $(this).val().toLowerCase();
  studentCopy.each(function(index){
    $(this).removeAttr("id");
    var name = $(this).find("h3").text();
    var email = $(this).find(".email").text();
    var studentSearch = (name + " " + email).toLowerCase();
    if(studentSearch.indexOf(searchText) == -1){
      $(this).attr("id", "not-match");
    }
  });
  pagination(studentCopy);
});

// Build the page based on search results
var pagination = function(list){

  // Load list to page
  $(".student-list").html(list);

  // Hide everything and remove any effects from fadeIn
  list.hide();
  list.css("opacity",1);

  // Initiate student count
  var studentCount = 0;

  // Only show search matches and count students to be shown
  $(list).each(function(index){
      if($(this).attr("id") !== "not-match"){
        for(var i=-1; i < studentCount; i++){
          $(this).attr("id", i+1);
        }
        $(this).fadeIn(1000);
        studentCount++;
      }
  });

  // If no students found, show message.
  if(studentCount === 0){
    $(".student-list").append("<li>No students match your search</li>")
  }

  // Show first 10 students
  $(list).each(function(index){
    if($(this).attr("id") >= 10){
      $(this).hide();
    }
  });

  // Create pagination HTML
  var numberOfPages = Math.ceil(studentCount/10);
  var paginationHTML = "<ul>";
  for(var i = 0; i < numberOfPages; i++){
    paginationHTML+= "<li><a href='#'>" + (i+1) + "</li>";
  };
  paginationHTML += "</ul>";
  $(".pagination").html(paginationHTML);
  $(".pagination li a").first().toggleClass("active");

  // Toggle active class on buttons when clicked
  var page = $(".pagination li a");
  $(page).on("click", function(){
    $(list).hide();
    page.removeClass("active");
    $(this).toggleClass("active");
    // Fade in corresponding 10 students when page selected
    var activePage = $(page).index(this);
    var start = (activePage + 1) * 10 - 10;
    var end = start + 10;
    for(var i=start; i<end; i++){
      $("#"+i).fadeIn(1000);
    }
  });
};

pagination(studentList);
