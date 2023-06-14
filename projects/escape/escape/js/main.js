console.log("Game.js is geladen");


function showKey() {
    console.log("Uw key is...");    
    alert("Je hebt de sleutel gevonden!");
    document.location.href = '../puzzel_2/puzzeltwee.html';
}


const randomNumber = Math.floor(Math.random() * 9) + 1;
const keyElement = document.querySelector(`#wrapper-${randomNumber}`);
keyElement.addEventListener('click', showKey);

