// Week 3 demo – Promises & async/await (worksheet for class)

// JSONPlaceholder only (reliable in the browser). Session plan may mention Open Notify —
// same async ideas, different URL.
const USER_URL = "https://jsonplaceholder.typicode.com/users/1";
const POST_URL = "https://jsonplaceholder.typicode.com/posts/1";
const TODO_URL = "https://jsonplaceholder.typicode.com/todos/1";

// =============================================================================
// Async/await – simple usage
// =============================================================================
// Task: Load USER_URL with async/await

async function getUser() {}

// Next: Exercise 1

// =============================================================================
// Why use Promises? :: Callback Hell
// =============================================================================
// Show Callback Hell example in https://www.npmjs.com/package/q

// =============================================================================
// Promise consumption
// =============================================================================
// Task: Load one of the resources (e.g. USER_URL); show success or error on the page using .then / .catch only.

// Next: Chaining examples
// Next: Exercise 2

// =============================================================================
// Promise creation
// =============================================================================
// Task: Create a Promise that resolves after 1 second and shows "It worked" on the page.
// Task: Create demoOrderPizza: a pizza-order Promise — after a 'baking' delay it either resolves with a pizza you can eat (show that on the page) or rejects if baking failed (show the failure on the page).

// Next: Exercise 3
// Next: Exercise 4

// =============================================================================
// Back to async/await (try / catch)
// =============================================================================
// Task: improve getUser to use try/catch to handle errors and show the error on the page.

// Next: Exercise 5

// =============================================================================
// Promise.all
// =============================================================================

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
