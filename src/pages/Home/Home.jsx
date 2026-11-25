import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import ProductCard from '../../components/shared/ProductCard/ProductCard';
import { getPublicProducts, getCategories } from '../../services/storage';
import { AdPlacement } from '../Services/Services';
import { useStorageRefresh } from '../../services/useStorageRefresh';
import './Home.css';

export default function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  useStorageRefresh();
  const products = getPublicProducts();
  const [filters, setFilters] = useState({ category: '', faculty: '', course: '', condition: '', max: '' });
  const displayProducts = products.filter(product =>
    [product.title, product.categoryLabel, product.description, product.course].some(value => value?.toLowerCase().includes(query.toLowerCase())) &&
    (!filters.category || product.category === filters.category) &&
    (!filters.faculty || product.faculty === filters.faculty) &&
    (!filters.course || product.course === filters.course) &&
    (!filters.condition || product.condition === filters.condition) &&
    (!filters.max || Number(product.price) <= Number(filters.max)));
  const updateFilter = (key, value) => setFilters(current => ({ ...current, [key]: value }));

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MainLayout>
      {/* Hero Section - Exacto a Stitch */}
      <section className="mb-stack-lg rounded-xl bg-surface-container overflow-hidden relative min-h-[200px] flex items-center border border-outline-variant">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-container to-transparent z-0"></div>
        <div className="relative z-10 p-8 lg:p-12 max-w-2xl text-on-primary">
          <h1 className="font-headline-lg-mobile lg:font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-primary mb-stack-sm font-bold">
            Encuentra lo que necesitas, Al Toque.
          </h1>
          <p className="font-body-md text-body-md text-on-primary opacity-90 mb-stack-md">
            El mercado confiable para estudiantes universitarios. Compra, vende e intercambia recursos. Coordina la entrega con otros estudiantes.
          </p>
          <button 
            onClick={scrollToProducts}
            className="bg-secondary text-on-secondary font-label-bold text-label-bold px-6 py-3 rounded hover:bg-secondary-container hover:text-on-secondary-container transition-colors active:scale-95 duration-150 inline-flex items-center gap-2"
          >
            Empezar a Explorar <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Banner de búsqueda si hay filtro activo */}
      {query && (
        <div className="mb-6 p-4 rounded-xl bg-surface-container border border-outline-variant flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">search</span>
            <span className="font-body-md text-on-surface">
              Resultados para: <strong>"{query}"</strong> ({displayProducts.length} encontrados)
            </span>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="text-body-sm font-label-bold text-secondary hover:underline"
          >
            Limpiar filtro
          </button>
        </div>
      )}

      <AdPlacement />
      <div className="service-page">
        <section className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5" aria-label="Filtros de catálogo">
          <label>Categoría <select value={filters.category} onChange={event => updateFilter('category', event.target.value)}>
            <option value="">Todas</option>{getCategories().map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select></label>
          {[['faculty','Facultad'], ['course','Curso'], ['condition','Estado']].map(([key, label]) =>
            <label key={key}>{label} <select value={filters[key]} onChange={event => updateFilter(key, event.target.value)}>
              <option value="">Todos</option>{[...new Set(products.map(item => item[key]).filter(Boolean))].sort().map(value => <option key={value}>{value}</option>)}
            </select></label>)}
          <label>Precio máximo en soles <input value={filters.max} onChange={event => updateFilter('max', event.target.value)} type="number" min="0" step="0.01" /></label>
        </section>
      </div>
      {/* Product Grid Section Header - Exacto a Stitch */}
      <div id="products-section" className="flex items-center justify-between mb-stack-md">
        <h3 className="font-headline-md text-headline-md text-primary font-bold">Tendencias</h3>
        <button 
          onClick={() => { setFilters({ category: '', faculty: '', course: '', condition: '', max: '' }); navigate('/'); }}
          className="text-secondary hover:text-primary transition-colors font-label-bold text-label-bold"
        >
          Ver todo
        </button>
      </div>

      {!displayProducts.length && <p className="py-6">No se encontraron publicaciones.</p>}
      {/* Product Grid - Exacto a Stitch con moneda en Soles (S/) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-gutter">
        {displayProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            category={product.categoryLabel || product.category}
            condition={product.condition}
            price={Number(product.price)}
            featured={product.featured}
            type={product.type}
            currency={product.currency === '$' ? 'S/' : (product.currency || 'S/')}
            rating={product.rating}
            image={product.image}
            className={product.className}
          />
        ))}
      </div>
    </MainLayout>
  );
}
