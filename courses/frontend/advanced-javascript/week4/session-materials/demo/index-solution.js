// =============================================================================
// PART 1 — MOTIVATION: Comment section with plain objects
// =============================================================================

// Each comment is a plain object — we repeat the same shape every time.
// Nothing stops us from misspelling keys or forgetting fields.
const comment1 = {
  username: "alice_dev",
  text: "Great post! Really enjoyed reading this.",
  date: new Date("2025-03-15"),
  likes: 3,
};
const comment2 = {
  userName: "bob_codes", // "userName" instead of "username" — no error, just undefined on screen!
  text: "Thanks for sharing, very helpful!",
  date: new Date("2025-03-16"),
  likes: 1,
};
const comment3 = {
  username: "carol_js",
  content: "I have a question about the third paragraph.", // "content" instead of "text" — renders as undefined!
  date: new Date("2025-03-17"),
  // likes is missing entirely — renders as undefined!
};

const plainComments = [comment1, comment2, comment3];

// Rendering is a separate function — it has to "know" the object shape.
// If we change the shape, we have to find and update this function too.
function renderComment(comment) {
  const div = document.createElement("div");
  div.className = "comment";
  div.innerHTML = `
    <div class="comment-header">
      <span class="comment-username">@${comment.username}</span>
      <span class="comment-date">${comment.date.toLocaleDateString()}</span>
    </div>
    <p class="comment-text">${comment.text}</p>
    <button class="like-btn">❤️ ${comment.likes}</button>
  `;
  return div;
}

// This function updates the data, but the UI doesn't change!
// We'd need to re-render manually — and find the right DOM element somehow.
function likeComment(comment) {
  comment.likes++;
}

const plainContainer = document.getElementById("comments-plain");
plainComments.forEach(function (comment) {
  plainContainer.appendChild(renderComment(comment));
});

// =============================================================================
// PART 2 — CONSTRUCTOR & INSTANCE
// =============================================================================
// Task: Create a Comment class with constructor(username, text)
// Task: Create at least 3 instances using `new` and log them

class Comment {
  constructor(username, text) {
    this.username = username;
    this.text = text;
    this.date = new Date();
    this.likes = 0;
    this.element = null;
  }

  // ———— Part 3 methods below ————

  // Static method: called on the class itself, not on an instance.
  // Useful for creating instances from raw data (e.g. API responses).
  static fromJSON(data) {
    return new Comment(data.username, data.text);
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

  // Data, behavior, and rendering live together in one place.
  // Calling render() again after like() updates the UI automatically.
  // hasSwearWord() drives visual highlighting — behavior tied to rendering.
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

const classComment1 = new Comment("dave_dev", "This is so much cleaner with classes!");
const classComment2 = new Comment("eve_codes", "This is damn cool, I love the render pattern.");
const classComment3 = new Comment("frank_js", "Classes make the code easier to maintain.");

console.log(classComment1);
console.log(classComment2);
console.log(classComment3);

// Next: Exercise 1
// Next: Exercise 2

// =============================================================================
// PART 3 — METHODS
// =============================================================================
// Task: Add a render() method that creates and returns a DOM element
// Task: Add a like() method that increments likes and re-renders
// Task: Add a hasSwearWord() method — render() uses it to flag comments visually
// Task: Add a static method Comment.fromJSON(data) — factory from plain objects
// Task: Display the class-based comments on the page

const classContainer = document.getElementById("comments-class");
classContainer.appendChild(classComment1.render());
classContainer.appendChild(classComment2.render());
classContainer.appendChild(classComment3.render());

// Static method in action: imagine this data came from an API
const apiResponse = { username: "grace_api", text: "I was loaded from JSON!" };
const classComment4 = Comment.fromJSON(apiResponse);
classContainer.appendChild(classComment4.render());

// --- You already use static methods! ---
// Promise is a class. You've been using its static methods since Week 3:
//   new Promise(...)          — constructor (creates an instance)
//   promise.then()            — instance method (called on an instance)
//   promise.catch()           — instance method
//   Promise.all([...])        — static method (called on the class itself)
//   Promise.resolve("hello")  — static method
//   Promise.race([...])       — static method

// Next: Exercise 3

// =============================================================================
// PART 4 — CLASSES IN THE REAL WORLD
// =============================================================================

// --- Errors are classes! ---
// Error is a built-in class. You already use it:
const err = new Error("something went wrong");
console.log(err.message); // "something went wrong" — set by the constructor
console.log(err.stack); // full stack trace — a built-in property

// You can extend it to build a whole error-handling system.
// This is extremely common in real codebases — frontend and backend.
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
  console.log(error.toUserMessage()); // "❌ username: Cannot be empty"
  console.log(error instanceof ValidationError); // true
  console.log(error instanceof Error); // true — inheritance!
}

// --- Web Components use this exact pattern ---
// What we built (Comment class with render()) is very close to how Web Components work:
//
//   class CommentElement extends HTMLElement {
//     connectedCallback() {
//       // called when the element appears on the page — similar to our render()
//       this.innerHTML = `<div class="comment">...</div>`;
//     }
//   }
//   customElements.define("my-comment", CommentElement);
//
//   // Then in HTML: <my-comment username="alice" text="Hello!"></my-comment>
//
// Same ideas: a class, extends a built-in, has lifecycle methods, renders HTML.
// Frameworks like React, Lit, and Angular all build on this mental model.

// Next: Exercise 4
