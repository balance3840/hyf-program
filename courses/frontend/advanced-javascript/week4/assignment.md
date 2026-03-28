# Assignment

For this week's assignment we will create a web application that generates a screenshot of a website based on a URL. We will combine two APIs: one to generate the screenshot and one to allow the user to save the screenshot.

We use [Rapid API](https://rapidapi.com/apishub/api/website-screenshot6/?utm_source=RapidAPI.com%2Fguides&utm_medium=DevRel&utm_campaign=DevRel) to generate a screenshot and the [crudcrud API](https://crudcrud.com/) to save the screenshot.

## Technical specifications

1. User can enter a URL for a website and it will send back a screenshot of the website using the website-screenshot API
2. User can hit a button to save the screenshot. It will then save the screenshot and the URL as a resource on crudcrud
3. User can get a list of all screenshots that they have saved
4. User can delete a screenshot that they have saved

### Class requirements

1. **Model your UI as classes** with a `render()` method that puts content on the page.
2. **Build an error system** with custom error classes that `extend Error`, each with a way to show a user-friendly message (e.g. `toUserMessage()`).
3. **Handle errors** with `try/catch` and use `instanceof` to treat different error types differently.

Look at your interface and think about what parts can be modeled as classes — if something has data and behavior that go together, or if it can be reused, make it a class. For example, you could create a `Screenshot` class that holds the URL and image data, knows how to render itself as a card on the page, and has a method for deleting itself from crudcrud.

For the error system, think about what kinds of errors can happen in your app — what if the user submits an empty URL? What if the API returns a bad response? What if the network is down? You might end up with classes like `ValidationError`, `ApiError`, or something else entirely — it's up to you.

## Optional Tasks/Assignments

> **Note:** Users do not need to be stored in a database or API — just keep them in memory (e.g. an array of instances in your JavaScript). No need to persist them anywhere.

1. Create a user object with an email and password. Keep it in a variable or array.
2. Show a login form first.
3. If the email and password match the user you created, show the application. Otherwise show an error message.
4. Create another user. When saving a screenshot, also save the user email (or another unique identifier).
5. Make sure you only show screenshots that the logged-in user has uploaded.

Keep in mind the API key for the website-screenshot and the uuid for crudcrud should be in a secret.js file which is not committed to git.
