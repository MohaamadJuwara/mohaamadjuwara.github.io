// let sidebar = document.querySelector(".sidebar");
// let sidebarBtn = document.querySelector(".sidebarBtn");
// sidebarBtn.onclick = function() {
//   sidebar.classList.toggle("active");
//   if(sidebar.classList.contains("active")){
//   sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
// }else
//   sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
// }





const chart_1 = document.querySelector(".chart-1");


fetch("https://mbo-sd.nl/apiv2/basic-cash-register")
.then(myData => myData.json())
.then(data => showOnPage(data));


function showOnPage(data) {
  console.log(data);


  let array1 = [];
  let array2 = [];

  console.log(array1);
  console.log(array2);


  for(let i = 0; i < data.products.length; i++) {

    const element = data.products[i];

    array1.push(element.name);
    array2.push(element.id);


  };




  new Chart(chart_1, {

    type: 'bar',

    data: {

        labels: array1,

        datasets: [{

            // backgroundColor: backgroundColours,

            label: 'bitcoin: value',

            data: array2,

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




};