# Promise chaining – what is logged?

Use these in class: show the code, ask “What will appear in the console, and in what order?”, then run it and compare.

---

## Task 1 — basic: sync vs `.then`

```js
console.log("A");

Promise.resolve().then(() => {
  console.log("B");
});

console.log("C");
```

<details>
<summary>Answer</summary>

Order: A, C, B

Synchronous code runs first (A, then C). Callbacks passed to `.then` are scheduled as microtasks and run after the current script finishes, so B appears last.

</details>

---

## Task 2 — values through the chain

```js
Promise.resolve(1)
  .then((x) => {
    console.log(x);
    return x + 1;
  })
  .then((y) => {
    console.log(y);
  });
```

<details>
<summary>Answer</summary>

Logs: `1` then `2`

Each `.then` receives the value returned by the previous handler. Returning a plain value wraps it in a resolved promise for the next step.

</details>

---

## Task 3 — returning a Promise (flattening)

```js
Promise.resolve("go")
  .then((s) => {
    console.log("a:", s);
    return Promise.resolve("step");
  })
  .then((t) => {
    console.log("b:", t);
  });
```

<details>
<summary>Answer</summary>

Logs: `a: go` then `b: step`

When a handler returns a Promise, the chain waits for it and passes its settled value to the next `.then` (the inner Promise is “flattened”).

</details>

---

## Task 4 — rejection, skipped handlers, `.catch`, recovery

```js
Promise.resolve()
  .then(() => {
    console.log("1");
    throw new Error("oops");
  })
  .then(() => {
    console.log("2");
  })
  .catch(() => {
    console.log("3");
  })
  .then(() => {
    console.log("4");
  });
```

<details>
<summary>Answer</summary>

Logs: `1`, `3`, `4`

The error skips the next `.then` (so `2` never runs). `.catch` handles the rejection; a successful `catch` returns a fulfilled promise, so the following `.then` still runs (`4`).

</details>

---

## Task 5 — multiple `.catch` and `.then` in one chain

```js
Promise.resolve()
  .then(() => {
    console.log("1");
    throw "first-error";
  })
  .catch((err) => {
    console.log("catch-A", err);
    return "recovered";
  })
  .then((value) => {
    console.log("2", value);
    throw "second-error";
  })
  .catch((err) => {
    console.log("catch-B", err);
  })
  .then(() => {
    console.log("3");
  });
```

<details>
<summary>Answer</summary>

Logs: `1`, `catch-A first-error`, `2 recovered`, `catch-B second-error`, `3`

The first `throw` is handled by `catch-A`, which returns `"recovered"`, so the chain continues fulfilled and `2` runs with that value. The next `throw` is handled by `catch-B`; a successful `catch` still yields a fulfilled promise, so the final `.then` runs (`3`). The second `.catch` never sees `first-error` because `catch-A` already handled it.

</details>
