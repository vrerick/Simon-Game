var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // $("#" + randomChosenColour).fadeTo(100, 0.3, function () {
  //   //making the flash
  //   $(this).fadeTo(500, 1.0);
  // });

  replay(gamePattern);

  //playSound(randomChosenColour);
  level++;
  $("h1").text("Level: " + level);
}

$(".btn").click(function () {
  //var userChosenColour = this.id;
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

const animatePress = function (currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

var gameStarted = false;
var level = 0;

$(document).on("keydown", function (event) {
  if (!gameStarted) {
    $("h1").text("Level: " + level);
    nextSequence();
    gameStarted = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success!!!");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong!!!");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

function replay(array) {
  $(".circle").css("background", "rgb(2, 247, 255)");

  for (let index = 0; index < array.length; index++) {
    setTimeout(function () {
      $("#" + array[index]).fadeTo(100, 0.3, function () {
        //making the flash
        $(this).fadeTo(500, 1.0);
      });
      playSound(array[index]);
    }, 500 * index);
  }
  setTimeout(() => {
    $(".circle").css("background", "white");
  }, 500 * array.length);
}
