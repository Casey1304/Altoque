import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isFavorite, toggleFavorite, getCurrentUser } from '../../../services/storage';
import './ProductCard.css';

export default function ProductCard({ 
  id,
  image, 
  category, 
  rating = 4.8, 
  title, 
  condition, 
  price,
  featured = false,
  type,
  currency = "S/",
  className = ""
}) {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      setFavorite(isFavorite(id));
    }

    const handleStorageUpdate = (e) => {
      if (e.detail?.type === 'favorites_updated' || e.detail?.type === 'external') {
        setFavorite(isFavorite(id));
      }
    };
    window.addEventListener('altoque_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('altoque_storage_update', handleStorageUpdate);
  }, [id]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!getCurrentUser()) return navigate("/login");
    if (id) {
      const updated = toggleFavorite(id);
      setFavorite(updated.includes(String(id)));
    }
  };

  const handleCardClick = () => {
    if (id) {
      navigate(`/producto/${id}`);
    }
  };

  // Formatear precio en Soles peruanos (S/)
  const cleanCurrency = (!currency || currency === '$') ? 'S/' : currency;
  const formattedPrice = typeof price === 'number' 
    ? `${cleanCurrency} ${price.toFixed(2)}` 
    : String(price).replace('$', 'S/ ');

  return (
    <article 
      onClick={handleCardClick}
      className={`bg-surface rounded-lg border border-outline-variant overflow-hidden hover:shadow-[0px_4px_20px_rgba(11,61,89,0.05)] transition-all duration-300 group flex flex-col h-full cursor-pointer ${className}`}
    >
      <div className="aspect-square bg-surface-container-low relative overflow-hidden">
        <img 
          alt={title || "Product Image"} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={image} 
          loading="lazy"
        />
        {featured && <span className="absolute left-2 top-2 rounded bg-secondary px-2 py-1 text-xs text-on-secondary">Destacado</span>}
        <button
          onClick={handleFavoriteClick}
          aria-label="Guardar en favoritos"
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error-container transition-colors shadow-sm"
        >
          <span 
            className={`material-symbols-outlined text-[20px] ${favorite ? 'text-error fill' : ''}`}
            style={{ fontVariationSettings: favorite ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <span className="inline-block px-2 py-1 bg-secondary-container/20 text-on-secondary-container rounded font-label-caps text-label-caps mb-2">
            {category}
          </span>
          <div className="flex items-center text-on-surface-variant">
            <span 
              className="material-symbols-outlined text-[16px] text-[#f59e0b] fill" 
              data-weight="fill" 
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-body-sm text-body-sm ml-1 font-semibold">{rating}</span>
          </div>
        </div>

        <h4 className="font-body-md text-body-md text-on-surface font-semibold mb-1 line-clamp-2">
          {title}
        </h4>

        <p className="font-body-sm text-body-sm text-on-surface-variant mb-auto">
          {condition}
        </p>

        <div className="mt-4 pt-4 border-t border-surface-container-high flex items-center justify-between">
          <span className="font-headline-md text-headline-md text-primary font-bold">{type === 'intercambio' ? 'Intercambio' : formattedPrice}</span>
          <button 
            onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
            className="px-4 py-2 rounded bg-secondary text-on-secondary font-label-bold text-label-bold hover:bg-secondary-container hover:text-on-secondary-container transition-colors active:scale-95 duration-150"
          >
            Ver detalle
          </button>
        </div>
      </div>
    </article>
  );
}
