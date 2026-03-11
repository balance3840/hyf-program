import { teas } from "./teas.js";

// RECAP

// forEach
// map
// filter
// reduce ???

// teas.forEach((tea) => {
//   console.log(tea.name);
// })

// const mappedNames = teas.map((tea) => {
//   return tea.name;
// })
// console.log(mappedNames);
// console.log(teas.length);
// console.log(mappedNames.length);

// const filterTeas = teas.filter((tea) => {
//   return tea.origin === "Japan";
// })
// console.log(filterTeas.map(tea => tea.name));
// console.log(teas.length);
// console.log(filterTeas.length);

// filter 20 -> 4
// map 20 -> 20
// reduce 20 -> 1

// QUESTION: Please explain reduce

// reduce over all the teas to get the total stock count
// lets try with forEach first
let totalStockCount = 0
teas.forEach((tea) => {
  totalStockCount += tea.stockCount
})
console.log(totalStockCount);

// grab all the stockCounts
const stockCounts = teas.map(tea => tea.stockCount)
console.log(stockCounts);

// now reduce and do the same
const totalStockCountReduce = stockCounts.reduce((total, count) => {
  return total + count
}, 0)
console.log(totalStockCountReduce);

// reduce is walking through this array and internall keeping a total in a carry along variable
// and the new value from the array becomes the `count` variable
// [ initial_total=0 from `}, 0)` within reduce
//     150, total=0 , count=150 => new_total=150
//     200, total=150, count=200 => new_total=350
//     45, ...
//     180,...
//     90, ...
//     60,
//     220,
//     30,
//     175,
//     55,
//     140,
//     0,
//     85,
//     25,
//     110,
//     40,
//     250,
//     95,
//     0,
//     70, ... => new_total=2020
// ]

// you can also chain these commands
const chainedTotalStockCountReduce = teas
    .map(tea => tea.stockCount)
    .reduce((total, count) => {
        return total + count
    }, 0)
console.log(chainedTotalStockCountReduce);

// merge the map into the reduce
const allInOneTotalStockCountReduce = teas
    .reduce((total, tea) => {
        return total + tea.stockCount
    }, 0)
console.log(allInOneTotalStockCountReduce);

// .includes() example

const teamMember = [
    {name:"Christopher", favouriteFood: ["Pizza", "Falafel"]},
    {name:"Viktor", favouriteFood: ["Fries", "Falafel"]}
]

// the next 3 lines can almost be read out loud in natural language
// and one understands what it does
// Hint: No index, as iteration is implicit in map/filter/reduce
const friesEaters = teamMember.filter(member => {
    return member.favouriteFood.includes("Fries")
})
console.log(friesEaters)

// the next 5 lines can not really be read out load in natural lanuage
// and it is hard to reason about
const members =  []
for (let index = 0; index < teamMember.length; index++) {
    if(teamMember[index].favouriteFood.includes("Fries")) {
        members.push(teamMember[index])
    }
}
console.log(members)
