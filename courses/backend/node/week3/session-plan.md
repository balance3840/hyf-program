# Session plan

## Session outline

- Secure passwords & basic login using the Snippets API (≈40 min)
- Stateless auth with JWT on the Snippets API (≈40 min)
- Session-based auth on the Snippets API (≈40 min)
- Comparison of auth methods, brief look at DB tokens & API keys, and wrap-up (≈30–35 min)

## Secure passwords & basic login (Snippets API)

**Goal**: Implement secure password storage and a basic login flow for the Snippets API using bcrypt.

### Lecture & live coding (≈10 min)

- Concept: why plaintext passwords are insecure.
- Introduce hashing and salting with bcrypt.
- Show how a minimal `users` table for the Snippets DB might look.
- Walk through the happy path for `/login`:
  - Look up user by username/email.
  - Compare plaintext password with stored hash using bcrypt.

### Implementation (live coding)

- Sketch the table and login route, using the example in  
  [module-materials/examples/auth-login-bcrypt.js](../../module-materials/examples/auth-login-bcrypt.js).

_See [Secure passwords and basic login](./session-materials/10-auth-db-credentials.md) for a more detailed walkthrough._

### Exercise (15–20 min)

- Add a `users` table to the Snippets DB and seed at least one user with a hashed password.
- Implement `/login` using bcrypt in your own copy of the Snippets API.
- Use Postman to test successful and failing login attempts.

### Do it together (5–10 min)

- TODO: show how to break this
- Discuss common mistakes (e.g. sending too much error detail, forgetting to hash passwords).

---

## Stateless auth with JWT

**Goal**: Learn stateless auth with JWT on top of the secure login flow, and protect key Snippets API endpoints.

### Lecture & live coding (≈10 min)

- Concept: self-contained tokens with claims; no DB lookup needed per request.
- Trade-offs: fast and scalable, but harder to revoke.
- Show the high-level flow:
  - After successful bcrypt-based login, issue a JWT.
  - Client includes the token in the `Authorization` header.
  - Middleware verifies the token and attaches user info to `req.user`.

### Implementation (live coding)

- Use the JWT login and middleware flow from  
  [module-materials/examples/auth-jwt.js](../../module-materials/examples/auth-jwt.js) as a reference while coding in the Snippets API.

_See [Stateless authentication with JWT](./session-materials/12-auth-jwt.md) for detailed steps and examples._

### Exercise (15–20 min)

- Protect at least two Snippets API endpoints (e.g. `POST /api/snippets`, `DELETE /api/snippets/:id`) using JWT middleware.
- Add token expiration and handle expired tokens gracefully in responses.
- Try to tamper with the token payload and see what happens.

### Do it together (5–10 min)

- Run through a full Postman flow together.
- Discuss where to store JWTs on the client (headers vs cookies) in different types of apps.

---

## Session-based authentication

**Goal**: Implement session-based authentication using cookies and compare it to JWT for the Snippets API.

### Lecture & live coding (≈10 min)

- Concept: server-side sessions, session IDs in cookies, and typical use cases.
- Contrast with JWT: stateful vs stateless, revocation, and infrastructure needs.

### Implementation (live coding)

- Use the session-based login and middleware flow from  
  [module-materials/examples/auth-sessions.js](../../module-materials/examples/auth-sessions.js) as a reference while integrating sessions into the Snippets API.

_See [Session-based authentication](./session-materials/13-auth-sessions.md) for detailed guidance._

### Exercise (15–20 min)

- Protect at least one Snippets API route using session-based middleware.
- Implement logout and verify that access is denied after logging out.

### Do it together (5–10 min)

- Compare the experience of working with sessions vs JWT.
- Discuss scaling concerns (sticky sessions, shared stores) at a high level.

---

## Comparison, DB tokens & API keys overview, and wrap-up

**Goal**: Compare the different auth approaches, introduce DB-stored tokens and API keys conceptually, and connect to the assignment.

### Short lecture & discussion (10–15 min)

- Revisit the methods you have seen:
  - Secure passwords (with bcrypt) and basic login.
  - JWT-based stateless auth.
  - Session-based auth.
- Introduce **database-stored tokens**:
  - Tokens stored in a `tokens` table, lookup on each request.
  - Easier revocation, but requires a DB call every time.
- Introduce **API keys**:
  - Simple secret keys for machine-to-machine communication.
  - Not ideal as the only method for user authentication.
- Show a comparison table summarising trade-offs:

| Method             | DB Lookup | Revocable | Scalable | Typical use case        |
| ------------------ | --------- | --------- | -------- | ----------------------- |
| Secure credentials | Yes       | No        | No       | Legacy / simple systems |
| Database tokens    | Yes       | Yes       | No       | Small apps              |
| JWT                | No        | Not easy  | Yes      | SPAs, mobile apps       |
| Sessions           | Yes       | Yes       | Depends  | Traditional web apps    |
| API keys           | No        | Not easy  | Yes      | Machine-to-machine      |

_See [Database-stored tokens](./session-materials/11-auth-db-tokens.md) and [API keys](./session-materials/14-auth-api-keys.md) for additional details and examples._

## Comparing auth methods

Review the methods from this week:

- Secure credentials (hashed passwords + login).
- Database-stored tokens.
- JWT.
- Sessions.
- API keys.

Discuss trade-offs in terms of:

- Performance (DB lookups vs stateless verification).
- Revocation.
- Complexity on the client and server.
- Fit for different scenarios (SPAs, mobile apps, internal tools, service-to-service communication).

### Final wrap-up

- Reiterate best practices:
  - Always use HTTPS. //TODO: WHY and how it's connected
  - Always hash passwords (bcrypt or similar).
  - Store tokens securely (e.g. HttpOnly cookies for web clients).
  - Prefer short-lived tokens and consider refresh tokens where appropriate.
