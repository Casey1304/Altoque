import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_USER,
  INITIAL_CHATS,
  INITIAL_PURCHASES,
  INITIAL_SELLER
} from './mockData';

const KEYS = {
  PRODUCTS: 'altoque_products',
  FAVORITES: 'altoque_favorites',
  USER: 'altoque_user',
  CHATS: 'altoque_chats',
  PURCHASES: 'altoque_purchases',
  SELLER_REVIEWS: 'altoque_seller_reviews',
  CART: 'altoque_cart',
  NOTIFICATIONS: 'altoque_notifications'
};

function getFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

// Inicialización de datos
export function initStorage() {
  const currentProds = getFromStorage(KEYS.PRODUCTS, null);
  // Si no existen productos o tienen la moneda en $, migrar a S/ (soles peruanos)
  if (!currentProds || (currentProds[0] && currentProds[0].currency !== 'S/')) {
    saveToStorage(KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }
  if (!localStorage.getItem(KEYS.USER)) {
    saveToStorage(KEYS.USER, INITIAL_USER);
  }
  if (!localStorage.getItem(KEYS.CHATS)) {
    saveToStorage(KEYS.CHATS, INITIAL_CHATS);
  }
  const currentPurchases = getFromStorage(KEYS.PURCHASES, null);
  if (!currentPurchases || (currentPurchases[0] && currentPurchases[0].price.includes('$'))) {
    saveToStorage(KEYS.PURCHASES, INITIAL_PURCHASES);
  }
  if (!localStorage.getItem(KEYS.SELLER_REVIEWS)) {
    saveToStorage(KEYS.SELLER_REVIEWS, INITIAL_SELLER.reviews);
  }
  if (!localStorage.getItem(KEYS.FAVORITES)) {
    saveToStorage(KEYS.FAVORITES, []);
  }
  if (!localStorage.getItem(KEYS.CART)) {
    saveToStorage(KEYS.CART, []);
  }
  if (!localStorage.getItem(KEYS.NOTIFICATIONS)) {
    saveToStorage(KEYS.NOTIFICATIONS, [
      { id: 1, title: 'Bienvenido a AlToque', time: 'Hace 1 hora', unread: true },
      { id: 2, title: 'Carlos Mendoza te envió un mensaje', time: 'Hace 30 min', unread: true }
    ]);
  }
}

// Productos
export function getProducts() {
  return getFromStorage(KEYS.PRODUCTS, INITIAL_PRODUCTS);
}

export function getProductById(id) {
  const products = getProducts();
  return products.find(p => String(p.id) === String(id));
}

export function saveNewProduct(productData) {
  const products = getProducts();
  const newProduct = {
    ...productData,
    id: Date.now(),
    rating: 5.0,
    reviewsCount: 0,
    currency: "S/",
    seller: {
      id: "user-me",
      name: getCurrentUser().name || "Estudiante AlToque",
      degree: "Estudiante Universitario",
      avatar: getCurrentUser().avatar,
      rating: 5.0,
      tradesCount: 1
    }
  };
  const updated = [newProduct, ...products];
  saveToStorage(KEYS.PRODUCTS, updated);
  return newProduct;
}

// Favoritos
export function getFavorites() {
  return getFromStorage(KEYS.FAVORITES, []);
}

export function toggleFavorite(productId) {
  const favs = getFavorites();
  const idNum = Number(productId);
  let updated;
  if (favs.includes(idNum)) {
    updated = favs.filter(id => id !== idNum);
  } else {
    updated = [...favs, idNum];
  }
  saveToStorage(KEYS.FAVORITES, updated);
  return updated;
}

export function isFavorite(productId) {
  const favs = getFavorites();
  return favs.includes(Number(productId));
}

// Usuario & Autenticación
export function getCurrentUser() {
  return getFromStorage(KEYS.USER, INITIAL_USER);
}

export function loginUser(email, password) {
  const user = {
    id: "user-me",
    name: email.split('@')[0] || "Estudiante AlToque",
    email,
    university: "Universidad Tecnológica del Perú (UTP)",
    avatar: INITIAL_USER.avatar
  };
  saveToStorage(KEYS.USER, user);
  return user;
}

export function registerUser(userData) {
  const user = {
    id: "user-me",
    name: userData.fullName || "Nuevo Usuario",
    email: userData.email,
    university: userData.university || "Universidad Tecnológica del Perú (UTP)",
    avatar: INITIAL_USER.avatar
  };
  saveToStorage(KEYS.USER, user);
  return user;
}

export function logoutUser() {
  localStorage.removeItem(KEYS.USER);
}

// Chats y Mensajes
export function getChats() {
  return getFromStorage(KEYS.CHATS, INITIAL_CHATS);
}

export function sendChatMessage(chatId, text) {
  const chats = getChats();
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const updated = chats.map(chat => {
    if (chat.id === chatId) {
      return {
        ...chat,
        lastMessage: text,
        time: timeStr,
        messages: [
          ...chat.messages,
          { id: Date.now(), sender: 'me', text, time: timeStr }
        ]
      };
    }
    return chat;
  });
  saveToStorage(KEYS.CHATS, updated);
  return updated;
}

export function createQuickChat(productTitle, initialText, seller) {
  const chats = getChats();
  const newChat = {
    id: `chat-${Date.now()}`,
    type: "compras",
    user: {
      id: seller.id || "seller-quick",
      name: seller.name || "Vendedor",
      rating: String(seller.rating || "5.0"),
      trades: `${seller.tradesCount || 1} ventas`,
      avatar: seller.avatar || INITIAL_SELLER.avatar
    },
    productTitle,
    lastMessage: initialText,
    time: "Ahora",
    messages: [
      { id: Date.now(), sender: "me", text: initialText, time: "Ahora" }
    ]
  };
  const updated = [newChat, ...chats];
  saveToStorage(KEYS.CHATS, updated);
  return newChat;
}

// Compras y Publicaciones
export function getPurchases() {
  return getFromStorage(KEYS.PURCHASES, INITIAL_PURCHASES);
}

export function getMyListings() {
  const all = getProducts();
  return all.filter(p => p.seller && p.seller.id === "user-me");
}

// Reseñas de Vendedor
export function getSellerReviews() {
  return getFromStorage(KEYS.SELLER_REVIEWS, INITIAL_SELLER.reviews);
}

export function addSellerReview(review) {
  const reviews = getSellerReviews();
  const newRev = {
    id: `rev-${Date.now()}`,
    author: getCurrentUser().name || "Estudiante Verificado",
    avatar: getCurrentUser().avatar || INITIAL_USER.avatar,
    date: "Hoy",
    rating: review.rating,
    comment: review.comment
  };
  const updated = [newRev, ...reviews];
  saveToStorage(KEYS.SELLER_REVIEWS, updated);
  return updated;
}

// Carrito y Notificaciones
export function getCart() {
  return getFromStorage(KEYS.CART, []);
}

export function addToCart(product) {
  const cart = getCart();
  const exists = cart.find(item => item.id === product.id);
  let updated;
  if (exists) {
    updated = cart.map(item => item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item);
  } else {
    updated = [...cart, { ...product, qty: 1 }];
  }
  saveToStorage(KEYS.CART, updated);
  return updated;
}

export function getNotifications() {
  return getFromStorage(KEYS.NOTIFICATIONS, []);
}
