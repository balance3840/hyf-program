# Database-stored tokens (concept and extension)

In this part, you will explore **database-stored tokens** as another way of implementing authentication in the Snippets API.

This is mainly for **conceptual understanding in class** and for **extension work in the assignment**.

We will:

- Introduce a `tokens` table.
- Issue random tokens on login.
- Validate tokens on each request.

## 1. Database: tokens table

Add a `tokens` table to the Snippets database, for example with columns:

- `id` (primary key)
- `user_id` (foreign key to `users.id`)
- `token` (string, unique)
- `created_at` (timestamp)
- `expires_at` (timestamp, optional)

## 2. Issue a token on login

Extend login (or create a separate `/login-token` route) so that:

1. You first verify the username and password using your secure logic.
2. Generate a random token value (for example using `crypto.randomBytes`).
3. Insert a new row into the `tokens` table with the user ID and token.
4. Return the token to the client (e.g. `{ "token": "<value>" }`).

## 3. Token auth middleware

Create middleware (e.g. `requireTokenAuth`) that:

1. Reads the `Authorization` header, expecting something like `Bearer <token>`.
2. Looks up the token in the `tokens` table.
3. (Optionally) checks for expiration.
4. Attaches the corresponding user to `req.user`, or returns `401` if the token is not valid.

## 4. Suggested exercises

- Protect one or more Snippets API endpoints with your token-based middleware.
- Implement a `/logout-token` endpoint that deletes the token from the database.
- Consider:
  - How many concurrent tokens you allow per user.
  - How you might clean up old or expired tokens.

You will build on this concept further in the assignment.
