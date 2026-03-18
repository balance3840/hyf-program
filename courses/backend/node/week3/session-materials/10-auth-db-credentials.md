# Secure passwords and basic login (Snippets API)

In this part of the session, you will add **secure password storage** and a **basic login endpoint** to the Snippets API.

We will:

- Implement a `/login` endpoint that validates a user’s credentials.
- Demonstrate why insecure passwords are a security issue
- Hash passwords using `bcrypt`.

## 1. Database: users table

We can use already existing `users` table. Username can be user `email`, while password can be stored in the `token` column.

## 2. Implement /login

Create a route (for example in `routes/auth.js`) that:

1. Reads `username` and `password` from the request body.
2. Looks up the user by username in the database.

## 3. Demonstrate security issue with the password in plain

In the implemented solution, or, using the module examples - demonstrate how fast insecure password could be cracked.
You can download any of the suitable [password list](https://github.com/danielmiessler/SecLists/tree/master/Passwords/Leaked-Databases) (suggested rockyou-50.txt) and execute

`node auth-sessions-brute-force.js user_name /path/to/your/wordlist`

## 4. Install bcrypt

Install `bcrypt` in the Snippets API project and import it in your auth route module.
Update at least one user with a hashed password (for example a small Node program that calls `bcrypt.hash` and update the row).

## 5. Update implementation with bicrypt

1. Modify the login functionality
2. Use `bcrypt.compare` to compare the provided password with the stored `password_hash`.
4. Returns:
   - `401 Unauthorized` with a generic error message on failure.
   - `200 OK` (or `201`) with a small success payload on success.

You do **not** need to generate tokens here yet – this is just about secure credential checking.

## 6. Hash cracking introduction

If using MD5 hashing algorythm, it is great to demonstrate that even hashed, if password is weak - it could be easily cracked
Take the created password hash (considering that it was a simple password like qwerty123, password123 etc) and paste it [here](https://crackstation.net/)

## 7. Suggested exercises

- Add at least one extra user to the database and test logging in as both.
- Think about:
  - What error messages you send back (security vs usability).
