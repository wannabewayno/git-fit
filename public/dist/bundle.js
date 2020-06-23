/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/javascript/api.js":
/*!**********************************!*\
  !*** ./public/javascript/api.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const API = {\n  async getLastWorkout() {\n    let res;\n    try {\n      res = await fetch(\"/api/workouts\");\n    } catch (err) {\n      console.log(err)\n    }\n    const json = await res.json();\n\n    return json[json.length - 1];\n  },\n  async addExercise(data) {\n    const id = location.search.split(\"=\")[1];\n\n    const res = await fetch(\"/api/workouts/\" + id, {\n      method: \"PUT\",\n      headers: { \"Content-Type\": \"application/json\" },\n      body: JSON.stringify(data)\n    });\n\n    const json = await res.json();\n\n    return json;\n  },\n  async createWorkout(data = {}) {\n    const res = await fetch(\"/api/workouts\", {\n      method: \"POST\",\n      body: JSON.stringify(data),\n      headers: { \"Content-Type\": \"application/json\" }\n    });\n\n    const json = await res.json();\n\n    return json;\n  },\n\n  async getWorkoutsInRange() {\n    const res = await fetch(`/api/workouts/range`);\n    const json = await res.json();\n\n    return json;\n  },\n};\n\n\n\n\n//# sourceURL=webpack:///./public/javascript/api.js?");

/***/ }),

