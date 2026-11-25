import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_CHATS,
  INITIAL_PURCHASES,
  INITIAL_SELLER,
  INITIAL_STUDENTS,
  INITIAL_MODERATION_ITEMS,
  INITIAL_REPORTS,
  INITIAL_CAMPUS_SETTINGS,
  INITIAL_TRANSACTIONS
} from './mockData.js';

const KEYS = {
  PRODUCTS: 'altoque_products',
  FAVORITES: 'altoque_favorites',
  USER: 'altoque_user',
  ROLE: 'altoque_role', // 'client' | 'admin'
  REGISTERED_USERS: 'altoque_registered_users',
  CHATS: 'altoque_chats',
  PURCHASES: 'altoque_purchases',
  SELLER_REVIEWS: 'altoque_seller_reviews',
  CART: 'altoque_cart',
  NOTIFICATIONS: 'altoque_notifications',
  STUDENTS: 'altoque_students',
  MODERATION: 'altoque_moderation',
  REPORTS: 'altoque_reports',
  CAMPUS_SETTINGS: 'altoque_campus_settings',
  TRANSACTIONS: 'altoque_transactions'
};

// Cuentas oficiales de demostración
export const DEMO_CLIENT = {
  id: "user-client-demo",
  name: "Estudiante Cliente",
  email: "cliente@altoque.com",
  role: "client",
  university: "Universidad Tecnológica del Perú (UTP)",
  degree: "Ingeniería de Sistemas e Informática",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9orOq_BGxDlUKEYNa9ynLeFDL1V0u-GMbh0WfiwYd4k4yohbENEYN5rl-ru6XlCFtBhedHSTcDvEnoGm9-FPDSdv94D3209bHXEFPJ06NV0oRUcpkrum90HG9fNhHiJiflGXP3r8MgS7GVxesVlc8jBS9XdjgP5qlRtZNq0oiZ9coVbh_f6MSJ4g2YLtli3_J3xekX2Dtue4VxQVmAD-TNCIEB3Ph_zB64TV2jOJiYE38FibD0aDu"
};

export const DEMO_ADMIN = {
  id: "user-admin-demo",
  name: "Admin UTP (SuperAdmin)",
  email: "admin@altoque.com",
  role: "admin",
  university: "Universidad Tecnológica del Perú (UTP) - Sede Central",
  degree: "Superintendencia de Seguridad y Gestión del Campus",
  avatar: "https://lh3.googleusercontent.com/aida/ALJJyrBVoQSI4KzJX4bEC0scPck82-PlLDadtIp2uteQjWKcNJIoeWw7IpClftgX2Zf5TFwqek9tFcxbp0m3AvMTeARoc06E71tKlf9ZmX2Sc2KgGHJUIqzdbfsu99vyL7Ltdq4htUwes9Q8toc3KAhuSFglarpSz2qPANR9Tsr7tNPoqQRWNB4wkg4M2Ls-oLAhNxP5EB5HOIDVypJnCLKSPDKJH3MoeHpAtA04UvqR5eQeBl7yed33LPGXOFg"
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
    throw new Error('No se pudo guardar en el navegador.', { cause: e });
  }
}

// Disparador de eventos reactivos para sincronizar componentes sin recarga
export function notifyStorageChange(detail = {}) {
  try {
    window.dispatchEvent(new CustomEvent('altoque_storage_update', { detail }));
  } catch {
    // Entorno sin ventana o fallback
  }
}

// Inicialización de datos
export function initStorage() {
  const defaults = {
    PRODUCTS: INITIAL_PRODUCTS, CHATS: INITIAL_CHATS, PURCHASES: INITIAL_PURCHASES,
    SELLER_REVIEWS: INITIAL_SELLER.reviews, FAVORITES: [1, 3], CART: [], NOTIFICATIONS: [],
    STUDENTS: INITIAL_STUDENTS, MODERATION: INITIAL_MODERATION_ITEMS, REPORTS: INITIAL_REPORTS,
    CAMPUS_SETTINGS: INITIAL_CAMPUS_SETTINGS, TRANSACTIONS: INITIAL_TRANSACTIONS
  };
  for (const [key, value] of Object.entries(defaults)) {
    if (localStorage.getItem(KEYS[key]) === null) saveToStorage(KEYS[key], value);
  }
}

// -------------------------------------------------------------
// Productos
// -------------------------------------------------------------
export function getProducts() {
  return getFromStorage(KEYS.PRODUCTS, INITIAL_PRODUCTS).map(product =>
    !product.ownerId && product.seller?.id === 'user-me'
      ? { ...product, ownerId: DEMO_CLIENT.id, seller: { ...product.seller, id: DEMO_CLIENT.id } }
      : product);
}

export function getProductById(id) {
  const products = getProducts();
  return products.find(p => String(p.id) === String(id));
}

