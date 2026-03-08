import { teas } from "./teas.js";

// console.log(data[0])

// ex 4
const names = teas.map(function (tea) {
  return tea.name;
});
console.log(names);

// ex 5
// the solution has been adapted to
// be useful for ex 6
function calcPrice(tea) {
  // return Math.round(tea.pricePerGram * 100)
  const price = Math.round(tea.pricePerGram * 100);

  // the `...tea` spread operation
  // is doing the folloing:
  // return {
  //     id:tea.id,
  //     name:tea.name,
  //     type:tea.type,
  //     ...
  //     price:price,
  // }

  return { ...tea, price };
}
const teaWithPrices = teas.map(calcPrice);
console.log(teaWithPrices);

// ex 6 - "Sencha - 12 DKK/100g"
const displayNamePrices = teas.map(calcPrice).map(function (tea) {
  return `${tea.name} - ${tea.price} DKK/100g`;
});
console.log(displayNamePrices);
