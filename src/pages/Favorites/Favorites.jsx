import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import ProductCard from '../../components/shared/ProductCard/ProductCard';
import { getFavoriteProducts, getFavorites, toggleFavorite } from '../../services/storage';
import './Favorites.css';

export default function Favorites() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');

  const loadFavorites = () => {
    const products = getFavoriteProducts();
    setFavoriteProducts(products);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadFavorites();

    const handleStorageUpdate = (e) => {
      if (e.detail?.type === 'favorites_updated' || e.detail?.type === 'external' || e.detail?.type === 'products') {
        loadFavorites();
      }
    };
    window.addEventListener('altoque_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('altoque_storage_update', handleStorageUpdate);
  }, []);

  const handleClearFavorites = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar tu lista de favoritos?')) {
      const current = getFavorites();
      current.forEach(id => toggleFavorite(id));
      loadFavorites();
    }
  };

  const filtered = filterCategory === 'all'
    ? favoriteProducts
    : favoriteProducts.filter(p => p.category === filterCategory);

  return (
    <MainLayout>
      <div className="favorites-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header con estadísticas */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-outline-variant/30 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-error text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <h1 className="font-headline-lg text-headline-lg text-primary font-bold">
                Mis Publicaciones Favoritas
              </h1>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Guarda artículos universitarios de interés para compararlos, contactar al vendedor o comprarlos en el campus.
            </p>
          </div>

          {favoriteProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-bold text-label-bold">
                {favoriteProducts.length} {favoriteProducts.length === 1 ? 'artículo' : 'artículos'}
              </span>
              <button
                onClick={handleClearFavorites}
                className="px-3 py-1.5 rounded-lg border border-outline-variant text-on-surface-variant hover:text-error hover:border-error text-body-sm transition-colors"
                title="Vaciar favoritos"
              >
                Vaciar lista
              </button>
            </div>
          )}
        </div>

        {/* Filtros por Categoría */}
        {favoriteProducts.length > 0 && (
          <div className="flex items-center gap-2 py-4 overflow-x-auto">
            <span className="font-label-caps text-label-caps text-on-surface-variant mr-1">Filtrar:</span>
            {[
              { id: 'all', label: 'Todos' },
              { id: 'libros', label: 'Libros' },
              { id: 'electronica', label: 'Electrónica' },
              { id: 'laboratorio', label: 'Laboratorio' },
              { id: 'papeleria', label: 'Papelería' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full font-label-bold text-label-bold text-xs transition-all ${
                  filterCategory === cat.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Grilla de productos o Estado Vacío */}
        {favoriteProducts.length === 0 ? (
          <div className="text-center py-20 px-4 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl my-8 max-w-2xl mx-auto shadow-sm">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-error-container/40 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[44px]">favorite_border</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-primary font-bold mb-2">
              Aún no tienes favoritos guardados
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-8">
              Encuentra calculadoras, batas de laboratorio, libros y materiales académicos y pulsa en el corazón para tenerlos a mano.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-on-secondary font-label-bold text-label-bold hover:brightness-105 active:scale-95 transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">explore</span>
              <span>Explorar el Catálogo</span>
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-body-md text-on-surface-variant">
              No tienes artículos favoritos en la categoría seleccionada.
            </p>
            <button
              onClick={() => setFilterCategory('all')}
              className="mt-3 text-secondary font-label-bold hover:underline"
            >
              Ver todos los favoritos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                category={product.categoryLabel || product.category}
                rating={product.rating}
                title={product.title}
                condition={product.condition}
                price={product.price}
                currency={product.currency}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
