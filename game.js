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
let   food       = {
    'status': false,
    'x': 0,
    'y': 0
}


/* Methods */

//Function to initialize the game
function start(){
    renderGameField();
    resizeGameField();
    spawnSnake();
    spawnFood();
    eatFood();
    renderSnake();
}

//Function for the game loop
function gameLoop(){
    //Here goes all the functions that have to be updated second by second
    spawnFood();
    removeSnake();
    moveSnake();
    eatFood();
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
    snake = null;
    alert("You lose!");
    window.location = "index.html";
}

//Spawn the food
function spawnFood(){
    //If the food isn't into the field
    if(food.status == false){
        food.status = true;
        food.x = Math.floor(Math.random() * fieldSizeX + 1);
        food.y = Math.floor(Math.random() * fieldSizeY + 1);

        document.getElementById(`${food.x}_${food.y}`).setAttribute("class", "pixel food");
    }else{
        document.getElementById(`${food.x}_${food.y}`).setAttribute("class", "pixel food");
    }
}

//Eat the food
function eatFood(){
    //If the snake eats a food
    if(snake[0].x == food.x && snake[0].y == food.y){
        food.status = false;

        if(snake[snake.length - 1].x == snake[snake.length - 2].x){
            snakeX = snake[snake.length - 1].x;
            if(snake[snake.length - 1].y < snake[snake.length - 2].y){
                snakeY = snake[snake.length - 1].y - 1;
            }else{
                snakeY = snake[snake.length - 1].y + 1;
            }
        }else if(snake[snake.length - 1].y == snake[snake.length - 2].y){
            snakeY = snake[snake.length - 1].y;
            if(snake[snake.length - 1].x < snake[snake.length - 2].x){
                snakeX = snake[snake.length - 1].x - 1;
            }else{
                snakeX = snake[snake.length - 1].x + 1;
            }
        }

        if(snakeX < 1){
            snakeX = fieldSizeX;
        }else if(snakeX > fieldSizeX){
            snakeX = 1;
        }

        if(snakeY < 1){
            snakeY = fieldSizeY;
        }else if(snakeY > fieldSizeY){
            snakeY = 1;
        }

        snake[snake.length] = {
            'x': snakeX,
            'y': snakeY
        }
    }
}

//Start the game
start();

//Run the game loop
setInterval(gameLoop, 100);

//Listen the keyboard
document.onkeydown = function(event){
    changeDirection(event.key);
}