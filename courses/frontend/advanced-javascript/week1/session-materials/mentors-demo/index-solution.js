// =============================================================================
// DATA
// =============================================================================

const mentors = [
  {
    name: "Abed Sujan",
    subjects: ["JS", "HTML", "CSS", "NODEJS"],
    yearOfExperience: 4,
  },
  {
    name: "Ahmed Magdy",
    subjects: ["JS", "Database", "CSS"],
    yearOfExperience: 1,
  },
  {
    name: "Alicia Gonzales",
    subjects: ["DB", "HTML", "NODEJS"],
    yearOfExperience: 8,
  },
  {
    name: "allan Thraen",
    subjects: ["REACT", "HTML", "CSS"],
    yearOfExperience: 3,
  },
  {
    name: "Anders Ravn",
    subjects: ["JS", "HTML", "NODEJS"],
    yearOfExperience: 2,
  },
  {
    name: "Daniel Fernandes",
    subjects: ["Database", "HTML", "CSS"],
    yearOfExperience: 9,
  },
];

// =============================================================================
// RENDER HELPERS (already implemented – go through with trainees)
// =============================================================================

/**
 * Create one card element for a mentor
 */
function renderMentorCard(mentor) {
  const div = document.createElement("div");
  div.className = "card";

  const subjectSpans = mentor.subjects.map(function (subject) {
    return `<span>${subject}</span>`;
  });
  const subjectsHtml = subjectSpans.join("");

  div.innerHTML = `
    <div class="card-name">${mentor.name}</div>
    <div class="card-experience">${mentor.yearOfExperience} years experience</div>
    <div class="card-subjects">${subjectsHtml}</div>
  `;

  return div;
}

/**
 * Clear #result and show names as comma-separated text (or "No names." if empty).
 */
function renderNamesList(names) {
  const container = document.getElementById("result");
  container.innerHTML = "";

  const div = document.createElement("div");
  div.className = `names-list${names.length === 0 ? " empty" : ""}`;
  div.textContent = names.length === 0 ? "No names." : names.join(", ");

  container.appendChild(div);
}

/**
 * Helper function to set the active button
 */
function setActive(clickedBtn) {
  const buttons = document.querySelectorAll(".actions button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  clickedBtn.classList.add("active");
}

// Default: show all mentors on load
showAllMentors();

// =============================================================================
// HOMEMADE ARRAY FUNCTIONS (implement these during the session for demostration)
// =============================================================================

/**
 * Executes function for each item in the array, NO RETURN!
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 */
function forEachHomemade(array, functionToExecute) {
  // FOREACH TODO: implement forEach
  for (let i = 0; i < array.length; i++) {
    const currentItem = array[i];
    functionToExecute(currentItem, i);
  }
}

/**
 * Changes/transforms the items in the array. Returns a new array with the transformed items.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 */
function mapHomemade(array, functionToExecute) {
  // MAP TODO: implement map
  const mappedArray = [];

  for (let i = 0; i < array.length; i++) {
    const currentItem = array[i];
    const newItem = functionToExecute(currentItem, i);

    mappedArray.push(newItem);
  }

  return mappedArray;
}

/**
 * Changes the number of items in the array based on a condition. Returns a new array with only the items that satisfy the condition.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */
function filterHomemade(array, functionToExecute) {
  // FILTER TODO: implement filter
  const filteredArray = [];

  for (let i = 0; i < array.length; i++) {
    const currentItem = array[i];
    const shouldKeepItemInNewArray = functionToExecute(currentItem, i);

    if (shouldKeepItemInNewArray) {
      filteredArray.push(currentItem);
    }
  }

  return filteredArray;
}

// =============================================================================
// DEMO ACTIONS (forEach, map, filter)
// =============================================================================

function renderCards(mentorsToShow) {
  const container = document.getElementById("result");
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "cards";

  // FOREACH TODO: implement showing all mentors as cards instead
  mentorsToShow.forEach(function (mentor) {
    wrapper.appendChild(renderMentorCard(mentor));
  });

  container.appendChild(wrapper);
}

function showAllMentors() {
  document.getElementById("resultLabel").textContent =
    "Result: forEach – all mentors";

  renderCards(mentors);
}

function showNamesOnly() {
  document.getElementById("resultLabel").textContent =
    "Result: map – mentor names (array of strings)";

  // MAP TODO: implement showing only the names of the mentors instead
  const mentorNames = mentors.map(function (mentor) {
    return mentor.name;
  });

  renderNamesList(mentorNames);
}

function showExperienced() {
  document.getElementById("resultLabel").textContent =
    "Result: filter – yearOfExperience > 7";

  // FILTER TODO: implement showing only the mentors with more than 7 years of experience instead
  const experiencedMentors = mentors.filter(function (mentor) {
    return mentor.yearOfExperience > 7;
  });

  renderCards(experiencedMentors);
}

function showNamesStartingWithA() {
  document.getElementById("resultLabel").textContent =
    'Result: filter (multiple conditions) – name starts with "A" and yearOfExperience > 2';

  // CHAINING TODO: implement – filter to name starts with "A", then filter to yearOfExperience > 2
  const mentorsThatStartWithA = mentors
    .filter(function (mentor) {
      return mentor.name[0] === "A"
    })
    .filter(function (mentor) {
      return mentor.yearOfExperience > 2;
    });

  renderCards(mentorsThatStartWithA);
}
