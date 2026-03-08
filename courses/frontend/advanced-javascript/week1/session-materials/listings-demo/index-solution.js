// =============================================================================
// DATA & HELPERS
// =============================================================================

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateListings(numberOfListings) {
  const listings = [];
  const listingType = ["House", "Apartment", "Shed", "Dorm", "Farm"];
  const listingFacilities = ["Parkering", "Elevator", "Altan", "Have", "Husdyr"];

  for (let i = 0; i < numberOfListings; i++) {
    const listing = {};
    const randomTypeIndex = randomIntFromInterval(0, listingType.length - 1);
    const numberOfFacilities = randomIntFromInterval(1, listingFacilities.length - 1);
    const facilities = [];
    for (let j = 0; j < numberOfFacilities; j++) {
      const randomIndexFacilities = randomIntFromInterval(0, listingFacilities.length - 1);
      const randomFacility = listingFacilities[randomIndexFacilities];
      if (!facilities.includes(randomFacility)) {
        facilities.push(randomFacility);
      }
    }
    listing.type = listingType[randomTypeIndex];
    listing.facilities = facilities;
    listing.price = randomIntFromInterval(1, 10000);
    listing.hasGarden = Boolean(randomIntFromInterval(0, 1));
    listing.size = randomIntFromInterval(12, 1000);
    listing.img = `https://loremflickr.com/200/200/${listing.type}`;
    listings.push(listing);
  }
  return listings;
}

// =============================================================================
// RENDER
// =============================================================================

/**
 * Build one card element for a single listing. Helper – already implemented.
 * @param {Object} listing - One listing object (type, price, size, hasGarden, facilities, img)
 * @returns {HTMLElement} A div.card element
 */
function renderListingCard(listing) {
  const card = document.createElement("div");
  card.className = "card";
  const badgeClass = function (f) {
    return f === "Have" ? " garden" : "";
  };
  const badgesHtml = listing.facilities
    .map(function (f) {
      return '<span class="badge' + badgeClass(f) + '">' + f + "</span>";
    })
    .join("");
  card.innerHTML =
    '<div class="card-image">' +
    (listing.img ? '<img src="' + listing.img + '" alt="" loading="lazy">' : listing.type) +
    "</div>" +
    '<div class="card-body">' +
    '<div class="card-type">' + listing.type + "</div>" +
    '<div class="card-price">' + listing.price.toLocaleString() + " kr</div>" +
    '<div class="card-meta">' + listing.size + " m²" + (listing.hasGarden ? " · Garden" : "") + "</div>" +
    '<div class="card-facilities">' + badgesHtml + "</div>" +
    "</div>";
  return card;
}

/**
 * Update count and empty state, clear the cards container. Returns the #cards container if there
 * are listings to render, or null if not (so you can return early).
 * Use this at the start of renderListings.
 * @param {Array} listings
 * @returns {HTMLElement|null} The #cards container, or null when listings.length === 0
 */
function prepareListingsView(listings) {
  const container = document.getElementById("cards");
  const countEl = document.getElementById("count");
  const emptyEl = document.getElementById("empty");

  countEl.textContent = listings.length + " listing" + (listings.length !== 1 ? "s" : "");

  if (listings.length === 0) {
    container.innerHTML = "";
    if (emptyEl) {
      emptyEl.textContent = "No listings.";
      emptyEl.style.display = "block";
    }
    return null;
  }

  if (emptyEl) {
    emptyEl.style.display = "none";
  }

  container.innerHTML = "";

  return container;
}

/**
 * Render the listings array into #cards. Uses prepareListingsView, then forEach to append cards.
 */
function renderListings(listings) {
  const container = prepareListingsView(listings);
  if (!container) {
    return;
  }

  listings.forEach(function (listing) {
    const card = renderListingCard(listing);
    container.appendChild(card);
  });
}

// =============================================================================
// STATE
// =============================================================================

/** Last generated listings; used by Show prices (Task 2) and filter (Task 3). */
let currentListings = [];

