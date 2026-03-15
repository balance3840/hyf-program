## OpenAPI basics for the Snippets API

This file supports the OpenAPI/Swagger segment of Week 2.

### Explain the role of OpenAPI

- OpenAPI is a **contract** for your HTTP API.
- It describes:
  - Which paths and methods exist.
  - What parameters and request bodies they accept.
  - What responses (status codes and schemas) they return.
- Tools can use it to:
  - Generate documentation.
  - Generate client/server code.
  - Validate requests and responses.

### Minimal example for `GET /api/snippets`

Use a concise YAML snippet in class:

```yaml
paths:
  /api/snippets:
    get:
      summary: List public code snippets
      responses:
        "200":
          description: List of snippets
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Snippet"
        "500":
          description: Server error
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"

components:
  schemas:
    Snippet:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string
        contents:
          type: string
    Error:
      type: object
      properties:
        error:
          type: string
```

You do not have to cover the full specification. Focus on:

- Paths and operations.
- Response status codes and bodies.
- A shared `Error` schema that matches what trainees implement in code.
