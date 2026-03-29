# Session Plan

## Session Materials

<!-- Previously used slides, docs or any other materials that future mentors could get value from should be listed here. If we don't have any (yet), this section can be removed. -->

These are some examples of previously created materials by mentors that you can use yourself, or for inspiration.

- [Notion Page Handout](https://dandy-birth-1b2.notion.site/HYF-Aarhus-JS-3-Week-2-0287dd1293df4a0a92171e62ce12f5c8?pvs=4) (by [Thomas](https://github.com/te-online))
- [Demo](./session-materials/demo/) – In-session live coding from **Code inspiration** below (not the trainee exercises). **index.js** = worksheet stubs; **index-solution.js** = reference. [README](./session-materials/demo/README.md).
- [Promises chaining diagram (PDF)](./session-materials/Promises.pdf) – Hand-drawn sketch you can project or redraw on the board when explaining how `.then()` chains.

## Session Outline

<!-- Write a plan for the order of topics, points to cover, examples, timings, exercises and any other useful info to guide the session. -->

Promises is notoriously difficult to teach! I teach **consumption and creation of promises totally separate!** And show them that it's just like with functions. There is a creation part and a consumption part.

First when they fully understand one part of promises, I move on! Don't over-complicate things. Only mention the resolve function to begin with. When they get that, say that there also is a reject function. **Take as many baby steps as is possible!** Don't mention that resolve and reject can take an argument to begin with, first later explain that.

- Async/await - simple introduction focused on usage
  - Quickly recap asynchronicity
    - Ask the trainees what it means that some code is asynchronous
  - Practical example of async/await
  - [Exercises 1](./session-materials/exercises.md#exercise-1)
- Promise
  - Why do we use promises?
    - So important to explain this, the trainees always ask this! [Is there specific functionality that can only be done with promises in JS?](https://stackoverflow.com/questions/39004567/why-do-we-need-promise-in-js)
  - Consumption
    - [Code inspiration](#promise-consumption)
    - Example, call some function that returns a promise (like fetch)
    - [Exercises 2](./session-materials/exercises.md#exercise-2)
  - Creation
    - [Code inspiration](#promise-creation)
    - [Exercises 3](./session-materials/exercises.md#exercise-3) and then [Exercises 4](./session-materials/exercises.md#exercise-4)
  - Async await
    - [Exercises 5](./session-materials/exercises.md#exercise-5)
  - `Promise.all` - Let trainees investigate
  - Optional - Chaining. Calling `.then` returns a promise. Only get to here when they understand async/await and promise consumption and creation.
    - I found that drawing/demoing how it works under the hood useful when explaining how promises feed into the next `.then()`. You can find example in Session matherials.
    - [Reason for promise](https://mobile.twitter.com/addyosmani/status/1097035418657144832?s=19)
  - [Exercises 5](./session-materials/exercises.md#exercise-5) and [Exercises 6](./session-materials/exercises.md#exercise-6)

## Exercises

See [Exercises](./session-materials/exercises.md). Trainees show results on the page (update the DOM), not in the console.

[Console order](./session-materials/console-order.md) – Optional “what is logged?” promise chaining.

## Code inspiration

### Async/await - simple usage

```js
// Warm up exercise. The trainees has to say everything they can about a variable, ONLY from the variable name. e.g. the type, what it returns, what object we could expect etc.
// cars, car, title, getTitle, addTitle, isTitle, hasTitle, hasItem, users, year, yearIndex, user, review.
```

```js
// DON'T EXPLAIN WHAT ASYNC OR AWAIT DOES YET! Explain on a higher level:
// You have to write async before a function for await to work. No details for now
// await waits until we have fetched the data from the api. Or said in another way await waits until fetch has resolved with the data from the api

// write async before a function for await to work. What does it mean that something is asynchronous?
// JSONPlaceholder works reliably in the browser (same idea as Open Notify / astronauts, different URL).
async function getJsonPlaceholderUser() {
  // await waits until we have data from fetch before it runs the next line. No need for callbacks 🤯
  console.log("Before we fetch data");
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  console.log(
    "This is logged out after some time, even though the code looks synchronous! 🤯",
  );
  const user = await response.json();
  console.log("This is logged out after some time! 🤯");
  console.log(user);
  return user;
}

getJsonPlaceholderUser();
```

### Promise consumption

So how did the async/await example above actually work? Let's get into promises!

If you have a promise, you can call two functions on that promise. '.then' and '.catch'. When are these functions called? What does it mean that a promise is resolved or rejected?

The trainees should be able to answer these questions:
// Question 1: What does it mean that a promise is resolved? Which method on a promise get called?
// Question 2: What does it mean that a promise is rejected? Which method on a promise get called?
// How would you explain your mom what resolved and rejected means?

```js
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => response.json())
  .then((user) => {
    console.log(user);
  })
  .catch((error) => console.log(error));

// https://codesandbox.io/s/scrollto-promise-example-0gjp6
// If not working try chrome
scrollTo("section.features")
  .then(() => console.log("scrolling done"))
  .catch((error) => console.log(error));

// HAMMER in this point:
// When you have a promise you can call two functions on that promise (.then and .catch). '.then' is called when the promise is resolved. '.catch' is called when the promise is rejected.
```

### Promise creation

When you create a new promise you give it a function that has two functions as parameters (resolve and reject). Resolve is called when everything in a promise goes well. Reject is called when something goes wrong.

```js
// Start as simple as possible, no reject, just resolve!
const oneSecondTimeoutPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

// You can pass data in the resolve
const oneSecondTimeoutPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("1 second has passed");
  }, 1000);
});

oneSecondTimeoutPromise.then((timeoutData) => {
  console.log(timeoutData); // '1 second has passed'
});

const orderPizzaPromise = new Promise((resolve, reject) => {
  const pizzaMakingTime = 10000;
  const didPizzaBakingSucceed = true;
  const pizza = "Macaroni pizza";
  setTimeout(() => {
    if (didPizzaBakingSucceed) {
      resolve(pizza);
    } else {
      reject("The pizza was a mess");
    }
  }, pizzaMakingTime);
});

orderPizzaPromise
  .then((pizza) => {
    console.log(`Let's eat the ${pizza}`);
  })
  .catch((error) => {
    console.log(`Let's eat the nothing`);
  });

// HAMMER in this point:
// When you create a new promise you give it a function that has two functions as parameters (resolve and reject). Resolve is called when everything in a promise goes well. Reject is called when something goes wrong.

// Compare function creation and consumption to promise creation and consumption
// function creation
function test() {}

// function usage
console.log(test());
```

### Back to `async`/`await`

So writing `async` in front of a function makes it return a promise! The keyword `await` makes JavaScript wait until that promise resolved and returns its result.

```js
async function getJsonPlaceholderUserSafe() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
    );
    const user = await response.json();
    return user;
  } catch (err) {
    throw "Fetching the user went wrong";
  }
}

const userPromise = getJsonPlaceholderUserSafe();
```

### Function that returns a promise

```js
// This example could definitely be more real world! Any ideas, make a pull request!
const promise = new Promise((resolve) => {
  setTimeout(() => {
    const tea = {
      color: "green",
      taste: "Bitter",
    };

    resolve(tea);
  }, 3000);
});

const isThereMoreTea = false;

// This example could definitely be more real world! Any ideas, make a pull request!
function makeTea() {
  console.log("Start making tea");

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tea = {
        color: "green",
        taste: "Bitter",
      };

      if (isThereMoreTea) {
        resolve(tea);
      } else {
        reject("We don't have more TEA!!");
      }
    }, 3000);
  });
}

console.log(makeTea());

makeTea()
  .then((returnedTeaObject) => {
    console.log(returnedTeaObject);
  })
  .catch((error) => {
    console.log(error);
  });
```
