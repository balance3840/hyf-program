# Mentors demo – Classes

In-session live coding for **Week 4** (Advanced JavaScript). The page shows a **comment section** twice: first with plain objects (motivation: inconsistent keys, disconnected rendering), then with a **`Comment` class** (constructor, instances, `render()`, `like()`, `hasSwearWord()` and flagged styling). Part 4 walks through **built-in `Error`**, a **`ValidationError extends Error`** example, and a short **Web Components** comparison (comments only — not implemented in the browser). Implement the worksheet during class; the solution file is the finished version.

---

## Files in this folder

| File                  | Purpose                                                                                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **index.js**          | Worksheet: Part 1 runs on load; Parts 2–4 use `// Task:` lines, `// Next: Exercise N` pauses, and `// ==========` section banners. Use this file when leading the session.                             |
| **index-solution.js** | Full implementation: `Comment` with `render` / `like` / `hasSwearWord`, DOM append, `ValidationError` + `try` / `catch`, and the Web Components sketch as comments.                                   |
| **index.html**        | Two sections and containers for plain vs class comments; loads **index.js**. To preview the solution, change the `<script>` `src` to **index-solution.js**.                                             |
| **style.css**         | Layout, comment cards, flagged state (`.comment--flagged`), like button. No edits needed for the default flow.                                                                                          |

---

## Where to find tasks and how they are marked

Everything lives in **index.js**. Search for:

- `// ==========` — section breaks (Part 1–4)
- `// Task:` — what to build next
- `// Next: Exercise N` — pause and send trainees to [Exercises](../exercises.md) (Exercise 1–4)

Part 1 is already implemented so the motivation is visible immediately; Parts 2–4 start from empty stubs / comments.

---

## How the code works

### Main HTML elements (index.html)

- **`#comments-plain`** — Container where Part 1 appends comments built from plain objects (`renderComment`).
- **`#comments-class`** — Container where the class-based comments are appended after trainees implement `Comment` and `render()`.

### Part 1 — Plain objects (worksheet and solution)

- **`comment1` … `comment3`** — Deliberately inconsistent: one uses `userName` instead of `username`, one uses `content` instead of `text`, one omits `likes`. The shared `renderComment` expects `username`, `text`, `likes` — so the UI shows **undefined** in places (discussion hook).
- **`renderComment(comment)`** — Builds one `.comment` card (header, text, like button) and returns the element; does not attach listeners that update the DOM.
- **`likeComment(comment)`** — Increments `likes` only; the UI does not refresh (contrast with the class version).
- **`plainComments`** — Array looped with `.forEach` to fill `#comments-plain`.

### Part 2 — Constructor & instance (solution)

- **`Comment`** — `constructor(username, text)` sets `username`, `text`, `date`, `likes`, `element`.
- **Instances** — e.g. `classComment1`, `classComment2`, `classComment3`; `console.log` for inspection during class.

### Part 3 — Methods (solution)

- **`like()`** — Increments `likes`, calls `render()` so the button count updates.
- **`hasSwearWord()`** — Checks words against a small list; drives CSS class `comment--flagged` when true.
- **`render()`** — Creates or reuses `this.element`, sets `innerHTML`, wires the like button with an arrow function so `this` stays correct.

### Part 4 — Real world (solution)

- **`Error`** — `new Error(...)`, `.message`, `.stack` logged as a reminder that errors are objects from a built-in class.
- **`ValidationError extends Error`** — `super(message)`, `this.name`, `this.field`, `toUserMessage()`, thrown and caught with `instanceof` checks.
- **Web Components** — Only in comments: `extends HTMLElement`, `connectedCallback`, `customElements.define` — same “class + render-ish lifecycle” idea as `Comment`, without running custom elements in this demo.

### Data and demo flow

On load, Part 1 fills **Part 1: Without classes** immediately. **Part 2: With a Comment class** stays empty until `Comment` and `render()` are implemented and instances are appended to `#comments-class` (see **index-solution.js** for the full flow).
