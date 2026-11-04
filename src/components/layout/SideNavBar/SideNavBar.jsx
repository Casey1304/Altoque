import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './SideNavBar.css';

export default function SideNavBar() {
  const location = useLocation();

  const navCategories = [
    { to: '/', label: 'Todas las Categorías', icon: 'category', exact: true },
    { to: '/categoria/libros', label: 'Libros de texto', icon: 'menu_book' },
    { to: '/categoria/electronica', label: 'Electrónica', icon: 'devices' },
    { to: '/categoria/laboratorio', label: 'Equipo de Laboratorio', icon: 'science' },
    { to: '/categoria/papeleria', label: 'Papelería', icon: 'edit_note' },
  ];

  return (
    <nav className="hidden lg:flex flex-col p-4 gap-stack-sm h-screen w-64 fixed left-0 top-16 bg-surface-container-low dark:bg-tertiary-container text-primary dark:text-primary-fixed-dim font-label-bold text-label-bold flat no shadows z-40 overflow-y-auto">
      <div className="px-4 py-6 mb-2">
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
    </nav>
  );
}
