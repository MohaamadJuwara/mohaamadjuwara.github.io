// to take the element from html by queryselector
const stopGameButton = document.querySelector('.stop-game-button');
const restartGameButton = document.querySelector('.start-game-button');
const boxes = document.querySelectorAll('.box');
const scoreDisplayX = document.querySelector('.scoreDisplay1');
const scoreDisplayO = document.querySelector('.scoreDisplay2');

let turn = "X";
// create array with 9 empty string
let board = ['', '', '', '', '', '', '', '', ''];
// declare variable and initializes 0
let scoreX = 0;
let scoreO = 0;


//function onclick with a parameter called event
function oncklick(event) {
  if (event.target.innerHTML == '') {
    const index = Array.from(boxes).indexOf(event.target);
    event.target.innerHTML = turn;
    board[index] = turn;
    // given a condition that the game  always start with  turn x
    if (turn == 'X') {
      // i assigne the turn value for O now after x turn
      turn = 'O';

      // i assign the style color to darkblue
      event.target.style.color = "darkblue";
    } else {
      // turn for x 
      turn = 'X';
      event.target.style.color = "green";
    }
    //calling winningcombo func
    checkWinningCombo();

    if(gameEnded()) {
      alert("the game is finished");
    }
  }
}

// Check if game is ended because all boxes filled
function gameEnded() {
  let full = true;
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];

    // if one box is empty, set full to false and leave the loop
    if (box.textContent === '') {
      // its empty
      full = false;
      break;
    }
  }

  return full;  
}


// function for the stopgame btn to clear all the boxes
function stopGame() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].removeEventListener('click', oncklick);
    boxes[i].innerHTML = ''; // clear the contents of each box
  }
  turn = 'X'; // reset the turn to X
  board = ['', '', '', '', '', '', '', '', '']; // reset the board
}

// function for the restartgame btn to be able to click or play again
function restartGame() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', oncklick);
  }
}

// function for winning combo
function checkWinningCombo() {
  for (let i = 0; i < winningCombos.length; i++) {
    const combo = winningCombos[i];
    //assign condition for winning combo
    if (board[combo[0]] === turn && board[combo[1]] === turn && board[combo[2]] === turn) {
      // assign condition for if x turn is
      if (turn === 'X') {
        //increminte the score to x
        scoreX++;
        // add the value scoreX
        scoreDisplayX.textContent = scoreX;
        // in the alert x has won
        alert("The X has won");
      } else {
        scoreO++;
        scoreDisplayO.textContent = scoreO;
        alert("the O has won")
      }

      // call for the stop func
      stopGame();
      return;
    }
  }
}

for (let i = 0; i < boxes.length; i++) {
  const element = boxes[i];
  element.addEventListener('click', oncklick)
}

stopGameButton.addEventListener('click', stopGame);
restartGameButton.addEventListener('click', restartGame);

const winningCombos = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal from top-left to bottom-right
  [2, 4, 6]  // diagonal from top-right to bottom-left
];


