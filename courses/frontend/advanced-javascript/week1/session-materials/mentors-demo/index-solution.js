// =============================================================================
// DATA
// =============================================================================

const mentors = [
  { name: "Abed Sujan", subjects: ["JS", "HTML", "CSS", "NODEJS"], yearOfExperience: 4 },
  { name: "Ahmed Magdy", subjects: ["JS", "Database", "CSS"], yearOfExperience: 1 },
  { name: "Alicia Gonzales", subjects: ["DB", "HTML", "NODEJS"], yearOfExperience: 8 },
  { name: "allan Thraen", subjects: ["REACT", "HTML", "CSS"], yearOfExperience: 3 },
  { name: "Anders Ravn", subjects: ["JS", "HTML", "NODEJS"], yearOfExperience: 2 },
  { name: "Daniel Fernandes", subjects: ["Database", "HTML", "CSS"], yearOfExperience: 9 },
];

// =============================================================================
// HOMEMADE ARRAY FUNCTIONS (our own implementations)
// =============================================================================

function forEachHomemade(array, functionToExecute) {
  for (let i = 0; i < array.length; i++) {
    const currentItem = array[i];
    functionToExecute(currentItem, i);
  }
}

function mapHomemade(array, functionToExecute) {
  const mappedArray = [];

  for (let i = 0; i < array.length; i++) {
    const currentItem = array[i];
    const newItem = functionToExecute(currentItem, i);

    mappedArray.push(newItem);
  }

  return mappedArray;
}

function filterHomemade(array, functionToExecute) {
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
// RENDER HELPERS
// =============================================================================

function renderMentorCard(mentor) {
  const div = document.createElement("div");
  div.className = "card";

  const subjectSpans = mapHomemade(mentor.subjects, function (subject) {
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

function renderCards(mentorsToShow) {
  const container = document.getElementById("result");
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "cards";

  forEachHomemade(mentorsToShow, function (mentor) {
    wrapper.appendChild(renderMentorCard(mentor));
  });

  container.appendChild(wrapper);
}

function renderNamesList(names) {
  const container = document.getElementById("result");
  container.innerHTML = "";

  const div = document.createElement("div");
  div.className = `names-list${names.length === 0 ? " empty" : ""}`;
  div.textContent = names.length === 0 ? "No names." : names.join(", ");

  container.appendChild(div);
}

// =============================================================================
// DEMO ACTIONS (forEach, map, filter)
// =============================================================================

function showAllMentors() {
  document.getElementById("resultLabel").textContent = "Result: forEach – all mentors";

  renderCards(mentors);
}

function showNamesOnly() {
  document.getElementById("resultLabel").textContent = "Result: map – mentor names (array of strings)";

  const mentorNames = mapHomemade(mentors, function (mentor) {
    return mentor.name;
  });

  renderNamesList(mentorNames);
}

function showExperienced() {
  document.getElementById("resultLabel").textContent = "Result: filter – yearOfExperience > 7";

  const experiencedMentors = filterHomemade(mentors, function (mentor) {
    return mentor.yearOfExperience > 7;
  });

  renderCards(experiencedMentors);
}

function showNamesStartingWithA() {
  document.getElementById("resultLabel").textContent = 'Result: filter – name[0] === "A" (note: "allan" is lowercase)';

  const mentorsThatStartWithA = filterHomemade(mentors, function (mentor) {
    return mentor.name[0] === "A";
  });

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
