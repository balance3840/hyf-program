import express from "express";
import { createServer } from "http";

// Example in-memory "database" for teaching purposes only
const users = [
  {
    id: 1,
    username: "alice",
    password: "password123",
    role: "user",
  },
  {
    id: 2,
    username: "admin",
    password: "admin123",
    role: "admin",
  },
];

function getUserByUsername(username) {
  return users.find((user) => user.username === username) ?? null;
}

function issueToken(user) {
  const payload = { userId: user.id, username: user.username, role: user.role };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

function decodeToken(token) {
  try {
    return JSON.parse(Buffer.from(token, "base64").toString("utf8"));
  } catch {
    return null;
  }
}

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = getUserByUsername(username);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = issueToken(user);
  res.json({ message: "Logged in with base64 token", token });
});

function requireTokenAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const payload = decodeToken(token);

  if (!payload) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = payload;
  next();
}

app.get("/protected", requireTokenAuth, (req, res) => {
  res.json({ data: "Token-protected resource", user: req.user });
});

// Admin-only route — great for demonstrating role forgery
app.get("/admin", requireTokenAuth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admins only" });
  }
  res.json({ data: "Secret admin data", user: req.user });
});

app.post("/logout", (req, res) => {
  res.json({ message: "Logged out (token must be discarded client-side)" });
});

app.listen(3000, () => {
  console.log("> Ready on http://localhost:3000 (base64 token example)");
});