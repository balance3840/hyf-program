import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "development-secret";

// Example in-memory "database" for teaching purposes only
const users = [
  {
    id: 1,
    username: "alice",
    // bcrypt.hashSync("password123", 10)
    password_hash:
      "$2b$10$uXQ26BC378vlfQz80XTlKecUnhlcWFzZdoygngzx5CQhPkZJRZDtO",
  },
];

function getUserByUsername(username) {
  return users.find((user) => user.username === username) ?? null;
}

const app = express();
app.use(express.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = getUserByUsername(username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

function requireJwtAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

app.get("/protected", requireJwtAuth, (req, res) => {
  res.json({ data: "Top secret snippets", userId: req.user.id });
});

app.listen(3000, () => {
  console.log("> Ready on http://localhost:3000 (JWT auth example)");
});