function generateAndRenderListings() {
  currentListings = generateListings(37);
  renderListings(currentListings);
}

/**
 * Show prices using map: create array of prices from currentListings, display in #prices.
 */
function showPrices() {
  const prices = currentListings.map(function (listing) {
    return listing.price;
  });
  const pricesEl = document.getElementById("prices");
  pricesEl.textContent = prices.length > 0 ? prices.join(", ") + " kr" : "Generate listings first.";
}

/**
 * Show cheap listings (price < 2000). Filter, then renderListings. Result: array of objects.
 */
function showCheapListings() {
  const cheap = currentListings.filter(function (listing) {
    return listing.price < 2000;
  });
  renderListings(cheap);
}

/**
 * Show expensive listings' prices only. Filter expensive, map to price. Result: array of numbers. Display in #expensive-prices.
 */
function showExpensivePrices() {
  const expensiveListings = currentListings.filter(function (listing) {
    return listing.price > 5000;
  });
  const prices = expensiveListings.map(function (listing) {
    return listing.price;
  });
  const el = document.getElementById("expensive-prices");
  el.textContent = prices.length > 0 ? prices.join(", ") + " kr" : "Generate listings first.";
}

/**
 * Show only listings that have parking (Parkering in facilities). Filter, then renderListings. Result: array of objects.
 */
function showListingsWithParking() {
  const withParking = currentListings.filter(function (listing) {
    return listing.facilities.includes("Parkering");
  });
  renderListings(withParking);
}

// =============================================================================
// ADVANCED FILTERS (Task 4 – Listing project)
// =============================================================================

/**
 * Read Advanced filters form and return a filter object. Only includes set values.
 * Filter object format: { type?, minPrice?, minSize?, hasGarden?, facilities? } – see filterListings.
 */
function getFilterFromForm() {
  const type = document.getElementById("advType").value || undefined;
  const minPriceRaw = document.getElementById("advMinPrice").value;
  const minPrice = minPriceRaw === "" ? undefined : parseInt(minPriceRaw, 10);
  const minSizeRaw = document.getElementById("advMinSize").value;
  const minSize = minSizeRaw === "" ? undefined : parseInt(minSizeRaw, 10);
  const hasGarden = document.getElementById("advHasGarden").checked || undefined;
  const facilityCheckboxes = document.querySelectorAll('input[name="advFacility"]:checked');
  const facilities = Array.from(facilityCheckboxes).map(function (cb) {
    return cb.value;
  });

  const filter = {};
  if (type) {
    filter.type = type;
  }
  if (minPrice != null && !isNaN(minPrice)) {
    filter.minPrice = minPrice;
  }
  if (minSize != null && !isNaN(minSize)) {
    filter.minSize = minSize;
  }
  if (hasGarden) {
    filter.hasGarden = true;
  }
  if (facilities.length > 0) {
    filter.facilities = facilities;
  }

  return filter;
}

/**
 * Return only listings that match every property in filter.
 * Filter object: type (string), minPrice (number), minSize (number), hasGarden (boolean), facilities (string[]).
 * Only present keys are applied; listing must match all present criteria.
 */
function filterListings(listings, filter) {
  return listings.filter(function (listing) {
    if (filter.type && listing.type !== filter.type) {
      return false;
    }
    if (filter.minPrice != null && listing.price < filter.minPrice) {
      return false;
    }
    if (filter.minSize != null && listing.size < filter.minSize) {
      return false;
    }
    if (filter.hasGarden && !listing.hasGarden) {
      return false;
    }
    if (filter.facilities && filter.facilities.length > 0) {
      for (let i = 0; i < filter.facilities.length; i++) {
        if (!listing.facilities.includes(filter.facilities[i])) {
          return false;
        }
      }
    }
    return true;
  });
}

function applyAdvancedFilters() {
  const filter = getFilterFromForm();
  const filtered = filterListings(currentListings, filter);

  renderListings(filtered);
}
