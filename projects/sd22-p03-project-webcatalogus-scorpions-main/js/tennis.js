console.log('sport page is loaded');
const men = document.body.querySelector(".men");

// Data fetch van server
fetch('https://mbo-sd.nl/period3-fetch/sport-tennis-men')
    .then(response => response.json())
    .then(myJsonData => showData(myJsonData));

function showData(myJsonData) {
    for (let i = 0; i < myJsonData.length; i++) {
        const element = myJsonData[i];
        const card = createCard(element);
        men.innerHTML += card;
    }
}


function createCard(element) {
    const card = `
        <div class="col-4 mt-5">
            <div class="card">
                <img class="card-img-top" src ="${element.imageUrl}" alt="title">
                <div class="card-body ">
                    <h3 class="card-title text-danger text-center">${element.title}</h3>
                    <h3 class="card-title text-danger text-center">${element.country}</h3>
                    <p class="card-text text-muted">${element.description}</p>
                </div>
            </div>
        </div>
    `
    return card;
}

