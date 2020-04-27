var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;
  }
})

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer (currentLevel){
  console.log(userClickedPattern+'\n'+gamePattern);
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },300);
    $("#level-title").text("Game Over, Press Any Key or The Button to Restart");
    $(document).keydown(function(){startOver();});
    $(".next-sequence").click(function(){startOver();});
  }
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level "+level);
}



function playSound(name) {
  var audio = new Audio('sounds/' + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  },200);
}

$(".next-sequence").click(function(){
  if(!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;
  }
})

function startOver(){
  window.location.reload();
}
