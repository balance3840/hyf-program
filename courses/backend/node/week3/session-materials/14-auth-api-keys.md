# API keys and wrap-up

In this final part, you will look at **API keys** as a simple mechanism for **machine-to-machine authentication**, and you will review the authentication methods covered in the session.

## 1. API keys: concept

- API keys are usually long, random strings given to other services or scripts.
- The client includes the key with each request (for example in an `x-api-key` header).
- The server validates the key and decides whether to allow the request.
- API keys are convenient for machines, but not ideal as the only method of authenticating human users.

## 2. Adding an API-key-protected route (Snippets API)

As an example, you can:

- Introduce an environment variable like `API_KEY`.
- Create a middleware (e.g. `requireApiKey`) that:
  - Reads the `x-api-key` header.
  - Compares it with the configured key.
  - Returns `401` if it is missing or incorrect.
- Use this middleware on a “machine-style” endpoint, such as:
  - A `/metrics` or `/health` endpoint.
  - A bulk export route for snippets data.

## 3. Optional rate limiting idea

To prevent abuse, you can sketch (or implement) a very simple rate limiting strategy:

- Use an in-memory object to count requests per API key.
- Deny further requests after a certain number within a short time window.
- Discuss why a production-grade solution would need shared storage and more robust logic.
