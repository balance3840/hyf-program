# Session-based authentication (Snippets API)

In this part, you will add **session-based authentication** to the Snippets API and compare it to your JWT-based approach.

We will:

- Configure `express-session`.
- Implement login and logout using sessions.
- Protect at least one Snippets API route with session-based middleware.

## 1. Configure express-session

- Install `express-session` in your project if it is not already installed.
- In your main application file (e.g. `app.js`), add the session middleware with:
  - A `secret` value (for local development you can keep it simple).
  - Reasonable `resave` and `saveUninitialized` settings.

## 2. Implement login with sessions

Create a route (for example in `routes/auth-session.js`) that:

1. Reads `username` and `password` from the request body.
2. Looks up the user and verifies the password using bcrypt (re-using your secure users table).
3. Sets `req.session.userId` when the login is successful.
4. Returns a small success payload (e.g. `{ "message": "Logged in with session" }`).

## 3. Protect routes with session middleware

Create a middleware function (for example `requireSessionAuth`) that:

1. Checks if `req.session.userId` is set.
2. Calls `next()` if it is.
3. Sends a `401` response with a short JSON error if it is not.

Use this middleware to protect at least one Snippets API route (for example, a route that creates or deletes a snippet).

## 4. Implement logout

Add a `/logout-session` route that:

- Destroys the current session (e.g. via `req.session.destroy`).
- Returns a simple JSON response to confirm logout.

## 5. Suggested exercises

- Compare your session-based solution with your JWT-based solution:
  - What changes in the client’s behaviour?
  - How does each solution handle revocation?
  - What would you need to consider when scaling beyond a single server instance?

