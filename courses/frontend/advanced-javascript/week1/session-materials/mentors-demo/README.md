# Mentors demo – forEach, map, filter

In-session demo for **Week 1** (Advanced JavaScript). A fixed list of mentors is shown in the page; four buttons run different array operations (forEach, map, filter, and chained filter). All output is rendered in the page. The goal is to implement the missing parts during the session using the normal array methods (`.forEach()`, `.map()`, `.filter()`), and to implement the "homemade" versions for demonstration.

---

## Files in this folder

| File | Purpose |
|------|--------|
| **index.js** | Worksheet for **implementing in class**. Contains data, render helpers, and stubs. Missing logic is marked with `// {TOPIC} TODO:` comments. Use this file when leading the session. |
| **index-solution.js** | Final implementation. |
| **index.html** | Page layout: four action buttons and a result area. Load this in a browser to run the demo. No edits needed. |
| **style.css** | Styles for cards, buttons, and layout. No edits needed. |

---

## Where to find tasks and how they are marked

All tasks are in **index.js**. They are marked with **TODO** comments so you can search for `TODO` in the file.

- **FOREACH TODO** – Implement the homemade `forEach` (demonstration only) and/or the logic in `renderCards` that shows all mentors as cards (using `.forEach()`).
- **MAP TODO** – Implement the homemade `map` (demonstration only) and/or the logic in `showNamesOnly` that builds an array of mentor names and passes it to `renderNamesList` (using `.map()`).
- **FILTER TODO** – Implement the homemade `filter` (demonstration only) and/or the logic in `showExperienced` that keeps only mentors with `yearOfExperience > 7` (using `.filter()`).
- **CHAINING TODO** – In `showNamesStartingWithA`, implement filtering with multiple conditions (e.g. name starts with `"A"` and `yearOfExperience > 2`), using chained `.filter()` or a single `.filter()` with both conditions.

---

## How the code works

### Main HTML elements (index.html)

- **`.actions`** – Wrapper around the four buttons. Each button calls `setActive(this)` and one of: `showAllMentors()`, `showNamesOnly()`, `showExperienced()`, `showNamesStartingWithA()`.
- **`#resultLabel`** – Text that describes the current result (e.g. “Result: forEach – all mentors”).
- **`#result`** – Container where the output is rendered: either a grid of mentor cards or a comma-separated list of names.

### Main render functions (index.js)

- **`renderMentorCard(mentor)`** – Creates one card element for a mentor: name, years of experience, and subjects (using `.map()` on `mentor.subjects`). Returns a `div.card`; does **not** append it to the page.
- **`renderNamesList(names)`** – Clears `#result`, then shows the `names` array as comma-separated text in a single element. If `names` is empty, shows `"No names."`.
- **`renderCards(mentorsToShow)`** – Clears `#result`, creates a wrapper `div.cards`, then should append one card per mentor by calling `renderMentorCard(mentor)` for each and appending to the wrapper. The wrapper is then appended to `#result`. This is the **forEach** example: use `mentorsToShow.forEach(...)` to add every card.
- **`setActive(clickedBtn)`** – Removes the `active` class from all `.actions` buttons and adds it to the clicked button (for styling the selected action).

### Data and demo flow

- **`mentors`** – Array of mentor objects, each with `name`, `subjects` (array of strings), and `yearOfExperience` (number).
- **Demo actions** – `showAllMentors()`, `showNamesOnly()`, `showExperienced()`, `showNamesStartingWithA()`. See the code for what each does.

On load, `showAllMentors()` runs so the page initially shows all mentors as cards.
