//! Toggle done/not done todos by clicking.

//because this list starts with no "li" I have to first select the "ul" with an argument that when an "li" is created and clicked
// INSIDE this "ul", run this code:
$(".text").on("click", function () {
  //create a separate class called 'completed' in css and toggle the class.
  $(this).toggleClass("completed");
});

//! Click on X to delete a todo.

$("#todoList").on("click", ".deleteHolder", function (event) {
  //remove the todo by clicking the X span, removes the li (parent element to the span)
  $(this).parent().fadeOut(500, function() {
    // the second $(this) does not refer to the span, it is referring to the .parent() (li) element. I do this to
    // let the fadeout complete before the remove takes affect.
    $(this).remove();
  });
  //prevent event bubbling: keeps the event from going up to parent elements. (wont go up to the li listener, then the ul, etc..)
  event.stopPropagation();
});

//! Adding todos

$("input[type='text']").on("keypress", function(event){
  //remember that "which" holds a character id, like 'enter' key
  if(event.which === 13){
    //grabbing new todo text from input and capitalize it
    var todoText = capitalize($(this).val());
    //empties input
    $(this).val("");
    //create a new li and add to ul
    $("#todoList").append("<li><span class='deleteHolder'><i class='fas fa-trash-alt'></i> </span>" + todoText +
      "<span class='buttonHolder'><button type='button' id='start'><i class='fas fa-play'></i></button></span></li></li>");
  }
});

function capitalize(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
};

//! Add/remove todo input

$('.fa-minus').attr('title', 'Remove todo input').click(function() {
  $("input[type='text']").fadeToggle(400, "swing");
  $(this).toggleClass('fa-plus').attr('title', $(this).hasClass('fa-plus') ? 'Add a todo':'Remove todo input');
});


//! Timers

$('button.time-toggle-button').on('click', function() {
  const element = $(this).closest('li.todo-list-item').find('.timer-output');
  element.stopwatch({format: '{M}m, {S.}'}).stopwatch('toggle');
});
