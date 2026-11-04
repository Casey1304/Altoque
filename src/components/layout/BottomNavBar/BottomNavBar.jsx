import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './BottomNavBar.css';

export default function BottomNavBar() {
  const location = useLocation();

  const mobileLinks = [
    { to: '/', label: 'Inicio', icon: 'storefront', exact: true },
    { to: '/mis-compras', label: 'Mis Anuncios', icon: 'list_alt' },
    { to: '/vender', label: 'Publicar', icon: 'add_circle' },
    { to: '/mensajes', label: 'Mensajes', icon: 'chat' },
    { to: '/vendedor/seller-2', label: 'Perfil', icon: 'person' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-1.5 border-t border-outline-variant bg-surface dark:bg-on-surface shadow-lg">
      {mobileLinks.map((item) => {
        const isActive = item.exact 
          ? location.pathname === '/' 
          : location.pathname === item.to;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-transform active:scale-90 ${
              isActive 
                ? 'text-secondary dark:text-secondary-fixed-dim font-bold' 
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span 
              className={`material-symbols-outlined text-[22px] ${isActive ? 'fill' : ''}`}
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="font-label-caps text-[11px] mt-0.5">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
