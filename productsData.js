// This file holds the static product catalog for Ray's Kitchen, allowing for instant loading without a database call.
const products = [
  {
    _id: '1',
    name: 'Gourmet Parfait',
    price: 6000,
    image: 'Parfait2.png',
    description: 'Creamy yogurt, seasonal berries, and house-made granola crunch. Large Size.',
    stock: 50
  },
  {
    _id: '2',
    name: 'Chicken Salad',
    price: 7000,
    image: 'chicken salad.jpg',
    description: 'Perfect mixture of cooked chicken and vegetables.',
    stock: 20
  },
  {
    _id: '3',
    name: 'Banana Bread',
    price: 4000,
    image: 'banana bread2.jpg',
    description: 'Special banana bread with dark chocolate toppings.',
    stock: 30
  },
  {
    _id: '4',
    name: 'Fruit Bowls',
    price: 3500,
    image: 'Parfait2.png',
    description: 'Fresh seasonal fruits.',
    stock: 40
  },
  {
    _id: '5',
    name: 'Greek Yogurt',
    price: 3800,
    image: 'Parfait2.png',
    description: 'Plain greek yogurt.',
    stock: 30
  },
  {
    _id: '6',
    name: 'Pineapple Juice',
    price: 2500,
    image: 'pineapple.png',
    description: '100% natural cold-pressed juice.',
    stock: 60
  },
  {
    _id: '7',
    name: '500 ml Watermelon Juice',
    price: 2500,
    image: 'watermelon.jpeg',
    description: '100% natural cold-pressed watermelon juice.',
    stock: 50
  },
  {
    _id: '8',
    name: '500 ml Pineapple Juice',
    price: 3000,
    image: 'pineapple.jpeg',
    description: '100% natural cold-pressed pineapple juice.',
    stock: 50
  },
  {
    _id: '9',
    name: 'Ginger Shot',
    price: 2000,
    image: 'ginger.jpeg',
    description: 'Fresh ginger shot.',
    stock: 50
  },
  {
    _id: '10',
    name: '450ml Parfait',
    price: 6000,
    image: 'Parfait2.png',
    description: 'Creamy yogurt, seasonal berries, and granola.',
    stock: 50
  },
  {
    _id: '11',
    name: '355ml Parfait',
    price: 5000,
    image: 'Parfait2.png',
    description: 'Creamy yogurt, seasonal berries, and granola.',
    stock: 50
  },
  {
    _id: '12',
    name: '550ml Parfait',
    price: 8000,
    image: 'Parfait2.png',
    description: 'Creamy yogurt, seasonal berries, and granola.',
    stock: 50
  }
];

// If in browser, make it available globally
if (typeof window !== 'undefined') {
  window.products = products;
}

// If in Node.js, export it
if (typeof module !== 'undefined' && module.exports) {
  module.exports = products;
}
