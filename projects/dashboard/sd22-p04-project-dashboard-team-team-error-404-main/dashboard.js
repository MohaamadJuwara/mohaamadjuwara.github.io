console.log("berechtenloading");

 

//1
// Select the element with class 'graph-1'
const graph1 = document.querySelector('.graph-1');

// Fetch data from the API
fetch("https://mbo-sd.nl/apiv2/school-courses")
  .then(myData => myData.json()) // Convert the response to JSON format
  .then(jsonData => showSchool(jsonData)); // Call the showSchool function with the JSON data

// Function to display school data
function showSchool(jsonData) {
  console.log(jsonData); // Log the JSON data to the console

  // Sample grades data (should be fetched from API in real scenario)
  const grades = [10, 6, 7, 6, 7, 8];

  // Calculate the highest and lowest grades
  const highestGrade = Math.max(...grades);
  const lowestGrade = Math.min(...grades);

  // Update the elements on the page with the grade information
  document.querySelector('.Average').textContent = `Average Grade: ${calculateAverage(grades)}`;
  document.querySelector('#highest-average').textContent = `Highest Grade: ${highestGrade}`;
  

  // Create a new Chart using Chart.js library to render a bar chart
  new Chart(graph1, {
    type: 'bar',
    data: {
      labels: ['English', 'Netherlands', 'Math', 'Burgerschap', 'Javascript', 'Html/Css'],
      datasets: [{
        label: 'grades',
        data: grades,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          display: true,
          beginAtZero: true
        }
      }
    }
  });
}

// Function to calculate the average grade
function calculateAverage(grades) {
  const sum = grades.reduce((acc, curr) => acc + curr, 0); // Calculate the sum of grades using reduce()
  return (sum / grades.length).toFixed(2); // Calculate the average and fix it to 2 decimal places
}




//2
const graph2 = document.querySelector('.graph-2');

fetch("https://mbo-sd.nl/apiv2/student-grades")
  .then(myData => myData.json())
  .then(jsonData => showCourses(jsonData));

function showCourses(jsonData) {
  console.log(jsonData);

  const scores = [3, 5, 6, 6.6];
  const averageScore = calculateAverage(scores);
  const secondLowestScore = findSecondLowestScore(scores);

  document.querySelector('.score').textContent = `Average Score: ${averageScore}`;
  document.querySelector('#highest-score').textContent = `Second Lowest Score: ${secondLowestScore}`;

  new Chart(graph2, {
    type: 'line',
    data: {
      labels: ['P01', 'P02', 'P03', 'P04'],
      datasets: [{
        label: '# average score',
        data: scores,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function calculateAverage(scores) {
  const sum = scores.reduce((acc, curr) => acc + curr, 0); // Calculate the sum of scores using reduce()
  return (sum / scores.length).toFixed(2); // Calculate the average and fix it to 2 decimal places
}

function findSecondLowestScore(scores) {
  const sortedScores = scores.sort((a, b) => a - b); // Sort the scores in ascending order
  // Return the second element (index 1) from the sorted scores array,
  // since the lowest score will be at index 0 after sorting
  return sortedScores[1];
}



//3
const graph3 = document.querySelector('.graph-3');

fetch("https://mbo-sd.nl/apiv2/student-grades")
  .then(myData => myData.json())
  .then(jsonData => showGrade(jsonData));

function showGrade(jsonData) {
  console.log(jsonData);

  const technicalSkills = [60, 70, 40, 80]; // Replace with actual data
  const sortedSkills = technicalSkills.slice().sort((a, b) => a - b); // Create a sorted copy of the technical skills

  const lowestSkill = sortedSkills[0]; // Get the lowest skill
  const middleSkillIndex = Math.floor(sortedSkills.length / 2); // Calculate the index of the middle skill
  const middleSkill = sortedSkills[middleSkillIndex]; // Get the middle skill

  document.querySelector('.score.percentage').textContent = `Middle Technical Skill: ${middleSkill}%`; // Display middle skill on the page
  document.querySelector('#lowest-average').textContent = `Lowest Technical Skill: ${lowestSkill}%`; // Display lowest skill on the page

  new Chart(graph3, {
    type: 'bar',
    data: {
      labels: ['JavaScript', 'HTML/CSS', 'Vue.js', 'Design'],
      datasets: [{
        label: '# Technical skills',
        barPercentage: 0.5,
        minBarLength: 2,
        data: technicalSkills,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          display: true,
          beginAtZero: true
        }
      }
    }
  });
}



//4
const graph4 = document.querySelector('.graph-4');

fetch("https://mbo-sd.nl/apiv2/student-grades")
  .then(data => data.json())
  .then(data => showStudent(data));

function showStudent(data) {
  console.log(data);

  const grades = [60, 90, 40, 70, 60, 70]; // Replace with actual data

  const averageGrade = calculateAverage(grades); // Calculate the average grade
  const bestGrade = Math.max(...grades); // Find the best grade

  document.querySelector('.exam.cijfers').textContent = `Average Cijfers: ${averageGrade}`;
  document.querySelector('#best-cijfers').textContent = `Best Cijfers: ${bestGrade}`;

  new Chart(graph4, {
    type: 'pie',
    data: {
      labels: ['JavaScript', 'HTML/CSS', 'Vue.js', 'Design', 'Netherlands', 'Math'],
      datasets: [{
        label: 'final merk',
        data: grades,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          display: false,
          beginAtZero: true
        }
      }
    }
  });
}

function calculateAverage(grades) {
  const sum = grades.reduce((acc, curr) => acc + curr, 0);
  return (sum / grades.length).toFixed(2);
}

