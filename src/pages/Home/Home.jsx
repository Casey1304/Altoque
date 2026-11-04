import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import ProductCard from '../../components/shared/ProductCard/ProductCard';
import { getProducts } from '../../services/storage';
import './Home.css';

export default function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  // Filtrado por búsqueda si el usuario ingresó algo en la barra
  const displayProducts = products.filter((product) => {
    if (!query) return true;
    return (
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      (product.categoryLabel && product.categoryLabel.toLowerCase().includes(query.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
    );
  });

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
            El mercado confiable para estudiantes universitarios. Compra y vende recursos de forma segura y al instante.
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

      {/* Product Grid Section Header - Exacto a Stitch */}
      <div id="products-section" className="flex items-center justify-between mb-stack-md">
        <h3 className="font-headline-md text-headline-md text-primary font-bold">Tendencias</h3>
        <button 
          onClick={() => navigate('/categoria/electronica')}
          className="text-secondary hover:text-primary transition-colors font-label-bold text-label-bold"
        >
          Ver todo
        </button>
      </div>

      {/* Product Grid - Exacto a Stitch con moneda en Soles (S/) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-gutter">
        {displayProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            category={product.categoryLabel || product.category}
            condition={product.condition}
            price={product.price}
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
