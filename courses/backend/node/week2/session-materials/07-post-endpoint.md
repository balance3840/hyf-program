# POST endpoint

## `POST /api/snippets`

Let's start with a simplified version of the `POST /api/snippets` route. First we add the POST route to `api/snippets.js`:

```js
// ...

// POST /api/snippets
router.post("/", async (request, response) => {
  // TODO
});

// ...
```

To be able to insert a row into the `snippets` table, we need to have data in the `users` table. Create a user and note what the user ID is.

The POST request we want to make will look something like this:

```text
POST /api/snippets
{
    "title": "Snippet title",
    "contents": "#hello",
    "is_private": false
}
```

### Exercise: Implement the POST endpoint

When we now make a request like:

```text
POST /api/snippets
{
    "title": "Snippet title",
    "contents": "#hello",
    "is_private": false
}
```

you should insert a new row into the `snippets` table with the data from the request body.

When creating a snippet we also need to specify a `user_id`. For now, you can just pass in the `user_id` in the request body (alongside the other snippet data).

### Status codes and documentation

When you implement this endpoint:

- Choose appropriate status codes:
  - Respond with `201 Created` when the snippet is successfully created.
  - Respond with `400 Bad Request` when required fields are missing or invalid.
  - Respond with `500 Internal Server Error` for unexpected failures.
- Return consistent JSON shapes for both success and error responses.
- Update your OpenAPI/Swagger spec to describe:
  - The request body schema for `POST /api/snippets`.
  - The `201`, `400`, and `500` responses, including the error JSON format agreed in class.
