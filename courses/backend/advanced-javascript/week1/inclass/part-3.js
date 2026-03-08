import { teas } from "./teas.js";

const organicTeas = teas.filter(function (tea) {
  return tea.organic;
});
console.log(organicTeas);

const japaneseTeas = teas.filter(function (tea) {
  return tea.origin === "Japan";
});
console.log(japaneseTeas);

const highCaffeinTeas = teas.filter(function (tea) {
  return tea.caffeineLevel === "high";
});
console.log(highCaffeinTeas.map((d) => d.name));

const inStockOrganicTeas = teas.filter(function (tea) {
  return tea.organic && tea.inStock;
});
console.log(inStockOrganicTeas.map((d) => d.name));
