# **Session Plan: API Security & Authentication in Node.js**

**Duration**: 3.5 hours
**Format**: Lecture + Live Coding + Exercises

---

## **1. Database-Stored Credentials (30 min)**

**Goal**: Understand basic auth flow, identify security flaws.

### **Lecture (10 min)**

- **Concept**: Store username/password in DB, check on login.
- **Security Issues**: Plaintext passwords, no token management.

### **Implementation (15 min)**

**Code Snippet**:

```js
// routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Login endpoint
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.getUserByUsername(username);
  if (!user || user.password !== password) {
    return res.status(401).send("Invalid credentials");
  }
  res.send("Login successful");
});

module.exports = router;
```

**Middleware**:

```js
// middleware/auth.js
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.status(401).send("Unauthorized");
}
```

### **Exercise (5 min)**

- Add a protected route `/profile` using `isAuthenticated`.
- Test with Postman: send username/password in body.

**Discussion**:

- Why is this insecure?
- What if the DB is compromised?

---

## **2. Database-Stored Tokens (45 min)**

**Goal**: Improve security with tokens, understand token lifecycle.

### **Lecture (10 min)**

- **Concept**: Issue a random token on login, store in DB, validate on each request.
- **Pros/Cons**: Revocable, but DB lookup on every request.

### **Implementation (20 min)**

**Code Snippet**:

```js
// routes/auth.js
const crypto = require("crypto");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.getUserByUsername(username);
  if (!user || user.password !== password) {
    return res.status(401).send("Invalid credentials");
  }
  const token = crypto.randomBytes(32).toString("hex");
  await db.storeToken(token, user.id);
  res.json({ token });
});

// middleware/auth.js
async function isAuthenticated(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token");
  const userId = await db.getUserIdByToken(token);
  if (!userId) return res.status(401).send("Invalid token");
  req.userId = userId;
  next();
}
```

### **Exercise (10 min)**

- Implement `/logout` endpoint: delete token from DB.
- Test with Postman: login, access `/profile`, logout, try again.

**Discussion**:

- How does this compare to the previous method?
- What if the DB is slow?

---

## **3. JWT (JSON Web Tokens) (45 min)**

**Goal**: Learn stateless auth, understand JWT structure and risks.

### **Lecture (10 min)**

- **Concept**: Self-contained tokens, no DB lookup.
- **Pros/Cons**: Fast, but hard to revoke.

### **Implementation (20 min)**

**Code Snippet**:

```js
// routes/auth.js
const jwt = require("jsonwebtoken");
const SECRET = "your-secret-key";

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.getUserByUsername(username);
  if (!user || user.password !== password) {
    return res.status(401).send("Invalid credentials");
  }
  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// middleware/auth.js
function isAuthenticated(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token");
  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
}
```

### **Exercise (10 min)**

- Add token expiration, test with Postman.
- Try to tamper with the token: what happens?

**Discussion**:

- When to use JWT vs. database tokens?
- How to handle token revocation?

---

## **4. Session-Based Authentication (30 min)**

**Goal**: Learn server-side sessions, compare with JWT.

### **Lecture (5 min)**

- **Concept**: Server stores session data, sends only ID to client.

### **Implementation (15 min)**

**Code Snippet**:

```js
// app.js
const session = require("express-session");
app.use(
  session({
    secret: "your-secret",
    resave: false,
    saveUninitialized: false,
  }),
);

// routes/auth.js
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.getUserByUsername(username);
  if (!user || user.password !== password) {
    return res.status(401).send("Invalid credentials");
  }
  req.session.userId = user.id;
  res.send("Login successful");
});

// middleware/auth.js
function isAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.status(401).send("Unauthorized");
}
```

### **Exercise (10 min)**

- Implement logout: destroy session.
- Compare with JWT: when would you use each?

**Discussion**:

- How does this scale?
- What about distributed systems?

---

## **5. API Keys (15 min, if time)**

**Goal**: Understand machine-to-machine auth.

### **Lecture (5 min)**

- **Concept**: Simple, permanent keys for scripts/services.

### **Implementation (5 min)**

**Code Snippet**:

```js
// middleware/auth.js
function isAuthenticated(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).send("Invalid API key");
  }
  next();
}
```

### **Exercise (5 min)**

- Add rate limiting for API keys.
- Discuss: Why not use API keys for user auth?

---

## **6. Wrap-up & Best Practices (15 min)**

- **Recap Table**:

Authentication Methods Comparison

| Method               | DB Lookup | Revocable | Scalable | Use Case             |
| -------------------- | --------- | --------- | -------- | -------------------- |
| Database Credentials | Yes       | No        | No       | Legacy systems       |
| Database Tokens      | Yes       | Yes       | No       | Small apps           |
| JWT                  | No        | No\*      | Yes      | SPAs, mobile apps    |
| Sessions             | Yes       | Yes       | No\*\*   | Traditional web apps |
| API Keys             | No        | No        | Yes      | Machine-to-machine   |

\*Unless using a blocklist
\*\*Unless using shared storage

- **Best Practices**:
  - Always use HTTPS.
  - Hash passwords (bcrypt).
  - Store tokens securely (HttpOnly cookies for web).
  - Use short-lived tokens, refresh tokens if needed.

- **Q&A**: What would you use for a mobile app? A microservice? A legacy system?
