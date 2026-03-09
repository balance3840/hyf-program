# Exercises

Work in the [Listings demo](./listings-demo/). Open **index.html** in your browser to run the demo, and open **index.js** in your IDE to implement the tasks. In `index.js`, search for **`Task`** (e.g. Task 1.1, Task 2)—each task has a comment with explicit instructions about what code to write. This document describes the **end-result** you’re aiming for and how the exercise is set up. The generation of random listings and the render helpers (cards, price list) are already implemented; you only need to call them and add the logic that uses `.forEach()`, `.map()`, and `.filter()`.

## Task 1: Generate and show listings (`forEach`)

**What should happen:** When the user clicks **Generate listings (37) — Task 1**, 37 random listings are generated and displayed as cards on the page.

**Listing** (each object in the generated array):

| Property     | Type     | Description                                                 |
| ------------ | -------- | ----------------------------------------------------------- |
| `type`       | string   | e.g. `"House"`, `"Apartment"`, `"Shed"`, `"Dorm"`, `"Farm"` |
| `facilities` | string[] | e.g. `["Parkering", "Have"]`                                |
| `price`      | number   | 1–10000                                                     |
| `hasGarden`  | boolean  |                                                             |
| `size`       | number   | m², 12–1000                                                 |
| `img`        | string   | image URL                                                   |

You implement the logic that (1) triggers generation and (2) renders the listings by iterating over the array and adding one card per listing. The code that builds each card and prepares the view is already there; you use `listings.forEach(...)` to show every listing.

## Task 2: Show prices (`map`)

**What should happen:** After generating listings, when the user clicks **Show prices — Task 2**, a list of all listing prices appears (e.g. comma-separated) in the prices area.

You implement getting an array of prices from the current listings and passing it to the helper that displays numbers. Use `.map()` to turn the list of listings into a list of prices.

## Task 3: Filter buttons (`filter`)

**What should happen:** When the user clicks one of the filter buttons, the page shows only the matching listings (or their prices).

- **Cheap listings — Task 3a:** Only “cheap” listings are shown as cards. You decide what “cheap” means (e.g. price below a certain number). Use `.filter()` and then the same render-as-cards logic as in Task 1.
- **Expensive prices — Task 3b:** Only the _prices_ of “expensive” listings are shown (as numbers). Use `.filter()` to get expensive listings, then `.map()` to get their prices, and the helper that displays numbers.
- **With parking — Task 3c:** Only listings that have “Parkering” in their facilities are shown as cards. Use `.filter()` on the facilities.

## Task: Arrow functions

Rewrite the code you wrote for Tasks 1–3 to use arrow function syntax instead of `function`.

## Task 4: Advanced filters (Listing project)

**What should happen:** The user can set type, min price, min size, facilities, and garden in the Advanced filters form. When they click **Apply filters — Task 4**, only listings that match _all_ selected criteria are shown as cards.

You implement **filterListings(listings, filter)**. Reading the form and building the `filter` object is already done; you receive an object with only the fields the user set. Return only listings that match every property present in `filter`. If a property is missing from `filter`, don’t filter by it.

**Filter** (object passed to `filterListings`; only set fields are present):

| Property     | Type     | Meaning                                                       |
| ------------ | -------- | ------------------------------------------------------------- |
| `type`       | string   | `listing.type` must equal this.                               |
| `minPrice`   | number   | `listing.price` must be ≥ this.                               |
| `minSize`    | number   | `listing.size` must be ≥ this (m²).                           |
| `hasGarden`  | boolean  | If `true`, `listing.hasGarden` must be `true`.                |
| `facilities` | string[] | `listing.facilities` must include every string in this array. |