/***/ "./public/javascript/exercise.js":
/*!***************************************!*\
  !*** ./public/javascript/exercise.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst workoutTypeSelect = document.querySelector(\"#type\");\nconst cardioForm = document.querySelector(\".cardio-form\");\nconst resistanceForm = document.querySelector(\".resistance-form\");\nconst cardioNameInput = document.querySelector(\"#cardio-name\");\nconst nameInput = document.querySelector(\"#name\");\nconst weightInput = document.querySelector(\"#weight\");\nconst setsInput = document.querySelector(\"#sets\");\nconst repsInput = document.querySelector(\"#reps\");\nconst durationInput = document.querySelector(\"#duration\");\nconst resistanceDurationInput = document.querySelector(\"#resistance-duration\");\nconst distanceInput = document.querySelector(\"#distance\");\nconst completeButton = document.querySelector(\"button.complete\");\nconst addButton = document.querySelector(\"button.add-another\");\nconst toast = document.querySelector(\"#toast\");\nconst newWorkout = document.querySelector(\".new-workout\")\n\nlet workoutType = null;\nlet shouldNavigateAway = false;\n\nasync function initExercise() {\n  let workout;\n\n  if (location.search.split(\"=\")[1] === undefined) {\n    workout = await API.createWorkout()\n    console.log(workout)\n  }\n  if (workout) {\n    location.search = \"?id=\" + workout._id;\n  }\n\n}\n\ninitExercise();\n\nfunction handleWorkoutTypeChange(event) {\n  workoutType = event.target.value;\n\n  if (workoutType === \"cardio\") {\n    cardioForm.classList.remove(\"d-none\");\n    resistanceForm.classList.add(\"d-none\");\n  } else if (workoutType === \"resistance\") {\n    resistanceForm.classList.remove(\"d-none\");\n    cardioForm.classList.add(\"d-none\");\n  } else {\n    cardioForm.classList.add(\"d-none\");\n    resistanceForm.classList.add(\"d-none\");\n  }\n\n  validateInputs();\n}\n\nfunction validateInputs() {\n  let isValid = true;\n\n  if (workoutType === \"resistance\") {\n    if (nameInput.value.trim() === \"\") {\n      isValid = false;\n    }\n\n    if (weightInput.value.trim() === \"\") {\n      isValid = false;\n    }\n\n    if (setsInput.value.trim() === \"\") {\n      isValid = false;\n    }\n\n    if (repsInput.value.trim() === \"\") {\n      isValid = false;\n    }\n\n    if (resistanceDurationInput.value.trim() === \"\") {\n      isValid = false;\n    }\n  } else if (workoutType === \"cardio\") {\n    if (cardioNameInput.value.trim() === \"\") {\n      isValid = false;\n    }\n\n    if (durationInput.value.trim() === \"\") {\n      isValid = false;\n    }\n\n    if (distanceInput.value.trim() === \"\") {\n      isValid = false;\n    }\n  }\n\n  if (isValid) {\n    completeButton.removeAttribute(\"disabled\");\n    addButton.removeAttribute(\"disabled\");\n  } else {\n    completeButton.setAttribute(\"disabled\", true);\n    addButton.setAttribute(\"disabled\", true);\n  }\n}\n\nasync function handleFormSubmit(event) {\n  event.preventDefault();\n\n  let workoutData = {};\n\n  if (workoutType === \"cardio\") {\n    workoutData.type = \"cardio\";\n    workoutData.name = cardioNameInput.value.trim();\n    workoutData.distance = Number(distanceInput.value.trim());\n    workoutData.duration = Number(durationInput.value.trim());\n  } else if (workoutType === \"resistance\") {\n    workoutData.type = \"resistance\";\n    workoutData.name = nameInput.value.trim();\n    workoutData.weight = Number(weightInput.value.trim());\n    workoutData.sets = Number(setsInput.value.trim());\n    workoutData.reps = Number(repsInput.value.trim());\n    workoutData.duration = Number(resistanceDurationInput.value.trim());\n  }\n\n  await API.addExercise(workoutData);\n  clearInputs();\n  toast.classList.add(\"success\");\n}\n\nfunction handleToastAnimationEnd() {\n  toast.removeAttribute(\"class\");\n  if (shouldNavigateAway) {\n    location.href = \"/\";\n  }\n}\n\nfunction clearInputs() {\n  cardioNameInput.value = \"\";\n  nameInput.value = \"\";\n  setsInput.value = \"\";\n  distanceInput.value = \"\";\n  durationInput.value = \"\";\n  repsInput.value = \"\";\n  resistanceDurationInput.value = \"\";\n  weightInput.value = \"\";\n  // re-validates to disable buttons\n  validateInputs();\n}\n\nif (workoutTypeSelect) {\n  workoutTypeSelect.addEventListener(\"change\", handleWorkoutTypeChange);\n}\nif (completeButton) {\n  completeButton.addEventListener(\"click\", function (event) {\n    shouldNavigateAway = true;\n    handleFormSubmit(event);\n  });\n}\nif (addButton) {\n  addButton.addEventListener(\"click\", handleFormSubmit);\n}\ntoast.addEventListener(\"animationend\", handleToastAnimationEnd);\n\ndocument\n  .querySelectorAll(\"input\")\n  .forEach(element => element.addEventListener(\"input\", validateInputs));\n\n//# sourceURL=webpack:///./public/javascript/exercise.js?");

/***/ }),

/***/ "./public/javascript/index.js":
/*!************************************!*\
  !*** ./public/javascript/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n  init();\n\nasync function init() {\n  if (location.search.split(\"=\")[1] === undefined) {\n    const workout = await API.getLastWorkout();\n    if (workout) {\n      location.search = \"?id=\" + workout._id;\n    } else {\n      document.querySelector(\"#continue-btn\").classList.add(\"d-none\")\n    }\n  }\n}\n\n\n\n//# sourceURL=webpack:///./public/javascript/index.js?");

/***/ }),

