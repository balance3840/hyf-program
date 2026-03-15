# Console order – what runs first?

Use these in class: show the code, ask “In what order will we see the output in the console?”, then run it and compare.

---

## Task 1

```js
console.log("A");

setTimeout(function () {
  console.log("B");
}, 0);

console.log("C");
```

<details>
<summary>Answer</summary>

**A, C, B**

Sync code runs first (A, then C). The callback for `setTimeout(..., 0)` goes to the task queue and runs after the current script and the event loop picks it up, so B appears last.

</details>

---

## Task 2

```js
console.log("1");

setTimeout(function () {
  console.log("2");
}, 1000);

setTimeout(function () {
  console.log("3");
}, 0);

console.log("4");
```

<details>
<summary>Answer</summary>

**1, 4, 3, 2**

Sync first: 1, 4. Then the event loop runs callbacks: the 0 ms timer fires first (3), then after ~1 s the second timer fires (2).

</details>

---

## Task 3

```js
console.log("start");

setTimeout(function () {
  console.log("timeout");
}, 0);

for (let i = 0; i < 3; i++) {
  console.log("loop " + i);
}

console.log("end");
```

<details>
<summary>Answer</summary>

**start, loop 0, loop 1, loop 2, end, timeout**

All sync code (including the for loop) runs to completion first. The setTimeout callback runs only after the call stack is empty, so "timeout" appears last.

</details>

---

## Task 4

```js
console.log("X");

setTimeout(function () {
  setTimeout(function () {
    console.log("Z");
  }, 0);

  console.log("Y");
}, 100);

console.log("W");
```

<details>
<summary>Answer</summary>

**X, W, Y, Z**

Sync: X, W. After ~100 ms the outer callback runs (Y), then it schedules the inner setTimeout; that callback (Z) runs on the next tick of the event loop.

</details>
