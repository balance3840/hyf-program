# Exercises

Work through these in order.

## Exercise 1

Using async await

1. `fetch` yes or no from this api: `https://yesno.wtf/api`. Show the answer on the page.

## Exercise 2

Using promises

1. `fetch` yes or no from this api: `https://yesno.wtf/api`. Show the answer on the page.
2. Try fetching a url that rejects e.g. `https://knajskdskj.jasdk`. Show the error message on the page.

## Exercise 3

1. Create a promise that resolves after 4 seconds. Use this promise to show the text `hello` on the page after 4 seconds.
2. Now make the promise fail by rejecting it with an error message instead of resolving it, and show the error message on the page.

## Exercise 4

Create a function that returns a promise, that you can use like this:

```js
// YesNoFail4Seconds should wait 4 seconds before it does one of the following 3 things:
// resolves with a yes
// resolves with a no
// or rejects
// Look into Math.random()
YesNoFail4Seconds()
  .then((data) => {
    // Show on the page: The answer is ${data}
  })
  .catch((error) => {
    // Show on the page: the error
  });
```

The above example show how to consume the promise using promises. Now try consume the `YesNoFail4Seconds` using async/await

## Exercise 5

Using async await

1. Fetch a user from JSONPlaceholder (for example `https://jsonplaceholder.typicode.com/users/1`)
2. After that succeeds, fetch movies using [this api](https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json)
3. Show the movies on the page

## Exercise 6

Get the JSONPlaceholder user and the movies at the same time. Show the movies and the battery status on the page when the related promises have resolved.