export function saveProduct(product) {
  const user = getCurrentUser();
  if (user?.role !== 'client') throw new Error('Inicia sesión como estudiante.');
  if (!product.title?.trim() || !product.category || !Number.isFinite(Number(product.price)) || Number(product.price) < 0) throw new Error('Revisa los datos de la publicación.');
  const products = getProducts();
  const newProduct = {
    ...product,
    id: crypto.randomUUID(),
    ownerId: user.id,
    status: 'active',
    createdAt: new Date().toISOString(),
    currency: "S/",
    price: Number(product.price),
    rating: 5.0,
    seller: {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      degree: "Estudiante Universitario"
    }
  };
  const updated = [newProduct, ...products];
  saveToStorage(KEYS.PRODUCTS, updated);
  notifyStorageChange({ type: 'product_added', product: newProduct });
  return newProduct;
}

export function deleteProduct(productId) {
  const products = getProducts();
  if (!getMyListings().some(product => String(product.id) === String(productId))) throw new Error('Solo puedes eliminar tus publicaciones.');
  const updated = products.filter(p => String(p.id) !== String(productId));
  saveToStorage(KEYS.PRODUCTS, updated);
  notifyStorageChange({ type: 'product_deleted', productId });
  return updated;
}

// -------------------------------------------------------------
// Módulo de Favoritos Reactivo y Persistente
// -------------------------------------------------------------
export function getFavorites() {
  return getPersonal(KEYS.FAVORITES, [1, 3]).map(String);
}

export function isFavorite(productId) {
  const favorites = getFavorites();
  const numId = String(productId);
  return favorites.includes(numId);
}

export function toggleFavorite(productId) {
  const favorites = getFavorites();
  const numId = String(productId);
  let updatedFavorites;

  if (favorites.includes(numId)) {
    updatedFavorites = favorites.filter(id => id !== numId);
  } else {
    updatedFavorites = [...favorites, numId];
  }

  savePersonal(KEYS.FAVORITES, updatedFavorites);
  notifyStorageChange({
    type: 'favorites_updated',
    favorites: updatedFavorites,
    productId: numId,
    isFav: updatedFavorites.includes(numId)
  });

  return updatedFavorites;
}

export function getFavoriteProducts() {
  const favoriteIds = getFavorites();
  const allProducts = getProducts();
  return allProducts.filter(p => isListingActive(p) && favoriteIds.includes(String(p.id)));
}

// -------------------------------------------------------------
// Autenticación y Control de Roles Estricto
// -------------------------------------------------------------
export function getCurrentUser() {
  const user = getFromStorage(KEYS.USER, null);
  if (!user) return null;
  if (user.id === DEMO_ADMIN.id && user.email === DEMO_ADMIN.email) return DEMO_ADMIN;
  if (isSuspended(user.email)) return null;
  return { ...user, role: 'client' };
}

export function getCurrentRole() {
  return getCurrentUser()?.role ?? null;
}

function isSuspended(email) {
  return getStudents().some(student => student.email?.toLowerCase() === email && student.status === 'suspended');
}

async function demoVerifier(password, salt) {
  const data = new TextEncoder().encode(salt + ':' + password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), value => value.toString(16).padStart(2, '0')).join('');
}

export async function authenticateUser(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();

  if (isSuspended(cleanEmail)) return { success: false, message: 'Tu cuenta está suspendida.' };

  // 1. Cuenta Administrador Demo
  if (cleanEmail === 'admin@altoque.com' && password === 'Admin123') {
    saveToStorage(KEYS.USER, DEMO_ADMIN);
    saveToStorage(KEYS.ROLE, 'admin');
    notifyStorageChange({ type: 'login', user: DEMO_ADMIN, role: 'admin' });
    return { success: true, user: DEMO_ADMIN, role: 'admin' };
  }

  // 2. Cuenta Cliente Demo
  if (cleanEmail === 'cliente@altoque.com' && password === 'Cliente123') {
    saveToStorage(KEYS.USER, DEMO_CLIENT);
    saveToStorage(KEYS.ROLE, 'client');
    notifyStorageChange({ type: 'login', user: DEMO_CLIENT, role: 'client' });
    return { success: true, user: DEMO_CLIENT, role: 'client' };
  }

  // 3. Verificar si es un usuario registrado previamente en almacenamiento
  const registered = getFromStorage(KEYS.REGISTERED_USERS, []);
  const found = registered.find(user => user.email.toLowerCase() === cleanEmail);
  if (found && (found.verifier
    ? found.verifier === await demoVerifier(password, found.id)
    : found.password === password)) {
    if (!found.verifier) {
      const { password: legacyPassword, ...account } = found;
      const id = account.id || crypto.randomUUID();
      const verifier = await demoVerifier(legacyPassword, id);
      saveToStorage(KEYS.REGISTERED_USERS, registered.map(user => user === found ? { ...account, id, verifier } : user));
      found.id = id;
    }
    const userObj = {
      id: found.id || `user-${Date.now()}`,
      name: found.name,
      email: found.email,
      university: found.university || "Universidad Tecnológica del Perú",
      role: "client",
      avatar: DEMO_CLIENT.avatar
    };
    saveToStorage(KEYS.USER, userObj);
    saveToStorage(KEYS.ROLE, 'client');
    notifyStorageChange({ type: 'login', user: userObj, role: 'client' });
    return { success: true, user: userObj, role: 'client' };
  }

  return {
    success: false,
    message: 'Credenciales no válidas. Puedes ingresar con las cuentas de demostración: cliente@altoque.com o admin@altoque.com.'
  };
}

