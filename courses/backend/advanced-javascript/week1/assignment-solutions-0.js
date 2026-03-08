import { teas } from "../data/teas.js";

// ============================================================
// Exercise 1: Rewrite with Array Methods
// ============================================================
console.log("=== Exercise 1 ===");
const result = teas
  .filter((tea) => tea.caffeineLevel !== "none")
  .map((tea) => tea.name.toUpperCase());

console.log(result);

// ============================================================
// Exercise 2: Inventory Report
// ============================================================
console.log("\n=== Exercise 2 ===");
function inventoryReport(teas) {
  const inStock = teas.filter((t) => t.inStock).length;
  return {
    totalTeas: teas.length,
    inStock,
    outOfStock: teas.length - inStock,
    totalInventoryValue: teas.reduce(
      (sum, t) => sum + t.pricePerGram * t.stockCount,
      0
    ),
    averagePrice:
      teas.reduce((sum, t) => sum + t.pricePerGram, 0) / teas.length,
  };
}

console.log(inventoryReport(teas));

// ============================================================
// Exercise 3: Low Stock Alert
// ============================================================
console.log("\n=== Exercise 3 ===");
function lowStockAlert(teas) {
  return teas
    .filter((tea) => tea.stockCount < 50)
    .sort((a, b) => a.stockCount - b.stockCount)
    .map((tea) => ({ name: tea.name, stockCount: tea.stockCount }));
}

console.log(lowStockAlert(teas));

// ============================================================
// Exercise 4: Teas by Origin
// ============================================================
console.log("\n=== Exercise 4 ===");
function teasByOrigin(teas) {
  return teas.reduce((acc, tea) => {
    if (!acc[tea.origin]) {
      acc[tea.origin] = [];
    }
    acc[tea.origin].push(tea.name);
    return acc;
  }, {});
}

console.log(teasByOrigin(teas));

// ============================================================
// Exercise 5: Search Function
// ============================================================
console.log("\n=== Exercise 5 ===");
function searchTeas(teas, query) {
  return teas
    .filter((tea) => tea.name.toLowerCase().includes(query.toLowerCase()))
    .map((tea) => tea.name)
    .sort();
}

console.log(searchTeas(teas, "earl"));
console.log(searchTeas(teas, "dragon"));
console.log(searchTeas(teas, "ch"));

// ============================================================
// Exercise 6 (Optional): Total Inventory Value
// ============================================================
console.log("\n=== Exercise 6 ===");
const totalValue = teas.reduce((sum, tea) => {
  return sum + tea.pricePerGram * tea.stockCount;
}, 0);

console.log("Total inventory value:", totalValue);

// ============================================================
// Exercise 7 (Optional): Count by Type
// ============================================================
console.log("\n=== Exercise 7 ===");
const countByType = teas.reduce((counts, tea) => {
  counts[tea.type] = (counts[tea.type] || 0) + 1;
  return counts;
}, {});

console.log(countByType);
