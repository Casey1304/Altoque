import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getCurrentUser,
  getNotifications,
  getFavorites,
  logoutUser, markNotificationsRead
} from '../../../services/storage';
import './TopNavBar.css';

export default function TopNavBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const syncData = () => {
    setUser(getCurrentUser());
    setFavoritesCount(getFavorites().length);
    setNotifications(getNotifications());
  };

  useEffect(() => {
    syncData();

    const handleStorageUpdate = () => {
      syncData();
    };
    window.addEventListener('altoque_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('altoque_storage_update', handleStorageUpdate);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile lg:px-margin-desktop h-16 bg-surface dark:bg-on-surface flat no shadows border-b border-outline-variant/30">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHvbCFuwMO4ESUQ6yByl3YzXHPILjk2yp53-d5Gog3vaWCftNrAtocWTXOzHHcURA0QECn1N3MhkBLdYaqIAyYfebymxRU_GKgDhBwwYZ9ZvIsUrB_rQxKQg5H_B1M2DFAxshXfMoVrEPCJkBF3D09srWdJJh-aW3NgES-nWbHGq83LGama9-eXhzT6HdUVD8X5Twl2-oj7_3ledrkJNedtqP0jGD02E4r29YkIMhjY-RLgH5Iot9XgtrmDQKtt9kJdg" 
              alt="AlToque Logo" 
              className="h-12 w-auto object-contain" 
            />
          </Link>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-xs font-bold bg-primary/10 text-primary">
            UTP
          </span>
        </div>

        {/* Desktop Search Bar - Exacto a Stitch */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <form onSubmit={handleSearch} className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors">
              search
            </span>
            <input 
              className="w-full h-10 pl-10 pr-4 bg-surface-container rounded border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body-sm text-body-sm text-on-surface placeholder-on-surface-variant" 
              placeholder="Buscar artículos..." 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          {/* Favorites Link */}
          <Link
            to="/favoritos"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error transition-colors active:scale-95 duration-150"
            aria-label="Mis Favoritos"
            title="Mis Favoritos"
          >
            <span className="material-symbols-outlined text-[22px]">favorite</span>
            {favoritesCount > 0 && (
              <span className="absolute top-1 right-1 bg-error text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold shadow-xs">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => { setShowNotifications(!showNotifications); if (!showNotifications) markNotificationsRead(); setShowUserMenu(false); }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors active:scale-95 duration-150"
              aria-label="Notificaciones"
            >
              <span className="material-symbols-outlined text-[22px]" data-icon="notifications">notifications</span>
              {notifications.some(n => n.unread) && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-[min(20rem,calc(100vw-5rem))] bg-surface border border-outline-variant rounded-xl shadow-xl z-50 p-4">
                <div className="flex justify-between items-center mb-3 border-b border-outline-variant pb-2">
                  <h4 className="font-label-bold text-primary font-bold">Notificaciones</h4>
                  <span className="text-body-sm text-on-surface-variant font-medium">AlToque</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {!notifications.length && <p>No tienes notificaciones.</p>}
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                      <p className="font-body-sm text-on-surface font-medium">{notif.title}</p>
                      <span className="text-[11px] text-on-surface-variant">{notif.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar with Options Menu */}
          <div className="relative">
            <div 
              onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
              className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant ml-1 cursor-pointer hover:ring-2 hover:ring-secondary transition-all"
            >
              <img 
                alt="User profile" 
                className="w-full h-full object-cover" 
                src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuC9orOq_BGxDlUKEYNa9ynLeFDL1V0u-GMbh0WfiwYd4k4yohbENEYN5rl-ru6XlCFtBhedHSTcDvEnoGm9-FPDSdv94D3209bHXEFPJ06NV0oRUcpkrum90HG9fNhHiJiflGXP3r8MgS7GVxesVlc8jBS9XdjgP5qlRtZNq0oiZ9coVbh_f6MSJ4g2YLtli3_J3xekX2Dtue4VxQVmAD-TNCIEB3Ph_zB64TV2jOJiYE38FibD0aDu"} 
              />
            </div>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-surface border border-outline-variant rounded-xl shadow-xl z-50 py-2">
                <div className="px-4 py-2 border-b border-outline-variant">
                  <p className="font-label-bold text-primary font-bold">{user?.name || "Estudiante UTP"}</p>
                  <p className="font-body-sm text-[12px] text-on-surface-variant truncate">{user?.email || "estudiante@utp.edu.pe"}</p>
                  <p className="text-[11px] text-secondary font-semibold mt-1">Estudiante UTP</p>
                </div>

                <Link
                  to="/favoritos"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center justify-between px-4 py-2 text-body-sm text-on-surface hover:bg-surface-container transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-error">favorite</span>
                    <span>Mis Favoritos</span>
                  </div>
                  {favoritesCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-error/15 text-error text-xs font-bold">
                      {favoritesCount}
                    </span>
                  )}
                </Link>

                <Link 
                  to="/vendedor/seller-2" 
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 text-body-sm text-on-surface hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  Mi Perfil
                </Link>

                <Link 
                  to="/vender" 
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 text-body-sm text-on-surface hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  Publicar Producto
                </Link>

                <Link 
                  to="/mis-compras" 
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 text-body-sm text-on-surface hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">list_alt</span>
                  Mis Compras y Publicaciones
                </Link>

                <Link 
                  to="/mensajes" 
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 text-body-sm text-on-surface hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  Mensajes
                </Link>

                <div className="border-t border-outline-variant my-1"></div>
                <Link to="/ayuda" className="block px-4 py-2 text-secondary hover:underline">Centro de ayuda</Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-body-sm text-error hover:bg-error-container/20 w-full text-left transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-margin-mobile py-stack-md bg-surface sticky top-16 z-40 border-b border-outline-variant/30">
        <form onSubmit={handleSearch} className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors">
            search
          </span>
          <input 
            className="w-full h-11 pl-10 pr-4 bg-surface-container rounded border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body-md text-body-md text-on-surface placeholder-on-surface-variant"
            placeholder="Buscar artículos..." 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
    </>
  );
}
