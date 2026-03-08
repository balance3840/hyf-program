# Exercises

Work in the [Listings demo](./listings-demo/) in session materials. Open `index.js` and implement the tasks there. Use the **Generate listings (37)** button to get data.

## `forEach`

**Task 1** in the demo: implement `generateAndRenderListings` (assign `generateListings(37)` to `currentListings`, then call `renderListings(currentListings)`), and implement `renderListings`: use `prepareListingsView(listings)`, then **`listings.forEach(...)`** to add one card per listing with `renderListingCard(listing)`. Click **Generate listings (37)** to see your result.

## `map`

**Task 2** in the demo: implement `showPrices`: use **`map`** to create an array of prices from `currentListings`, then display it in the `#prices` element. Click Generate first, then **Show prices**.

## `filter`

**Task 3** in the demo (Filters block – three buttons):

- **3a. Cheap listings:** implement `showCheapListings`: use **`filter`** to get listings that are "cheap" (you define the condition, e.g. price below a number). Result: array of **objects**. Call `renderListings` with that array.
- **3b. Expensive prices:** implement `showExpensivePrices`: use **`filter`** to get expensive listings, then **`map`** to get an array of their prices. Result: array of **numbers**. Display it in `#expensive-prices`.
- **3c. With parking:** implement `showListingsWithParking`: use **`filter`** to get listings that have "Parkering" in `facilities`. Result: array of **objects**. Call `renderListings` with that array.

## Arrow functions

Rewrite the code above (`forEach`, `map` and `filter`) to arrow functions.

## Listing project

**Task 4** in the demo (Advanced filters block): implement **filterListings(listings, filter)** only. Reading the form and building the filter object is already done for you.

**Filter object format** (the second argument you receive): an object with only the fields the user set. Possible properties:

| Property        | Type      | Meaning |
|----------------|-----------|---------|
| `filter.type`  | string    | Listing type must equal this (e.g. `"Farm"`, `"House"`). |
| `filter.minPrice` | number | Listing price must be ≥ this. |
| `filter.minSize`  | number | Listing size (m²) must be ≥ this. |
| `filter.hasGarden` | boolean | If `true`, listing must have a garden. |
| `filter.facilities` | string[] | Listing must have **every** facility in this array (e.g. `["Parkering", "Have"]`). |

If a property is missing from `filter`, do not filter by it. Return only listings that match **every** present property.

Click Generate, set the Advanced filters, then **Apply filters**. You can use arrow functions.
