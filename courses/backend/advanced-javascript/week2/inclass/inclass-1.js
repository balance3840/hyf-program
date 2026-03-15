import { teas } from "./teas.js";

const filterTeas = (teas, criteria) => {
    return teas.filter(tea => Object.keys(criteria)
      .every(key => tea[key] === criteria[key])
    )
}

const result = filterTeas(teas, {organic: true, origin: "Japan"})
console.log(result.map(tea => tea.name))