/***/ "./public/javascript/stats.js":
/*!************************************!*\
  !*** ./public/javascript/stats.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// get all workout data from back-end;\n\n  API.getWorkoutsInRange()\n  .then(data => populateChart(data) )\n\nfunction generatePalette() {\n  const arr = [\n  \"#003f5c\",\n  \"#2f4b7c\",\n  \"#665191\",\n  \"#a05195\",\n  \"#d45087\",\n  \"#f95d6a\",\n  \"#ff7c43\",\n  \"ffa600\",\n  \"#003f5c\",\n  \"#2f4b7c\",\n  \"#665191\",\n  \"#a05195\",\n  \"#d45087\",\n  \"#f95d6a\",\n  \"#ff7c43\",\n  \"ffa600\"\n  ]\n\n  return arr;\n}\n\nfunction populateChart(data) {\n  const durationPerDay    = extractTotalsPerDay(data, \"duration\");\n  const weightPerDay      = extractTotalsPerDay(data, \"weight\"  );\n\n  const durationObj       = extractTotalsPerExercise(data, 'duration');\n  const exerciseNames     = durationObj.name;\n  const exerciseDurations = durationObj.value;\n\n  const resistanceObj     = extractTotalsPerExercise(data,'weight');\n  const resistanceNames   = resistanceObj.name;\n  const resistanceWeights = resistanceObj.value;\n\n  const colors  = generatePalette();\n\n  const line = document.querySelector(\"#canvas\").getContext(\"2d\");\n  const bar = document.querySelector(\"#canvas2\").getContext(\"2d\");\n  const pie = document.querySelector(\"#canvas3\").getContext(\"2d\");\n  const doughnut = document.querySelector(\"#canvas4\").getContext(\"2d\");\n\n  const lineChart = new Chart(line, {\n    type: \"line\",\n    data: {\n      labels: [\n        \"Sunday\",\n        \"Monday\",\n        \"Tuesday\",\n        \"Wednesday\",\n        \"Thursday\",\n        \"Friday\",\n        \"Saturday\"\n      ],\n      datasets: [\n        {\n          label: \"Workout Duration In Minutes\",\n          backgroundColor: \"red\",\n          borderColor: \"red\",\n          data: durationPerDay,\n          fill: false\n        }\n      ]\n    },\n    options: {\n      responsive: true,\n      title: {\n        display: true\n      },\n      scales: {\n        xAxes: [\n          {\n            display: true,\n            scaleLabel: {\n              display: true\n            }\n          }\n        ],\n        yAxes: [\n          {\n            display: true,\n            scaleLabel: {\n              display: true\n            }\n          }\n        ]\n      }\n    }\n  });\n\n  const barChart = new Chart(bar, {\n    type: \"bar\",\n    data: {\n      labels: [\n        \"Sunday\",\n        \"Monday\",\n        \"Tuesday\",\n        \"Wednesday\",\n        \"Thursday\",\n        \"Friday\",\n        \"Saturday\",\n      ],\n      datasets: [\n        {\n          label: \"Pounds\",\n          data: weightPerDay,\n          backgroundColor: [\n            \"rgba(255, 99, 132, 0.2)\",\n            \"rgba(54, 162, 235, 0.2)\",\n            \"rgba(255, 206, 86, 0.2)\",\n            \"rgba(75, 192, 192, 0.2)\",\n            \"rgba(153, 102, 255, 0.2)\",\n            \"rgba(255, 159, 64, 0.2)\"\n          ],\n          borderColor: [\n            \"rgba(255, 99, 132, 1)\",\n            \"rgba(54, 162, 235, 1)\",\n            \"rgba(255, 206, 86, 1)\",\n            \"rgba(75, 192, 192, 1)\",\n            \"rgba(153, 102, 255, 1)\",\n            \"rgba(255, 159, 64, 1)\"\n          ],\n          borderWidth: 1\n        }\n      ]\n    },\n    options: {\n      title: {\n        display: true,\n        text: \"Pounds Lifted\"\n      },\n      scales: {\n        yAxes: [\n          {\n            ticks: {\n              beginAtZero: true\n            }\n          }\n        ]\n      }\n    }\n  });\n\n  const pieChart = new Chart(pie, {\n    type: \"pie\",\n    data: {\n      labels: exerciseNames,\n      datasets: [\n        {\n          label: \"Time Per Exercise\",\n          backgroundColor: colors,\n          data: exerciseDurations\n        }\n      ]\n    },\n    options: {\n      title: {\n        display: true,\n        text: \"Exercises Performed\"\n      }\n    }\n  });\n\n  const donutChart = new Chart(doughnut, {\n    type: \"doughnut\",\n    data: {\n      labels: resistanceNames,\n      datasets: [\n        {\n          label: \"Weight lifted Per Exercise\",\n          backgroundColor: colors,\n          data: resistanceWeights\n        }\n      ]\n    },\n    options: {\n      title: {\n        display: true,\n        text: \"Exercises Performed\"\n      }\n    }\n  });\n}\n\n\nfunction combine(daysOfTheWeek,callBack){\n  return (day,index,array) => {\n    return daysOfTheWeek[day]\n    .map(callBack)\n    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)\n  }\n}\n\nfunction durationCB(workout,index,array){\n  return workout.totalDuration\n}\n\n// combine the totalweight lifted for each day\n// sets x reps x weight per exercise per workout\nfunction weightCB(workout,index,array){\n  return workout.exercises.map(exercise => {\n    if (exercise.type === 'cardio') {\n      return 0;\n    }\n      return exercise.sets*exercise.reps*exercise.weight;\n  })\n  .reduce((accumulator, currentValue) => accumulator + currentValue )\n}\n\n\n/**\n * Sorts data by day of the week\n * Then totals numeric data per day for the defined option passed to 'option' \n * @param  {Array<Object>}  data - An array of workout data \n * @param  {String} option - a string describing the type of data to extract\n * @return {Array<Number>} - returns combined total per day\n */\nfunction extractTotalsPerDay(data, dataType) {\n  let daysOfTheWeek = {\n    \"0\":[],\n    \"1\":[],\n    \"2\":[],\n    \"3\":[],\n    \"4\":[],\n    \"5\":[],\n    \"6\":[]\n  };\n\n  // sort all data into correspsonding day of the week\n  data.forEach(workout => {\n    // Find the day\n    const day = new Date(Date.parse(workout.day)).getDay();\n    // add the workout to the corresponding day of the week\n    daysOfTheWeek[day].push(workout);\n  });\n\n  // placeholder for extracted data\n  let extractedData;\n\n  switch (dataType) {\n    case 'duration':\n      extractedData = Object.keys(daysOfTheWeek).map(\n        combine(daysOfTheWeek,durationCB)\n      );\n      \n      break;\n    case 'weight':\n      extractedData = Object.keys(daysOfTheWeek).map(\n        combine(daysOfTheWeek,weightCB)\n      );\n      break;\n  }\n  return extractedData;\n}\n\nfunction extractTotalsPerExercise(data, dataType){\n\n  const exercisesObj = {};\n\n  switch(dataType){\n    case 'duration':\n      data.forEach(workout => {\n        workout.exercises.forEach(exercise => {\n          if (exercisesObj[exercise.name]) {\n            exercisesObj[exercise.name] += exercise.duration;\n          } else {\n            exercisesObj[exercise.name] = exercise.duration;\n          }\n        });\n      });\n      break;\n    case'weight':\n      //code here\n      data.forEach(workout => {\n        workout.exercises.forEach(exercise => {\n          if (exercise.type === 'resistance') {\n            if (exercisesObj[exercise.name]) {\n              exercisesObj[exercise.name] += exercise.weight * exercise.sets * exercise.reps;\n            } else {\n              exercisesObj[exercise.name] = exercise.weight * exercise.sets * exercise.reps;\n            }\n          }\n        });\n      });\n    break;\n  }\n\n  // separate the key-value pairs into arrays to pass to the chart object\n  const exerciseTotals = {\n    name:[],\n    value:[],\n  };\n  for (exercise in exercisesObj) {\n    exerciseTotals.name.push(exercise);\n    exerciseTotals.value.push(exercisesObj[exercise]);\n  }\n  return exerciseTotals\n}\n\n//# sourceURL=webpack:///./public/javascript/stats.js?");

/***/ }),

