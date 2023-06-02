"use strict";

console.log('main loaded');
var minimumTime = 500;
var maximumTime = 1250;
var gameStarted = false;
var playerPoints = 3;
var timerId;
var maxTijd = document.querySelector('.max-tijd-invoer');
var minTijd = document.querySelector('.min-tijd-invoer');
var setTime = document.querySelector('.invoer-button');
var molImg = ['url()../img/OIP.jfif', 'url()../img/jellymol.jfif', 'url()../img/deadmol.jfif'];
var molechance = document.getElementById("smashSound");
setTime.addEventListener('click', function () {
  console.log(minTijd.value);
  minimumTime = minTijd.value;
  maximumTime = maxTijd.value;
});
var playerPointsElement = document.querySelector('.player-points');
var allTiles = document.querySelectorAll('.tile');
console.log(allTiles);
var startGameButton = document.querySelector('.start-game-button');
var stopGameButton = document.querySelector('.stop-game-button');
startGameButton.addEventListener('click', function () {
  startGameButton.disabled = true;
  stopGameButton.disabled = false;
  startGame();
  gameStarted = true;
  playerPoints = 3;
  playerPointsElement.textContent = playerPoints;
});
stopGameButton.addEventListener('click', function () {
  stopGameButton.disabled = true;
  endGame();
  gameStarted = false;
});
getRandonNumber(1, 50);

function getRandonNumber(min, max) {
  // let random = Math.random();
  // console.log(random);
  // console.log(min);
  // console.log(max);
  // console.log(Math.floor(random));
  // console.log(max -min +1);
  // console.log(Math.floor(random * max - min + 1));
  return Math.floor(Math.random() * (max - min + 1) + min);
}

allTiles.forEach(function (tile) {
  console.log(tile);
  tile.addEventListener('click', function () {
    if (gameStarted) {
      tileClicked(tile);
    }
  });
});

function tileClicked(tile) {
  //
  // onsole.log(tile);
  if (tile.classList.contains('active')) {
    playerPoints = playerPoints + 1;
    tile.classList.remove('active');
    localStorage.setItem('punten', playerPoints);
  } else if (tile.classList.contains('root')) {
    playerPoints = playerPoints - 1;
    tile.classList.remove('root');
  } else {
    var audio = new Audio('smashSound');
    audio.play();
    console.log(audio);
    playerPoints = playerPoints - 2;
  }

  if (playerPoints <= 0) {
    endGame();
  }

  console.log(playerPoints);
  tile.classList.remove('.active');
  playerPointsElement.textContent = playerPoints;
}

function activateRandomTile() {
  var currentActiveTile = document.querySelector('.tile.active');

  if (currentActiveTile) {
    currentActiveTile.classList.remove('active');
  }

  var currentActiveJellyTile = document.querySelector('.root');

  if (currentActiveJellyTile) {
    currentActiveJellyTile.classList.remove('root');
  }

  var randomTileNumber = getRandonNumber(0, allTiles.length - 1);
  var selectedTile = allTiles[randomTileNumber];
  var chance = getRandonNumber(0, 100);

  if (chance < molechance) {
    selectedTile.classList.add('active');
    selectedTile.style.setproperty('molImg-background-image', molImg[getRandonNumber(0, molImg.length)]);
  } else {
    selectedTile.classList.add('active');
  }

  startGame();
}

function startGame() {
  var randomTime = getRandonNumber(minimumTime, maximumTime);
  timerId = setTimeout(activateRandomTile, randomTime);
}

function endGame() {
  gemeStarted = false;
  startGameButton.disabled = false;
  clearInterval(timerId);
  clearTiles();
}

function clearTiles() {
  for (var i = 0; i < allTiles.length; i++) {
    var tileElement = allTiles[i];
    tileElement.classList.remove('active');
  }
}

var oldScore = document.querySelector('.old-score');
var saveScore = localStorage.getItem('punten');
oldScore.innerHTML = saveScore;