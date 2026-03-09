# Assignment

Only **task 3** (movies) requires a frontend: HTML + CSS + JavaScript that runs in the browser, with the result visible in the page. **Tasks 1 and 2** do not: for task 1 submit the JavaScript (map/filter) solution (an HTML page is optional though); for task 2 just complete the Katas.

The first task is a short warmup. The second is practice on Codewars. The third (movies) is a larger, real-world-style task: one page or app that shows all the movie results in the UI.

## 1. Doubling of number

Say you would like to write a program that **doubles the odd numbers** in an array and **throws away the even number**.

Your solution could be something like this:

```js
let numbers = [1, 2, 3, 4];
let newNumbers = [];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 !== 0) {
    newNumbers[i] = numbers[i] * 2;
  }
}
// expected result: [2, 6]
```

Rewrite the above program using `map` and `filter`; don't forget to use arrow functions. Showing the result in a page is optional for this task (but nice if you do).

## 2. Codewars!

Complete these Katas:

- [8 kyu To square(root) or not to square(root)](https://www.codewars.com/kata/57f6ad55cca6e045d2000627)
- [8 kyu Removing Elements](https://www.codewars.com/kata/5769b3802ae6f8e4890009d2)

## 3. Working with movies

![cinema](https://media.giphy.com/media/l6mBchxYZc7Sw/giphy.gif)

**What the user sees:** One page (e.g. sections or cards) where every sub-task’s result is visible in the browser: short titles, long titles, 1980s count, tagged movies, ratings over 6, keyword count, duplicated-word titles, and optionally average rating and Good/Average/Bad counts.

Copy the movies array from [movies](./session-materials/movies.js) and use it for the tasks below.

1. Create an array of movies containing the **movies with a short title** (you define what short means)
2. Create an array of movie titles with **long movie titles**
3. Count the **number of movies** made between 1980-1989 (including both the years)
4. Create a new array that has an **extra key called tag**. The tag is based on the rating: Good (>= 7), Average (>= 4 and < 7), Bad (< 4)
5. Using chaining, first filter the movies array to only contain the movies rated higher than 6. Now map the movies array to only the rating of the movies.
6. **Count the total number of movies** containing any of following keywords: `Surfer`, `Alien` or `Benjamin`. So if there were 3 movies that contained `Surfer`, 1 with `Alien` and 2 with `Benjamin`, you would return 6. Can you make sure the search is case insensitive?
7. Create an array of movies where a **word in the title is duplicated**. e.g. "Star **Wars**: The Clone **Wars**" the word **Wars** is duplicated. Here are some made-up examples of movies with duplicated words in the title: "**The** three men and **the** pistol", "**Chase** three - The final **chase**"
8. Calculate the **average rating** of all the movies using `.reduce()` _Optional_
9. **Count the total number** of Good, Average and Bad movies using `.reduce()`. A return could be e.g. `{goodMovies: 33, averageMovies: 45, goodMovies: 123}` _Optional_
