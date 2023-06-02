console.log('main loaded');

let minimumTime = 500;
let maximumTime = 1250;
let gameStarted = false;

let playerPoints = 3;
let timerId;
const maxTijd = document.querySelector('.max-tijd-invoer');
const minTijd = document.querySelector('.min-tijd-invoer');
const setTime = document.querySelector('.invoer-button');
const molImg = ['url()../img/OIP.jfif', 'url()../img/jellymol.jfif', 'url()../img/deadmol.jfif'];
const molechance = document.getElementById("smashSound");

setTime.addEventListener('click', function () {
    console.log(minTijd.value);
minimumTime = minTijd.value;
maximumTime = maxTijd.value;
    
})

const playerPointsElement = document.querySelector('.player-points');

const allTiles = document.querySelectorAll('.tile');

console.log(allTiles);
const startGameButton =document.querySelector('.start-game-button');
const stopGameButton = document.querySelector('.stop-game-button');
startGameButton.addEventListener('click', function () {
    startGameButton.disabled = true;
    stopGameButton.disabled = false;
    startGame();
    gameStarted= true;
    playerPoints = 3;
    playerPointsElement.textContent = playerPoints;
    
})

stopGameButton.addEventListener('click',function () {
    stopGameButton.disabled= true;
    endGame();
    gameStarted = false;

    
} )



getRandonNumber(1, 50);
 
function getRandonNumber(min, max) {
    // let random = Math.random();
    // console.log(random);
    // console.log(min);
    // console.log(max);
    // console.log(Math.floor(random));
    // console.log(max -min +1);
    // console.log(Math.floor(random * max - min + 1));
    return Math.floor(Math.random() *(max - min + 1) + min);
}

allTiles.forEach(function (tile) {
    console.log(tile);
    tile.addEventListener('click', function(){
        if (gameStarted) {
            tileClicked(tile);
        }
            
        
        
    });
});


function tileClicked (tile){
    //
   // onsole.log(tile);
    if (tile.classList.contains('active')) {
        playerPoints = playerPoints + 1;
        tile.classList.remove('active');

        localStorage.setItem('punten',playerPoints )
        
        
    } else if(tile.classList.contains('root')){
        playerPoints =playerPoints -1;
        tile.classList.remove('root');
    } else {
        let audio = new Audio('smashSound');
        audio.play();
        console.log(audio);
        playerPoints = playerPoints -2;
    }

    if (playerPoints <= 0){
        endGame();

    }


    console.log(playerPoints);
    tile.classList.remove('.active')
    playerPointsElement.textContent = playerPoints;

}

function activateRandomTile(){
    const currentActiveTile = document.querySelector('.tile.active');
    if (currentActiveTile) {
        currentActiveTile.classList.remove('active');    
    }
    const currentActiveJellyTile = document.querySelector('.root');
    if (currentActiveJellyTile) {
        currentActiveJellyTile.classList.remove('root');
    }
    let randomTileNumber = getRandonNumber (0, allTiles.length -1) ;
    const selectedTile = allTiles[randomTileNumber];
    const chance = getRandonNumber(0, 100);
    if (chance < molechance) {

    selectedTile.classList.add('active'); 
    selectedTile.style.setproperty('molImg-background-image', molImg[getRandonNumber(0, molImg.length)])
   } else {
    selectedTile.classList.add('active');
   }


    startGame();
}


function startGame() {
    const randomTime = getRandonNumber(minimumTime, maximumTime);

    timerId = setTimeout (activateRandomTile, randomTime);
    
}

function endGame() {
    gemeStarted = false;
    startGameButton.disabled = false;
    clearInterval(timerId);
    clearTiles();
    
}

function clearTiles() {
    for (let i = 0; i < allTiles.length; i++) {
        const tileElement = allTiles[i];
        tileElement.classList.remove('active');
    }
    
}


const oldScore = document.querySelector('.old-score');

const saveScore = localStorage.getItem('punten')
oldScore.innerHTML = saveScore;