export function loginUser(email, password) {
  return authenticateUser(email, password);
}

export async function registerUser(userData) {
  const email = userData.email.trim().toLowerCase();
  if (!/^[^@\s]+@utp\.edu\.pe$/.test(email)) throw new Error('Usa un correo institucional @utp.edu.pe.');
  if (!userData.fullName?.trim() || (userData.password?.length ?? 0) < 8) throw new Error('Completa el nombre y usa una contraseña de al menos 8 caracteres.');
  const id = crypto.randomUUID();
  const verifier = await demoVerifier(userData.password, id);
  const registered = getFromStorage(KEYS.REGISTERED_USERS, []);
  if (registered.some(user => user.email.toLowerCase() === email)) throw new Error('Ese correo ya está registrado.');
  const newUser = {
    id,
    name: userData.fullName || "Nuevo Estudiante",
    email,
    verifier,
    university: userData.university || "Universidad Tecnológica del Perú (UTP)",
    role: "client", // SIEMPRE cliente, nunca admin desde registro
    avatar: DEMO_CLIENT.avatar
  };

  registered.push(newUser);
  saveToStorage(KEYS.STUDENTS, [...getStudents(), {
    id: newUser.id, email, name: newUser.name, code: email.split('@')[0], faculty: 'UTP',
    campus: 'Lima Norte', avatar: newUser.avatar, status: 'pending_id', joinedAt: new Date().toISOString(),
    badges: [], idCardVerified: false, salesCount: 0, purchasesCount: 0, reviewsCount: 0
  }]);
  saveToStorage(KEYS.REGISTERED_USERS, registered);

  // Iniciar sesión inmediatamente como cliente
  saveToStorage(KEYS.USER, {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    university: newUser.university,
    role: "client",
    avatar: newUser.avatar
  });
  saveToStorage(KEYS.ROLE, "client");

  const user = getCurrentUser();
  notifyStorageChange({ type: 'user', user, role: 'client' });
  return user;
}

export function logoutUser() {
  // Limpia únicamente la sesión activa, conservando intactos productos, favoritos y chats
  localStorage.removeItem(KEYS.USER);
  localStorage.removeItem(KEYS.ROLE);
  notifyStorageChange({ type: 'logout' });
}

// -------------------------------------------------------------
// Chats y Mensajería
// -------------------------------------------------------------
const CONVERSATIONS = 'altoque_conversations';

export function getChats() {
  const user = getCurrentUser();
  if (user?.role !== 'client') return [];
  const shared = getFromStorage(CONVERSATIONS, []).filter(chat => chat.people.some(person => person.id === user.id));
  return [...shared.map(chat => ({
    ...chat, type: chat.people[0].id === user.id ? 'compras' : 'ventas',
    user: chat.people.find(person => person.id !== user.id),
    messages: chat.messages.map(message => ({ ...message, sender: message.authorId === user.id ? 'me' : 'them' }))
  })), ...getPersonal(KEYS.CHATS, INITIAL_CHATS)];
}

export function sendChatMessage(chatId, text) {
  const user = actor('client');
  const content = text.trim();
  if (!content) return getChats();
  const chats = getFromStorage(CONVERSATIONS, []);
  const chat = chats.find(item => item.id === chatId && item.people.some(person => person.id === user.id));
  const time = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
  if (chat) {
    const message = { id: crypto.randomUUID(), authorId: user.id, text: content, time };
    saveToStorage(CONVERSATIONS, chats.map(item => item.id === chat.id ? {
      ...item, lastMessage: content, time, messages: [...item.messages, message]
    } : item));
    const other = chat.people.find(person => person.id !== user.id);
    notifyUser(other.id, user.name + ' te envió un mensaje');
  } else {
    const personal = getPersonal(KEYS.CHATS, INITIAL_CHATS);
    savePersonal(KEYS.CHATS, personal.map(item => item.id === chatId ? {
      ...item, lastMessage: content, time,
      messages: [...item.messages, { id: crypto.randomUUID(), sender: 'me', text: content, time }]
    } : item));
  }
  notifyStorageChange({ type: 'chats' });
  return getChats();
}

export function createQuickChat(productTitle, initialText, seller, productId = productTitle) {
  const user = actor('client');
  if (!seller?.id || seller.id === user.id) return getChats();
  const all = getFromStorage(CONVERSATIONS, []);
  const existing = all.find(chat => chat.productId === productId &&
    chat.people.some(person => person.id === user.id) && chat.people.some(person => person.id === seller.id));
  if (existing) return sendChatMessage(existing.id, initialText);
  const chat = { id: crypto.randomUUID(), productId, productTitle,
    people: [user, seller].map(person => ({ id: person.id, name: person.name, avatar: person.avatar, rating: person.rating, trades: 'Estudiante UTP' })),
    messages: [] };
  saveToStorage(CONVERSATIONS, [chat, ...all]);
  return sendChatMessage(chat.id, initialText);
}