/***/ "./public/javascript/workout.js":
/*!**************************************!*\
  !*** ./public/javascript/workout.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("async function initWorkout() {\n  const lastWorkout = await API.getLastWorkout();\n  console.log(\"Last workout:\", lastWorkout);\n  if (lastWorkout) {\n    document\n      .querySelector(\"a[href='/exercise?']\")\n      .setAttribute(\"href\", `/exercise?id=${lastWorkout._id}`);\n\n    const workoutSummary = {\n      date: formatDate(lastWorkout.day),\n      totalDuration: lastWorkout.totalDuration,\n      numExercises: lastWorkout.exercises.length,\n      ...tallyExercises(lastWorkout.exercises)\n    };\n\n    renderWorkoutSummary(workoutSummary);\n  } else {\n    renderNoWorkoutText()\n  }\n}\n\nfunction tallyExercises(exercises) {\n  if (exercises.length === 1) {\n    if (exercises[0].type === 'resistance') {\n      return { totalWeight: exercises[0].weight, totalSets: exercises[0].sets, totalReps: exercises[0].reps };\n    } else {\n      return { totalDistance: exercises[0].distance };\n    }\n  }\n  const tallied = exercises.reduce((acc, curr) => {\n    if (curr.type === \"resistance\") {\n      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;\n      acc.totalSets = (acc.totalSets || 0) + curr.sets;\n      acc.totalReps = (acc.totalReps || 0) + curr.reps;\n    } else if (curr.type === \"cardio\") {\n      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;\n    }\n    return acc;\n  }, {});\n  console.log(tallied);\n  return tallied;\n}\n\nfunction formatDate(date) {\n  const options = {\n    weekday: \"long\",\n    year: \"numeric\",\n    month: \"long\",\n    day: \"numeric\"\n  };\n\n  return new Date(date).toLocaleDateString(options);\n}\n\nfunction renderWorkoutSummary(summary) {\n  console.log(summary);\n  const container = document.querySelector(\".workout-stats\");\n\n  const workoutKeyMap = {\n    date: \"Date\",\n    totalDuration: \"Total Workout Duration\",\n    numExercises: \"Exercises Performed\",\n    totalWeight: \"Total Weight Lifted\",\n    totalSets: \"Total Sets Performed\",\n    totalReps: \"Total Reps Performed\",\n    totalDistance: \"Total Distance Covered\"\n  };\n\n  Object.keys(summary).forEach(key => {\n    const p = document.createElement(\"p\");\n    const strong = document.createElement(\"strong\");\n\n    strong.textContent = workoutKeyMap[key];\n    const textNode = document.createTextNode(`: ${summary[key]}`);\n\n    p.appendChild(strong);\n    p.appendChild(textNode);\n\n    container.appendChild(p);\n  });\n}\n\nfunction renderNoWorkoutText() {\n  const container = document.querySelector(\".workout-stats\");\n  const p = document.createElement(\"p\");\n  const strong = document.createElement(\"strong\");\n  strong.textContent = \"You have not created a workout yet!\"\n\n  p.appendChild(strong);\n  container.appendChild(p);\n}\n\ninitWorkout();\n\n\n\n//# sourceURL=webpack:///./public/javascript/workout.js?");

/***/ }),

