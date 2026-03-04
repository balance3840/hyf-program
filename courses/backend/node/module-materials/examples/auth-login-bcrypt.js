import express from "express";
import bcrypt from "bcrypt";

// Example in-memory "database" for teaching purposes only
const users = [
  {
    id: 1,
    username: "alice",
    // bcrypt.hashSync("password123", 10)
    password_hash: "$2b$10$exampleexampleexampleexampleexampleexa",
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
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ message: "Login successful", userId: user.id });
});

app.listen(3000, () => {
  console.log("> Ready on http://localhost:3000 (bcrypt login example)");
});