function notifyUser(id, title) {
  const key = KEYS.NOTIFICATIONS + ':' + id;
  const previous = getFromStorage(key, id === DEMO_CLIENT.id ? getFromStorage(KEYS.NOTIFICATIONS, []) : []);
  saveToStorage(key, [{ id: crypto.randomUUID(), title, time: new Date().toLocaleString('es-PE'), unread: true }, ...previous]);
}

export function markNotificationsRead() {
  if (!getCurrentUser() || !getNotifications().some(item => item.unread)) return;
  savePersonal(KEYS.NOTIFICATIONS, getNotifications().map(item => ({ ...item, unread: false })));
  notifyStorageChange({ type: 'notifications' });
}

// -------------------------------------------------------------
// Compras y Carrito
// -------------------------------------------------------------
export function getPurchases() {
  return getPersonal(KEYS.PURCHASES, INITIAL_PURCHASES);
}

export function addPurchase(product) {
  const purchases = getPurchases();
  const newPurchase = {
    id: `pur-${Date.now()}`,
    title: product.title,
    category: product.category,
    sellerName: product.seller?.name || "Vendedor",
    price: `S/ ${Number(product.price).toFixed(2)}`,
    date: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: "Por entregar",
    image: product.image
  };
  const updated = [newPurchase, ...purchases];
  savePersonal(KEYS.PURCHASES, updated);
  notifyStorageChange({ type: 'purchases', purchases: updated });
  return updated;
}

export function getCart() {
  return getPersonal(KEYS.CART, []);
}

export function addToCart(product) {
  const cart = getCart();
  const updated = [...cart, product];
  savePersonal(KEYS.CART, updated);
  notifyStorageChange({ type: 'cart', cart: updated });
  return updated;
}

export function getNotifications() {
  return getPersonal(KEYS.NOTIFICATIONS, []);
}

// -------------------------------------------------------------
// Módulo de Administración: Estudiantes
// -------------------------------------------------------------
export function getStudents() {
  return getFromStorage(KEYS.STUDENTS, INITIAL_STUDENTS);
}

export function updateStudent(studentId, updates) {
  actor('admin');
  const students = getStudents();
  const updated = students.map(s => {
    if (String(s.id) === String(studentId)) {
      return { ...s, ...updates };
    }
    return s;
  });
  saveToStorage(KEYS.STUDENTS, updated);
  notifyStorageChange({ type: 'admin_students', students: updated });
  return updated;
}

export function verifyStudentCard(studentId) {
  actor('admin');
  const students = getStudents();
  const updated = students.map(s => {
    if (String(s.id) === String(studentId)) {
      return {
        ...s,
        status: 'verified',
        idCardVerified: true,
        verifiedAt: new Date().toISOString(),
        badges: Array.from(new Set([...(s.badges || []), 'Carnet Vigente', 'Correo UTP']))
      };
    }
    return s;
  });
  saveToStorage(KEYS.STUDENTS, updated);
  notifyStorageChange({ type: 'admin_students', students: updated });
  return updated;
}

export function toggleStudentStatus(studentId) {
  actor('admin');
  const students = getStudents();
  let changed = null;
  const updated = students.map(s => {
    if (String(s.id) === String(studentId)) {
      const nextStatus = s.status === 'suspended' ? (s.previousStatus || (s.idCardVerified ? 'verified' : 'pending_id')) : 'suspended';
      changed = { ...s, status: nextStatus, previousStatus: s.status };
      return changed;
    }
    return s;
  });
  saveToStorage(KEYS.STUDENTS, updated);
  notifyStorageChange({ type: 'admin_students', students: updated });
  return changed;
}

// -------------------------------------------------------------
// Módulo de Administración: Moderación de Publicaciones
// -------------------------------------------------------------
export function getModerationItems() {
  return getFromStorage(KEYS.MODERATION, INITIAL_MODERATION_ITEMS);
}

