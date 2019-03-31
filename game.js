/*
=====================
    Snake Game V2
=====================
By: Luiz Gustavo
GitHub: https://github.com/iamtheluiz
*/

/* Variables */
const gameField  = document.getElementById("gameField");
const fieldSizeX = 16;
const fieldSizeY = 16;
const pixelSize  = 40;  //Pixel size of the "style.css"
let   snake      = [];  //Store the snake position
let   snakeInitialSize  = 3;
let   snakeDirection = {
    'x': 0,
    'y': -1
}


/* Methods */

//Function to initialize the game
function start(){
    renderGameField();
    resizeGameField();
    spawnSnake();
    renderSnake();
}

//Function for the game loop
function gameLoop(){
    //Here goes all the functions that have to be updated second by second
    removeSnake();
    moveSnake();
    renderSnake();
}

//Render the game field
function renderGameField(){
    let render = '';    //Store all the content
    
    //Each pixel of the grid will be a div
    for(var y = 1; y <= fieldSizeY; y++){
        for(var x = 1; x <= fieldSizeX; x++){
            render += `<div id='${x}_${y}' class='pixel'></div>`;
        }
    }

    //Put the content into the game field
    gameField.innerHTML = render;
}

//Calculate the game field size
function resizeGameField(){
    var sizeX = (fieldSizeX * pixelSize)+'px';
    var sizeY = (fieldSizeY * pixelSize)+'px';

    gameField.style = `width: ${sizeX}; height: ${sizeY}`;
}

//Spawn the snake
function spawnSnake(){
    //Reset the "snake" var
    snake = [];

    //Loop on the snake initial size
    for(var c = 0; c < snakeInitialSize; c++){
        
        snake[c] = {
            'x': fieldSizeX/2,
            'y': (fieldSizeY/2)+c
        };

    }
}

//Render the snake
function renderSnake(){
    for(var c = snake.length - 1; c >= 0; c--){
        document.getElementById(`${snake[c].x}_${snake[c].y}`).setAttribute("class", "pixel pixel_snake");
        
        for(var i = snake.length - 1; i >= 0; i--){
            //If the snake hits its own body
            if(c != i){
                if(snake[c].x == snake[i].x && snake[c].y == snake[i].y){
                    console.log('ué');
                    snakeDeath();
                    return;
                }
            }
        }
    }
}

//Remove the snake from the game field
function removeSnake(){
    for(var c = 0; c < snake.length; c++){
        document.getElementById(`${snake[c].x}_${snake[c].y}`).setAttribute("class", "pixel");
    }
}

//Snake moviment
function moveSnake(){
    for(var c = snake.length - 1; c >= 0; c--){
        if(c == 0){
            //If the pixel was the "head" of the snake
            snake[c] = {
                'x': snake[c].x + snakeDirection.x,
                'y': snake[c].y + snakeDirection.y
            };
        }else{
            snake[c] = snake[c-1];
        }

        if(snake[c].x < 1){
            snake[c].x = fieldSizeX;
        }else if(snake[c].x > fieldSizeX){
            snake[c].x = 1;
        }

        if(snake[c].y < 1){
            snake[c].y = fieldSizeY;
        }else if(snake[c].y > fieldSizeY){
            snake[c].y = 1;
        }
    }
}

//Change the direction of the snake
function changeDirection(key){
    if(key == "ArrowUp" && (snakeDirection.x != 0 && snakeDirection != 1)){
        snakeDirection.x = 0;
        snakeDirection.y = -1;
    }else if(key == "ArrowDown" && (snakeDirection.x != 0 && snakeDirection != -1)){
        snakeDirection.x = 0;
        snakeDirection.y = 1;
    }else if(key == "ArrowLeft" && (snakeDirection.x != 1 && snakeDirection != 0)){
        snakeDirection.x = -1;
        snakeDirection.y = 0;
    }else if(key == "ArrowRight" && (snakeDirection.x != -1 && snakeDirection != 0)){
        snakeDirection.x = 1;
        snakeDirection.y = 0;
    }
}

//The Death of the Snake
function snakeDeath(){
    alert("You lose!");
    window.location = "index.html";
}

//Start the game
start();

//Run the game loop
setInterval(gameLoop, 100);

//Listen the keyboard
document.onkeydown = function(event){
    changeDirection(event.key);
}