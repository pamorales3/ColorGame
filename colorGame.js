var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

/*
   Initializes the game
*/
function init(){
    
    setupModeButtons();
    setupSquares();  
    reset();
}

/*
   Initializes the difficulty button and squares
   that correspond with the selected difficulty
*/
function setupModeButtons(){
    for (var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected");

            if (this.textContent === "Easy"){
                numSquares = 3;
            } else if (this.textContent === "Medium"){
                numSquares = 6;
            } else {
                numSquares = 9;
            }

            reset();
        });
    }
}

/*
   Initializes the color of the squares and decides
   when the correct color has been chosen
*/
function setupSquares(){
    for (var i = 0; i < squares.length; i++){
        squares[i].addEventListener("click", function(){
            var clickedColor = this.style.backgroundColor;  
    
            if (clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            }
            else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again!";
            }
        });
    }
}

/*
   Resets the game when reset is clicked or the correct
   square is picked
*/
function reset(){
    // generate all new colors
    colors = generateRandomColors(numSquares);

    // pick a new random color from array
    pickedColor = pickColor();

    // change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;

    // Gets rid of the "correct!" text
    messageDisplay.textContent = "";

    // Resets the text from "Play Again?" to "New Colors"
    resetButton.textContent = "New Colors";
    
    // change colors of squares
    for (var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colors[i];

        if (colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }

    h1.style.backgroundColor = "steelblue";
}


resetButton.addEventListener("click", function(){
    reset();
});


function changeColors(color){
    for (var i = 0; i < colors.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    var random = Math.floor(Math.random() * colors.length);

    return colors[random];
}

function generateRandomColors(num){
    var arr = [];
    
    for (var i = 0; i < num; i++){
        arr.push(randomColor());
    }
    return arr;
}

function randomColor(){
    // pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    // pick a "green" from 0 - 255
    var g = Math.floor(Math.random() * 256);
    // pick a "blue" from 0 - 255
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}