export function approveModerationItem(itemId) {
  actor('admin');
  const items = getModerationItems();
  let approvedItem = null;
  const updated = items.map(item => {
    if (String(item.id) === String(itemId)) {
      approvedItem = { ...item, status: 'approved' };
      return approvedItem;
    }
    return item;
  });
  saveToStorage(KEYS.MODERATION, updated);

  // Sincronizar automáticamente con el catálogo público si aún no existe
  if (approvedItem) {
    const products = getProducts();
    const alreadyExists = products.some(p => p.moderationId === approvedItem.id);
    if (!alreadyExists) {
      const newProd = {
        id: crypto.randomUUID(),
        moderationId: approvedItem.id,
        title: approvedItem.title,
        category: approvedItem.categoryLabel || approvedItem.category || "Electrónica",
        categorySlug: (approvedItem.category || "electronica").toLowerCase(),
        price: Number(approvedItem.price).toFixed(2),
        currency: "S/",
        condition: approvedItem.condition || "Buen estado",
        rating: 5.0,
        image: approvedItem.image,
        seller: {
          name: approvedItem.seller?.name || approvedItem.sellerName || "Tomás Vargas Ramos",
          degree: approvedItem.seller?.faculty || approvedItem.sellerFaculty || "Estudiante UTP",
          avatar: approvedItem.seller?.avatar || approvedItem.sellerAvatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ3EPwvDx2e7U_iMQntBFB0XYjHb_i6dYt59ppCSEMdz761NUURDGduTZoXGjgBozc8KACqQoirbGm8qty_lHxUxmxthyes7ZbqGz49nW2SSCmgQU-XmtU4azti8MvmP58Qtx38wqicpc2nRiJBhz0hs7REP7H9XSWmbJVAhhNJgvxfTiDd9SMpO7SIv0ne64Z14kDyy6Bm9oA4g5Nh39dp_iC8qKb_tIGsD9_vpE"
        },
        description: `Artículo aprobado oficialmente por la administración de AlToque. Punto de entrega acordado: ${approvedItem.campusDeliveryPoint || approvedItem.deliveryPoint || "Campus UTP"}.`
      };
      saveToStorage(KEYS.PRODUCTS, [newProd, ...products]);
    }
  }

  notifyStorageChange({ type: 'admin_moderation', items: updated });
  return updated;
}

export function rejectModerationItem(itemId, reason) {
  actor('admin');
  const items = getModerationItems();
  let rejectedItem = null;
  const updated = items.map(item => {
    if (String(item.id) === String(itemId)) {
      rejectedItem = { ...item, status: 'rejected', rejectReason: reason };
      return rejectedItem;
    }
    return item;
  });
  saveToStorage(KEYS.MODERATION, updated);

  // Retirar del catálogo público si existiera
  if (rejectedItem) {
    const products = getProducts();
    const filtered = products.map(p => p.moderationId === rejectedItem.id ? { ...p, status: "removed" } : p);
    saveToStorage(KEYS.PRODUCTS, filtered);
  }

  notifyStorageChange({ type: 'admin_moderation', items: updated });
  return updated;
}

export function requestChangesModerationItem(itemId, notes) {
  actor('admin');
  const items = getModerationItems();
  const updated = items.map(item => {
    if (String(item.id) === String(itemId)) {
      return { ...item, status: 'changes_requested', changeNotes: notes };
    }
    return item;
  });
  saveToStorage(KEYS.MODERATION, updated);
  notifyStorageChange({ type: 'admin_moderation', items: updated });
  return updated;
}

// -------------------------------------------------------------
// Módulo de Administración: Reportes y Mediación
// -------------------------------------------------------------
export function getReports() {
  return getFromStorage(KEYS.REPORTS, INITIAL_REPORTS);
}

export function getReportById(reportId) {
  const reports = getReports();
  return reports.find(r => r.id === reportId);
}

export function addMediationMessage(reportId, messageData) {
  actor('admin');
  const reports = getReports();
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const updated = reports.map(r => {
    if (r.id === reportId) {
      const newMsg = {
        id: Date.now(),
        senderRole: messageData.senderRole || 'admin',
        senderName: messageData.senderName || 'Admin UTP (Moderador Oficial)',
        senderCode: messageData.senderCode || 'UTP Central',
        text: messageData.text,
        time: timeStr
      };
      return {
        ...r,
        messages: [...(r.messages || []), newMsg]
      };
    }
    return r;
  });
  saveToStorage(KEYS.REPORTS, updated);
  notifyStorageChange({ type: 'admin_reports', reports: updated, reportId });
  return updated;
}

export function resolveReport(reportId, resolutionType) {
  actor('admin');
  const reports = getReports();
  const updated = reports.map(r => {
    if (r.id === reportId) {
      let statusLabel = 'Resuelto';
      if (resolutionType === 'agreement') statusLabel = 'Acuerdo registrado';
      else if (resolutionType === 'dismiss') statusLabel = 'Reclamo Desestimado';
      else if (resolutionType === 'sanction') statusLabel = 'Vendedor Sancionado';
      return {
        ...r,
        status: 'resolved',
        statusLabel,
        resolutionType,
        resolvedAt: new Date().toISOString()
      };
    }
    return r;
  });
  saveToStorage(KEYS.REPORTS, updated);
  notifyStorageChange({ type: 'admin_reports', reports: updated, reportId });
  return updated;
}

// -------------------------------------------------------------
// Módulo de Administración: Sedes y Parámetros
// -------------------------------------------------------------
export function getCampusSettings() {
  return getFromStorage(KEYS.CAMPUS_SETTINGS, INITIAL_CAMPUS_SETTINGS);
}

export function saveCampusSettings(newSettings) {
  actor('admin');
  const settingsWithTimestamp = {
    ...newSettings,
    lastModified: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' })
  };
  saveToStorage(KEYS.CAMPUS_SETTINGS, settingsWithTimestamp);
  notifyStorageChange({ type: 'admin_settings', settings: settingsWithTimestamp });
  return settingsWithTimestamp;
}

// -------------------------------------------------------------
// Módulo de Administración: Transacciones de Campus
// -------------------------------------------------------------
export function getCampusTransactions() {
  return getFromStorage(KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS);
}

