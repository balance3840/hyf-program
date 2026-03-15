## Knex security and SQL injection (Snippets)

This file supports the Week 2 segment on Knex security and SQL injection prevention.

### Example vulnerable endpoint (conceptual)

Consider a Snippets endpoint that allows sorting via a `sort` query parameter:

```js
snippetsRouter.get("/", async (req, res) => {
  let query = knexInstance.select("*").from("snippets");

  if ("sort" in req.query) {
    const orderBy = req.query.sort.toString();
    if (orderBy.length > 0) {
      query = query.orderByRaw(orderBy); // Vulnerable!
    }
  }

  console.log("SQL", query.toSQL().sql);

  try {
    const data = await query;
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});
```

Here, user input is passed directly into `orderByRaw`, which can allow SQL injection (example: `(CASE WHEN (SELECT COUNT(*) FROM users WHERE email='admin@test.com') > 0 THEN email ELSE password END)`);

### Safer pattern with validation

Show how to validate and map the `sort` value instead:

- Only allow a **whitelist** of sortable columns (e.g. `created_at`, `title`).
- Only allow `ASC` or `DESC` as sort directions.
- Use the Query Builder’s `orderBy` instead of `orderByRaw` with unchecked strings.

The exact code can be written live during the session.
