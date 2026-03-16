// Week 2 demo – callbacks & asynchronous code (solution)

// =============================================================================
// Functions
// =============================================================================
// Task: Implement functionRunner so it calls the function that was passed in (e.g. add logging before/after).

function functionRunner(functionToRun) {
  console.log("Runner function");
  const res = functionToRun();
  console.log("Runner function ends", res);
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

setTimeout(() => {
  console.log("Run after N seconds");
}, 1000);

const callback = () => {
  console.log("Run after N seconds");
};

setTimeout(callback, 1000);

// Next: Look at event-loop demo, explain how it works
// Next: tasks from console-order.md

// =============================================================================
// Infinite loop
// =============================================================================
// Task: try to make an infinite loop with Sync and Async operations

function infiniteSync() {
  while (true) {
    console.log("Im alive");
  }
}

function infiniteAsync() {
  const runTimeout = () => {
    console.log("Im alive");
    setTimeout(runTimeout, 0);
  };

  runTimeout();
}

const btn = document.getElementById("start");
btn.addEventListener("click", infiniteAsync);

// Function to test if browser is responsive
const btnClick = document.getElementById("click");
btnClick.addEventListener("click", function () {
  console.log("Im clicked");
});

// =============================================================================
// Callbacks :: addEventListener
// =============================================================================
// Task: Keep track of how many times the button is clicked; show the count on the page.

const buttonElement = document.getElementById("click-me");
let counter = 0;

buttonElement.addEventListener("click", function () {
  counter = counter + 1;
  console.log("Button clicked " + counter + " times so far");
});
