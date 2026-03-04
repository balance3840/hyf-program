# Session plan

## Session outline

- Secure passwords & basic login using the Snippets API (≈40 min)
- Stateless auth with JWT on the Snippets API (≈40 min)
- Session-based auth on the Snippets API (≈40 min)
- Comparison of auth methods, brief look at DB tokens & API keys, and wrap-up (≈30–35 min)

## Secure passwords & basic login (Snippets API) (≈40 min)

**Goal**: Implement secure password storage and a basic login flow for the Snippets API using bcrypt.

### Lecture & live coding (≈10 min)

- Concept: why plaintext passwords are insecure.
- Introduce hashing and salting with bcrypt.
- Show how a minimal `users` table for the Snippets DB might look.
- Walk through the happy path for `/login`:
  - Look up user by username/email.
  - Compare plaintext password with stored hash using bcrypt.

### Implementation (live coding)

- Sketch the table and login route, for example:

```js
// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db"); // same Knex/db layer used by the Snippets API

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await db.getUserByUsername(username);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
});

module.exports = router;
```

_See `./session-materials/10-auth-db-credentials.md` for a more detailed walkthrough._

### Exercise (15–20 min)

- Add a `users` table to the Snippets DB and seed at least one user with a hashed password.
- Implement `/login` using bcrypt in your own copy of the Snippets API.
- Use Postman to test successful and failing login attempts.

### Do it together (5–10 min)

- Show one working solution.
- Discuss common mistakes (e.g. sending too much error detail, forgetting to hash passwords).

---

## Stateless auth with JWT (≈40 min)

**Goal**: Learn stateless auth with JWT on top of the secure login flow, and protect key Snippets API endpoints.

### Lecture & live coding (≈10 min)

- Concept: self-contained tokens with claims; no DB lookup needed per request.
- Trade-offs: fast and scalable, but harder to revoke.
- Show the high-level flow:
  - After successful bcrypt-based login, issue a JWT.
  - Client includes the token in the `Authorization` header.
  - Middleware verifies the token and attaches user info to `req.user`.

### Implementation (live coding)

```js
// routes/auth.js
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "development-secret";

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.getUserByUsername(username);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// middleware/auth-jwt.js
function requireJwtAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = { requireJwtAuth };
```

_See `./session-materials/12-auth-jwt.md` for detailed steps and examples._

### Exercise (15–20 min)

- Protect at least two Snippets API endpoints (e.g. `POST /api/snippets`, `DELETE /api/snippets/:id`) using JWT middleware.
- Add token expiration and handle expired tokens gracefully in responses.
- Try to tamper with the token payload and see what happens.

### Do it together (5–10 min)

- Run through a full Postman flow together.
- Discuss where to store JWTs on the client (headers vs cookies) in different types of apps.

---

## Session-based authentication (≈40 min)

**Goal**: Implement session-based authentication using cookies and compare it to JWT for the Snippets API.

### Lecture & live coding (≈10 min)

- Concept: server-side sessions, session IDs in cookies, and typical use cases.
- Contrast with JWT: stateful vs stateless, revocation, and infrastructure needs.

### Implementation (live coding)

```js
// app.js
const session = require("express-session");

app.use(
  session({
    secret: process.env.SESSION_SECRET || "development-session-secret",
    resave: false,
    saveUninitialized: false,
  }),
);

// routes/auth-session.js
router.post("/login-session", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.getUserByUsername(username);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  req.session.userId = user.id;
  res.json({ message: "Logged in with session" });
});

function requireSessionAuth(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ error: "Not authenticated" });
}

router.post("/logout-session", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});
```

_See `./session-materials/13-auth-sessions.md` for detailed guidance._

### Exercise (15–20 min)

- Protect at least one Snippets API route using session-based middleware.
- Implement logout and verify that access is denied after logging out.

### Do it together (5–10 min)

- Compare the experience of working with sessions vs JWT.
- Discuss scaling concerns (sticky sessions, shared stores) at a high level.

---

## Comparison, DB tokens & API keys overview, and wrap-up (≈30–35 min)

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

_See `./session-materials/11-auth-db-tokens.md` and `./session-materials/14-auth-api-keys-and-wrapup.md` for additional details and examples._

### Optional mini-exercise (10–15 min, time permitting)

- In pairs or small groups, sketch (or start implementing) either:
  - A DB-token-based login flow, or
  - An API-key-protected “machine” endpoint in the Snippets API.
- Make it clear that the full implementation can be completed as part of the assignment.

### Final wrap-up (5–10 min)

- Reiterate best practices:
  - Always use HTTPS.
  - Always hash passwords (bcrypt or similar).
  - Store tokens securely (e.g. HttpOnly cookies for web clients).
  - Prefer short-lived tokens and consider refresh tokens where appropriate.
- Connect clearly to the assignment:
  - Trainees will extend the snippets backend with DB tokens and/or API-key-protected endpoints.
  - They will choose and justify which methods they would use in different scenarios.
