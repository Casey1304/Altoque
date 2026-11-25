
import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from 'vite';

test('routes render for guests, students and administrators', async () => {
  const data = new Map();
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: key => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
    removeItem: key => data.delete(key)
  } });
  const vite = await createServer({ server: { middlewareMode: true, ws: false } });
  try {
    const { AppRoutes } = await vite.ssrLoadModule('/src/App.jsx');
    const store = await vite.ssrLoadModule('/src/services/storage.js');
    const render = path => renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [path] }, createElement(AppRoutes)));
    store.initStorage();
    assert.match(render('/'), /Filtros de catálogo/);
    assert.equal(render('/admin'), '');
    assert.equal(render('/mensajes'), '');
    assert.match(render('/producto/1'), /Calculadora/);
    assert.match(render('/categoria/electronica'), /Electrónica/);
    assert.match(render('/vendedor/seller-2'), /Alex Rivera/);
    assert.match(render('/login'), /Cuentas de Demostración/);
    assert.match(render('/registro'), /Únete a la comunidad/);
    await store.authenticateUser('cliente@altoque.com', 'Cliente123');
    assert.equal(render('/admin/ingresos'), '');
    assert.match(render('/mis-compras'), /Historial de operaciones/);
    assert.match(render('/favoritos'), /Favoritos/);
    assert.match(render('/ayuda'), /Centro de ayuda/);
    assert.match(render('/anunciate'), /Enviar solicitud comercial/);
    assert.match(render('/mensajes'), /Mensajes/);
    assert.match(render('/vender'), /Publicar nuevo artículo/);
    await store.authenticateUser('admin@altoque.com', 'Admin123');
    assert.equal(render('/'), '');
    assert.match(render('/admin'), /Indicadores del prototipo/);
    assert.match(render('/admin/usuarios'), /Estudiante/);
    assert.match(render('/admin/moderacion'), /Moderación de Artículos/);
    assert.match(render('/admin/reportes'), /Andrea Lozano/);
    assert.match(render('/admin/sedes'), /Sedes/);
    assert.match(render('/admin/publicaciones'), /Publicaciones del catálogo/);
    assert.match(render('/admin/promociones'), /Planes de promoción/);
    assert.match(render('/admin/publicidad'), /Solicitudes y anuncios/);
    assert.match(render('/admin/ingresos'), /Ingresos simulados de Nexu/);
    assert.match(render('/admin/soporte'), /Solicitudes de soporte/);
    store.logoutUser();
    assert.equal(render('/admin'), '');
  } finally {
    await vite.close();
  }
});
