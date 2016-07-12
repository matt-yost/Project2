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

// Load Pagination HTML to the page
var pagination = function(list){

  // Hide everything
  list.hide();

  // Only show seatch matches
  $(list).each(function(index){
      if($(this).attr("id") !== "not-match"){
        $(this).show();
      }
  });

  // Load list to page
  $(".student-list").html(list);

  // Count number of students shown
  var studentCount = 0;
  $(list).each(function(index){
    if($(this).attr("style") !== "display: none;"){
      studentCount++;
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
    page.removeClass("active");
    $(this).toggleClass("active");
    // Show corresponding 10 students when page selected
    var activePage = $(page).index(this);
    var start = (activePage + 1) * 10 - 10;
    var end = start + 10;
  });
};


pagination(studentList);
