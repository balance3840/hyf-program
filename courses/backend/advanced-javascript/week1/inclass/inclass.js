import { teas } from "./teas.js";

console.log("Hello World!");
console.log(teas);

// this is a evil side effect
let evil = 1;

function getTeaOrigin(tea) {
  const origin = tea.origin;
  // here the evil side effect
  // is doing evil things
  evil = evil + 1;
  return origin + evil;
}

const teaOrigins = teas.map(getTeaOrigin);
console.log(teaOrigins);

const teaMedium = teas.filter(function (tea) {
  return tea.caffeineLevel === "medium";
});
console.log(teaMedium);

const teaMediumOrigin = teas
  .filter(function (tea) {
    return tea.caffeineLevel === "medium";
  })
  .map(getTeaOrigin);
console.log(teaMediumOrigin);

teas.forEach(function (tea) {
  const display = `${tea.name} is a ${tea.caffeineLevel} tea from ${tea.origin}`;
  console.log(display);
});
