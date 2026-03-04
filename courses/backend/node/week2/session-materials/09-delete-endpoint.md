# DELETE endpoint

## `DELETE /api/snippets/:id`

Let's start with a simplified version of the `DELETE /api/snippets/:id` route. First we add the DELETE route to `api/snippets.js`:

```js
// ...

// DELETE /api/snippets/:id
router.delete("/:id", async (request, response) => {
  // TODO
});

// ...
```

To be able to delete a row from the `snippets` table, we need to have an existing snippet. Create a snippet first and note what the snippet ID is.

The DELETE request we want to make will look something like this:

```text
DELETE /api/snippets/1
```

### Exercise: Implement the DELETE endpoint

When we now make a request like:

```text
DELETE /api/snippets/1
```

you should delete the row from the `snippets` table where the snippet ID matches the `:id` parameter in the URL.

### Status codes and documentation

When you implement this endpoint:

- Choose appropriate status codes:
  - Respond with `204 No Content` or `200 OK` when the snippet is successfully deleted.
  - Respond with `404 Not Found` when there is no snippet with the given `id`.
  - Respond with `500 Internal Server Error` for unexpected failures.
- Return a clear JSON confirmation when you send a body (for example `{ "message": "Deleted snippet" }`).
- Update your OpenAPI/Swagger spec to describe:
  - The path parameter `id`.
  - The `200`/`204`, `404`, and `500` responses.
