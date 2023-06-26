const dailyAverage = document.querySelector('.Daily');

let labelArray = [];
let dataArray = [];
let highestTemperature;
let lowestTemperature;

const assignment1Url = fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m')
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        for (let i = 0; i < 24; i++) {
            const element = data.hourly.time[i];
            const secondElement = data.hourly.temperature_2m[i];
            labelArray.push(element);
            dataArray.push(secondElement);

            // Update highestTemperature and lowestTemperature
            if (highestTemperature === undefined || secondElement > highestTemperature) {
                highestTemperature = secondElement;
            }
            if (lowestTemperature === undefined || secondElement < lowestTemperature) {
                lowestTemperature = secondElement;
            }
        }

        const highestTemperatureElement = document.getElementById('highestTemperature');
        const lowestTemperatureElement = document.getElementById('lowestTemperature');

        highestTemperatureElement.innerHTML = `Highest Temperature: ${highestTemperature.toFixed(2)}°C`;
        lowestTemperatureElement.innerHTML = `Lowest Temperature: ${lowestTemperature.toFixed(2)}°C`;//toFixed rond het getal af op 2 cijfers na de coma

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
        }
        todayAverage = sum / 24;

        todayAverage = todayAverage.toFixed(2);
        console.log(todayAverage);
        dailyAverage.innerHTML = todayAverage;
        createChart1(chartAssignment1, data);
    });

const backgroundColours = ['red'];
const chartAssignment1 = document.querySelector('.chart');

function createChart1(canvasElement, data) {
    new Chart(canvasElement, {
        type: 'line',
        data: {
            labels: labelArray,
            datasets: [{
                backgroundColor: backgroundColours,
                label: '# temperature',
                data: dataArray,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

//chart 2


const dailyAverage2 = document.querySelector('.Daily2');

let labelArray2 = [];
let dataArray2 = [];
const assignment1Url2 = fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m')
    .then((response) => response.json())
    .then(data => {
        console.log(data)
        for (let i = 0; i < 24; i++) {
            const element = data.hourly.time[i];
            const secondElement = data.hourly.temperature_2m[i]
            labelArray2.push(element);
            dataArray2.push(secondElement);



        }
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
        }
        todayAverage = sum / 24;
        todayAverage = todayAverage.toFixed(2);
        console.log(todayAverage);
        dailyAverage2.innerHTML = todayAverage;
        createChart2(chartAssignment2, data)
    });
const backgroundColours2 = ['green'];
const chartAssignment2 = document.querySelector('.chart2');

function createChart2(canvasElement, data) {
    new Chart(canvasElement, {
        type: 'bar',
        data: {
            labels: labelArray2,
            datasets: [{
                backgroundColor: backgroundColours2,
                label: '# temprature',
                data: dataArray2,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}