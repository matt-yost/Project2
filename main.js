$(document).ready(function(){

  // Get UL info
  var studentList = $('.student-list li');

  // Append search bar to header
  var searchHeader = "<h2>Students</h2><div class='student-search'><input placeholder='Search for students...'><button>Search</button></div>";
  $(".page-header").html(searchHeader);

  // Calculate number of pages needed
  var numberOfPages = Math.ceil(studentList.length / 10);
  
  var pagination = function(){
    paginationHTML = "<ul>";
    for(var i = 0; i < numberOfPages; i++){
      paginationHTML+= "<li><a href='#'>" + (i+1) + "</li>";
    };
    paginationHTML += "</ul>";
    $(".pagination").html(paginationHTML);
  };
  pagination();

  // Show first 10 students
  studentList.hide();
  studentList.slice(0,10).show();

  //Toggle active class on buttons when clicked
  var page = $(".pagination li a");
  $(page).on("click", function(){
      page.removeClass("active");
      $(this).toggleClass("active");
  });

  // Seperate students into x amount of pages
  studentList.each(function(index){
    //console.log($(this).html());
  });


  // Search function

});
