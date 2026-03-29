// Week 3 demo – Promises & async/await (solution)

// JSONPlaceholder only (reliable in the browser). Session plan may mention Open Notify —
// same async ideas, different URL.
const USER_URL = "https://jsonplaceholder.typicode.com/users/1";
const POST_URL = "https://jsonplaceholder.typicode.com/posts/1";
const TODO_URL = "https://jsonplaceholder.typicode.com/todos/1";

function showOutput(text) {
  const el = document.getElementById("out");
  if (el) {
    el.textContent = text;
  }
}

// =============================================================================
// Async/await – simple usage
// =============================================================================
// Task: Load USER_URL with async/await

async function getUser() {
  const response = await fetch(USER_URL);
  const user = await response.json();
  showOutput(JSON.stringify(user, null, 2));
}

// Next: Exercise 1

// =============================================================================
// Why use Promises? :: Callback Hell
// =============================================================================
// Show Callback Hell example in https://www.npmjs.com/package/q

// =============================================================================
// Promise consumption
// =============================================================================
// Task: Load one of the resources (e.g. USER_URL); show success or error on the page using .then / .catch only.

function loadOneResourceWithThen() {
  showOutput("Loading…");
  fetch(USER_URL)
    .then((response) => response.json())
    .then((data) => {
      showOutput(JSON.stringify(data, null, 2));
    })
    .catch((error) => {
      showOutput(String(error));
    });
}

// Next: Chaining examples
// Next: Exercise 2

// =============================================================================
// Promise creation
// =============================================================================
// Task: Create a Promise that resolves after 1 second and shows "It worked" on the page.
// Task: Create demoOrderPizza: a pizza-order Promise — after a 'baking' delay it either resolves with a pizza you can eat (show that on the page) or rejects if baking failed (show the failure on the page).

function oneSecondMessage() {
  showOutput("…");
  const oneSecondTimeoutPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  oneSecondTimeoutPromise.then(() => {
    showOutput("It worked");
  });
}

function demoOrderPizza() {
  showOutput("Baking… (3s for demo)");
  const pizzaMakingTime = 3000;
  const didPizzaBakingSucceed = true;
  const pizza = "Macaroni pizza";

  const orderPizzaPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (didPizzaBakingSucceed) {
        resolve(pizza);
      } else {
        reject("The pizza was a mess");
      }
    }, pizzaMakingTime);
  });

  orderPizzaPromise
    .then((p) => {
      showOutput(`Let's eat the ${p}`);
    })
    .catch((error) => {
      showOutput(`Let's eat nothing: ${error}`);
    });
}

// Next: Exercise 3
// Next: Exercise 4

// =============================================================================
// Back to async/await (try / catch)
// =============================================================================
// Task: improve getUser to use try/catch to handle errors and show the error on the page.

async function getUserWithTryCatch() {
  try {
    const response = await fetch(USER_URL);
    const user = await response.json();
    showOutput(JSON.stringify(user, null, 2));
  } catch (err) {
    showOutput(String(err));
  }
}

// Next: Exercise 5

// =============================================================================
// Promise.all
// =============================================================================

async function demoPromiseAll() {
  showOutput("Loading both…");
  try {
    const [userRes, postRes] = await Promise.all([
      fetch(USER_URL),
      fetch(POST_URL),
    ]);
    const [user, post] = await Promise.all([userRes.json(), postRes.json()]);
    const summary = [
      "User: " + user.name + " (" + user.email + ")",
      "Post: " + post.title,
    ].join("\n");
    showOutput(summary);
  } catch (e) {
    showOutput(String(e));
  }
}

// Next: Exercise 6

// =============================================================================
// (Optional) Infinite loop via Promises
// =============================================================================

function promiseLoop() {
  return Promise.resolve().then(() => {
    console.log("tick");
    return promiseLoop();
  });
}
