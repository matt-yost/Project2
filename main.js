// Get UL info
var studentList = $('.student-list li');

// Append search bar to header
var searchHeader = "<h2>Students</h2><div class='student-search'><input placeholder='Search for students...'><button>Search</button></div>";
$(".page-header").html(searchHeader);

// Calculate number of pages needed
var numberOfPages = Math.ceil(studentList.length / 10);

//append 10 students per page until no more students able to append
var studentsArray = [];
while(studentList.length > 0){
  studentsArray.push(studentList.splice(0,10));
}

// Load Pagination HTML to the page
var pagination = function(){
  // Create pagination HTML
  var paginationHTML = "<ul>";
  for(var i = 0; i < numberOfPages; i++){
    paginationHTML+= "<li><a href='#'>" + (i+1) + "</li>";
  };
  paginationHTML += "</ul>";
  $(".pagination").html(paginationHTML);
  $(".pagination li a").first().toggleClass("active");
  $(".student-list").html(studentsArray[0]);
};
pagination();

//Toggle active class on buttons when clicked
var page = $(".pagination li a");
$(page).on("click", function(){
  page.removeClass("active");
  $(this).toggleClass("active");
  var activePageIndex = $(page).index(this);
  $(".student-list").html(studentsArray[activePageIndex]);
});

// Seperate students into x amount of pages
studentList.each(function(index){
//console.log($(this).html());
});

// Search function
