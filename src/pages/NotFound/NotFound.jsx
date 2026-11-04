import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import './NotFound.css';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="material-symbols-outlined text-8xl text-secondary mb-4">
          travel_explore
        </span>
        <h1 className="font-headline-xl text-primary font-bold mb-2">404 - Página no encontrada</h1>
        <p className="font-body-lg text-on-surface-variant max-w-md mb-8">
          La ruta que intentas abrir no existe o ha sido movida. Regresa al mercado universitario para seguir explorando.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-secondary text-on-secondary rounded-lg font-label-bold text-label-bold hover:bg-secondary-fixed transition-colors inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">storefront</span>
          <span>Volver al Inicio</span>
        </Link>
      </div>
    </MainLayout>
  );
}

