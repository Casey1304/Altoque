import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { getModerationItems, getReports, logoutUser } from '../../../services/storage';
import './AdminLayout.css';

export default function AdminLayout({ children, activeTitle = "Panel de Control" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [pendingModCount, setPendingModCount] = useState(14);
  const [openReportsCount, setOpenReportsCount] = useState(5);

  const syncAdminCounts = () => {
    const modItems = getModerationItems();
    const pending = modItems.filter(m => m.status === 'pending');
    setPendingModCount(pending.length > 0 ? pending.length : 14);

    const reps = getReports();
    const open = reps.filter(r => r.status === 'open' || r.status === 'in_mediation');
    setOpenReportsCount(open.length > 0 ? open.length : 5);
  };

  useEffect(() => {
    syncAdminCounts();
    const handleStorageUpdate = () => syncAdminCounts();
    window.addEventListener('altoque_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('altoque_storage_update', handleStorageUpdate);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const adminNavLinks = [
    {
      to: '/admin',
      label: 'Dashboard',
      icon: 'dashboard',
      exact: true
    },
    {
      to: '/admin/moderacion',
      label: 'Moderación',
      icon: 'fact_check',
      badge: pendingModCount,
      badgeColor: 'bg-error text-on-error'
    },
    {
      to: '/admin/usuarios',
      label: 'Usuarios y Estudiantes',
      icon: 'group'
    },
    {
      to: '/admin/reportes',
      label: 'Reportes e Incidencias',
      icon: 'warning',
      badge: openReportsCount,
      badgeColor: 'bg-secondary-container text-on-secondary-container font-bold'
    },
    { to: '/admin/publicaciones', label: 'Publicaciones y categorías', icon: 'inventory_2' },
    { to: '/admin/promociones', label: 'Promociones', icon: 'campaign' },
    { to: '/admin/publicidad', label: 'Publicidad', icon: 'ads_click' },
    { to: '/admin/ingresos', label: 'Ingresos simulados', icon: 'payments' },
    { to: '/admin/soporte', label: 'Soporte', icon: 'support_agent' },
    {
      to: '/admin/sedes',
      label: 'Sedes y Parámetros',
      icon: 'settings'
    },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between overflow-y-auto">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="px-6 py-5 flex items-center justify-between bg-surface-container-low border-b border-outline-variant/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary font-headline-md text-headline-md font-bold shadow-md">
              A
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-md text-headline-md text-primary tracking-tight font-bold">AlToque</span>
                <span className="px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-label-caps text-label-caps font-bold">UTP</span>
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[10px]">
                Panel de Administración
              </span>
            </div>
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setMobileDrawerOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Section title */}
        <div className="px-5 pt-6 pb-2">
          <span className="px-2 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[11px] font-semibold">
            Gestión del Campus
          </span>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-1 px-3">
          {adminNavLinks.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.to || location.pathname === `${item.to}/`
              : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-label-bold text-label-bold shadow-xs'
                    : 'text-on-surface-variant font-label-bold text-label-bold hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-[20px] ${isActive ? 'text-secondary-fixed' : ''}`}
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Admin Profile Footer */}
      <div className="p-4 bg-surface-container-low border-t border-outline-variant/30">
        <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest shadow-sm">
          <div className="flex items-center gap-3">
            <img
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-container"
              src="https://lh3.googleusercontent.com/aida/ALJJyrBVoQSI4KzJX4bEC0scPck82-PlLDadtIp2uteQjWKcNJIoeWw7IpClftgX2Zf5TFwqek9tFcxbp0m3AvMTeARoc06E71tKlf9ZmX2Sc2KgGHJUIqzdbfsu99vyL7Ltdq4htUwes9Q8toc3KAhuSFglarpSz2qPANR9Tsr7tNPoqQRWNB4wkg4M2Ls-oLAhNxP5EB5HOIDVypJnCLKSPDKJH3MoeHpAtA04UvqR5eQeBl7yed33LPGXOFg"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-label-bold text-label-bold text-on-surface truncate">Admin UTP</span>
              <span className="font-label-caps text-label-caps text-secondary font-bold text-[10px]">SuperAdmin</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-error transition-colors"
            title="Cerrar sesión"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface font-body-md text-body-md text-on-surface">
      {/* Desktop Fixed Aside Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex-col justify-between border-r border-outline-variant/30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-primary/40 backdrop-blur-xs flex"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="w-72 max-w-[85%] h-full bg-surface-container-lowest shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Page Area */}
      <div className="pl-0 lg:pl-72 transition-all duration-200">
        {/* Fixed Top Admin Header */}
        <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 sm:px-8 border-b border-outline-variant/30">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-2 rounded-lg text-on-surface hover:bg-surface-container-low"
              aria-label="Abrir menú de administración"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            {/* Global Admin Search Bar */}
            <span className="font-label-bold text-primary truncate">{activeTitle}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Campus selector badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-secondary">location_city</span>
              <span className="font-label-bold text-label-bold text-on-surface text-xs">Sede Lima Norte</span>
            </div>

            {/* System Status indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-label-caps text-label-caps text-on-surface text-[11px]">Sistema Operativo</span>
            </div>

            {/* Notifications button */}


            {/* Admin Profile shortcut */}
            <div className="flex items-center gap-2.5 pl-2">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-container"
                src="https://lh3.googleusercontent.com/aida/ALJJyrBVoQSI4KzJX4bEC0scPck82-PlLDadtIp2uteQjWKcNJIoeWw7IpClftgX2Zf5TFwqek9tFcxbp0m3AvMTeARoc06E71tKlf9ZmX2Sc2KgGHJUIqzdbfsu99vyL7Ltdq4htUwes9Q8toc3KAhuSFglarpSz2qPANR9Tsr7tNPoqQRWNB4wkg4M2Ls-oLAhNxP5EB5HOIDVypJnCLKSPDKJH3MoeHpAtA04UvqR5eQeBl7yed33LPGXOFg"
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="font-label-bold text-label-bold text-on-surface leading-tight text-xs">Admin UTP</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">Sede Central</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content canvas */}
        <main className="w-full pt-16 bg-surface min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
