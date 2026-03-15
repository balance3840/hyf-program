// Week 2 demo – callbacks & asynchronous code (solution)

// =============================================================================
// Functions
// =============================================================================

function functionRunner(functionToRun) {
  console.log(typeof functionToRun);
  functionToRun();
}

functionRunner(function () {
  console.log("hello");
});

// We don't see anything, why??
functionRunner(Math.random);

function functionRunnerImproved(functionToRun) {
  console.log(typeof functionToRun);
  const capturedReturnValue = functionToRun();
  console.log(capturedReturnValue);
}

functionRunnerImproved(Math.random);

// =============================================================================
// Callbacks :: setTimeout + Event loop
// =============================================================================

setTimeout(function () {
  console.log("2 seconds has elapsed!");
}, 2000);

const fourSecondLog = function () {
  console.log("4 seconds has elapsed!");
};

setTimeout(fourSecondLog, 4000);

// =============================================================================
// Infinite loop
// =============================================================================
// Sync: long blocking loop – run first, console shows "frozen" then "finished".
// Async: recursive setTimeout – run after; while it runs, the page stays responsive.

// while (true) {
//   console.log("Infinite loop tick");
// }

// function tick() {
//   console.log("Async loop tick ");
//   setTimeout(tick, 0);
// }

// setTimeout(tick, 0);

// =============================================================================
// Callbacks :: addEventListener
// =============================================================================

const buttonElement = document.getElementById("click-me");
let counter = 0;

buttonElement.addEventListener("click", function () {
  counter = counter + 1;
  console.log("Button clicked " + counter + " times so far");
});

// Same with callback in a variable:
// const onButtonClick = function () {
//   counter = counter + 1;
//   console.log("Button clicked " + counter + " times so far");
// };
// buttonElement.addEventListener("click", onButtonClick);