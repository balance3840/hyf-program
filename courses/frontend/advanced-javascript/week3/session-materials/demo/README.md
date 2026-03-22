# Mentors demo – Promises & `async`/`await`

In-session live coding for **Week 3** (Advanced JavaScript). The demo walks through `fetch` with **JSONPlaceholder**, `async`/`await`, consuming promises with `.then()` / `.catch()`, creating promises with `new Promise`, `try` / `catch` with async code, `Promise.all`, and an optional promise microtask loop. You implement the worksheet during class; the solution file is the finished version.

---

## Files in this folder

| File                  | Purpose                                                                                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **index.js**          | Worksheet: section banners, `// Task:` lines, and `// Next:` hints. Only `getUser` and `promiseLoop` are declared; you add the rest while teaching. Use this file when leading the session. |
| **index-solution.js** | Full implementation: `showOutput`, `getUser`, promise consumption, timed and pizza promises, `try` / `catch` fetch, `Promise.all`, and `promiseLoop`.                                       |
| **index.html**        | Minimal page that loads `index.js`. Add markup (e.g. `<pre id="out">`) when you want on-page output; the solution’s `showOutput` writes to `#out`.                                          |
| **style.css**         | Basic layout and styles for `#out` (and `main` if you use it).                                                                                                                              |

---

## Where to find tasks and how they are marked

Everything lives in **index.js**. Search for `// ==========` for section breaks, `// Task:` for what to build, and `// Next:` for suggested links to the trainee exercises.

---

## How the code works

### URLs (JSONPlaceholder)

- **`USER_URL`** – `https://jsonplaceholder.typicode.com/users/1`
- **`POST_URL`** – `https://jsonplaceholder.typicode.com/posts/1`
- **`TODO_URL`** – `https://jsonplaceholder.typicode.com/todos/1` (optional extra)

### Solution-only helpers and functions

- **`showOutput(text)`** – Sets `textContent` on `#out` when that element exists.
- **`getUser()`** – `async` `fetch` of **`USER_URL`**, then `.json()`, then `showOutput` with stringified user data.
- **`loadOneResourceWithThen()`** – Same resource with `.then` / `.catch` only (no `async`/`await`).
- **`oneSecondMessage()`** – Promise that resolves after one second, then shows `"It worked"`.
- **`demoOrderPizza()`** – Delayed resolve or reject, then shows pizza or error text.
- **`getUserWithTryCatch()`** – Same fetch pattern as `getUser` with `try` / `catch` and errors on the page.
- **`demoPromiseAll()`** – Fetches **`USER_URL`** and **`POST_URL`** in parallel, then shows a short two-line summary.
- **`promiseLoop()`** – Schedules endless microtasks (illustration only; can freeze the tab if called).

### Callback hell

Not implemented in these files; use the session plan (e.g. npm `q` or your own example on the board).
