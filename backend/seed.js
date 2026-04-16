require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'Gourmet Parfait',
    price: 6000,
    image: 'Parfait2.png',
    description: 'Creamy yogurt, seasonal berries, and house-made granola crunch. Large Size.',
    stock: 50
  },
  {
    name: 'Chicken Salad',
    price: 7000,
    image: 'chicken salad.jpg',
    description: 'Perfect mixture of cooked chicken and vegetables.',
    stock: 20
  },
  {
    name: 'Banana Bread',
    price: 4000,
    image: 'banana bread2.jpg',
    description: 'Special banana bread with dark chocolate toppings.',
    stock: 30
  },
  {
    name: 'Fruit Bowls',
    price: 3500,
    image: 'Parfait2.png',
    description: 'Fresh seasonal fruits.',
    stock: 40
  },
  {
    name: 'Greek Yogurt',
    price: 3800,
    image: 'Parfait2.png',
    description: 'Plain greek yogurt.',
    stock: 30
  },
  {
    name: 'Pineapple Juice',
    price: 2500,
    image: 'pineapple.png',
    description: '100% natural cold-pressed juice.',
    stock: 60
  },
  {
    name: '500 ml Watermelon Juice',
    price: 2500,
    image: 'watermelon.jpeg',
    description: '100% natural cold-pressed watermelon juice.',
    stock: 50
  },
  {
    name: '500 ml Pineapple Juice',
    price: 3000,
    image: 'pineapple.jpeg',
    description: '100% natural cold-pressed pineapple juice.',
    stock: 50
  },
  {
    name: 'Ginger Shot',
    price: 2000,
    image: 'ginger.jpeg',
    description: 'Fresh ginger shot.',
    stock: 50
  },
  {
    name: '450ml Parfait',
    price: 6000,
    image: 'Parfait2.png',
    description: 'Creamy yogurt, seasonal berries, and granola.',
    stock: 50
  },
  {
    name: '355ml Parfait',
    price: 5000,
    image: 'Parfait2.png',
    description: 'Creamy yogurt, seasonal berries, and granola.',
    stock: 50
  },
  {
    name: '550ml Parfait',
    price: 8000,
    image: 'Parfait2.png',
    description: 'Creamy yogurt, seasonal berries, and granola.',
    stock: 50
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Seeding data...');
    try {
      await Product.deleteMany(); // Clear existing
      await Product.insertMany(products);
      console.log('Data seeded successfully!');
      process.exit();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('Failed to connect', err);
    process.exit(1);
  });
