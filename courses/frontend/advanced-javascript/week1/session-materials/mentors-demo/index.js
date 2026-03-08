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
// HOMEMADE ARRAY FUNCTIONS (our own implementations)
// =============================================================================

/**
 * Executes function for each item in the array, NO RETURN!
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 */
function forEachHomemade(array, functionToExecute) {}

/**
 * Changes/transforms the items in the array. Returns a new array with the transformed items.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 */
function mapHomemade(array, functionToExecute) {}

/**
 * Changes the number of items in the array based on a condition. Returns a new array with only the items that satisfy the condition.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */
function filterHomemade(array, functionToExecute) {}

// =============================================================================
// RENDER HELPERS
// =============================================================================

function renderMentorCard(mentor) {}

function renderCards(mentorsToShow) {}

function renderNamesList(names) {}

// =============================================================================
// DEMO ACTIONS (forEach, map, filter)
// =============================================================================

function showAllMentors() {
  document.getElementById("resultLabel").textContent =
    "Result: forEach – all mentors";

  renderCards(mentors);
}

function showNamesOnly() {
  document.getElementById("resultLabel").textContent =
    "Result: map – mentor names (array of strings)";

  const mentorNames = [];

  renderNamesList(mentorNames);
}

function showExperienced() {
  document.getElementById("resultLabel").textContent =
    "Result: filter – yearOfExperience > 7";

  const experiencedMentors = mentors;

  renderCards(experiencedMentors);
}

function showNamesStartingWithA() {
  document.getElementById("resultLabel").textContent =
    'Result: filter – name[0] === "A" (note: "allan" is lowercase)';

  const mentorsThatStartWithA = mentors;

  renderCards(mentorsThatStartWithA);
}

// =============================================================================
// BUTTON ACTIVE STATE (called from onclick in HTML)
// =============================================================================

function setActive(clickedBtn) {
  const buttons = document.querySelectorAll(".actions button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  clickedBtn.classList.add("active");
}

// Default: show all mentors on load
showAllMentors();
