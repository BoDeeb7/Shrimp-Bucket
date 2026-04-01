export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  flavors?: string[];
  image?: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export const initialBranches: Branch[] = [
  {
    id: "1",
    name: "Rouche Branch",
    address: "Main Road, Raouche, Beirut, Lebanon",
    phone: "81818784",
  },
];

export const initialMenuItems: MenuItem[] = [
  // BUCKETS
  {
    id: "1",
    name: "Dragon Shrimp Bucket",
    description: "8 Dragon Sized Shrimps",
    price: 4410000,
    category: "Buckets",
    flavors: ["Creamy Lemon", "Cajun", "Curry"],
  },
  {
    id: "2",
    name: "Dragon Seafood Bucket",
    description: "3 Dragon Shrimps, 3 Moles, 6 Calamare",
    price: 4050000,
    category: "Buckets",
    flavors: ["Creamy Lemon", "Cajun", "Curry", "Signature"],
  },
  {
    id: "3",
    name: "Linguistine Bucket",
    description: "7 Linguistine, 2 Shrimps, 3 Moles",
    price: 4050000,
    category: "Buckets",
    flavors: ["Creamy Lemon", "Cajun", "Curry", "Signature"],
  },
  {
    id: "4",
    name: "Lobster Bucket",
    description: "Lobster, 3 Shrimps & 3 Moles",
    price: 5850000,
    category: "Buckets",
    flavors: ["Creamy Lemon", "Cajun", "Curry"],
  },
  {
    id: "5",
    name: "Shrimp Bucket",
    description: "8 Shrimps With Corn",
    price: 1800000,
    category: "Buckets",
    flavors: ["Creamy Lemon", "Cajun", "Curry", "Signature"],
  },
  {
    id: "6",
    name: "Seafood Bucket",
    description: "5 Shrimps, 10 Calamar & 3 Mole",
    price: 1800000,
    category: "Buckets",
    flavors: ["Creamy Lemon", "Cajun", "Curry", "Signature"],
  },
  {
    id: "7",
    name: "Moules Bucket",
    description: "16 Moles",
    price: 1400000,
    category: "Buckets",
    flavors: ["Creamy Lemon", "Cajun", "Curry", "Signature"],
  },

  // FAMILY BUCKETS
  {
    id: "8",
    name: "Family Shrimp Bucket",
    description: "50 Jumbo Shrimps With Rice And Rocca Salad",
    price: 9630000,
    category: "Family Buckets",
    flavors: ["Creamy Lemon", "Cajun", "Curry", "Signature"],
  },
  {
    id: "9",
    name: "Seafood Family Bucket",
    description: "30 Jumbo Shrimp, 20 Calamar, 20 Moles, Rice And Rocca Salad",
    price: 9630000,
    category: "Family Buckets",
    flavors: ["Creamy Lemon", "Cajun", "Curry", "Signature"],
  },

  // STARTERS
  {
    id: "10",
    name: "Dynamite Shrimps",
    description: "8PCS Of Fried Shrimps Marinated With Dynamite Sauce",
    price: 850000,
    category: "Starters",
  },
  {
    id: "11",
    name: "Shrimp Basket",
    description: "2PCS Shrimp Rolls, 2PCS Panko Shrimp, 2PCS Shrimp Bally, 2PCS Breaded Shrimp With Sweet Chilli Sauce",
    price: 1350000,
    category: "Starters",
  },
  {
    id: "12",
    name: "Mozzarella Sticks",
    description: "6PCS Of Mozzarella Sticks With Cocktail Sauce",
    price: 600000,
    category: "Starters",
  },
  {
    id: "13",
    name: "Potato Shrimps",
    description: "4PCS Of Potato Shrimps Served With Sweet Chilli Sauce",
    price: 550000,
    category: "Starters",
  },
  {
    id: "14",
    name: "Fried Calamar Basket",
    description: "8PCS Of Fried Calamar Served With Cocktail Sauce",
    price: 800000,
    category: "Starters",
  },
  {
    id: "15",
    name: "Jalapeno Bites",
    description: "4PCS Cheese and Jalapeno",
    price: 600000,
    category: "Starters",
  },
  {
    id: "16",
    name: "Shrimp Dolls",
    description: "4PCS Of Shrimp Rolls With Sweet Chili",
    price: 550000,
    category: "Starters",
  },
  {
    id: "17",
    name: "Shrimp Balls",
    description: "6PCS Of Breaded Balls With Shrimps",
    price: 560000,
    category: "Starters",
  },

  // SALADS
  {
    id: "18",
    name: "Shrimp Salad",
    description: "Shrimps, Lettuce & Corn With Sweet Chilli Sauce",
    price: 800000,
    category: "Salads",
  },
  {
    id: "19",
    name: "Caesar Salad",
    description: "Lettuce, Caesar Sauce, Croutons, Parmesan & Corn",
    price: 500000,
    category: "Salads",
  },
  {
    id: "20",
    name: "Rocca Salad",
    description: "Rocca, Onion, Sumac, Lemon & Olive Oil",
    price: 400000,
    category: "Salads",
  },
  {
    id: "21",
    name: "Crab Salad",
    description: "Crab, Lettuce & Corn With Sweet Chilli Sauce",
    price: 600000,
    category: "Salads",
  },

  // GRILLED MEALS
  {
    id: "22",
    name: "Mix Shrimps",
    description: "10 Fried & 5 Grilled Shrimps Served With Fries & Coleslaw",
    price: 1200000,
    category: "Grilled Meals",
  },
  {
    id: "23",
    name: "Jumbo Grilled Shrimps",
    description: "10PCS Jumbo Grilled Shrimps Served With Fries & Coleslaw",
    price: 1550000,
    category: "Grilled Meals",
  },
  {
    id: "24",
    name: "Grilled Fish",
    description: "1 PC Grilled Fish Served With Fries & Coleslaw",
    price: 900000,
    category: "Grilled Meals",
  },
  {
    id: "25",
    name: "Grilled Shrimps & Fish",
    description: "3 Fish & Shrimps Served With Fries & Coleslaw",
    price: 1000000,
    category: "Grilled Meals",
  },
  {
    id: "26",
    name: "Grilled Shrimps",
    description: "12PCS Grilled Shrimps Served With Fries & Coleslaw",
    price: 1250000,
    category: "Grilled Meals",
  },

  // FRIED MEALS
  {
    id: "27",
    name: "Fish and Chips",
    description: "6PCS Fried Fish Served With Coleslaw & Potato Chips",
    price: 1200000,
    category: "Fried Meals",
  },
  {
    id: "28",
    name: "Jumbo Breaded Shrimp Combo",
    description: "15 PCS Crunchy Fried Shrimps Served With Coleslaw & Fries",
    price: 1650000,
    category: "Fried Meals",
  },
  {
    id: "29",
    name: "Breaded Shrimp Combo",
    description: "15 PCS Breaded Shrimp Served With Coleslaw & Fries",
    price: 1050000,
    category: "Fried Meals",
  },
  {
    id: "30",
    name: "Fried Calamar",
    description: "10 Calamar Rings Served With Fries & Coleslaw",
    price: 1500000,
    category: "Fried Meals",
  },
  {
    id: "31",
    name: "Seafood Combo",
    description: "8 Shrimps, 2 Fish, 3 Calamar & 2 Crab Served With Fries & Coleslaw",
    price: 1100000,
    category: "Fried Meals",
  },
  {
    id: "32",
    name: "Fish and Shrimps",
    description: "1 Fish & 10 Shrimps Served With Fries & Coleslaw",
    price: 1200000,
    category: "Fried Meals",
  },

  // SANDWICHES
  {
    id: "33",
    name: "Fried Filet Sandwich",
    description: "Fried Filet, Tartar Sauce, Cornichons & Lettuce With Cocktail Sauce Served With Fries",
    price: 700000,
    category: "Sandwiches",
  },
  {
    id: "34",
    name: "Grilled Shrimp Sandwich",
    description: "Grilled Shrimp, Mushroom, Green Pepper, Tartar Sauce, Cornichons & Lettuce Served With Fries",
    price: 850000,
    category: "Sandwiches",
  },
  {
    id: "35",
    name: "Crab Sandwich",
    description: "Grilled Shrimp, Mushroom, Green Pepper, Tartar Sauce, Cornichons & Lettuce Served With Fries",
    price: 700000,
    category: "Sandwiches",
  },
  {
    id: "36",
    name: "Fried Calamar Sandwich",
    description: "Fried Calamar, Lettuce & Cornichons With Tartar & Cocktail Sauce Served With Fries",
    price: 900000,
    category: "Sandwiches",
  },
  {
    id: "37",
    name: "Shrimp Supreme Sandwich",
    description: "Panko Shrimp, Cocktail Sauce, Smoked Turkey Cheddar Sauce, Cornichons & Lettuce Served With Fries",
    price: 850000,
    category: "Sandwiches",
  },
  {
    id: "38",
    name: "Cheese Shrimp Sandwich",
    description: "Grilled Shrimp, Mushroom, Creme, Mozzarella Cheese, Tartar, Cornichons & Lettuce Served With Fries",
    price: 900000,
    category: "Sandwiches",
  },
  {
    id: "39",
    name: "Shrimp Pane Sandwich",
    description: "Shrimp Pane, Tartar, Cornichons & Lettuce With Cocktail Sauce Served With Fries",
    price: 800000,
    category: "Sandwiches",
  },

  // BURGERS
  {
    id: "40",
    name: "Shrimp Burger",
    description: "Fried Shrimps, Tartar Sauce, Cornichons, Lettuce & Cocktail Sauce Served With Fries",
    price: 800000,
    category: "Burgers",
  },
  {
    id: "41",
    name: "Chicken Zinger",
    description: "Chicken Zinger, Cornichons, Lettuce, Zinger Sauce & Cheese with Cocktail Sauce",
    price: 800000,
    category: "Burgers",
  },
  {
    id: "42",
    name: "Fish Burger",
    description: "Fish Burger, Tartar Sauce, Cornichons, Lettuce & Cocktail Sauce Served With Fries",
    price: 600000,
    category: "Burgers",
  },

  // NOODLES
  {
    id: "43",
    name: "Seafood Noodles",
    description: "Shrimps, Corn, Calamar And Moles",
    price: 1342500,
    category: "Noodles",
    flavors: ["Creamy Lemon", "Cajun", "Curry"],
  },
  {
    id: "44",
    name: "Shrimp Noodles",
    description: "Shrimps",
    price: 1342500,
    category: "Noodles",
    flavors: ["Creamy Lemon", "Cajun", "Curry"],
  },

  // RICE
  {
    id: "45",
    name: "White Rice",
    description: "White Rice Bowl",
    price: 700000,
    category: "Rice",
  },
  {
    id: "46",
    name: "Fried Rice",
    description: "Rice, Shrimps, Onions, Carrot & Soy Sauce",
    price: 1100000,
    category: "Rice",
  },

  // KIDS MEALS
  {
    id: "47",
    name: "Chicken Nuggets",
    description: "6PCS Chicken Nuggets With Fries & Coleslaw + Orange Juice",
    price: 710000,
    category: "Kids Meals",
  },
  {
    id: "48",
    name: "Fish Nuggets",
    description: "6PCS Fish Nuggets With Fries & Coleslaw + Orange Juice",
    price: 750000,
    category: "Kids Meals",
  },

  // DESSERT
  {
    id: "49",
    name: "Lazy Cake",
    description: "Delicious Chocolate Biscuit Cake",
    price: 350000,
    category: "Dessert",
  },
];

export const categories = [
  "Buckets",
  "Family Buckets",
  "Starters",
  "Salads",
  "Grilled Meals",
  "Fried Meals",
  "Sandwiches",
  "Burgers",
  "Noodles",
  "Rice",
  "Kids Meals",
  "Dessert",
];
