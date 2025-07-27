var buttonColours  = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var hasStarted = false;
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(80).fadeOut(80).fadeIn(100);
    playSound(randomChosenColour);
    
};


$(".btn").click(function() { 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3")
    audio.play();
};

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
 }, 100);
}

$(document).keydown(function() { 
    if (!hasStarted){
        hasStarted = true;
        nextSequence();

    };
    
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
            nextSequence();
            }, 1000);
        } 
    } else {
            console.log("wrong");
            $("h1").text( "Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout( function() {
                $("body").removeClass("game-over");
            }, 200);
            startOver();
        }
};

function startOver() {
    level = 0;
    gamePattern = [];
    hasStarted = false;
};