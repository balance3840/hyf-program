# Session plan

## Session outline

- What is Express (10 mins)
  - [Live coding: setup a server](./session-materials/01-server.md)
  - [Excercise: create a local project and database schema](./session-materials/02-schema.md)
- Routing in Express (20 mins)
  - `app.use`
  - `app.get`
  - [Live coding: routing](#appget-vs-appuse)
  - [Excercise: Setup routing](./session-materials/03-routing.md) (10 mins)
- URL parameters in Express (30 mins)
  - [Explanation and live coding](#query-parameters-vs-url-parameters)
  - [Excercise: connect to the database](./session-materials/04-database-connection.md)
  - [Excercise: GET endpoints](./session-materials/05-get-endpoints.md)
- Route order (15 mins)
  - [Live coding: why route order matters](#route-order)
  - Logging and debugging
- Middleware (15 mins)
  - [`next` method](https://expressjs.com/en/guide/using-middleware.html)
  - Modifying `request` and `response`
  - <https://fullstackopen.com/en/part3/node_js_and_express#express>
  - [Live coding: basic middleware example](#middleware)
- Error handling in HTTP & Express (30–35 mins)
  - Short recap of HTTP status codes and common groups (2xx/3xx/4xx/5xx).
  - Discuss client vs server errors and what information belongs in logs vs in responses.
  - Show how to end a request correctly in Express using `res.status(...).json(...)` or `res.send(...)`.
  - Demonstrate how to propagate errors with `next(err)` and handle them in a shared error-handling middleware.
  - [Live coding: error handling in Express](#error-handling-in-express)
  - Excercise: refactor a naive route to use centralised error handling and logging.

## Exercises

1. [Server](./session-materials/01-server.md): Setup project
2. [DB schema](./session-materials/02-schema.md): Setup MySQL database schema
3. [API](./session-materials/03-routing.md): Snippets API exercises
   - [POST endpoint](./session-materials/03-routing.md)
   - [GET endpoints](./session-materials/05-get-endpoints.md)
   - Error handling and logging for the routes you create (choose appropriate status codes and response bodies).

## Live coding

### `app.get` vs `app.use`

Let's clarify the routing in Express using an [Express router](https://expressjs.com/en/starter/basic-routing.html).

Code example can be found in the [module materials](../module-materials/index.js) and [router](../module-materials/examples/router.js).

```js
node --watch index.js
```

### Query parameters vs URL parameters

#### URL parameters

These are part of the URL path used to identify specific resources.

**Example:** GET `/api/snippets/123` represented in our router by `/api/snippets/:id`

In the above URL, `123` is an ID of the snippet to fetch. The route indicates that we will only return this one resouce or nothing else. `:id` is **dynamic**, so that we can define one route and be sure to get and parse any ID passed. In the same time, passing an `:id` is **required**.

#### Query parameters

These come after the `?` character and are usually key=value pairs, separated by `&`.

**Example:** GET `/api/snippets?tag=popular`

Used for sorting, filtering, pagination, or tracking, are usually **optional**. Can also be multiple values.

Code example can be found in the [parameters file](../module-materials/examples/parameters.js).

```js
node --watch examples/parameters.js
```

### Route order

Code example can be found in the [route order file](../module-materials/examples/route-order.js)

```js
node --watch examples/route-order.js
```

### Middleware

Middleware is a generic term used for any software that acts as a connector between two other bits of software. In Express world, middleware is a layer that can be injected between a request and response and perform additional tasks.

You can find out more about Express middleware in the [Express middleware documentation](https://expressjs.com/en/guide/using-middleware.html).

Code example of a sample middleware can be found in the [middleware file](../module-materials/examples/middleware.js)

```js
node --watch examples/middleware.js
```

### Error handling in Express

Error handling is how we make failures predictable and understandable for both users and developers.

At a high level:

- Use HTTP status codes to communicate **what** happened (success, client error, server error).
- Use logs to capture **why** something went wrong (stack traces, query details, internal IDs).
- Keep responses to clients simple and safe, without leaking internal implementation details.

In Express, a typical pattern looks like this:

- Validate incoming data at the start of a route. If it is invalid, respond with a `4xx` status code and a short JSON error message.
- Wrap asynchronous logic so that thrown errors or rejected promises are passed to `next(err)`.
- Use a **custom error-handling middleware** with the signature `(err, req, res, next)` at the bottom of your middleware stack:
  - Log `err` (and any useful context like `req.method`, `req.path`).
  - Respond once with a generic `500` error body like `{ "error": "Internal server error" }`, or a more specific code if you know the problem.

You can find a small example of this pattern in the [middleware file](../module-materials/examples/middleware.js). Use this as a reference when running the error-handling live coding and exercise.

#### HTTP Status Codes Refresher

Here are some of the most commonly used:

##### 2XX - Success

`200 OK` - The request succeeded, e.g. a webpage or API response loads as it should.
`201 Created` - A new resource was made, e.g. a new snippet or tag.

##### 3XX - Redirection

`301 Moved Permanently` - The URL has changed, e.g. redirect from oldsite.com to newsite.com.
`302 Found` - A temporary redirect, e.g. redirecting Spanish visitors to the Spanish version of the website.

##### 4XX - Client Errors

`400 Bad Request` - The request was invalid, e.g. form data missing or incorrect.
`401 Unauthorized` - You need to log in e.g. trying to access user features when logged out.
`404 Not Found` - Nothing at that URL e.g. a missing page or resource.

##### 5XX - Server Errors

`500 Internal Server Error` - Generic server issue, e.g. something goes wrong in the backend.
`503 Service Unavailable` - Server is down or busy e.g. backend API is not running.

You can read more at the [HTTP Status cheatsheet](https://devhints.io/http-status).

#### Client vs Server

Server-side errors should be designed for developers. Detailed errors help debugging and ultimately fixing issues easier.
For example: if a database table is missing, record the missing table name and stack trace in your logs.

Client-side errors should be designed for users, including the correct HTTP status code.
For example: in the missing database table case, simply return a `500 Internal Server Error` and a useful message to the client to explain how to continue, without exposing internal details.

It's important to hide specific error details from the user for multiple reasons:

1. **Security** – Revealing database names and other internal details can give attackers too many clues about your system which can make your app more vulnerable to exploitation.
2. **Privacy** – Many internal errors can include sensitive data (e.g. user IDs, personal information) that shouldn't be exposed.
3. **User Experience** – Some technical errors would confuse most users, so stick with simple, friendly messages that can help the user continue.
