/**
 * @Author: Robel Gebrewold <robeldev>
 * @Date:   2021-10-21T13:36:49+03:00
 * @Email:  robelamare20@gmail.com
 * @Project: Simon_Game
 * @Last modified by:   robeldev
 * @Last modified time: 2021-10-22T21:05:09+03:00
 */



var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// a way to keep track of whether if the game has started or not,
//so only call nextSequence() on the first keypress.
var started = false;

//Create a new variable called level and start at level 0.
var level = 0;

// Use jQuery to detect when a keyboard key has been pressed,
//when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    // The h1 title starts out saying "Press A Key to Start",
    //when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  // get the button color that user clicks on
  var userChosenColour = $(this).attr("id");

  // add the selected color to the userClickedPattern array
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // check if userClickedPattern is same as gamePattern array(i.e. size and elements)
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  //clear userClickedPattern for next level or when game is restarted
  userClickedPattern = [];
  //Inside nextSequence(), increase the level by 1
  // every time nextSequence() is called.
  level++;

  // Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

 // choose a random color from the buttonColours and add it to
 // the gamePattern array
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //animate the chosen color to show which button was selected
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//function to check answer after user clicks a button
function checkAnswer(currentLevel){
  //check if last selected color for the game and user is the same
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    // if gamePattern and userClickedPattern size are the same,
    // call the nextSequence, and
    // reset the userClickedPattern to empty for the next level
    if(gamePattern.length == userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000)

    }
  }else{
    //change h1 text to show that game is over
    $("#level-title").text("Game Over, Press any key to restart");
    
    playSound("wrong");
    // use setTimeout function to add and remove class gameover for animation
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

//function to start over resets the level, gamePattern
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