function getPersonal(key, fallback) {
  const user = getCurrentUser();
  if (user?.role !== 'client') return [];
  return getFromStorage(key + ':' + user.id, user.id === DEMO_CLIENT.id ? getFromStorage(key, fallback) : []);
}

function savePersonal(key, value) {
  const user = getCurrentUser();
  if (user?.role !== 'client') throw new Error('Inicia sesión como estudiante.');
  saveToStorage(key + ':' + user.id, value);
}

export const saveNewProduct = saveProduct;
export const isListingActive = product => !product.status || product.status === 'active';

export function getMyListings() {
  const user = getCurrentUser();
  if (user?.role !== 'client') return [];
  return getProducts().filter(product => product.ownerId === user.id);
}

export function editProduct(id, changes) {
  const original = getMyListings().find(product => String(product.id) === String(id));
  if (!original) throw new Error('Solo puedes editar tus publicaciones.');
  if (!changes.title?.trim() || !changes.category || !Number.isFinite(Number(changes.price)) || Number(changes.price) < 0) throw new Error('Revisa los datos de la publicación.');
  const updated = { ...original, ...changes, id: original.id, ownerId: original.ownerId, seller: original.seller, status: original.status };
  saveToStorage(KEYS.PRODUCTS, getProducts().map(product => product.id === original.id ? updated : product));
  notifyStorageChange({ type: 'product_updated' });
  return updated;
}

export function getSellerReviews(id) {
  return getFromStorage(KEYS.SELLER_REVIEWS, INITIAL_SELLER.reviews).filter(review =>
    review.recipientId === id || (!review.recipientId && id === INITIAL_SELLER.id));
}

export function canReview(recipientId) {
  return Boolean(reviewableOperation(recipientId));
}

function reviewableOperation(recipientId) {
  const user = getCurrentUser();
  if (user?.role !== 'client' || user.id === recipientId) return;
  const reviews = getSellerReviews(recipientId);
  return getOperations().find(operation => operation.completedAt && operation.participants.includes(recipientId) &&
    !reviews.some(review => review.operationId === operation.id && review.authorId === user.id));
}

export function addSellerReview({ recipientId, rating, comment }) {
  const user = getCurrentUser();
  const operation = reviewableOperation(recipientId);
  if (!operation || !Number.isInteger(rating) || rating < 1 || rating > 5 || !comment.trim()) throw new Error('Debes completar una operación antes de calificar.');
  const review = { id: crypto.randomUUID(), operationId: operation.id, recipientId, authorId: user.id,
    author: user.name, avatar: user.avatar, date: new Date().toLocaleDateString('es-PE'), rating, comment: comment.trim() };
  saveToStorage(KEYS.SELLER_REVIEWS, [review, ...getFromStorage(KEYS.SELLER_REVIEWS, INITIAL_SELLER.reviews)]);
  notifyStorageChange({ type: 'reviews' });
  return getSellerReviews(recipientId);
}

const OPERATIONS = 'altoque_operations';

export function getOperations() {
  const user = getCurrentUser();
  return getFromStorage(OPERATIONS, []).filter(operation =>
    user?.role === 'admin' || Boolean(user && operation.participants.includes(user.id)));
}

export function startOperation(productId) {
  const user = getCurrentUser();
  const product = getProductById(productId);
  const sellerId = product?.ownerId || product?.seller?.id;
  if (user?.role !== 'client' || !product || !sellerId || sellerId === user.id || !isListingActive(product)) throw new Error('No se puede iniciar esta operación.');
  const all = getFromStorage(OPERATIONS, []);
  if (all.some(item => item.productId === product.id && item.participants[0] === user.id)) throw new Error('Ya registraste esta operación.');
  saveToStorage(OPERATIONS, [...all, { id: crypto.randomUUID(), productId: product.id, title: product.title,
    type: product.type || 'venta', participants: [user.id, sellerId], confirmations: [], createdAt: new Date().toISOString() }]);
  notifyUser(sellerId, user.name + ' registró una operación para ' + product.title);
  notifyStorageChange({ type: 'operations' });
}

export function confirmOperation(id) {
  const user = getCurrentUser();
  const operation = getOperations().find(item => item.id === id);
  if (user?.role !== 'client' || !operation || operation.confirmations.includes(user.id)) return;
  const confirmations = [...operation.confirmations, user.id];
  const completedAt = confirmations.length === 2 ? new Date().toISOString() : null;
  saveToStorage(OPERATIONS, getFromStorage(OPERATIONS, []).map(item =>
    item.id === id ? { ...item, confirmations, completedAt } : item));
  notifyStorageChange({ type: 'operations' });
}

const BUSINESS = 'altoque_business_v1';
const DAY = 86400000;
const DEFAULT_PLANS = [
  { id: 'basic', name: 'Impulso básico', days: 3, price: 2 },
  { id: 'plus', name: 'Impulso plus', days: 7, price: 5 },
  { id: 'max', name: 'Impulso máximo', days: 15, price: 9 }
];

