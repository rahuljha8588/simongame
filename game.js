var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
function nextSequence() {
    $("h1").text("Level " + level);
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChooseColor = buttonColors[randomNumber];
    gamePattern.push(randomChooseColor);
    $("#" + randomChooseColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChooseColor);
}

$(".btn").on("click", function () {
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).on("keypress", function () {
    if (started == false) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;

    }
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over , Press Any key to Restart");
        startOver();
    }
}

var startOver = () => {
started = false;
gamePattern=[];
level = 0;
}