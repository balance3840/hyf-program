import { teas } from "./teas.js";

function myFilter(array, callback) {
    // return array.filter(callback)
    const filteredElements = []
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if(callback(element)){
            filteredElements.push(element)
        }
    }
    return filteredElements
}

// Test it:
const organic = myFilter(teas, function (tea) {
  return tea.organic;
});
console.log(organic.length); // number of organic teas