function business() {
  return { plans: DEFAULT_PLANS, welcomeDays: 0, promotions: [], ads: [], tickets: [],
    surveys: [], moderation: [], categories: INITIAL_CATEGORIES.map(category => ({ ...category, slug: category.id })), ...getFromStorage(BUSINESS, {}) };
}

function actor(role) {
  const user = getCurrentUser();
  if (user?.role !== role) throw new Error('Tu sesión no tiene acceso a esta operación.');
  return user;
}

function changeBusiness(updates) {
  saveToStorage(BUSINESS, { ...business(), ...updates });
  notifyStorageChange({ type: 'business' });
}

export function getBusinessAdmin() {
  actor('admin');
  return business();
}

export const getCategories = () => business().categories;
export const getPlans = () => business().plans;
export const getWelcomeDays = () => business().welcomeDays;
export const isPromotionActive = (promotion, now = Date.now()) => Date.parse(promotion.endsAt) > now;

export function getListingPromotion(id) {
  return business().promotions.find(promotion => String(promotion.productId) === String(id));
}

export function promoteListing(id, planId) {
  const user = actor('client');
  const listing = getMyListings().find(product => String(product.id) === String(id) && isListingActive(product));
  const { plans, welcomeDays, promotions } = business();
  const welcome = planId === 'welcome' && welcomeDays && !promotions.some(item => item.userId === user.id && item.planId === 'welcome');
  const plan = welcome ? { id: 'welcome', name: 'Bienvenida', days: welcomeDays, price: 0 } : plans.find(item => item.id === planId);
  const previous = getListingPromotion(id);
  if (!listing || !plan || (previous && isPromotionActive(previous))) throw new Error('La publicación o el plan no están disponibles.');
  changeBusiness({ promotions: [{ id: crypto.randomUUID(), userId: user.id, productId: listing.id,
    title: listing.title, planId: plan.id, name: plan.name, amount: plan.price, createdAt: new Date().toISOString(),
    endsAt: new Date(Date.now() + plan.days * DAY).toISOString() }, ...promotions] });
}

export function configurePlan(id, price, days) {
  actor('admin');
  if (!Number.isFinite(price) || price < 0 || !Number.isInteger(days) || days < 1 || days > 365) throw new Error('Ingresa un precio y una duración válidos.');
  changeBusiness({ plans: getPlans().map(plan => plan.id === id ? { ...plan, price, days } : plan) });
}

export function configureWelcome(days) {
  actor('admin');
  if (!Number.isInteger(days) || days < 0 || days > 365) throw new Error('Ingresa una duración válida.');
  changeBusiness({ welcomeDays: days });
}

export function getPublicProducts() {
  const featured = new Set(business().promotions.filter(promotion => isPromotionActive(promotion)).map(item => String(item.productId)));
  return getProducts().filter(isListingActive).map(product => ({ ...product, featured: featured.has(String(product.id)) }))
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}

export function submitTicket({ type, subject, message }) {
  const user = actor('client');
  if (!['Consulta', 'Problema técnico', 'Solicitud de servicio'].includes(type) || !subject.trim() || !message.trim()) throw new Error('Completa los datos de la solicitud.');
  changeBusiness({ tickets: [{ id: crypto.randomUUID(), userId: user.id, name: user.name, type,
    subject: subject.trim(), message: message.trim(), priority: 'Normal', status: 'Pendiente',
    createdAt: new Date().toISOString(), responses: [] }, ...business().tickets] });
}

export function getMyTickets() {
  const user = getCurrentUser();
  return user?.role === "client" ? business().tickets.filter(ticket => ticket.userId === user.id) : [];
}

export function updateTicket(id, { type, status, priority, response }) {
  actor('admin');
  if (!['Pendiente', 'En atención', 'Resuelto'].includes(status)) throw new Error('Estado inválido.');
  const now = new Date().toISOString();
  if (response.trim() || status !== 'Pendiente') {
    const ticket = business().tickets.find(item => item.id === id);
    if (ticket && (response.trim() || ticket.status !== status)) notifyUser(ticket.userId, 'Actualización de soporte: ' + ticket.subject);
  }
  changeBusiness({ tickets: business().tickets.map(ticket => ticket.id === id ? {
    ...ticket, type, status, priority, attendedAt: ticket.attendedAt || (response.trim() || status !== 'Pendiente' ? now : null),
    resolvedAt: status === 'Resuelto' ? ticket.resolvedAt || now : null,
    responses: response.trim() ? [...ticket.responses, { text: response.trim(), date: now }] : ticket.responses
  } : ticket) });
}

export function submitSurvey(score) {
  const user = actor('client');
  if (!Number.isInteger(score) || score < 1 || score > 5) throw new Error('Selecciona una calificación.');
  changeBusiness({ surveys: [...business().surveys.filter(item => item.userId !== user.id),
    { userId: user.id, score, date: new Date().toISOString() }] });
}

