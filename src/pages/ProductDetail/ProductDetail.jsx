import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import ProductCard from '../../components/shared/ProductCard/ProductCard';
import { getProductById, getProducts, createQuickChat, addToCart } from '../../services/storage';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quickMessage, setQuickMessage] = useState('');
  const [similarProducts, setSimilarProducts] = useState([]);
  const [addedToCartToast, setAddedToCartToast] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prod = getProductById(id);
    if (prod) {
      setProduct(prod);
      setSelectedImage(prod.image);
      const all = getProducts();
      setSimilarProducts(all.filter(p => String(p.id) !== String(id) && p.category === prod.category).slice(0, 3));
    }
  }, [id]);

  if (!product) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="font-headline-lg text-primary font-bold">Producto no encontrado</h2>
          <p className="font-body-md text-on-surface-variant mt-2 mb-6">El producto que buscas no existe o fue retirado.</p>
          <Link to="/" className="px-6 py-3 bg-secondary text-on-secondary rounded-lg font-label-bold">
            Volver a la tienda
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleSendMessage = (textToSend) => {
    const text = textToSend || quickMessage;
    if (!text.trim()) return;
    createQuickChat(product.title, text.trim(), product.seller);
    navigate('/mensajes');
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 2500);
  };

  const thumbnails = product.thumbnails && product.thumbnails.length > 0 
    ? product.thumbnails 
    : [product.image];

  return (
    <MainLayout>
      {/* Toast de agregado a la bolsa */}
      {addedToCartToast && (
        <div className="fixed bottom-20 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-secondary-fixed">check_circle</span>
          <span className="font-label-bold text-body-sm">¡Añadido a tu bolsa de intercambio!</span>
        </div>
      )}

      {/* Breadcrumb & Back Action */}
      <div className="flex items-center space-x-2 text-on-surface-variant mb-stack-lg">
        <button 
          onClick={() => navigate(-1)} 
          className="hover:text-primary transition-colors flex items-center cursor-pointer font-label-bold text-label-bold"
        >
          <span className="material-symbols-outlined text-[20px] mr-1">arrow_back</span>
          <span>Volver</span>
        </button>
        <span className="text-outline">/</span>
        <Link to={`/categoria/${product.category}`} className="font-label-bold text-label-bold hover:text-primary transition-colors">
          {product.categoryLabel || product.category}
        </Link>
      </div>

      {/* Product Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Product Image Gallery */}
        <div className="lg:col-span-7 space-y-stack-md">
          {/* Main Image */}
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant relative group shadow-sm">
            <img 
              alt={product.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              src={selectedImage} 
            />
            {/* Condition Badge */}
            <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full border border-surface-variant shadow-sm flex items-center">
              <span className="w-2 h-2 rounded-full bg-secondary mr-2"></span>
              <span className="font-label-caps text-label-caps text-on-surface font-bold">{product.condition}</span>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex space-x-stack-sm overflow-x-auto pb-2">
            {thumbnails.map((thumb, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(thumb)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 p-1 focus:outline-none transition-all ${
                  selectedImage === thumb ? 'border-secondary ring-2 ring-secondary/20' : 'border-outline-variant hover:border-primary'
                }`}
              >
                <img 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="w-full h-full object-cover rounded-md" 
                  src={thumb} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Details & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <div className="sticky top-24">
            {/* Title & Price */}
            <div className="mb-stack-lg">
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2 font-bold leading-tight">
                {product.title}
              </h1>
              <p className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
                {product.currency === '$' ? 'S/' : (product.currency || 'S/')} {typeof product.price === 'number' ? product.price.toFixed(2) : String(product.price).replace('$', '')}
              </p>
            </div>

            {/* Seller Reputation Card */}
            {product.seller && (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md shadow-[0px_4px_20px_rgba(11,61,89,0.05)] mb-stack-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-outline bg-surface-container-high flex-shrink-0">
                    <img 
                      alt="Seller Avatar" 
                      className="w-full h-full object-cover" 
                      src={product.seller.avatar} 
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-label-bold text-label-bold text-on-surface font-bold">
                      {product.seller.name}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">
                      {product.seller.degree}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <span className="material-symbols-outlined fill text-[#F59E0B] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="font-label-bold text-label-bold text-on-surface">
                        {product.seller.rating}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant ml-1">
                        ({product.seller.tradesCount || 12} intercambios)
                      </span>
                    </div>
                  </div>
                  <Link 
                    to={`/vendedor/${product.seller.id}`}
                    aria-label="Ver perfil del vendedor" 
                    className="text-secondary hover:bg-secondary/10 p-2 rounded-full transition-colors"
                  >
                    <span className="material-symbols-outlined text-[24px]">chevron_right</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Botón de añadir a la bolsa */}
            <div className="mb-stack-md flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded-lg bg-surface-container border border-secondary text-primary font-label-bold text-label-bold hover:bg-secondary-container transition-colors flex items-center justify-center gap-2 active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span>Añadir a mi bolsa</span>
              </button>
            </div>

            {/* Quick Messages Section */}
            <div className="space-y-stack-sm mb-stack-lg bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md shadow-sm">
              <h3 className="font-label-bold text-label-bold text-on-surface mb-2 font-bold">
                Enviar mensaje rápido al vendedor
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {["¿Sigue disponible?", "¿Cuál es tu último precio?", "¿Aceptas cambios?"].map((chip) => (
                  <button 
                    key={chip}
                    onClick={() => handleSendMessage(chip)}
                    className="bg-surface-container-low hover:bg-surface-container-high border border-outline-variant text-on-surface-variant font-body-sm text-body-sm py-1.5 px-3 rounded-full transition-colors active:scale-95 cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" 
                  placeholder="Escribe un mensaje personalizado..." 
                  type="text"
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                />
                <button 
                  onClick={() => handleSendMessage()}
                  className="bg-secondary hover:bg-primary text-on-secondary font-label-bold text-label-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 active:scale-95 duration-150"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Enviar</span>
                </button>
              </div>
            </div>

            {/* Meeting Point */}
            <div className="mb-stack-lg bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md shadow-[0px_4px_20px_rgba(11,61,89,0.05)]">
              <h3 className="font-label-bold text-label-bold text-on-surface mb-1 flex items-center font-bold">
                <span className="material-symbols-outlined mr-2 text-[20px] text-secondary">location_on</span>
                Punto de encuentro sugerido
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {product.meetingPoint || "Entrada Principal - Campus Central"}
              </p>
            </div>

            {/* Description */}
            <div className="mb-stack-lg">
              <h2 className="font-label-bold text-label-bold text-on-surface mb-stack-sm uppercase tracking-wider text-outline text-[12px]">
                Descripción
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Details List */}
            <ul className="space-y-3 mb-stack-lg border-y border-outline-variant py-stack-md">
              <li className="flex justify-between items-center font-body-sm text-body-sm">
                <span className="text-on-surface-variant">Marca</span>
                <span className="font-semibold text-on-surface">{product.brand || 'Genérico'}</span>
              </li>
              <li className="flex justify-between items-center font-body-sm text-body-sm">
                <span className="text-on-surface-variant">Modelo</span>
                <span className="font-semibold text-on-surface">{product.model || 'Estándar'}</span>
              </li>
              <li className="flex justify-between items-center font-body-sm text-body-sm">
                <span className="text-on-surface-variant">Estado del artículo</span>
                <span className="font-semibold text-on-surface">{product.condition}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Similar Items Section */}
      {similarProducts.length > 0 && (
        <section className="mt-12 pt-8 border-t border-outline-variant">
          <h3 className="font-headline-md text-headline-md text-primary font-bold mb-6">
            Otros artículos que te podrían interesar
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-gutter">
            {similarProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                title={p.title}
                category={p.categoryLabel}
                condition={p.condition}
                price={p.price}
                rating={p.rating}
                image={p.image}
              />
            ))}
          </div>
        </section>
      )}
    </MainLayout>
  );
}

