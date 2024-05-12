const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "Marty",
    email: "marty@nextjsmarket.com",
    password: "123456",
  },
  {
    id: "406db7ab-b53f-4d58-8e9f-026a4e68ffa3",
    name: "Evan",
    email: "evan@nextjsmarket.com",
    password: "654321",
  },
];

const categories = [
  {
    id: "88f985ec-6672-4340-a077-43420cae575d",
    name: "Furnitures",
    slug: "furnitures",
    emoji: "🧸",
    color: "rgb(16 185 129)",
  },
  {
    id: "cd219ee1-2039-44e9-ad81-13c6db35fff6",
    name: "Clothes",
    slug: "clothes",
    emoji: "👕",
    color: "rgb(244 63 94)",
  },
  {
    id: "43c0d4ec-e158-4e01-940f-381c78820c57",
    name: "Electronics",
    slug: "electronics",
    emoji: "🖥️",
    color: "rgb(234 179 8)",
  },
  {
    id: "b0532c15-aac1-409c-9c25-67d5e985c9cc",
    name: "Home",
    slug: "home",
    emoji: "🪑",
    color: "rgb(249 115 22)",
  },
];

const products = [
  {
    category_id: "43c0d4ec-e158-4e01-940f-381c78820c57", // Electronics
    name: "Smartphone",
    price: 499.99,
    image_url: "/products/smartphone.jpg",
    description: "A high-quality smartphone with advanced features.",
  },
  {
    category_id: "43c0d4ec-e158-4e01-940f-381c78820c57", // Electronics
    name: "Laptop",
    price: 999.99,
    image_url: "/products/laptop.jpg",
    description: "Powerful laptop for work and entertainment.",
  },
  {
    category_id: "43c0d4ec-e158-4e01-940f-381c78820c57", // Electronics
    name: "Headphones",
    price: 79.99,
    image_url: "/products/headphones.jpg",
    description: "Premium headphones with noise cancellation.",
  },
  {
    category_id: "b0532c15-aac1-409c-9c25-67d5e985c9cc", // Home
    name: "Coffee Maker",
    price: 49.99,
    image_url: "/products/coffee_maker.jpg",
    description: "A compact coffee maker for brewing delicious coffee.",
  },
  {
    category_id: "43c0d4ec-e158-4e01-940f-381c78820c57", // Electronics
    name: "Smartwatch",
    price: 199.99,
    image_url: "/products/smartwatch.jpg",
    description: "Stay connected with this stylish smartwatch.",
  },
  {
    category_id: "43c0d4ec-e158-4e01-940f-381c78820c57", // Electronics
    name: "Camera",
    price: 599.99,
    image_url: "/products/camera.jpg",
    description:
      "Capture your precious moments with this high-resolution camera.",
  },
  {
    category_id: "cd219ee1-2039-44e9-ad81-13c6db35fff6", // Clothes
    name: "Backpack",
    price: 39.99,
    image_url: "/products/backpack.jpg",
    description: "A durable backpack for everyday use.",
  },
  {
    category_id: "43c0d4ec-e158-4e01-940f-381c78820c57", // Electronics
    name: "Wireless Mouse",
    price: 29.99,
    image_url: "/products/wireless_mouse.jpg",
    description: "Ergonomic wireless mouse for comfortable usage.",
  },
  {
    category_id: "cd219ee1-2039-44e9-ad81-13c6db35fff6", // Clothes
    name: "Running Shoes",
    price: 89.99,
    image_url: "/products/running_shoes.jpg",
    description: "Comfortable running shoes for your daily workouts.",
  },
  {
    category_id: "88f985ec-6672-4340-a077-43420cae575d", // Furnitures
    name: "Yoga Mat",
    price: 24.99,
    image_url: "/products/yoga_mat.jpg",
    description: "Eco-friendly yoga mat for your yoga sessions.",
  },
  {
    category_id: "b0532c15-aac1-409c-9c25-67d5e985c9cc", // Home
    name: "Blender",
    price: 69.99,
    image_url: "/products/blender.jpg",
    description: "Powerful blender for making smoothies and shakes.",
  },
  {
    category_id: "88f985ec-6672-4340-a077-43420cae575d", // Furnitures
    name: "Dumbbells Set",
    price: 99.99,
    image_url: "/products/dumbbels_set.jpg",
    description: "Adjustable dumbbells set for strength training.",
  },
  {
    category_id: "43c0d4ec-e158-4e01-940f-381c78820c57", // Electronics
    name: "Television",
    price: 799.99,
    image_url: "/products/television.jpg",
    description: "High-definition television for immersive entertainment.",
  },
  {
    category_id: "b0532c15-aac1-409c-9c25-67d5e985c9cc", // Home
    name: "Vacuum Cleaner",
    price: 129.99,
    image_url: "/products/vacuum_cleaner.jpg",
    description: "Efficient vacuum cleaner for keeping your home clean.",
  },
  {
    category_id: "cd219ee1-2039-44e9-ad81-13c6db35fff6", // Clothes
    name: "Sunglasses",
    price: 49.99,
    image_url: "/products/sunglasses.jpg",
    description: "Stylish sunglasses for UV protection.",
  },
  {
    category_id: "b0532c15-aac1-409c-9c25-67d5e985c9cc", // Home
    name: "Toaster",
    price: 34.99,
    image_url: "/products/toaster.jpg",
    description: "A sleek toaster for toasting bread and bagels.",
  },
  {
    category_id: "cd219ee1-2039-44e9-ad81-13c6db35fff6", // Clothes
    name: "Hiking Boots",
    price: 129.99,
    image_url: "/products/hiking_boots.jpg",
    description: "Sturdy hiking boots for outdoor adventures.",
  },
  {
    category_id: "88f985ec-6672-4340-a077-43420cae575d", // Furnitures
    name: "Water Bottle",
    price: 14.99,
    image_url: "/products/water_bottle.jpg",
    description: "Reusable water bottle for staying hydrated on the go.",
  },
  {
    category_id: "b0532c15-aac1-409c-9c25-67d5e985c9cc", // Home
    name: "Electric Toothbrush",
    price: 59.99,
    image_url: "/products/electric_toothbrush.jpg",
    description: "Advanced electric toothbrush for effective oral hygiene.",
  },
  {
    category_id: "b0532c15-aac1-409c-9c25-67d5e985c9cc", // Home
    name: "Desk Lamp",
    price: 19.99,
    image_url: "/products/desk_lamp.jpg",
    description: "Adjustable desk lamp for optimal lighting.",
  },
];

module.exports = {
  users,
  categories,
  products,
};
