import React from 'react';
import { useStorageRefresh } from '../../../services/useStorageRefresh';
import { NavLink, useLocation } from 'react-router-dom';
import { getFavorites, getCategories } from '../../../services/storage';
import './SideNavBar.css';

export default function SideNavBar() {
  const location = useLocation();
  useStorageRefresh();
  const favoritesCount = getFavorites().length;
  const navCategories = [
    { to: '/', label: 'Todas las categorías', icon: 'category', exact: true },
    ...getCategories().map(category => ({ to: '/categoria/' + category.id, label: category.name, icon: category.icon }))
  ];

  const personalLinks = [
    { to: '/favoritos', label: 'Mis Favoritos', icon: 'favorite', badge: favoritesCount > 0 ? favoritesCount : null },
    { to: '/mis-compras', label: 'Mis Compras y Ventas', icon: 'list_alt' },
    { to: '/mensajes', label: 'Mensajes', icon: 'chat' },
    { to: '/ayuda', label: 'Centro de ayuda', icon: 'support_agent' },
  ];

  return (
    <nav className="hidden lg:flex flex-col p-4 gap-stack-sm h-screen w-64 fixed left-0 top-16 bg-surface-container-low dark:bg-tertiary-container text-primary dark:text-primary-fixed-dim font-label-bold text-label-bold flat no shadows z-40 overflow-y-auto pb-24">
      <div className="px-4 py-4 mb-1">
        <h2 className="font-headline-md text-headline-md text-primary mb-1">Categorías</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant font-normal">Filtrar por tipo de recurso</p>
      </div>

      {navCategories.map((item) => {
        const isActive = item.exact 
          ? location.pathname === '/' 
          : location.pathname === item.to;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out ${
              isActive
                ? 'bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary shadow-sm'
                : 'text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-tertiary-fixed-variant'
            }`}
          >
            <span 
              className={`material-symbols-outlined ${isActive ? 'fill' : ''}`}
              data-icon={item.icon}
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </NavLink>
        );
      })}

      {/* Mi Actividad Section */}
      <div className="px-4 pt-5 pb-1">
        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
          Mi Actividad
        </span>
      </div>

      {personalLinks.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 ease-in-out ${
              isActive
                ? 'bg-secondary-container text-on-secondary-container shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`material-symbols-outlined ${item.icon === 'favorite' ? 'text-error' : ''}`}
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="px-2 py-0.5 rounded-full bg-error text-white text-[11px] font-bold">
                {item.badge}
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
