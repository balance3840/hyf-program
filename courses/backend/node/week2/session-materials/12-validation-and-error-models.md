## Validation and error models

This file supports the Week 2 segment on error model and validation design.

### Goals for this segment

- Design a **consistent error format** for the Snippets API.
- Decide which validations to enforce and where (middleware vs per-endpoint).
- Make sure the design is reflected in both:
  - Your Express implementation.
  - Your OpenAPI specification.

### Error format

Recommend something simple such as:

```json
{ "error": "Human-readable message" }
```

or

```json
{
  "error": {
    "code": "SNIPPET_NOT_FOUND",
    "message": "Snippet with id 42 was not found"
  }
}
```

The exact format is less important than **being consistent** across endpoints.

### Validation examples

For the Snippets API, talk through validations like:

- `POST /api/snippets`
  - `title` is required and non-empty.
  - `contents` is required and non-empty.
  - Optional fields like `is_private` have sensible defaults.
- `PUT /api/snippets/:id`
  - Reject updates with empty `title` or `contents`.
  - Return `404` when `id` does not exist.
- Any `/:id` route
  - Validate that `id` is a number before hitting the database.

Connect these decisions back to status codes from Week 1:

- `400 Bad Request` for invalid inputs.
- `404 Not Found` when a resource is missing.
- `500 Internal Server Error` for unexpected issues.

### Suggested exercise

Give trainees a small set of endpoints (for example `GET /api/snippets`, `POST /api/snippets`, `GET /api/snippets/:id`) and ask them to:

1. List all validation rules they want to enforce.
2. Decide which HTTP status code to use for each kind of failure.
3. Write the exact JSON error body they would return.

Then, have them:

- Implement one or two of these decisions in their Express code.
- Update their OpenAPI spec so the error responses match their implementation.

