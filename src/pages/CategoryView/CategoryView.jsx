import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import ProductCard from '../../components/shared/ProductCard/ProductCard';
import { getProducts } from '../../services/storage';
import { INITIAL_CATEGORIES } from '../../services/mockData';
import './CategoryView.css';

const CATEGORY_META = {
  libros: {
    title: 'Libros de Texto',
    subtitle: 'Encuentra libros de cálculo, física, medicina, economía y más para tus asignaturas.',
    icon: 'menu_book'
  },
  electronica: {
    title: 'Electrónica',
    subtitle: 'Encuentra calculadoras científicas, teclados, auriculares y herramientas para tus clases.',
    icon: 'devices'
  },
  laboratorio: {
    title: 'Equipo de Laboratorio',
    subtitle: 'Batas 100% algodón, microscopios, matraces y material de seguridad química y biológica.',
    icon: 'science'
  },
  papeleria: {
    title: 'Papelería',
    subtitle: 'Estilógrafos técnicos, cuadernos universitarios, planners y materiales de dibujo.',
    icon: 'edit_note'
  }
};

export default function CategoryView() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [conditionFilter, setConditionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchFilter, setSearchFilter] = useState('');

  const meta = CATEGORY_META[slug] || {
    title: 'Recursos Universitarios',
    subtitle: 'Explora todos los artículos académicos disponibles.',
    icon: 'category'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setProducts(getProducts());
  }, [slug]);

  // Filtrado de productos de esta categoría
  let filtered = products.filter(p => p.category === slug);

  if (searchFilter.trim()) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchFilter.toLowerCase()))
    );
  }

  if (conditionFilter !== 'all') {
    filtered = filtered.filter(p => p.condition.toLowerCase().includes(conditionFilter.toLowerCase()));
  }

  // Ordenamiento
  if (sortBy === 'lowest') {
    filtered.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy === 'highest') {
    filtered.sort((a, b) => Number(b.price) - Number(a.price));
  }

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="mb-stack-lg">
        <div className="flex items-center gap-2 text-secondary mb-1">
          <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {meta.icon}
          </span>
          <span className="font-label-bold text-label-bold uppercase tracking-wider text-[12px]">Categoría Oficial</span>
        </div>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-2">
          {meta.title}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {meta.subtitle}
        </p>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-stack-lg pb-4 border-b border-outline-variant">
        {/* Mobile Search */}
        <div className="md:hidden relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input 
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all shadow-sm outline-none" 
            placeholder={`Buscar en ${meta.title}...`} 
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>

        {/* Condition Filter Chips */}
        <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
          <span className="font-label-bold text-label-bold text-on-surface mr-1 text-body-sm">
            Estado:
          </span>
          {[
            { id: 'all', label: 'Todos' },
            { id: 'nuevo', label: 'Nuevo' },
            { id: 'como nuevo', label: 'Como Nuevo' },
            { id: 'usado', label: 'Usado' },
          ].map((cond) => (
            <button
              key={cond.id}
              onClick={() => setConditionFilter(cond.id)}
              className={`px-3 py-1.5 rounded-full text-body-sm font-label-bold transition-all ${
                conditionFilter === cond.id
                  ? 'bg-secondary text-on-secondary shadow-sm'
                  : 'bg-surface-container border border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {cond.label}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm self-end md:self-auto">
          <span>Ordenar por:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface-container border border-outline-variant rounded-lg px-3 py-1.5 font-label-bold text-body-sm text-primary focus:ring-1 focus:ring-secondary outline-none cursor-pointer"
          >
            <option value="recent">Más recientes</option>
            <option value="lowest">Menor precio</option>
            <option value="highest">Mayor precio</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-surface-container-low rounded-xl border border-outline-variant my-4">
          <span className="material-symbols-outlined text-5xl text-outline mb-2">category</span>
          <h3 className="font-headline-md text-primary font-bold">No hay artículos con este filtro</h3>
          <p className="font-body-md text-on-surface-variant mt-1 mb-6">
            Sé el primero en publicar un recurso en la categoría {meta.title}.
          </p>
          <Link
            to="/vender"
            className="px-6 py-3 bg-secondary text-on-secondary rounded-lg font-label-bold text-body-sm inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Publicar artículo ahora
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-gutter">
          {filtered.map((prod) => (
            <ProductCard
              key={prod.id}
              id={prod.id}
              title={prod.title}
              category={meta.title}
              condition={prod.condition}
              price={prod.price}
              currency={prod.currency === '$' ? 'S/' : (prod.currency || 'S/')}
              rating={prod.rating}
              image={prod.image}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}

