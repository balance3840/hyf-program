# Code inspiration

Snippets aligned with the in-session [demo](./demo/README.md): same `Comment` shape (`username`, `text`), plain-object motivation, `render()` / `like()` / `hasSwearWord()`, then `Error` / `ValidationError` and a Web Components sketch. Use these on the board or as copy-paste shortcuts; the demo files are the full runnable version.

## Motivation (plain objects)

Why classes: repeated object literals are easy to get wrong; rendering and behavior live outside the data.

```js
const comment1 = { username: "alice", text: "Nice!", date: new Date(), likes: 0 };
const comment2 = { userName: "bob", text: "Hi" }; // typo: userName → UI shows undefined
const comment3 = { username: "carol", content: "Oops" }; // wrong key for text

function renderComment(comment) {
  const div = document.createElement("div");
  div.className = "comment";
  div.innerHTML = `
    <p>@${comment.username}</p>
    <p>${comment.text}</p>
    <button>❤️ ${comment.likes}</button>
  `;
  return div;
}

function likeComment(comment) {
  comment.likes++; // data changes, but the button on screen does not update
}
```

## Constructor

```js
class Comment {
  constructor(username, text) {
    this.username = username;
    this.text = text;
    this.date = new Date();
    this.likes = 0;
    this.element = null;
  }
}
```

## Instance

```js
const c1 = new Comment("dave_dev", "Hello!");
const c2 = new Comment("eve_codes", "Second comment");

console.log(c1);
```

## Methods

`render()` keeps DOM in sync with state; `like()` updates and re-renders; `hasSwearWord()` drives a CSS class (e.g. `comment--flagged`) for moderation-style UI.

```js
class Comment {
  constructor(username, text) {
    this.username = username;
    this.text = text;
    this.date = new Date();
    this.likes = 0;
    this.element = null;
  }

  like() {
    this.likes++;
    this.render();
  }

  hasSwearWord() {
    const swearWords = ["crap", "damn", "stupid"];
    const words = this.text.toLowerCase().split(" ");
    return swearWords.some((swear) => words.includes(swear));
  }

  render() {
    if (!this.element) {
      this.element = document.createElement("div");
    }

    this.element.className = this.hasSwearWord()
      ? "comment comment--flagged"
      : "comment";

    this.element.innerHTML = `
      <div class="comment-header">
        <span class="comment-username">@${this.username}</span>
        <span class="comment-date">${this.date.toLocaleDateString()}</span>
      </div>
      <p class="comment-text">${this.text}</p>
      <button class="like-btn">❤️ ${this.likes}</button>
    `;

    this.element
      .querySelector(".like-btn")
      .addEventListener("click", () => this.like());

    return this.element;
  }
}

document.getElementById("comments-class").appendChild(c1.render());
```

## Static methods

A **static method** belongs to the class itself, not to instances. Useful for factory functions (creating instances from raw data) or utility operations.

```js
class Comment {
  constructor(username, text) {
    this.username = username;
    this.text = text;
    this.date = new Date();
    this.likes = 0;
  }

  static fromJSON(data) {
    return new Comment(data.username, data.text);
  }

  // ... render(), like(), etc.
}

// Called on the class, not on an instance:
const apiData = { username: "grace_api", text: "Loaded from JSON!" };
const comment = Comment.fromJSON(apiData);
```

**You already use static methods — `Promise` is a class!**

```js
// Instance methods (called on an instance):
const p = new Promise((resolve) => resolve("done"));
p.then((value) => console.log(value));
p.catch((err) => console.log(err));

// Static methods (called on the class itself):
Promise.resolve("instant value");
Promise.all([fetch("/a"), fetch("/b")]);
Promise.race([fetch("/a"), fetch("/b")]);
```

## (Optional) Extending built-ins: Error and Web Components

`Error` is a built-in class; custom errors use `extends` and `super()` like any other subclass. Web Components apply the same “class + lifecycle + HTML” idea to the platform.

```js
const err = new Error("something went wrong");
console.log(err.message);
console.log(err.stack);

class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }

  toUserMessage() {
    return `❌ ${this.field}: ${this.message}`;
  }
}

try {
  throw new ValidationError("username", "Cannot be empty");
} catch (error) {
  console.log(error.toUserMessage());
  console.log(error instanceof ValidationError);
  console.log(error instanceof Error);
}

// Web Components — same pattern, browser APIs (not required to run in the demo):
//
// class CommentElement extends HTMLElement {
//   connectedCallback() {
//     this.innerHTML = `<div class="comment">...</div>`;
//   }
// }
// customElements.define("my-comment", CommentElement);
// <my-comment></my-comment>
```
