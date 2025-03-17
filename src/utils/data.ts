// Kitchen Types
export interface Kitchen {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  isVegetarian: boolean;
  trending: boolean;
  discount?: number;
  isNew: boolean;
  description?: string;
}

// Dish Types
export interface Dish {
  id: string;
  name: string;
  image: string;
  price: number;
  kitchen: string;
  kitchenId: string;
  isVegetarian: boolean;
  rating: number;
  isFeatured: boolean;
  discount?: number;
  category: string;
  description?: string;
  ingredients?: string;
  reviewCount?: number;
}

// Mock Kitchen Data
export const kitchens: Kitchen[] = [
  {
    id: "k1",
    name: "Asha's Kitchen",
    image: "/lovable-uploads/ed1ef5c8-6311-4820-bf19-c519d8e84d4a.png",
    cuisine: "North Indian",
    rating: 4.5,
    deliveryTime: "30-40 min",
    distance: "2.5 km",
    isVegetarian: false,
    trending: true,
    discount: 10,
    isNew: false,
    description: "Authentic Punjabi cuisine made with traditional recipes and spices. Our chefs bring you the true taste of Punjab right to your doorstep."
  },
  {
    id: "k2",
    name: "South Indian Delights",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
    cuisine: "South Indian",
    rating: 4.7,
    deliveryTime: "25-35 min",
    distance: "1.8 km",
    isVegetarian: true,
    trending: false,
    isNew: true,
    description: "Authentic South Indian cuisine specializing in dosas, idlis, and other traditional favorites prepared with fresh ingredients."
  },
  {
    id: "k3",
    name: "Bengali Kitchen",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    cuisine: "Bengali",
    rating: 4.3,
    deliveryTime: "35-45 min",
    distance: "3.1 km",
    isVegetarian: false,
    trending: true,
    isNew: false,
    description: "Bringing the rich and diverse flavors of Bengal to your home. We specialize in traditional Bengali dishes prepared with authentic spices."
  },
  {
    id: "k4",
    name: "Gujarat Thali",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    cuisine: "Gujarati",
    rating: 4.6,
    deliveryTime: "30-40 min",
    distance: "2.2 km",
    isVegetarian: true,
    trending: false,
    discount: 15,
    isNew: false,
    description: "Pure vegetarian Gujarati food made with love. Our thalis provide a complete Gujarati meal experience with authentic flavors."
  },
  {
    id: "k5",
    name: "Mumbai Street Food",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    cuisine: "Street Food",
    rating: 4.4,
    deliveryTime: "20-30 min",
    distance: "1.5 km",
    isVegetarian: false,
    trending: true,
    isNew: false,
    description: "Experience the vibrant street food culture of Mumbai at home. From vada pav to pav bhaji, we bring the streets to your doorstep."
  },
  {
    id: "k6",
    name: "Andhra Spice",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
    cuisine: "Andhra",
    rating: 4.2,
    deliveryTime: "35-45 min",
    distance: "3.5 km",
    isVegetarian: false,
    trending: false,
    isNew: true,
    description: "Known for our spicy and flavorful Andhra dishes. We use traditional recipes and authentic spices to bring you the true taste of Andhra Pradesh."
  }
];

