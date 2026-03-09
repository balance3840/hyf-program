import express from "express";
import session from "express-session";

// Example in-memory "database" for teaching purposes only
const users = [
  {
    id: 1,
    username: "alice",
    password: "password123",
  },
];

function getUserByUsername(username) {
  return users.find((user) => user.username === username) ?? null;
}

const app = express();
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "development-session-secret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.post("/login-session", (req, res) => {
  const { username, password } = req.body;

  const user = getUserByUsername(username);
  if (!user || user.password !== password) {
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

app.get("/protected-session", requireSessionAuth, (req, res) => {
  res.json({ data: "Session-protected snippets", userId: req.session.userId });
});

app.post("/logout-session", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

app.listen(3000, () => {
  console.log("> Ready on http://localhost:3000 (session auth example)");
});
