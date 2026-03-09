# Secure passwords and basic login (Snippets API)

In this part of the session, you will add **secure password storage** and a **basic login endpoint** to the Snippets API.

We will:

- Hash passwords using `bcrypt`.
- Implement a `/login` endpoint that validates a user’s credentials.

## 1. Database: users table

We can use already existing `users` table. Username can be user `email`, while password hash can be stored in the `token` column.

Update at least one user with a hashed password (for example a small Node program that calls `bcrypt.hash` and update the row).

## 2. Install bcrypt

Install `bcrypt` in the Snippets API project and import it in your auth route module.

## 3. Implement /login

Create a route (for example in `routes/auth.js`) that:

1. Reads `username` and `password` from the request body.
2. Looks up the user by username in the database.
3. Uses `bcrypt.compare` to compare the provided password with the stored `password_hash`.
4. Returns:
   - `401 Unauthorized` with a generic error message on failure.
   - `200 OK` (or `201`) with a small success payload on success.

You do **not** need to generate tokens here yet – this is just about secure credential checking.

## 4. Suggested exercises

- Add at least one extra user to the database and test logging in as both.
- Think about:
  - What error messages you send back (security vs usability).
