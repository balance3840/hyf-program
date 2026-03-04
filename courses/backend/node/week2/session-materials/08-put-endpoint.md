# PUT endpoint

## `PUT /api/snippets/:id`

Let's start with a simplified version of the `PUT /api/snippets/:id` route. First we add the PUT route to `api/snippets.js`:

```js
// ...

// PUT /api/snippets/:id
router.put("/:id", async (request, response) => {
  // TODO
});

// ...
```

To be able to update a row in the `snippets` table, we need to have an existing snippet. Create a snippet first and note what the snippet ID is.

The PUT request we want to make will look something like this:

```text
PUT /api/snippets/1
{
    "title": "Updated snippet title",
    "contents": "#hello world",
    "is_private": true
}
```

### Exercise: Implement the PUT endpoint

When we now make a request like:

```text
PUT /api/snippets/1
{
    "title": "Updated snippet title",
    "contents": "#hello world",
    "is_private": true
}
```

you should update the existing row in the `snippets` table with the data from the request body, where the snippet ID matches the `:id` parameter in the URL.

When updating a snippet we also need to specify a `user_id`. For now, you can just pass in the `user_id` in the request body (alongside the other snippet data).

### Status codes and documentation

When you implement this endpoint:

- Choose appropriate status codes:
  - Respond with `200 OK` when the snippet is successfully updated.
  - Respond with `400 Bad Request` when the payload is invalid.
  - Respond with `404 Not Found` when there is no snippet with the given `id`.
  - Respond with `500 Internal Server Error` for unexpected failures.
- Return consistent JSON shapes for both success and error responses.
- Update your OpenAPI/Swagger spec to describe:
  - The path parameter `id`.
  - The request body schema for `PUT /api/snippets/:id`.
  - The `200`, `400`, `404`, and `500` responses, including the shared error format.
