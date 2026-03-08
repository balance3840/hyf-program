import { teas } from "./teas.js";

const greenTea = teas
  .filter(function (tea) {
    return tea.type === "green";
  })
  .map(function (tea) {
    return tea.name;
  });
console.log(greenTea);

const displayOrganicTeas = teas
  .filter(function (tea) {
    return tea.organic;
  })
  .map(function (tea) {
    const price = Math.round(tea.pricePerGram * 100);
    return `${tea.name} - ${price} DKK/100g`;
  });
console.log(displayOrganicTeas);

const sortedPriceJapaneseTeas = teas
  .filter(function (tea) {
    return tea.origin === "Japan";
  })
  .sort((a, b) => a.pricePerGram - b.pricePerGram);
console.log(sortedPriceJapaneseTeas.map((d) => d.pricePerGram));
// console.log(sortedPriceJapaneseTeas)