export function submitAd({ businessName, email, description }) {
  if (!businessName.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !description.trim()) throw new Error('Completa los datos del negocio.');
  changeBusiness({ ads: [{ id: crypto.randomUUID(), businessName: businessName.trim(), email: email.trim(),
    description: description.trim(), status: 'Pendiente', createdAt: new Date().toISOString() }, ...business().ads] });
}

function validateUrl(value) {
  if (!value) return '';
  let url;
  try { url = new URL(value); } catch { throw new Error('Usa una URL válida.'); }
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Usa una URL HTTP o HTTPS.');
  return url.href;
}

export function updateAd(id, fields) {
  actor('admin');
  const ads = business().ads;
  const original = ads.find(ad => ad.id === id);
  if (!original) throw new Error('Solicitud inexistente.');
  if (!['Pendiente', 'Activo', 'Finalizado', 'Rechazado'].includes(fields.status)) throw new Error('Estado inválido.');
  if (!Number.isFinite(fields.price) || fields.price < 0 || !Number.isInteger(fields.days) || fields.days < 1) throw new Error('Revisa el precio y la duración.');
  const activatedAt = original.activatedAt || (fields.status === 'Activo' ? new Date().toISOString() : null);
  const updated = { ...original, ...fields, link: validateUrl(fields.link), image: validateUrl(fields.image), activatedAt,
    amount: original.amount ?? (activatedAt ? fields.price : null),
    endsAt: activatedAt ? new Date(Date.parse(activatedAt) + fields.days * DAY).toISOString() : null };
  changeBusiness({ ads: ads.map(ad => ad.id === id ? updated : ad) });
}

export const getAdStatus = ad => ad.status === 'Activo' && Date.parse(ad.endsAt) <= Date.now() ? 'Finalizado' : ad.status;
export const getActiveAds = () => business().ads.filter(ad => getAdStatus(ad) === 'Activo');

export function reportProduct(id, reason) {
  const user = actor('client');
  const product = getProductById(id);
  if (!product || !isListingActive(product) || product.ownerId === user.id || !reason.trim()) throw new Error('Indica el motivo del reporte.');
  const reports = getReports();
  if (reports.some(report => report.product?.id === product.id && report.reporterId === user.id && report.status !== 'resolved')) throw new Error('Ya hay un reporte pendiente.');
  const now = new Date();
  saveToStorage(KEYS.REPORTS, [{ id: crypto.randomUUID(), reporterId: user.id, claimNarrative: reason.trim(),
    status: 'pending', statusLabel: 'Pendiente', title: product.title, type: 'Publicación',
    createdAt: now.toISOString(), date: now.toLocaleDateString('es-PE'), startDate: now.toLocaleDateString('es-PE'),
    productTitle: product.title, productImage: product.image, productCondition: product.condition, summary: reason.trim(),
    campusPoint: product.meetingPoint || 'UTP Lima Norte', amountHeld: 0, evidences: [],
    product: { ...product, title: product.title, image: product.image }, messages: [],
    buyer: { name: user.name, code: user.email, avatar: user.avatar }, seller: product.seller }, ...reports]);
  notifyStorageChange({ type: 'admin_reports' });
}

export function moderateListing(id, status, reason) {
  const user = actor('admin');
  if (!['active', 'removed'].includes(status) || !reason.trim() || !getProductById(id)) throw new Error('Indica un motivo para el cambio.');
  saveToStorage(KEYS.PRODUCTS, getProducts().map(product =>
    product.id === id ? { ...product, status } : product));
  changeBusiness({ moderation: [{ productId: id, status, reason: reason.trim(), adminId: user.id,
    date: new Date().toISOString() }, ...business().moderation] });
}

export function saveCategory(name) {
  actor('admin');
  const label = name.trim();
  const slug = label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const categories = getCategories();
  if (!slug || categories.some(category => category.slug === slug)) throw new Error('Ingresa una categoría nueva.');
  changeBusiness({ categories: [...categories, { id: slug, slug, name: label, label, icon: 'category' }] });
}

const VIEWS = 'altoque_listing_views';

export function recordView(id) {
  const seen = 'altoque_viewed:' + id;
  if (sessionStorage.getItem(seen)) return;
  const views = getFromStorage(VIEWS, {});
  saveToStorage(VIEWS, { ...views, [id]: (views[id] || 0) + 1 });
  sessionStorage.setItem(seen, '1');
}

export function getListingStats(id) {
  const favoriteKeys = Object.keys(localStorage).filter(key => key.startsWith(KEYS.FAVORITES + ':'));
  const demoKey = KEYS.FAVORITES + ':' + DEMO_CLIENT.id;
  if (!favoriteKeys.includes(demoKey)) favoriteKeys.push(KEYS.FAVORITES);
  return { views: getFromStorage(VIEWS, {})[id] || 0,
    favorites: favoriteKeys.filter(key => getFromStorage(key, []).map(String).includes(String(id))).length };
}

export function getAccountProfile(id) {
  if (id === DEMO_CLIENT.id) return DEMO_CLIENT;
  const account = getFromStorage(KEYS.REGISTERED_USERS, []).find(user => user.id === id);
  if (!account) return null;
  return { id, name: account.name, avatar: account.avatar, degree: account.degree };
}
