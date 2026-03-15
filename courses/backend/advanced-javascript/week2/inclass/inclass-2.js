import { teas } from "./teas.js";
import _ from "lodash";

const keys = Object.keys(teas[0])

// console.log(teas)
console.log(keys)

const arrayTeas = teas.map(tea => {
    return keys.map(key => tea[key])
})

console.log(arrayTeas[0])

const zippedTeas = _.zip(...arrayTeas);

console.log(keys[0])
console.log(zippedTeas[0])

console.log(keys[1])
console.log(zippedTeas[1])
