# Stateless authentication with JWT (Snippets API)

In this part, you will add **JWT-based authentication** to the Snippets API on top of the secure `/login` flow you built earlier.

We will:

- Issue a JWT after a successful login.
- Validate the JWT on protected routes.
- Use it to guard important Snippets API endpoints.

## 1. Install and configure jsonwebtoken

- Install the `jsonwebtoken` package in your Snippets API project.
- Decide on a `JWT_SECRET` value (for local development you can use an environment variable or a hardcoded string).

## 2. Extend /login to issue a JWT

Re-use your secure `/login` route:

- After verifying the password with bcrypt, generate a JWT with a payload like `{ userId: user.id }`.
- Set a reasonable expiration time (for example 1 hour).
- Return the token in the JSON response.

## 3. Create JWT auth middleware

Create a middleware function (for example in `middleware/auth-jwt.js`) that:

1. Reads the `Authorization` header (`Bearer <token>`).
2. Verifies the token using `jwt.verify`.
3. Attaches the decoded user information to `req.user`.
4. Sends a `401` response if the token is missing, invalid, or expired.

## 4. Protect Snippets API endpoints

Choose at least two endpoints in your Snippets API (for example):

- `POST /api/snippets`
- `DELETE /api/snippets/:id`

Wrap these handlers with your JWT auth middleware so that:

- Requests without a valid token are rejected with `401` and a suitable JSON error.
- Requests with a valid token are allowed to proceed.

## 5. Suggested exercises

- Experiment with different expiration times and observe what happens when a token expires.
- Try to tamper with the token (e.g. change the payload in Postman) and see how your middleware responds.
- Add some basic logging around authentication failures (but make sure not to log secrets or full tokens).