/***/ "./public/src/app.js":
/*!***************************!*\
  !*** ./public/src/app.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _javascript_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../javascript/api.js */ \"./public/javascript/api.js\");\n/* harmony import */ var _javascript_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_javascript_api_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _javascript_exercise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../javascript/exercise.js */ \"./public/javascript/exercise.js\");\n/* harmony import */ var _javascript_exercise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_javascript_exercise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _javascript_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../javascript/index.js */ \"./public/javascript/index.js\");\n/* harmony import */ var _javascript_index_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_javascript_index_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _javascript_stats_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../javascript/stats.js */ \"./public/javascript/stats.js\");\n/* harmony import */ var _javascript_stats_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_javascript_stats_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _javascript_workout_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../javascript/workout.js */ \"./public/javascript/workout.js\");\n/* harmony import */ var _javascript_workout_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_javascript_workout_js__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\n_javascript_api_js__WEBPACK_IMPORTED_MODULE_0___default()();\n_javascript_exercise_js__WEBPACK_IMPORTED_MODULE_1___default()();\n_javascript_index_js__WEBPACK_IMPORTED_MODULE_2___default()();\n_javascript_stats_js__WEBPACK_IMPORTED_MODULE_3___default()();\n_javascript_workout_js__WEBPACK_IMPORTED_MODULE_4___default()();\n\n\n//# sourceURL=webpack:///./public/src/app.js?");

/***/ })

/******/ });