# Session Plan

## Session Materials

- [Demo](./session-materials/demo/) – In-session live coding: plain-object motivation, `Comment` class, methods, flagged comments, then Errors / Web Components as “real world” context. **index.js** = worksheet; **index-solution.js** = reference. [README](./session-materials/demo/README.md).

## Session Outline

<!-- Write a plan for the order of topics, points to cover, examples, timings, exercises and any other useful info to guide the session. -->

Start VERY simple. Just a class that has few fields, no methods. Explain the diff from object to class. Explain instance etc. When they get that move on to class methods. **Only teach extends if they really are on top of things** otherwise just get them comfortable with classes :) if you can repeat a bit of promise, maybe when working with class that would be great.

- Constructor
  - [Code inspiration](./session-materials/code-inspiration.md#constructor)
  - [Exercise](./session-materials/exercises.md#1-create-a-user-class)
- Instance
  - [Code inspiration](./session-materials/code-inspiration.md#instance)
  - [Exercise](./session-materials/exercises.md#2-create-an-instance-of-the-class)
- Methods (instance + static)
  - [Code inspiration](./session-materials/code-inspiration.md#methods)
  - [Code inspiration — static methods](./session-materials/code-inspiration.md#static-methods) (Promise as "you already use this")
  - [Exercise](./session-materials/exercises.md#3-methods-on-user-getfullname-and-render)
- `this`
  - Refers to the instance of the class. Do go into too much detail and edge cases. Avoid mentioning `bind`, `apply`, etc unless you find it super important, the trainees will just forget it anyway!
- [Exercise](./session-materials/exercises.md#4-creating-a-cv-class)
- Extend (Only if time!)
  - [Code inspiration](./session-materials/code-inspiration.md#extending-built-ins-error-and-web-components) (`Error`, `ValidationError`, Web Components sketch — matches demo Part 4)

## Exercises

See the separate [Exercises](./session-materials/exercises.md) document.

## Code inspiration

See the separate [Code inspiration](./session-materials/code-inspiration.md) document.
