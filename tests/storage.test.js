
import assert from 'node:assert/strict';
import test, { beforeEach } from 'node:test';
import * as store from '../src/services/storage.js';

function memoryStorage() {
  return {
    getItem(key) { return Object.hasOwn(this, key) ? this[key] : null; },
    setItem(key, value) { this[key] = String(value); },
    removeItem(key) { delete this[key]; }
  };
}

beforeEach(() => {
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: memoryStorage() });
  Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, value: memoryStorage() });
  store.initStorage();
});

const client = () => store.authenticateUser('cliente@altoque.com', 'Cliente123');
const admin = () => store.authenticateUser('admin@altoque.com', 'Admin123');
const register = (email = 'pruebas@utp.edu.pe') => store.registerUser({ email, fullName: 'Prueba UTP', password: 'DemoUtp123' });
const listing = () => store.saveProduct({ title: 'Calculadora demo', category: 'electronica', price: 20, type: 'venta' });

test('demo sign-in, logout, initialization and institutional registration', async () => {
  assert.equal(store.getCurrentUser(), null);
  assert.equal((await admin()).role, 'admin');
  store.initStorage();
  assert.equal(store.getCurrentRole(), 'admin');
  store.logoutUser();
  store.initStorage();
  assert.equal(store.getCurrentUser(), null);
  await assert.rejects(() => register('usuario@ejemplo.com'), /institucional/);
  const student = await register();
  assert.equal(store.getCurrentRole(), 'client');
  await assert.rejects(() => register(), /registrado/);
  assert.throws(() => store.getBusinessAdmin(), /sesión/);
  await admin();
  store.verifyStudentCard(student.id);
  assert.ok(store.getStudents().find(item => item.id === student.id).verifiedAt);
  store.toggleStudentStatus(student.id);
  assert.equal((await store.authenticateUser(student.email, 'DemoUtp123')).success, false);
  store.toggleStudentStatus(student.id);
  assert.equal((await store.authenticateUser(student.email, 'DemoUtp123')).success, true);
});

test('published listings, ownership, favorites, legacy data and views', async () => {
  await client();
  const item = listing();
  store.editProduct(item.id, { title: 'Calculadora editada', category: 'electronica', price: 21 });
  store.toggleFavorite(item.id);
  store.recordView(item.id);
  store.recordView(item.id);
  store.initStorage();
  assert.equal(store.getProductById(item.id).title, 'Calculadora editada');
  assert.ok(store.isFavorite(item.id));
  assert.deepEqual(store.getListingStats(item.id), { views: 1, favorites: 1 });
  await register();
  assert.deepEqual(store.getFavorites(), []);
  assert.deepEqual(store.getMyListings(), []);
  assert.throws(() => store.deleteProduct(item.id), /tus publicaciones/);
  assert.throws(() => store.editProduct(item.id, { title: 'Otro título' }), /tus publicaciones/);
  await client();
  store.deleteProduct(item.id);
  assert.equal(store.getProductById(item.id), undefined);
  assert.ok(store.isFavorite(1));
});

test('two users exchange messages and confirm an operation before reviewing each other', async () => {
  const seller = (await client()).user;
  const item = listing();
  const buyer = await register();
  store.createQuickChat(item.title, '¿Sigue disponible?', item.seller, item.id);
  assert.equal(store.getChats()[0].messages[0].sender, 'me');
  store.startOperation(item.id);
  const operation = store.getOperations()[0];
  assert.equal(store.canReview(seller.id), false);
  store.confirmOperation(operation.id);
  assert.equal(store.canReview(seller.id), false);
  await client();
  assert.equal(store.getChats()[0].messages[0].sender, 'them');
  store.sendChatMessage(store.getChats()[0].id, 'Sí, coordinemos por aquí.');
  assert.ok(store.getNotifications().some(item => item.unread));
  store.markNotificationsRead();
  assert.ok(store.getNotifications().every(item => !item.unread));
  store.confirmOperation(operation.id);
  store.addSellerReview({ recipientId: buyer.id, rating: 4, comment: 'Buen trato' });
  assert.throws(() => store.addSellerReview({ recipientId: buyer.id, rating: 4, comment: 'Duplicada' }), /operación/);
  await store.authenticateUser(buyer.email, 'DemoUtp123');
  assert.equal(store.getChats()[0].messages.at(-1).sender, 'them');
  store.addSellerReview({ recipientId: seller.id, rating: 5, comment: 'Todo bien' });
  assert.equal(store.getSellerReviews(seller.id)[0].rating, 5);
});

