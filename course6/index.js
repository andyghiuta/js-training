function priceAfterTax(productPrice) {
  return (productPrice * 0.20) + productPrice;
}
console.log(priceAfterTax(100));
console.log(priceAfterTax(100));

var tax = 20;
function calculateTax(productPrice) {
  return (productPrice * (tax/100)) + productPrice;
}
calculateTax(100);
tax = 25
calculateTax(100);

function greaterThan(n) {
  // return a function
  return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// → true

function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));

function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

console.log(
  average(
    [8,9,10,11,12]
      .filter(greaterThan10)
      .map(priceAfterTax)
  )
);


const items = [{ price: 10 }, { price: 15 }, { price: 20 }];

const itemsWithTax = items.map(item => {
  item.price = priceAfterTax(item.price);
  return item
});
console.log(itemsWithTax); // [{"price":12},{"price":18},{"price":24}]
console.log(items); // [{"price":12},{"price":18},{"price":24}] // WUT?

const items2 = [{ price: 10 }, { price: 15 }, { price: 20 }];

const items2WithTax = items2.map(item => {
  return Object.assign({}, item, { price: priceAfterTax(item.price) })
});
console.log(items2WithTax); // [{"price":12},{"price":18},{"price":24}]
console.log(items2); // [{"price":12},{"price":18},{"price":24}] // WUT?
