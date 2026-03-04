import express from "express";
const app = express();

app.use((req, _res, next) => {
  console.log(req.headers["accept-language"]);
  const isFromDenmark = (req.headers["accept-language"] || "").includes("da");
  console.log(isFromDenmark);
  req.isFromDenmark = isFromDenmark;

  next();
});

// Example of branching based on data added by middleware
app.get("/greeting", (req, res) => {
  if (req.isFromDenmark) {
    return res.json({ message: "Hej fra Express!" });
  }

  res.json({ message: "Hello from Express!" });
});

// Example route that forwards an error to the error handler
app.get("/error-demo", (_req, _res, next) => {
  next(new Error("Something went wrong in /error-demo"));
});

// Custom error-handling middleware
app.use((err, req, res, _next) => {
  console.error("Error handling request", req.method, req.path, err.message);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(3000, function () {
  console.log(`> Ready on http://localhost:3000`);
});