// Mock Dish Data
export const dishes: Dish[] = [
  {
    id: "d1",
    name: "Butter Chicken",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db",
    price: 320,
    kitchen: "Asha's Kitchen",
    kitchenId: "k1",
    isVegetarian: false,
    rating: 4.8,
    isFeatured: true,
    category: "Main Course",
    description: "Tender chicken cooked in a creamy tomato-based sauce with butter and aromatic spices. Served with a side of naan."
  },
  {
    id: "d2",
    name: "Masala Dosa",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
    price: 180,
    kitchen: "South Indian Delights",
    kitchenId: "k2",
    isVegetarian: true,
    rating: 4.7,
    isFeatured: true,
    discount: 10,
    category: "Breakfast",
    description: "Crispy rice and lentil crepe filled with spiced potato masala, served with coconut chutney and sambar."
  },
  {
    id: "d3",
    name: "Fish Curry",
    image: "https://images.unsplash.com/photo-1626508035297-459123e2ed7c",
    price: 350,
    kitchen: "Bengali Kitchen",
    kitchenId: "k3",
    isVegetarian: false,
    rating: 4.5,
    isFeatured: true,
    category: "Main Course",
    description: "Traditional Bengali fish curry made with freshwater fish, mustard paste, and spices. Served with steamed rice."
  },
  {
    id: "d4",
    name: "Gujarati Thali",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be",
    price: 280,
    kitchen: "Gujarat Thali",
    kitchenId: "k4",
    isVegetarian: true,
    rating: 4.6,
    isFeatured: true,
    discount: 15,
    category: "Thali",
    description: "Complete Gujarati meal with roti, rice, dal, kadhi, shaak (vegetable preparations), papad, pickles, and sweets."
  },
  {
    id: "d5",
    name: "Vada Pav",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
    price: 90,
    kitchen: "Mumbai Street Food",
    kitchenId: "k5",
    isVegetarian: true,
    rating: 4.4,
    isFeatured: false,
    category: "Snacks",
    description: "Mumbai's favorite street food - spicy potato fritter (vada) served in a bun (pav) with chutneys and fried green chillies."
  },
  {
    id: "d6",
    name: "Andhra Chicken Curry",
    image: "https://images.unsplash.com/photo-1631292784640-2b24be784d1c",
    price: 340,
    kitchen: "Andhra Spice",
    kitchenId: "k6",
    isVegetarian: false,
    rating: 4.3,
    isFeatured: false,
    category: "Main Course",
    description: "Fiery hot chicken curry made with traditional Andhra spices and red chillies. A must-try for spice lovers."
  },
  {
    id: "d7",
    name: "Rajma Chawal",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
    price: 250,
    kitchen: "Asha's Kitchen",
    kitchenId: "k1",
    isVegetarian: true,
    rating: 4.5,
    isFeatured: true,
    category: "Main Course",
    description: "A comforting dish of red kidney beans curry served with steamed rice. A North Indian classic."
  },
  {
    id: "d8",
    name: "Idli Sambhar",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f45e4",
    price: 150,
    kitchen: "South Indian Delights",
    kitchenId: "k2",
    isVegetarian: true,
    rating: 4.6,
    isFeatured: true,
    category: "Breakfast",
    description: "Soft, steamed rice cakes served with sambhar (lentil and vegetable stew) and coconut chutney."
  },
  {
    id: "d9",
    name: "Mishti Doi",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
    price: 120,
    kitchen: "Bengali Kitchen",
    kitchenId: "k3",
    isVegetarian: true,
    rating: 4.7,
    isFeatured: false,
    category: "Dessert",
    description: "Sweet yogurt dessert caramelized with jaggery, a classic Bengali delicacy."
  },
  {
    id: "d10",
    name: "Dhokla",
    image: "https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5",
    price: 160,
    kitchen: "Gujarat Thali",
    kitchenId: "k4",
    isVegetarian: true,
    rating: 4.4,
    isFeatured: false,
    category: "Snacks",
    description: "Savory steamed cake made from fermented rice and chickpea flour, served with green chutney and mustard seeds tempering."
  },
  {
    id: "d11",
    name: "Pav Bhaji",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84",
    price: 180,
    kitchen: "Mumbai Street Food",
    kitchenId: "k5",
    isVegetarian: true,
    rating: 4.5,
    isFeatured: true,
    category: "Snacks",
    description: "Spicy vegetable mash served with buttered bread rolls. A popular Mumbai street food."
  },
  {
    id: "d12",
    name: "Hyderabadi Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
    price: 380,
    kitchen: "Andhra Spice",
    kitchenId: "k6",
    isVegetarian: false,
    rating: 4.9,
    isFeatured: true,
    category: "Biryani",
    description: "Aromatic rice dish cooked with layers of marinated meat, herbs, and saffron. A royal delicacy."
  }
];
