# REST principles in the Snippets API

This file provides mentor-facing notes for the REST design segment of Week 2.

## Core ideas to highlight

- **Resources, not actions**: model the API around nouns like `snippets`, `tags`, and `users`, not verbs, for example: (`getUsers` is a bad practice)
- **Predictable URLs**: use plural resource names and consistent patterns, e.g.:
  - `GET /api/snippets` – list snippets
  - `POST /api/snippets` – create a snippet
  - `GET /api/snippets/:id` – get a single snippet
  - `PUT /api/snippets/:id` – update a snippet
  - `DELETE /api/snippets/:id` – delete a snippet
- **Use HTTP methods meaningfully**: `GET` (read), `POST` (create), `PUT/PATCH` (update), `DELETE` (remove).
- **Statelessness**: each request contains everything needed; server does not store per-client session state (week 3 will introduce authentication trade-offs).

## Relationships and query design

- Snippets can have many tags and belong to a single user.
- Encourage trainees to think about:
  - Whether to expose nested routes (e.g. `GET /api/users/:id/snippets`) vs query parameters (`GET /api/snippets?userId=...`).
  - Potential traps with nesting: (e.g. `GET /api/users/:id/snippets` vs `GET /api/users/:id`)
  - How to design search/filter endpoints using query parameters (e.g. `GET /api/snippets?tag=javascript`).
  - When to add pagination parameters like `limit` and `offset` or `page` and `pageSize`.