test('promotion plans, welcome, featured order and expiration', async () => {
  await client();
  const item = listing();
  store.promoteListing(item.id, 'basic');
  const promotion = store.getListingPromotion(item.id);
  assert.equal(promotion.amount, 2);
  assert.equal(store.getPublicProducts()[0].id, item.id);
  assert.equal(store.getPublicProducts()[0].featured, true);
  assert.equal(store.isPromotionActive(promotion, Date.parse(promotion.endsAt)), false);
  assert.throws(() => store.promoteListing(item.id, 'plus'), /disponibles/);
  const originalNow = Date.now;
  try {
    Date.now = () => Date.parse(promotion.endsAt) + 1;
    assert.equal(store.getPublicProducts().find(product => product.id === item.id).featured, false);
  } finally { Date.now = originalNow; }
  await admin();
  store.configurePlan('plus', 6, 8);
  store.configureWelcome(2);
  await client();
  store.promoteListing(listing().id, 'welcome');
  assert.throws(() => store.promoteListing(listing().id, 'welcome'), /disponibles/);
  await admin();
  assert.deepEqual(store.getBusinessAdmin().promotions.map(item => item.amount), [0, 2]);
  assert.equal(store.getPlans().find(plan => plan.id === 'plus').price, 6);
});

test('commercial requests, ad revenue, support, surveys and moderation', async () => {
  const student = (await client()).user;
  const item = listing();
  store.submitTicket({ type: 'Consulta', subject: 'Publicación', message: 'Tengo una duda' });
  store.submitSurvey(5);
  store.submitAd({ businessName: 'Librería de prueba', email: 'demo@example.com', description: 'Útiles' });
  const other = await register();
  store.reportProduct(item.id, 'Revisar descripción');
  assert.deepEqual(store.getMyTickets(), []);
  await admin();
  const { ads: [ad], tickets: [ticket] } = store.getBusinessAdmin();
  store.updateAd(ad.id, { status: 'Activo', price: 20, days: 7, link: 'https://example.com', image: '' });
  store.updateAd(ad.id, { status: 'Activo', price: 30, days: 7, link: 'https://example.com', image: '' });
  assert.equal(store.getActiveAds()[0].amount, 20);
  store.updateTicket(ticket.id, { type: 'Consulta', priority: 'Alta', status: 'Resuelto', response: 'Respuesta de prueba' });
  store.moderateListing(item.id, 'removed', 'Revisión solicitada por estudiante');
  assert.ok(!store.getPublicProducts().some(product => product.id === item.id));
  store.moderateListing(item.id, 'active', 'Se corrigió la descripción');
  store.saveCategory('Arquitectura');
  const report = store.getReports().find(item => item.reporterId === other.id);
  store.resolveReport(report.id, 'agreement');
  assert.equal(store.getReportById(report.id).status, 'resolved');
  assert.equal(store.getBusinessAdmin().surveys[0].userId, student.id);
  assert.equal(store.getBusinessAdmin().moderation.length, 2);
  assert.ok(store.getCategories().some(item => item.id === 'arquitectura'));
  await client();
  assert.ok(store.getMyTickets()[0].resolvedAt);
  assert.equal(store.getMyTickets()[0].responses[0].text, 'Respuesta de prueba');
});
