// =============================================================================
// PART 1 — MOTIVATION: Comment section with plain objects
// =============================================================================

const comment1 = {
  username: "alice_dev",
  text: "Great post! Really enjoyed reading this.",
  date: new Date("2025-03-15"),
  likes: 3,
};
const comment2 = {
  userName: "bob_codes",
  text: "Thanks for sharing, very helpful!",
  date: new Date("2025-03-16"),
  likes: 1,
};
const comment3 = {
  username: "carol_js",
  content: "I have a question about the third paragraph.",
  date: new Date("2025-03-17"),
};

const plainComments = [comment1, comment2, comment3];

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
// It should also initialize: date = new Date(), likes = 0, element = null

// Task: Create at least 3 instances using `new` and log them

// Next: Exercise 1
// Next: Exercise 2

// =============================================================================
// PART 3 — METHODS
// =============================================================================
// Task: Add a render() method that creates and returns a DOM element for the comment

// Task: Add a like() method that increments likes and re-renders

// Task: Add a hasSwearWord() method that checks the text against a list of banned words
// If true, render() should add a "comment--flagged" CSS class to highlight the comment

// Task: Add a static method Comment.fromJSON(data) that takes a plain object
// (e.g. from an API response) and returns a new Comment instance

// --- You already use static methods! ---
// Promise is a class. You've been using its static methods since Week 3:
//   new Promise(...)          — constructor (creates an instance)
//   promise.then()            — instance method (called on an instance)
//   promise.catch()           — instance method
//   Promise.all([...])        — static method (called on the class itself)
//   Promise.resolve("hello")  — static method
//   Promise.race([...])       — static method

// Task: Display the class-based comments on the page (make sure at least one has a swear word!)
// const classContainer = document.getElementById("comments-class");

// Next: Exercise 3

// =============================================================================
// PART 4 — CLASSES IN THE REAL WORLD
// =============================================================================

// --- Errors are classes! ---
// Error is a built-in class. You already use it:
// const err = new Error("something went wrong");
// console.log(err.message); // constructor set this
// console.log(err.stack);   // built-in method/property

// Task: Create a ValidationError class that extends Error
// - constructor accepts (field, message), calls super(message), sets this.name and this.field
// - add a toUserMessage() method that returns a user-friendly string

// Task: Try throwing and catching it — use instanceof to check the error type

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
