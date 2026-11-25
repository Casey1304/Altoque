import { AdminIndicators } from '../../Services/Services';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout';
import {
  getModerationItems,
  approveModerationItem,
  rejectModerationItem,
  getCampusTransactions
} from '../../../services/storage';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [moderationQueue, setModerationQueue] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [tableSearch, setTableSearch] = useState('');
  const [notificationMsg, setNotificationMsg] = useState(null);

  const loadData = () => {
    const queue = getModerationItems().filter(item => item.status === 'pending');
    setModerationQueue(queue);
    setTransactions(getCampusTransactions());
  };

  useEffect(() => {
    loadData();
    const handleStorageUpdate = () => loadData();
    window.addEventListener('altoque_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('altoque_storage_update', handleStorageUpdate);
  }, []);

  const showToast = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  const handleApprove = (item) => {
    approveModerationItem(item.id);
    showToast(`Artículo "${item.title}" aprobado y visible en el catálogo.`);
  };

  const handleReject = (item) => {
    rejectModerationItem(item.id, 'Políticas de seguridad académica');
    showToast(`Artículo "${item.title}" rechazado.`);
  };


  // Filter transactions de forma completamente segura
  const filteredTransactions = transactions.filter(t => {
    const q = (tableSearch || '').toLowerCase().trim();
    if (!q) return true;

    const orderId = String(t.orderId || t.id || '').toLowerCase();
    const product = String(t.product || '').toLowerCase();
    const sellerName = String(typeof t.seller === 'object' ? t.seller?.name : (t.seller || t.sellerName || '')).toLowerCase();
    const buyerName = String(typeof t.buyer === 'object' ? t.buyer?.name : (t.buyer || t.buyerName || '')).toLowerCase();
    const point = String(t.campusPoint || t.point || '').toLowerCase();

    return (
      orderId.includes(q) ||
      product.includes(q) ||
      sellerName.includes(q) ||
      buyerName.includes(q) ||
      point.includes(q)
    );
  });

  return (
    <AdminLayout activeTitle="Dashboard General">
      <div className="px-4 sm:px-8 py-8 flex flex-col gap-8 max-w-[1440px] mx-auto w-full">
        {/* Toast feedback */}
        {notificationMsg && (
          <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
            <span className="font-label-bold text-sm">{notificationMsg}</span>
          </div>
        )}

        {/* Top Controls / Page Context */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-2">
          <div className="flex flex-col gap-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-caps text-label-caps tracking-widest uppercase text-xs font-bold">
                Admin Central
              </span>
              <span className="text-on-surface-variant font-label-caps text-label-caps text-xs">
                • UTP ECOSYSTEM v2.4
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold text-2xl sm:text-3xl">
              Panel de Control AlToque
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm sm:text-base">
              Actividad del marketplace universitario de UTP Lima Norte.
            </p>
          </div>

          </div>
        <AdminIndicators />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Right Column: Urgent Moderation Queue (4 cols of 12) */}
          <div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col gap-5 border border-outline-variant/30">
            <div className="flex items-center justify-between pb-1">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></span>
                  <h2 className="font-headline-md text-headline-md text-primary font-bold text-lg">
                    Aprobación Urgente
                  </h2>
                </div>
                <span className="font-body-sm text-xs text-on-surface-variant">
                  Pendientes de revisión de políticas
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-bold text-xs font-bold">
                {moderationQueue.length} urgentes
              </span>
            </div>

            {/* Moderation items list */}
            {moderationQueue.length === 0 ? (
              <div className="p-8 text-center bg-surface-container-low rounded-xl flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-[32px] text-secondary">check_circle</span>
                <p className="font-label-bold text-sm text-primary">¡Cola al día!</p>
                <p className="text-xs text-on-surface-variant">No hay artículos pendientes de moderación urgente.</p>
              </div>
            ) : (
              moderationQueue.slice(0, 3).map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-3 transition-all duration-200 border border-outline-variant/30 hover:border-secondary/40">
                  <div className="flex items-start gap-3">
                    <img
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-surface-container-highest"
                      src={item.image}
                      alt={item.title}
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-caps text-[10px] uppercase font-bold">
                          {item.category}
                        </span>
                        <span className="font-label-bold text-xs text-primary font-bold">
                          S/ {Number(item.price).toFixed(2)}
                        </span>
                      </div>
                      <h3 className="font-label-bold text-xs text-on-surface truncate mt-1">
                        {item.title}
                      </h3>
                      <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                        Por: {item.seller?.name || "Estudiante"} ({item.seller?.code || "UTP"})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleApprove(item)}
                      className="flex-1 bg-secondary text-on-secondary py-1.5 rounded-lg font-label-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-105 active:scale-95 transition-all shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Aprobar</span>
                    </button>
                    <button
                      onClick={() => handleReject(item)}
                      className="px-3 py-1.5 rounded-lg bg-surface-container-highest text-error font-label-bold text-xs flex items-center justify-center hover:bg-error-container transition-all"
                      title="Rechazar publicación"
                    >
                      <span className="material-symbols-outlined text-[16px]">cancel</span>
                    </button>
                  </div>
                </div>
              ))
            )}

            <Link
              to="/admin/moderacion"
              className="w-full py-2.5 rounded-xl bg-surface-container text-center font-label-bold text-xs text-primary hover:bg-surface-container-high transition-colors font-bold"
            >
              Ver Cola Completa ({moderationQueue.length} pendientes) →
            </Link>
          </div>
        </div>

        {/* Bottom Data Table: Latest Campus Transactions */}
        <div className="bg-surface-container-lowest p-7 rounded-2xl shadow-sm flex flex-col gap-5 border border-outline-variant/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">swap_horizontal_circle</span>
                <h2 className="font-headline-md text-headline-md text-primary font-bold text-lg sm:text-xl">
                  Historial de operaciones de demostración
                </h2>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-xs sm:text-sm">
                Puntos de entrega seguros verificados dentro de las instalaciones universitarias
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  className="bg-surface-container-low pl-9 pr-4 py-2 rounded-xl text-body-sm font-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary text-xs sm:text-sm"
                  placeholder="Filtrar por estudiante o producto..."
                  type="text"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-on-surface-variant text-[18px]">search</span>
              </div>
            </div>
          </div>

          {/* Responsive Table Container */}
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-caps text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 rounded-l-xl">ID Pedido</th>
                  <th className="py-3 px-4">Vendedor</th>
                  <th className="py-3 px-4">Comprador</th>
                  <th className="py-3 px-4">Producto</th>
                  <th className="py-3 px-4">Punto de Entrega Campus</th>
                  <th className="py-3 px-4">Monto</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-none text-body-sm font-body-sm text-on-surface text-xs sm:text-sm">
                {filteredTransactions.map((tx, idx) => {
                  const txId = tx.orderId || tx.id || `#AT-${9840 + idx}`;
                  const sName = (typeof tx.seller === 'object' ? tx.seller?.name : tx.seller) || tx.sellerName || "Vendedor UTP";
                  const sFaculty = (typeof tx.seller === 'object' ? tx.seller?.faculty : tx.sellerFaculty) || "Facultad UTP";
                  const bName = (typeof tx.buyer === 'object' ? tx.buyer?.name : tx.buyer) || tx.buyerName || "Comprador UTP";
                  const bFaculty = (typeof tx.buyer === 'object' ? tx.buyer?.faculty : tx.buyerFaculty) || "Facultad UTP";
                  const point = tx.campusPoint || tx.point || "Punto de Entrega Campus";
                  const rawAmount = typeof tx.amount === 'string' ? tx.amount.replace(/[^0-9.]/g, '') : tx.amount;
                  const formattedAmount = isNaN(Number(rawAmount)) ? "45.00" : Number(rawAmount).toFixed(2);
                  const isCompleted = tx.status === 'completed' || tx.status === 'Completado';
                  const statusLabel = tx.statusLabel || (isCompleted ? 'Completado' : 'Por entregar');

                  return (
                    <tr key={txId} className="hover:bg-surface-container/60 transition-colors group">
                      <td className="py-3.5 px-4 font-label-bold text-primary font-bold">{txId}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-bold text-[11px]">
                            {sName.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-bold font-semibold text-xs">{sName}</span>
                            <span className="text-[11px] text-on-surface-variant">{sFaculty}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-label-bold text-[11px]">
                            {bName.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-bold font-semibold text-xs">{bName}</span>
                            <span className="text-[11px] text-on-surface-variant">{bFaculty}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-label-bold text-primary font-medium">{tx.product || "Recurso Académico"}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-on-surface">
                          <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                          <span>{point}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-label-bold text-primary font-bold">
                        S/ {formattedAmount}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-caps text-[10px] font-bold ${
                          isCompleted
                            ? 'bg-secondary-container/60 text-on-secondary-container'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-secondary' : 'bg-primary-container'}`}></span>
                          {statusLabel}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => showToast(`Detalle de ${txId}: Intercambio verificado en ${point}.`)}
                          className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
                          title="Ver detalles"
                        >
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
