# Exercises

Work through these in order.

### 1. Create a user class

The class should have 2 properties: `firstName` and `lastName`. Hint: Use `this` and `constructor`.

### 2. Create an instance of the class

Use the `new` keyword and assign the instance in a variable.

Add a **`renderUserCard(user)`** function that accepts a **`User`** instance and renders a user card on the page (e.g. a `div` with `firstName` and `lastName`).

### 3. Create a class method

1. Add **`getFullName`**: it should return the combined first and last name of the user. Use string concatenation or template literals and **`this`** to read the properties.

2. Add **`render()`** on **`User`**: it should render the user card on the page (same job as **`renderUserCard(user)`** in exercise 2, but as an instance method). Use **`this.getFullName()`** for the name you show on the card.

3. Call **`myUser.render()`** so the card appears on the page (you can stop using **`renderUserCard`** once this works).

### 4. Creating a CV class

The CV that we will be making uses three classes: `Job`, `Education` and
`CV`. The `CV` class we have made for you (with some missing functionality). The `Job` and `Education` classes you need to create.

#### Part 1

Create the classes `Job` and `Education`.

- `Job` has five properties: `id`, `title`, `description`, `startDate` and `endDate` (the dates can be strings or actual `Date` objects).
- `Education` has six properties: `id`, `title`, `school`, `address`, `startDate` and `endDate`.

```js
class Job {
  ///...
}

class Education {
  ///...
}
```

#### Part 2

Now add the functionality for the methods in the `CV` class.

_Remember_: jobs and educations are just arrays of class instances. So use your array manipulation knowledge for the add and remove methods.

```js
class CV {
  constructor(email) {
    this.jobs = [];
    this.educations = [];
    //this.email = ?
  }

  addJob(job) {
    // add functionality here
  }

  removeJob(job) {
    // add functionality here
  }

  addEducation(education) {
    // add functionality here
  }

  removeEducation(education) {
    // add functionality here
  }
}
```

#### Part 3

1. Create a new `CV` instance using the `new` keyword, and save it in a variable called `myCV`.

2. Apply the methods you have created on the `myCV` object. Create a few `Job` and `Education` objects and add them to your CV.

3. Remove a job and an education from `myCV`.

4. Log `myCV` to the console, again, and check that the objects were removed correctly.

#### Part 4

Add a method to the `CV` class called `renderCV()`. This method should render out the CV using HTML. Make sure, that view updates, when data is changed.
