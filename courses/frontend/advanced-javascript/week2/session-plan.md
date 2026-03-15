# Session Plan

## Session Materials

<!-- Previously used slides, docs or any other materials that future mentors could get value from should be listed here. If we don't have any (yet), this section can be removed. -->

- [Console order tasks](./session-materials/console-order.md) – “In what order will we see the output?” (sync + setTimeout). Use in class: show code, ask trainees to predict, then run.
- [Exercises](./session-materials/exercises.md)

These are some examples of previously created materials by mentors that you can use yourself, or for inspiration.

- [Notion Page Handout](https://dandy-birth-1b2.notion.site/HYF-Aarhus-JS-2-Week-3-6bce73b3a0bf47a3ad32ed12ee4d0519?pvs=4) (by [Thomas](https://github.com/te-online))

## Session Outline

<!-- Write a plan for the order of topics, points to cover, examples, timings, exercises and any other useful info to guide the session. -->

- Function as a variable - function can be called inside another function, like we saw with the homemade `forEach`
  - [Code inspiration](#calling-a-function-within-a-function)
- Callback function and asynchronicity - shows a practical example of function that gets called by another function (e.g. `setTimeout` or `addEventListener`)
  - [Code inspiration](#callback-functions)
- [Exercises](./session-materials/exercises.md)

The trainees should after the session **feel comfortable with callback functions** and the fact that a **function works just like a variable** that can be passed around. Also asynchronicity is important, when is a function called and where does it stop.

Also hammer in the point of the difference between:

```js
document.querySelector("button").addEventListener("click", logOuttext);
document.querySelector("button").addEventListener("click", logOuttext());
```

Here's a good [practical example of callbacks](https://github.com/HackYourFuture-CPH/JavaScript/blob/class08/JavaScript2/Week5/classwork/extra_examples.md) (TODO move this to this repo)

This is super good at explaining function logic
![Function graphic](./session-materials/function-graphic.jpg)

### Calling a function within a function

```js
// Here we create a function that as a parameter takes a function!! Super weird right!?
// Functions works just like any other type in js.
function functionRunner(functionToRun) {
  console.log(typeof functionToRun);
  // Here we are calling the function that is provided as an argument when calling functionRunner
  functionToRun();
}

functionRunner(function () {
  console.log("hello");
});

// We don't see anything, why??
functionRunner(Math.random);

// Let's rewrite functionRunner to log out the return of a function
function functionRunnerImproved(functionToRun) {
  console.log(typeof functionToRun);
  // Here we are calling the function that is provided as an argument when calling functionRunner
  const capturedReturnValue = functionToRun();
  console.log(capturedReturnValue);
}

functionRunnerImproved(Math.random);
```

### Callback functions

```js
/*
Events
Events in javascript are thing like:
A timer has just finished, a user clicked a button, our page has loaded,
someone types into an input element or we have just gotten some data from a server.
When these events happen, we usually want to add some functionality.
e.g. when a user clicks the like button (event), we want to increment the like counter and color the like button blue.
Or when someone clicks "Close cookies" (event) we want to remove the cookie div.
Let's first try to create some js that waits for 2 seconds and the console.logs out "2 seconds has elapsed!"
In javascript we use the word eventlistener to listen
*/

// Tried to find actual webkit implementation, but failed. To show that the setTimeout implementation is just calling the provided function after a given time
setTimeout(function () {
  console.log("2 seconds has elapsed!");
}, 2000);

// Cool, now let's make a function as a variable:
const fourSecondLog = function () {
  console.log("4 seconds has elapsed!");
};

setTimeout(fourSecondLog, 4000);
```

### Event Listeners

```javascript
// Now let's keep track of how many times a button is clicked.
// To do something whenever a button gets clicked, we use what is called an event listener.
// Imagine that the button is noisy. There's someone listening out for the click sound,
// and every time they hear it, they add 1 to a counter.

const buttonElement = document.querySelector("button");
let counter = 0;

buttonElement.addEventListener("click", function () {
  counter = counter + 1;
  console.log(`Button clicked ${counter} times so far`);
});

// or the same thing but assigning the event listener to a const:

const buttonElement = document.querySelector("button");
let counter = 0;

const buttonClicked = function () {
  counter = counter + 1;
  console.log(`Button clicked ${counter} times so far`);
};

buttonElement.addEventListener("click", buttonClicked);

//Callbacks
// Now let's learn about callbacks!
// Well actually you have already made callbacks!
// When you give a function to an event listener or a timer or when fetching data you are using a callback function

// Let's create a callback function when someone writes in a input element
const callback = function () {
  console.log("Someone is writing!!");
};

document.querySelector("input").addEventListener("input", callback);
```

### Anonymous vs named function

```js
// Named function
function myFunction() {
  console.log("myFunction");
}

// Anonymous function, assigned to a variable
const myFunctionAsVar = function () {
  console.log("myFunctionAsVar");
};

document.body.addEventListener("click", myFunctionAsVar);
document.body.addEventListener("click", myFunction);
```

## Exercises

See [Exercises](./session-materials/exercises.md). Trainees show results on the page (update the DOM), not in the console.
