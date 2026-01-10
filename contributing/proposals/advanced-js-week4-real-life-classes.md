# 📘 Proposal: Update Advanced JavaScript Week 4 with “Real-life” Class Use Cases

## Context

The current **Advanced JavaScript (Frontend) – Week 4** is titled **“Classes & Advanced Promises”** and teaches class fundamentals (constructor/instances/methods/`this`, optionally `extends`). The assignment for the week is a **screenshot generator app** that combines two APIs (RapidAPI + CrudCrud), but it does not naturally require classes, inheritance, or class-related patterns.

This proposal suggests updating Week 4 to include a **close-to-real-life** class example, so trainees can see _why_ classes exist beyond “Person/User” style examples.

## Goals

- Make Week 4 feel **practical and motivating**, by using class patterns trainees can encounter in real projects.
- Keep the session **beginner-friendly**: focus on a small surface area of the feature, not completeness.
- Preserve the module’s existing flow: Week 1–3 builds up arrays → async → promises, and Week 4 ties it together.
- Improve the assignment so class usage is **structural**, not “classes for the sake of classes”.

## Non-goals

- Full “OOP course” (design patterns, UML, etc.).
- Deep browser APIs or framework abstractions.
- Advanced inheritance hierarchies.

## Common approach (applies to both options)

### 1) Teach classes as a concept first, then show “the real example”

Both proposed examples involve **extending an existing class** (`HTMLElement` or `Error`). So the session should:

- Start with the basics: `class`, `constructor`, `this`, methods, instances.
- Only then introduce inheritance: `extends`, `super()`.

### 2) Use Promises as the bridge (and as “classes you already use”)

Promises are already known from Week 3. They are also an excellent “classes are everywhere” bridge:

- A Promise is **an object instance** created by a **class** (`Promise`).
- You can “feel” class features without introducing new domain complexity:
  - `new Promise(...)` (constructor + `new`)
  - `Promise.resolve`, `Promise.reject`, `Promise.all`, `Promise.any`, `Promise.race`, `Promise.allSettled` (**static methods**)
  - instance methods like `.then`, `.catch`, `.finally`

Suggested narrative:

> “You’ve been creating promises with "new" before: they’re instances of a class. Let’s make the mental model explicit, and then look at another place in JavaScript where classes show up in real applications.”

This can also neatly “close” the async chapter while introducing classes.

---

## Option A — Web Components (Custom Elements)

### Web Components — Summary

Introduce classes via **Web Components**: `class MyElement extends HTMLElement { ... }`, registered with `customElements.define`.

The scope stays intentionally small:

- `render()` method
- one async method for loading data (e.g. `load()`)
- minimal lifecycle: `connectedCallback()`

### Web Components — Why this fits Week 4

- **Real-life class usage**: many modern codebases build component-like abstractions; Web Components are the platform-native version.
- **Connects to next module**: the “component” mental model shows up immediately in React week 1; moving some of that concept earlier can reduce cognitive load later.
- Integrates async naturally: components often fetch data on mount/init.

### Web Components — Risks / concerns (and mitigations)

- **Can get complicated fast** (attributes, observedAttributes, Shadow DOM, styling, slots).
  - Mitigation: explicitly **avoid** Shadow DOM and observedAttributes; focus on “class extends HTMLElement + render + event listeners + async load”.
- **Frontend-specific**: not a great reusable example for backend track.
  - Mitigation: keep Week 4 “core classes” examples shared, but only the “real-life example” changes per track (frontend uses Web Components; backend uses Errors, or a small service/client class).

### Web Components — How to tweak the current Week 4 assignment (screenshot generator)

Keep the product idea and APIs, but restructure the solution around small custom elements:

- **`<screenshot-form>`**
  - Owns input + submit button
  - Validates the URL, emits an event like `screenshot:request`
- **`<screenshot-preview>`**
  - Receives a screenshot URL to display
  - Shows loading state while fetching screenshot
- **`<saved-screenshots>`**
  - Loads saved screenshots from CrudCrud on `connectedCallback()`
  - Renders list + delete buttons

Minimum requirement: implement **at least 2 custom elements**, each with:

- a class extending `HTMLElement`
- `connectedCallback()`
- a `render()` method
- one async method that uses `fetch`

Optional: add a small `ScreenshotService` class (not extending anything) to separate API concerns, so trainees also see “plain classes”.

---

## Option B — Errors (Custom Error Classes)

### Errors — Summary

Introduce classes via **custom error types**:

- `class ApiError extends Error { ... }`
- `class ValidationError extends Error { ... }`
- optionally `class AuthError extends Error { ... }`

This is a highly reusable topic across frontend and backend, and it helps trainees write clearer, more debuggable code.

### Errors — Why this fits Week 4

- **Real-life class usage**: many codebases define domain errors and handle them centrally.
- Works in both environments: browser and Node.
- Naturally introduces inheritance without needing new platform APIs.

### Errors — Risks / concerns (and mitigations)

- **Default examples can feel “too small”** (just add fields).
  - Mitigation: design the exercise to include at least one method and one static factory:
    - method: `toUserMessage()` or `toHtml()` (frontend)
    - static: `ApiError.fromResponse(response)` to parse failure cases consistently
- Danger of becoming too theoretical.
  - Mitigation: tie directly to the assignment’s real failure modes (invalid URL, network error, 4xx/5xx from APIs, missing API key, CrudCrud not found, etc.).

### Errors — How to tweak the current Week 4 assignment (screenshot generator)

Keep the same assignment concept, but add explicit “error architecture” requirements:

- Create a base class `AppError extends Error` with fields like:
  - `code` (string)
  - `status` (optional number)
  - `cause` (optional Error)
- Create at least 2 subclasses:
  - `ValidationError` for invalid URL input
  - `ApiError` for HTTP failures (RapidAPI / CrudCrud)
- Add at least:
  - **one instance method**: `toUserMessage()` returning a friendly string for UI
  - **one static factory**: `ApiError.fromResponse(response, bodyText)` (or similar)
- Centralize error handling in one place (e.g. `handleError(err)`), so trainees practice:
  - `throw` / `try...catch`
  - checking error types with `instanceof`
  - showing a user-friendly message and logging a developer message
