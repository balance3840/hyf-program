# Session plan

## Session outline

- [REST principles & resource design with Snippets](#rest-principles--resource-design-with-snippets) (20–25 mins)
- [Designing the Snippets REST structure](#designing-the-snippets-rest-structure) (30–35 mins)
- [Documenting APIs with OpenAPI/Swagger](#documenting-apis-with-openapiswagger) (35–40 mins)
- [Error model & validation design](#error-model--validation-design) (30–35 mins)
- [Knex security and SQL injection prevention](#knex-security-and-sql-injection-prevention) (20–25 mins)
- [Advanced Postman use cases](#advanced-postman) (30–35 mins)

## Database interaction with Knex

Trainees have used Knex before. In foundation, they used it with the `.raw()` command to execute SQL easily. And they also used it last week when learning about Express.

In this week, we assume basic familiarity with Knex from the preparation materials and assignments. The live session should:

- Briefly recap what Knex is and why we use it as a query builder.
- Emphasise that we prefer Query Builder methods over `.raw()` for safety and portability.
- Point ahead to the [Knex security and SQL injection prevention](#knex-security-and-sql-injection-prevention) section, where we will look at a concrete security issue.

If you want a deeper live walkthrough of Knex, you can optionally reuse the [phonebook example](./session-materials/phonebook/) as legacy reference material, but the main focus of this session is REST design and documentation on top of the Snippets API.

## REST principles & resource design with Snippets

### REST refresher

Building software is like building houses: architecture is everything. The design of each part is just as important as the utility of it. REST is a specific architectural style for web applications. It serves to organise code in **predictable** ways.

The most important features of REST are:

- An application has a `frontend` (client) and a `backend` (server). This is called [separation of concerns](https://medium.com/machine-words/separation-of-concerns-1d735b703a60): each section has its specific job to do. The frontend deals with presenting data in a user friendly way, the backend deals with all the logic and data manipulation
- The server is `stateless`, which means that it doesn't store any data about a client session. Whenever a client sends a request to the server, each request from the client to server must contain all of the information necessary to understand the request, and cannot take advantage of any stored context on the server. This makes it possible to handle requests from millions of users.
- Server responses can be temporarily stored on the client (a browser) using a process called `caching`: storing files like images or webpages in the browser to load the next time you enter a website (instead of getting them from the server, which generally takes longer to do).
- Client-server communication is done through `Hypertext Transfer Protocol (HTTP)`, which serves as the style (the how) of communication.

It's important to know about REST because it teaches us how web applications are designed and holds us to a standard that makes development and usage predictable.

For further reading, check the following resources:

- [What is REST: a simple explanation for beginners](https://medium.com/extend/what-is-rest-a-simple-explanation-for-beginners-part-1-introduction-b4a072f8740f)
- [@NoerGitKat (lots of web app clones/examples to learn from)](https://github.com/NoerGitKat)

### Designing the Snippets REST structure

Now we can pick up where we left the exercises last week and use the Snippets domain as a concrete REST example.

- Start from the existing endpoints the trainees already built (`/api/snippets`, `/api/snippets/:id`, and the Week 1 assignment routes).
- Discuss how these endpoints map to REST resources (`snippets`, `tags`, `users`) and which URLs and methods make the API predictable.
- Talk through design questions such as:
  - How to model relationships (e.g. tags on snippets).
  - When to introduce nested routes vs query parameters.
  - How to handle pagination and filtering in a RESTful way.

Exercise (10–15 mins): in small groups or individually, ask trainees to design REST endpoints for an additional feature (for example, “favourite snippets” or “public feed”). Have them write down:

- The resource name(s).
- The routes and HTTP methods they would expose.
- A short description of what each route returns.

Review designs together and connect them back to REST principles.

### Snippets API continued

Once the design is clear, help the trainees complete or extend the existing endpoints:

1. [POST endpoint exercise](./session-materials/07-post-endpoint.md)
2. [PUT endpoint exercise](./session-materials/08-put-endpoint.md)
3. [DELETE endpoint exercise](./session-materials/09-delete-endpoint.md)

Emphasise that for each endpoint they should:

- Choose appropriate status codes for success and error cases.
- Return consistent JSON shapes for both data and errors.

## Documenting APIs with OpenAPI/Swagger

Introduce OpenAPI/Swagger as a way to formally describe the Snippets API:

- Explain the basic building blocks: paths, operations, parameters, request bodies, responses, and schemas.
- Show how a small YAML or JSON file can describe an existing route, for example `GET /api/snippets`.
- Highlight how good documentation helps both API consumers and future maintainers.

Live coding (10–15 mins):

- Create a minimal `openapi.yml` (or JSON) that documents at least one existing Snippets endpoint.
- Include:
  - Path and method.
  - Path/query parameters.
  - Response status codes.
  - A simple response schema (e.g. a snippet object).

Exercise (15–20 mins):

- Ask trainees to extend the spec to cover one or two more endpoints they designed in the REST structure exercise.
- Encourage them to document both success and error responses (including the error JSON structure agreed on in Week 1).

## Error model & validation design

Error handling is important so we have visibility of issues that occur in applications, and gain some understanding of what is going wrong.

In Week 1, mentors walked through HTTP status codes, client vs server errors, and how to hide implementation details from users. Reuse that material from the Week 1 “Error handling in Express” section, and focus this segment on **design decisions**:

- Decide on a consistent JSON error shape (for example `{ "error": "message" }` or `{ "error": { "code": "...", "message": "..." } }`).
- Agree when to return `400`, `404`, `409`, or `500` for common scenarios in the Snippets API.
- Discuss which validations should happen in shared middleware (e.g. JSON parsing, common headers) vs per endpoint (e.g. snippet title length).

Exercise (15–20 mins):

- Give trainees a small subset of endpoints (for example, `GET /api/snippets`, `POST /api/snippets`, `GET /api/snippets/:id`).
- Ask them to list:
  - The main validation rules for each endpoint.
  - The possible error cases and which status codes should be returned.
  - The exact JSON error body for each case.
- Then, have them update their OpenAPI spec from the previous exercise to include these error responses.

## Knex security and SQL injection prevention

Knex helps us write safer queries, but it is still possible to introduce SQL injection vulnerabilities if we are careless with user input.

In this segment:

- Show how interpolating raw user input into SQL (for example, using `.raw()` or `orderByRaw(req.query.sort)`) can open up injection vulnerabilities.
- Use a Snippets-style example, such as an endpoint that sorts results based on a `sort` query parameter, to demonstrate how a malicious value could modify the query.
- Contrast this with safe usage of the Knex Query Builder and parameter binding.

If you want a concrete code walkthrough, you can adapt the existing `api/contacts.js` example from the phonebook materials as an optional reference, but update the discussion to focus on Snippets-style queries and safe patterns.

Connect this segment directly to the Week 2 assignment task where trainees must both demonstrate and fix an injection vulnerability.

## Advanced Postman

Postman can be used for quickly testing APIs, but it can also be configured in more advanced ways to support the development workflow. Here are four ways trainees can level up their Postman game.

### 1. Creating collections and saving requests

Collections let you group related requests into a reusable library. This makes it easy to organize, run, and share sets of API calls.

Read more on the [Official docs](https://learning.postman.com/docs/collections/collections-overview/).

#### Exercise 1

Create a collection for the Snippets API. Add an unauthenticated `GET /api/snippets` request, and save it to the collection.

1. In Postman, click **New → Collection**, and give it a meaningful name and description.
2. On the collection, click the **+** icon and create the GET request. Give it a meaningful name and **Save** it to the collection, once it's working.

### 2. Set Up Multiple Environments

Environments in Postman let you define sets of variables (e.g. base URLs, tokens) for different contexts. That could be a local environment, staging, and production. Switching environments changes the variable values used in your requests.

Read more on the [Official docs](https://learning.postman.com/docs/sending-requests/variables/managing-environments/).

#### Exercise 2

1. In Postman, go to **Environments** (top-right environment selector) and click **Add**.
2. Name your environment your first environment `Local`
3. Add a variable called `base_url` and set it to `http://localhost:3000` (or wherver you're running your local server).
4. Update your requests to use them in the URL, like: `{{base_url}}/api/snippets`.
5. Select the environment in the dropdown to apply its variables to all requests you run.

All details you place in variables are local by default. For additional security, mark them as sensitive, if you keep secrets or passwords in here.

In the future, when you come to deploy your app to the web, you can create a new environment in the same way called `Production` and recreate the same variables with updated values for your deployed app. Then you can easily switch between them in Postman to test both local and production versions of the APIs.

### 3. Managing Secrets

You'll often need to use sensitive data in requests, namely secrets (API keys, passwords, tokens). These should not be hard-coded in the requests for security reasons! Postman provides a **Vault** and sensitive variable settings to securely store and reuse secrets.

Read more on the [Official docs](https://learning.postman.com/docs/sending-requests/postman-vault/postman-vault-secrets/).

#### Exercise 3

Let's add the authenticated request to `GET /api/snippets`, so we can test returning private snippets.

1. Open the **Postman Vault** (Vault icon or `Ctrl+Shift+V`).
2. When prompted, Postman generates a vault key - save it securely.
3. Add a new secret called `users_token` with a value from the `users.token` column in your database.
4. Now you're ready to use it in a request! Create a new GET request as you did in the first exercise, but this time add an authorization header. Where you need to reference your token, use `{{vault:users_token}}`.

Now you can safely and securely test APIs using secrets. Test to make sure the request is working correctly, and save it to your collection.

### 4. Create Basic Test Suites

Postman allows you to write test scripts (in JavaScript) that validate your API responses — checking status codes, payloads, and performance. These tests can be grouped into collections and run automatically. They are a handy way to validate that your API is working correctly, and continues to work correctly as changes are made.

Read more on the [Official docs](https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/).

#### Exercise 4

1. In a request, open the **Tests** tab.
2. Write assertions using `pm.test()` and the `pm.response` object. Here are two examples you can paste in:

```javascript
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});

pm.test("Snippet has a numeric 'id' field", function () {
  const json = pm.response.json();
  pm.expect(json.id).to.be.a("number");
});
```

3. Write at least one additional test case for both of your requests.
4. These tests will run automatically each time you send the request. You can also run them all together, like a test suite. Click on your collection, and find the "Run" button. Make sure all the requests are checked that you wish to test. Click run, and a report will display all of test results.
