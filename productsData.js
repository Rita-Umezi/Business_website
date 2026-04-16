// This file holds the static product catalog for Ray's Kitchen, allowing for instant loading without a database call.
const products = [

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
    image: '450 ml parfait.jpeg',
    description: 'Creamy yogurt, seasonal berries, and granola.',
    stock: 50
  },
  {
    _id: '11',
    name: '355ml Parfait',
    price: 5000,
    image: '355ml parfait.jpeg',
    description: 'Creamy yogurt, seasonal berries, and granola.',
    stock: 50
  },
  {
    _id: '12',
    name: '550ml Parfait',
    price: 8000,
    image: '550ml parfait.jpeg',
    description: 'Creamy yogurt, seasonal berries, and granola.',
    stock: 50
  },
  {
    _id: '13',
    name: 'Food Tray',
    price: 0,
    image: 'food tray.jpg',
    description: 'A delicate assortment for events. (Price TBD)',
    stock: 20
  },
  {
    _id: '14',
    name: 'Sweetened Yogurt',
    price: 0,
    image: 'sweetend yogurt.jpg',
    description: 'Sweet and creamy yogurt. (Price TBD)',
    stock: 30
  },
  {
    _id: '15',
    name: 'Unsweetened Yogurt',
    price: 0,
    image: 'white.png',
    description: 'Fresh and plain yogurt. (Price TBD)',
    stock: 30
  },
  {
    _id: '16',
    name: 'Granola',
    price: 0,
    image: 'granola.png',
    description: 'Crunchy nut mix. (Price TBD)',
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
