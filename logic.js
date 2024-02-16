const X = "x";
const circle = 'circle';
let player1turn = true;
const winner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cell = document.querySelectorAll('.cell');
const grid = document.getElementById('grid');
const result = document.getElementById('result');
const resultmessage = document.getElementById('resultmessage');   
const restartButton = document.getElementById('restart');
const player = document.getElementById('player');

startGame()

restartButton.addEventListener('click', startGame);
function startGame(){
    player.innerText = player1turn ? "1" : "2";
    cell.forEach(cell => {
       
        cell.classList.remove(X);
        cell.classList.remove(circle);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    })
    result.classList.remove('show');

};

function handleClick(e){
    const cell = e.target;
    const currentClass = player1turn ? X : circle;
    placeSymbol(cell, currentClass);
    if(checkWin(currentClass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        swapTurns()
    }
}

function endGame(draw){
    if(draw){
        resultmessage.innerText = 'Draw!';
    }else{
        resultmessage.innerText = `${player1turn ? "Player1" : "Player2"} Wins!`;
    }
    result.classList.add('show');
}

function isDraw(){
    return [...cell].every(cell => {
        return cell.classList.contains(X) || cell.classList.contains(circle);
    })
}

function placeSymbol(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    player1turn = !player1turn;
    player.innerText = player1turn ? "1" : "2";
}


function checkWin(currentClass){
    return winner.some(winner => {
        return winner.every(index => {
            return cell[index].classList.contains(currentClass);
        })
    })
}