import { ListingActions, OperationHistory } from '../Services/Services';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import { getPurchases, getMyListings } from '../../services/storage';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [listings, setListings] = useState(getMyListings);
  const [purchaseFilter, setPurchaseFilter] = useState('Todos');

  useEffect(() => {
    window.scrollTo(0, 0);
    setPurchases(getPurchases());
    const update = () => setListings(getMyListings());
    update();
    window.addEventListener('altoque_storage_update', update);
    return () => window.removeEventListener('altoque_storage_update', update);
  }, []);

  const filteredPurchases = purchases.filter(p => {
    if (purchaseFilter === 'Todos') return true;
    if (purchaseFilter === 'Entregados') return p.status === 'Entregado';
    if (purchaseFilter === 'En camino') return p.status === 'Por entregar' || p.status === 'En camino';
    return true;
  });

  return (
    <MainLayout>
      <OperationHistory />
      <Link to="/ayuda" className="text-secondary underline">Mi perfil y centro de ayuda</Link>
      <div className="py-4 md:py-8">
        {/* Mis Compras Header */}
        <header className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary font-bold mb-2">
              Mis Compras
            </h1>
            <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant">
              Historial de tus intercambios y compras en AlToque.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-label-bold text-label-bold text-on-surface-variant text-body-sm">
              Filtrar por:
            </span>
            <select 
              value={purchaseFilter}
              onChange={(e) => setPurchaseFilter(e.target.value)}
              className="bg-surface-container border border-outline-variant text-primary rounded-lg px-3 py-2 font-body-sm text-body-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none cursor-pointer"
            >
              <option value="Todos">Todos</option>
              <option value="Entregados">Entregados</option>
              <option value="En camino">En camino / Por entregar</option>
            </select>
          </div>
        </header>

        {/* Purchase Items List */}
        <div className="grid grid-cols-1 gap-stack-md">
          {filteredPurchases.map((item) => (
            <article 
              key={item.id}
              className="bg-surface rounded-xl border border-outline-variant hover:shadow-[0px_4px_20px_rgba(11,61,89,0.05)] transition-shadow duration-300 overflow-hidden flex flex-col md:flex-row p-4 gap-6 relative group"
            >
              <div className="w-full md:w-48 h-48 md:h-full shrink-0 rounded-lg overflow-hidden bg-surface-container-highest">
                <img 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                  src={item.image} 
                />
              </div>

              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="inline-block px-2 py-1 rounded bg-secondary-container/30 text-on-secondary-container font-label-caps text-label-caps mb-2 font-bold">
                      {item.category}
                    </span>
                    <h3 className="font-headline-md text-headline-md text-primary font-bold mb-1">
                      {item.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Vendedor: <span className="font-label-bold text-primary font-bold">{item.sellerName}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-md text-headline-md text-primary font-bold block">
                      {String(item.price).replace('$', 'S/ ')}
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      {item.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 border-t border-outline-variant pt-4">
                  <div className="flex items-center gap-2">
                    <span 
                      className={`material-symbols-outlined ${item.status === 'Entregado' ? 'text-secondary' : 'text-[#ca8a04]'}`} 
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {item.status === 'Entregado' ? 'check_circle' : 'local_shipping'}
                    </span>
                    <span className={`font-label-bold text-label-bold ${item.status === 'Entregado' ? 'text-secondary' : 'text-[#ca8a04]'}`}>
                      {item.status}
                    </span>
                  </div>
                  <button 
                    onClick={() => navigate('/mensajes')}
                    className="text-body-sm text-secondary font-label-bold hover:underline"
                  >
                    Ver conversación
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mis Publicaciones Section */}
        <section className="mt-12 pt-12 border-t border-outline-variant">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-stack-lg gap-stack-md">
            <div>
              <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary font-bold mb-2">
                Mis Publicaciones
              </h2>
              <p className="font-body-lg text-body-md text-on-surface-variant">
                Gestiona los recursos que tienes actualmente a la venta.
              </p>
            </div>
            <Link 
              to="/vender"
              className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-label-bold text-label-bold hover:bg-secondary-fixed transition-colors active:scale-95 duration-150 flex items-center gap-2 shadow-sm w-full md:w-auto justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Vender nuevo producto</span>
            </Link>
          </div>

          <div className="flex flex-col gap-stack-md">
            {/* Si el usuario tiene publicaciones propias creadas dinámicamente */}
            {listings.length > 0 ? (
              listings.map((item) => (
                <article 
                  key={item.id}
                  className="flex flex-col md:flex-row bg-surface border border-outline-variant rounded-xl overflow-hidden hover:shadow-[0px_4px_20px_rgba(11,61,89,0.05)] transition-shadow group p-4 gap-6"
                >
                  <div className="w-full md:w-48 h-48 shrink-0 rounded-lg overflow-hidden bg-surface-container-highest relative">
                    <img 
                      alt={item.title} 
                      className="w-full h-full object-cover" 
                      src={item.image} 
                    />
                    <div className="absolute top-2 left-2 bg-secondary-container text-on-secondary-container px-2 py-1 rounded font-label-caps text-label-caps uppercase tracking-wider font-bold">
                      {item.status === 'removed' ? 'Retirada' : 'Activa'}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-headline-md text-headline-md text-primary font-bold mb-1 group-hover:text-secondary transition-colors">
                          {item.title}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-headline-md text-headline-md text-primary font-bold block">
                          S/ {Number(item.price).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 border-t border-outline-variant pt-4">
                      <button 
                        onClick={() => navigate(`/producto/${item.id}`)}
                        className="text-secondary border border-secondary px-4 py-2 rounded font-label-bold text-label-bold hover:bg-surface-container-high transition-colors"
                      >
                        Ver publicación
                      </button>
                    </div>
                    <ListingActions item={item} />
                  </div>
                </article>
              ))
            ) : null}

            {/* Publicación de ejemplo inicial */}
            <article className="flex flex-col md:flex-row bg-surface border border-outline-variant rounded-xl overflow-hidden hover:shadow-[0px_4px_20px_rgba(11,61,89,0.05)] transition-shadow group p-4 gap-6">
              <div className="w-full md:w-48 h-48 shrink-0 rounded-lg overflow-hidden bg-surface-container-highest relative">
                <img 
                  alt="Calculadora Usada" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdZ1JGrPEyv5uUK6YE8lFg5g-EHzsjv_qsKN-hIFsfoyNMERGBSMF8HV4ktLADk2Qr6HI0-PGFaNcaXJ8Vts0iv7VtDl9nwwJYOJ7SCY_qjskVqhBKNvqVcn53zdg9PEHv0m4AAzx1Ok38Zw3EACwkTWXzCr1tf5xxDcBmNcduaD4Cw0wzb8nNjK5du6GRMOwr0GwZqJQcrHcV2_gHICDykIqNg8ZabLo75HZeXYRKilnMwWzpfvIB" 
                />
                <div className="absolute top-2 left-2 bg-secondary-container text-on-secondary-container px-2 py-1 rounded font-label-caps text-label-caps uppercase tracking-wider font-bold">
                  Activo
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary font-bold mb-1 group-hover:text-secondary transition-colors">
                      Calculadora Científica fx-991LA
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      Casi nueva, la usé un semestre para Física II. Incluye tapa protectora original.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-md text-headline-md text-primary font-bold block">
                      S/ 25.00
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 border-t border-outline-variant pt-4">
                  <div className="flex items-center gap-stack-sm text-on-surface-variant">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                      <span className="font-body-sm text-body-sm">45</span>
                    </div>
                    <div className="w-px h-3 bg-outline-variant mx-1"></div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                      <span className="font-body-sm text-body-sm">12</span>
                    </div>
                    <div className="w-px h-3 bg-outline-variant mx-1"></div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">favorite</span>
                      <span className="font-body-sm text-body-sm">8</span>
                    </div>
                    <div className="w-px h-3 bg-outline-variant mx-1"></div>
                    <div className="flex items-center text-secondary">
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="font-label-bold text-label-bold ml-0.5">4.5</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert("Función para editar tu anuncio")}
                    className="text-secondary border border-secondary px-4 py-2 rounded font-label-bold text-label-bold hover:bg-surface-container-high transition-colors"
                  >
                    Editar anuncio
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

