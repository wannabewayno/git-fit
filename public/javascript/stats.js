// get all workout data from back-end;

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
  const durationPerDay    = extractTotalsPerDay(data, "duration");
  const weightPerDay      = extractTotalsPerDay(data, "weight"  );

  const durationObj       = extractTotalsPerExercise(data, 'duration');
  const exerciseNames     = durationObj.name;
  const exerciseDurations = durationObj.value;

  const resistanceObj     = extractTotalsPerExercise(data,'weight');
  const resistanceNames     = resistanceObj.name;
  const resistanceWeights = resistanceObj.value;

  const colors  = generatePalette();

  const line = document.querySelector("#canvas").getContext("2d");
  const bar = document.querySelector("#canvas2").getContext("2d");
  const pie = document.querySelector("#canvas3").getContext("2d");
  const doughnut = document.querySelector("#canvas4").getContext("2d");

  const lineChart = new Chart(line, {
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
          data: durationPerDay,
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

  const barChart = new Chart(bar, {
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
          data: weightPerDay,
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

  const pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: exerciseNames,
      datasets: [
        {
          label: "Time Per Exercise",
          backgroundColor: colors,
          data: exerciseDurations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Exercises Performed"
      }
    }
  });

  const donutChart = new Chart(doughnut, {
    type: "doughnut",
    data: {
      labels: resistanceNames,
      datasets: [
        {
          label: "Weight lifted Per Exercise",
          backgroundColor: colors,
          data: resistanceWeights
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Exercises Performed"
      }
    }
  });
}


function combine(daysOfTheWeek,callBack){
  return (day,index,array) => {
    return daysOfTheWeek[day]
    .map(callBack)
    .reduce((accumulator, currentValue) => accumulator + currentValue )
  }
}

function durationCB(workout,index,array){
  return workout.totalDuration
}

// combine the totalweight lifted for each day
// sets x reps x weight per exercise per workout
function weightCB(workout,index,array){
  return workout.exercises.map(exercise => {
    if (exercise.type === 'cardio') {
      return 0;
    }
      return exercise.sets*exercise.reps*exercise.weight;
  })
  .reduce((accumulator, currentValue) => accumulator + currentValue )
}


/**
 * Sorts data by day of the week
 * Then totals numeric data per day for the defined option passed to 'option' 
 * @param  {Array<Object>}  data - An array of workout data 
 * @param  {String} option - a string describing the type of data to extract
 * @return {Array<Number>} - returns combined total per day
 */
function extractTotalsPerDay(data, dataType) {
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

  // placeholder for extracted data
  let extractedData;

  switch (dataType) {
    case 'duration':
      extractedData = Object.keys(daysOfTheWeek).map(
        combine(daysOfTheWeek,durationCB)
      );
      
      break;
    case 'weight':
      extractedData = Object.keys(daysOfTheWeek).map(
        combine(daysOfTheWeek,weightCB)
      );
      break;
  }
  return extractedData;
}

function extractTotalsPerExercise(data, dataType){
  console.log(data);
  const exercisesObj = {};

  switch(dataType){
    case 'duration':
      data.forEach(workout => {
        workout.exercises.forEach(exercise => {
          if (exercisesObj[exercise.name]) {
            exercisesObj[exercise.name] += exercise.duration;
          } else {
            exercisesObj[exercise.name] = exercise.duration;
          }
        });
      });
      break;
    case'weight':
      //code here
      data.forEach(workout => {
        workout.exercises.forEach(exercise => {
          if (exercise.type === 'resistance') {
            if (exercisesObj[exercise.name]) {
              exercisesObj[exercise.name] += exercise.weight * exercise.sets * exercise.reps;
            } else {
              exercisesObj[exercise.name] = exercise.weight * exercise.sets * exercise.reps;
            }
          }
        });
      });
    break;
  }
  console.log(exercisesObj);

  // separate the key-value pairs into arrays to pass to the chart object
  const exerciseTotals = {
    name:[],
    value:[],
  };
  for (exercise in exercisesObj) {
    exerciseTotals.name.push(exercise);
    exerciseTotals.value.push(exercisesObj[exercise]);
  }
  return exerciseTotals
}