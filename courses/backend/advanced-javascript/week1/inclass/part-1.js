import { teas } from "./teas.js";

// ex 1
teas.forEach(function (tea) {
  console.log(tea.name);
});

// ex 2
teas.forEach(function (tea) {
  const displayName = `${tea.name} (${tea.origin})`;
  console.log(displayName);
});

// ex 3
let count = 0;
teas.forEach(function (tea) {
  if (tea.organic) {
    count++;
  }
});
console.log(count);

let count2 = 0;
teas
  .filter(function (tea) {
    return tea.organic;
  })
  .forEach(function (tea) {
    count2++;
  });
console.log(count2);
