// get all workout data from back-end

// const api = require("../../routes/api");

// module.exports = function() {
    API.getWorkoutsInRange()
    .then(data => populateChart(data) )

    function generatePalette() {
      const arr = [
      "#003f5c",
      "#2f4b7c",
      "#665191",
      "#a05195",
      "#d45087",
      "#f95d6a",
      "#ff7c43",
      "ffa600",
      "#003f5c",
      "#2f4b7c",
      "#665191",
      "#a05195",
      "#d45087",
      "#f95d6a",
      "#ff7c43",
      "ffa600"
    ]

    return arr;
    }
  function populateChart(data) {
    console.log(data);
    let durations = duration(data);
    let pounds = calculateTotalWeight(data);
    let workouts = workoutNames(data);
    const colors = generatePalette();

    let line = document.querySelector("#canvas").getContext("2d");
    let bar = document.querySelector("#canvas2").getContext("2d");
    let pie = document.querySelector("#canvas3").getContext("2d");
    let pie2 = document.querySelector("#canvas4").getContext("2d");

    let lineChart = new Chart(line, {
      type: "line",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        datasets: [
          {
            label: "Workout Duration In Minutes",
            backgroundColor: "red",
            borderColor: "red",
            data: durations,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true
              }
            }
          ]
        }
      }
    });

    let barChart = new Chart(bar, {
      type: "bar",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            label: "Pounds",
            data: pounds,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Pounds Lifted"
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    let pieChart = new Chart(pie, {
      type: "pie",
      data: {
        labels: workouts,
        datasets: [
          {
            label: "Excercises Performed",
            backgroundColor: colors,
            data: durations
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Excercises Performed"
        }
      }
    });

    let donutChart = new Chart(pie2, {
      type: "doughnut",
      data: {
        labels: workouts,
        datasets: [
          {
            label: "Excercises Performed",
            backgroundColor: colors,
            data: pounds
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Excercises Performed"
        }
      }
    });
  }

  function duration(data) {
    console.log(data);
    let daysOfTheWeek = {
      "0":[],
      "1":[],
      "2":[],
      "3":[],
      "4":[],
      "5":[],
      "6":[]
    };

    // sort all data into correspsonding day of the week
    data.forEach(workout => {
      // Find the day
      const day = new Date(Date.parse(workout.day)).getDay();
      // add the workout to the corresponding day of the week
      daysOfTheWeek[day].push(workout);
    });

    // create duration placeholder
    durations = [];
    // combine the totalTime for each work out per day
    for (day in daysOfTheWeek ) {
      durations.push(
        daysOfTheWeek[day]
        .map(workout => workout.totalDuration)
        .reduce((accumulator, currentValue) => accumulator + currentValue )
      )
    }
    
    console.log(durations);

    return durations;
  }

  function calculateTotalWeight(data) {
    let total = [];

    data.forEach(workout => {
      workout.exercises.forEach(exercise => {
        total.push(exercise.weight);
      });
    });

    return total;
  }

  function workoutNames(data) {
    let workouts = [];

    data.forEach(workout => {
      workout.exercises.forEach(exercise => {
        workouts.push(exercise.name);
      });
    });
    
    return workouts;
  }
// }