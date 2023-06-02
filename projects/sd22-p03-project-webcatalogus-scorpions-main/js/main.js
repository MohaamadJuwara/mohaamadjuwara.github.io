console.log('Main JS loaded');
// Het is een class van html die heb ik naar js met querySelector halen
const row = document.querySelector('.objecten')
// Data ophalen van de server
// .json(): Converteer data van json naar object
function fetchData(Url) {
  fetch(Url)
  .then(myData => myData.json())
  .then(myJsonData => showData(myJsonData))
  
}

// Deze functie toont de data in de card op de website
function showData(myJsonData) {

  for (let i = 0; i < myJsonData.length; i++) {
    const element = myJsonData[i];
    const card = createPrudctCards(element);

    row.innerHTML += card;  
  }
  
}

// Deze functie maakt een card
function createPrudctCards(element) {
  const card = `
  <div class="col-12 col-lg-4 d-flex align-items-stretch mt-4 my-5">
  <div class="card text-center shadow">
<img src="${element.imageUrl}" class="card-img-top img-fluid p-2" alt="...">
<br>
<div class="card-body">
  <h5 class="card-title p-2">${element.title}</h5>
  <p class="card-text">${element.description}</p>
</div>
<div class="card-body">
</div>
</div>
</div>
  `;
  
  return card;
};
