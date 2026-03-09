# Stateless authentication with JWT (Snippets API)

In this part, you will add **JWT-based authentication** to the Snippets API on top of the secure `/login` flow you built earlier.

We will:

- Issue a JWT after a successful login.
- Validate the JWT on protected routes.
- Use it to guard important Snippets API endpoints.

> **Conceptual note:** a JWT is just a signed JSON object. It usually contains a user identifier (for example `userId`), but it does not *have* to be tied to a user – it’s up to you what claims you put inside. The server uses a shared secret (`JWT_SECRET`) to sign and later verify that the token is genuine and has not expired.

## 1. Install and configure jsonwebtoken

- Install the `jsonwebtoken` package in your Snippets API project.
- Decide on a `JWT_SECRET` value (for local development you can use an environment variable or a hardcoded string). In production, **clients must never know this secret** – only the server should be able to issue valid tokens.

## 2. Extend /login to issue a JWT

Re-use your secure `/login` route:

1. After verifying the password with bcrypt, generate a JWT with a payload like `{ userId: user.id }`:
   - This “binds” the token to that user account.
   - You can also include other claims if needed (for example roles or scopes).
2. Set a reasonable expiration time (for example 1 hour) using `expiresIn`. After this time, `jwt.verify` will treat the token as expired.
3. Return the token in the JSON response (for example `{ "token": "<jwt-here>" }`).

In Postman or a frontend app, you typically **store the token on the client** and then send it on each request in an `Authorization: Bearer <token>` header.

## 3. Create JWT auth middleware

Create a middleware function (for example in `middleware/auth-jwt.js`) that:

1. Reads the `Authorization` header, expecting `Bearer <token>`.
2. Uses `jwt.verify(token, JWT_SECRET)` to:
   - Check that the token was signed with your secret.
   - Check that it has not expired (`exp` claim).
3. Attaches the decoded user information to `req.user` (for example `req.user = { id: decoded.userId }`).
4. Sends a `401` response if the token is missing, invalid, or expired.

## 4. Protect Snippets API endpoints

Choose at least two endpoints in your Snippets API (for example):

- `POST /api/snippets`
- `DELETE /api/snippets/:id`

Wrap these handlers with your JWT auth middleware so that:

- Requests without a valid token are rejected with `401` and a suitable JSON error.
- Requests with a valid token are allowed to proceed.

## 5. Expiration, revocation and real-world flow (conceptual)

For this session, it is enough to have a **single short-lived JWT** that the client includes on each request:

- When the token is valid and not expired, protected routes work as normal.
- When the token has expired, your middleware returns `401` and the client can prompt the user to log in again to obtain a new token.

Out in the real world, applications often add extra layers:

- **Refresh tokens:** a short-lived JWT (access token) plus a longer-lived refresh token that can be used to get a new access token without asking the user to log in again immediately.
- **Revocation / logout:** because JWTs are stateless, revoking them early usually means keeping some server-side state (for example a list of revoked token IDs or “logout timestamps” per user) and checking that state inside your JWT middleware.

These are useful extensions to think about, but for this session you can focus on the basic, stateless flow described above.
