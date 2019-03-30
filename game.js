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

/* Methods */

//Function to initialize the game
function start(){
    renderGameField();
    resizeGameField();
}

//Function for the game loop
function gameLoop(){
    //Here goes all the functions that have to be updated second by second

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

//Start the game
start();