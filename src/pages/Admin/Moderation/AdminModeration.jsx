import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout';
import {
  getModerationItems,
  approveModerationItem,
  rejectModerationItem,
  requestChangesModerationItem
} from '../../../services/storage';
import './AdminModeration.css';

export default function AdminModeration() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'ai_alert', 'in_review', 'rejected'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [campusFilter, setCampusFilter] = useState('all');

  // Reject Modal state
  const [rejectingItem, setRejectingItem] = useState(null);
  const [rejectReason, setRejectReason] = useState('Precio incongruente o desproporcionado');
  const [rejectNotes, setRejectNotes] = useState('');
  const [toastMsg, setToastMsg] = useState(null);

  const loadData = () => {
    setItems(getModerationItems());
  };

  useEffect(() => {
    loadData();
    const handleStorageUpdate = () => loadData();
    window.addEventListener('altoque_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('altoque_storage_update', handleStorageUpdate);
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleApprove = (item) => {
    approveModerationItem(item.id);
    showToast(`"${item.title}" ha sido aprobado y añadido al catálogo de AlToque.`);
  };

  const handleQuickApproveAll = () => {
    const pendings = items.filter(i => i.status === 'pending');
    pendings.forEach(p => approveModerationItem(p.id));
    showToast(`Se aprobaron masivamente ${pendings.length} artículos en cola.`);
  };

  const handleRequestChanges = (item) => {
    requestChangesModerationItem(item.id, 'Favor de actualizar las fotos para mostrar claramente el estado del artículo.');
    showToast(`Se notificó al estudiante para corregir la publicación.`);
  };

  const handleConfirmReject = () => {
    if (!rejectingItem) return;
    const finalReason = rejectNotes.trim() ? `${rejectReason}: ${rejectNotes.trim()}` : rejectReason;
    rejectModerationItem(rejectingItem.id, finalReason);
    setRejectingItem(null);
    setRejectNotes('');
    showToast(`Publicación rechazada y archivada con motivo formal.`);
  };

  // Filter items
  const filteredItems = items.filter(item => {
    // Tab filter
    if (activeTab === 'pending' && item.status !== 'pending') return false;
    if (activeTab === 'ai_alert' && !(item.aiAlert && item.aiAlert.includes('Alerta'))) return false;
    if (activeTab === 'in_review' && item.status !== 'in_review' && item.status !== 'pending') return false;
    if (activeTab === 'rejected' && item.status !== 'rejected') return false;

    // Search query
    const q = searchQuery.toLowerCase();
    const matchSearch =
      item.title.toLowerCase().includes(q) ||
      (item.seller?.name && item.seller.name.toLowerCase().includes(q)) ||
      (item.seller?.code && item.seller.code.toLowerCase().includes(q));
    if (!matchSearch) return false;

    // Category
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;

    if (campusFilter !== 'all' && !String(item.campusDeliveryPoint || item.deliveryPoint || '').toLowerCase().includes(campusFilter.toLowerCase())) return false;

    return true;
  });

  return (
    <AdminLayout activeTitle="Moderación de Publicaciones">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-secondary transition-all">
          <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
          <span className="font-label-bold text-sm">{toastMsg}</span>
        </div>
      )}

      {/* Sub-header & Action Ribbon */}
      <div className="px-4 sm:px-8 pt-8 pb-6 bg-surface-container-lowest shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/30">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-label-caps text-xs uppercase tracking-wider font-bold">
              UTP Segura v2.4
            </span>
            <span className="text-on-surface-variant font-label-caps text-xs">Módulo Central</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold text-2xl sm:text-3xl">
            Moderación de Artículos y Publicaciones
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 text-sm sm:text-base">
            Revisa y autoriza los artículos subidos por estudiantes antes de ser visibles en el catálogo general.
          </p>
        </div>

        {/* Quick Batch Actions */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <Link to="/admin/publicaciones" className="px-4 py-2.5 rounded-lg bg-surface-container-low text-primary">
            Bitácora de publicaciones
          </Link>
          <button
            onClick={handleQuickApproveAll}
            className="px-5 py-2.5 rounded-lg bg-secondary text-on-secondary hover:opacity-90 font-label-bold text-xs flex items-center gap-2 transition-transform active:scale-95 shadow-sm font-bold"
          >
            <span className="material-symbols-outlined text-[20px]">done_all</span>
            <span>Aprobación Rápida Masiva ({items.filter(i => i.status === 'pending').length})</span>
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-8 py-8 flex flex-col gap-8 max-w-[1600px] w-full mx-auto">
        {/* Métricas de Moderación Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* KPI 1 */}
          <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between relative overflow-hidden border border-outline-variant/30">
            <div className="absolute top-0 left-0 h-full w-1.5 bg-primary"></div>
            <div className="flex flex-col">
              <span className="font-label-caps text-on-surface-variant uppercase tracking-wider text-xs">En Cola de Espera</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-xl text-primary font-bold text-3xl">
                  {items.filter(i => i.status === 'pending').length}
                </span>
                <span className="font-label-bold text-error flex items-center text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">arrow_upward</span> +8 hoy
                </span>
              </div>
              <span className="font-body-sm text-on-surface-variant mt-1 text-xs">Tiempo prom. respuesta: 18 min</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[26px]">hourglass_top</span>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between relative overflow-hidden border border-outline-variant/30">
            <div className="absolute top-0 left-0 h-full w-1.5 bg-secondary"></div>
            <div className="flex flex-col">
              <span className="font-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Aprobados Hoy</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-xl text-secondary font-bold text-3xl">64</span>
                <span className="font-label-bold text-secondary flex items-center text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span> 92% ratio
                </span>
              </div>
              <span className="font-body-sm text-on-surface-variant mt-1 text-xs">Artículos ya visibles en catálogo</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[26px]">verified</span>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between relative overflow-hidden border border-outline-variant/30">
            <div className="absolute top-0 left-0 h-full w-1.5 bg-error"></div>
            <div className="flex flex-col">
              <span className="font-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Rechazados por Políticas</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-xl text-error font-bold text-3xl">7</span>
                <span className="font-label-bold text-on-surface-variant text-xs font-semibold">Total ciclo: 41</span>
              </div>
              <span className="font-body-sm text-on-surface-variant mt-1 text-xs">Precios anómalos o prohibidos</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-error-container/40 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[26px]">gavel</span>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between relative overflow-hidden border border-outline-variant/30">
            <div className="absolute top-0 left-0 h-full w-1.5 bg-surface-tint"></div>
            <div className="flex flex-col">
              <span className="font-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Marcados por Usuarios</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-xl text-primary-container font-bold text-3xl">5</span>
                <span className="font-label-bold text-error flex items-center text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">priority_high</span> Urgencia
                </span>
              </div>
              <span className="font-body-sm text-on-surface-variant mt-1 text-xs">Reportes comunitarios activos</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[26px]">flag</span>
            </div>
          </div>
        </div>

        {/* Search Bar & Filters */}
        <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-4 border border-outline-variant/30">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
              <input
                className="w-full h-11 pl-11 pr-4 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-sm placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container transition-colors"
                placeholder="Buscar por título de producto, nombre del alumno o código institucional..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-container-low overflow-x-auto">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-3.5 py-1.5 rounded font-label-bold text-xs whitespace-nowrap transition-colors ${
                  activeTab === 'pending'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Pendientes ({items.filter(i => i.status === 'pending').length})
              </button>
              <button
                onClick={() => setActiveTab('ai_alert')}
                className={`px-3.5 py-1.5 rounded font-label-bold text-xs whitespace-nowrap transition-colors ${
                  activeTab === 'ai_alert'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Con Alerta IA (4)
              </button>
              <button
                onClick={() => setActiveTab('in_review')}
                className={`px-3.5 py-1.5 rounded font-label-bold text-xs whitespace-nowrap transition-colors ${
                  activeTab === 'in_review'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                En Revisión Manual (6)
              </button>
              <button
                onClick={() => setActiveTab('rejected')}
                className={`px-3.5 py-1.5 rounded font-label-bold text-xs whitespace-nowrap transition-colors ${
                  activeTab === 'rejected'
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Rechazados ({items.filter(i => i.status === 'rejected').length})
              </button>
            </div>
          </div>

          {/* Detailed selectors */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-outline-variant/20">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="font-label-caps text-xs text-on-surface-variant font-bold">CATEGORÍA:</span>
                <select
                  className="h-9 px-3 rounded-lg bg-surface-container text-on-surface font-label-bold text-xs focus:outline-none"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">Todas las Categorías</option>
                  <option value="Libros">Libros & Guías Académicas</option>
                  <option value="Electrónica">Electrónica & Calculadoras</option>
                  <option value="Laboratorio">Laboratorio & Medicina</option>
                  <option value="Papelería">Papelería & Dibujo Técnico</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-label-caps text-xs text-on-surface-variant font-bold">SEDE UTP:</span>
                <select
                  className="h-9 px-3 rounded-lg bg-surface-container text-on-surface font-label-bold text-xs focus:outline-none"
                  value={campusFilter}
                  onChange={(e) => setCampusFilter(e.target.value)}
                >
                  <option value="all">Todas las Sedes</option>
                  <option value="lima-centro">Lima Centro (Av. Arequipa)</option>
                  <option value="lima-norte">Lima Norte</option>
                  <option value="sjl">San Juan de Lurigancho</option>
                  <option value="ate">Ate</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Moderation Cards List */}
        <div className="flex flex-col gap-4">
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col items-center gap-2 border border-outline-variant/30">
              <span className="material-symbols-outlined text-[36px] text-secondary">fact_check</span>
              <p className="font-label-bold text-primary font-bold">No hay publicaciones en esta vista</p>
              <p className="text-sm text-on-surface-variant">Prueba seleccionando otra pestaña o ajustando los filtros de búsqueda.</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const hasAlert = item.aiAlert && item.aiAlert.includes('Alerta');
              return (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 relative overflow-hidden border border-outline-variant/30"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-2 ${hasAlert ? 'bg-error' : 'bg-secondary'}`}></div>

                  <div className="flex flex-col md:flex-row items-start gap-5 flex-1 min-w-0">
                    {/* Thumbnail */}
                    <div className="relative w-full md:w-44 h-40 rounded-xl overflow-hidden bg-surface-container shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={item.image}
                        alt={item.title}
                      />
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-primary/80 backdrop-blur text-on-primary font-label-caps text-[10px] flex items-center gap-1 font-bold">
                        <span className="material-symbols-outlined text-[13px]">photo_camera</span> {item.photosCount || 3} fotos
                      </span>
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest/90 font-label-caps text-[10px] text-primary shadow-sm font-bold uppercase">
                        {item.category}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-between h-full gap-2.5 flex-1 min-w-0">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-caps text-[11px] font-semibold">
                            {item.condition}
                          </span>
                          <span className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">schedule</span> {item.timeAgo}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-caps text-[11px]">
                            ID: #{item.id}
                          </span>
                        </div>
                        <h2 className="font-headline-md text-headline-md text-primary font-bold tracking-tight truncate text-lg sm:text-xl">
                          {item.title}
                        </h2>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="font-headline-md text-headline-md text-primary font-bold text-lg">
                            S/ {Number(item.price).toFixed(2)}
                          </span>
                          {item.refPrice && (
                            <span className="font-body-sm text-xs text-on-surface-variant line-through">
                              {item.refPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Seller Info */}
                      <div className="flex flex-wrap items-center gap-3 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
                        <img
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-surface-container-lowest"
                          src={item.seller?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ3EPwvDx2e7U_iMQntBFB0XYjHb_i6dYt59ppCSEMdz761NUURDGduTZoXGjgBozc8KACqQoirbGm8qty_lHxUxmxthyes7ZbqGz49nW2SSCmgQU-XmtU4azti8MvmP58Qtx38wqicpc2nRiJBhz0hs7REP7H9XSWmbJVAhhNJgvxfTiDd9SMpO7SIv0ne64Z14kDyy6Bm9oA4g5Nh39dp_iC8qKb_tIGsD9_vpE"}
                          alt={item.seller?.name || "Vendedor"}
                        />
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-label-bold text-xs text-on-surface truncate font-semibold">
                              {item.seller?.name || "Estudiante UTP"}
                            </span>
                            <span className="material-symbols-outlined text-[16px] text-secondary" title="Estudiante UTP Validado">verified</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0 text-on-surface-variant font-body-sm text-xs">
                            <span className="font-semibold text-primary">{item.seller?.faculty || "Facultad"}</span>
                            <span>•</span>
                            <span>{item.seller?.email || "estudiante@utp.edu.pe"}</span>
                            <span>•</span>
                            <span className="text-secondary font-bold">{item.seller?.code || "UTP"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Campus & AI Warning */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[18px] text-primary shrink-0">meeting_room</span>
                          <span className="truncate">Entrega: <strong>{item.campusDeliveryPoint}</strong></span>
                        </div>
                        <div className={`flex items-center gap-1.5 font-medium ${hasAlert ? 'text-error' : 'text-secondary'}`}>
                          <span className="material-symbols-outlined text-[18px] shrink-0">
                            {hasAlert ? 'error' : 'check_circle'}
                          </span>
                          <span className="truncate">{item.aiAlert}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions column */}
                  <div className="flex xl:flex-col items-center justify-end gap-2.5 w-full xl:w-56 shrink-0 pt-4 xl:pt-0">
                    <button
                      onClick={() => handleApprove(item)}
                      className="w-full py-2.5 px-4 rounded-xl bg-secondary text-on-secondary hover:opacity-90 font-label-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 font-bold"
                    >
                      <span className="material-symbols-outlined text-[20px]">check</span>
                      <span>Aprobar Publicación</span>
                    </button>
                    <button
                      onClick={() => handleRequestChanges(item)}
                      className="w-full py-2.5 px-4 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-bold text-xs flex items-center justify-center gap-2 transition-colors font-semibold"
                    >
                      <span className="material-symbols-outlined text-[20px]">edit_note</span>
                      <span>Solicitar Cambios</span>
                    </button>
                    <button
                      onClick={() => setRejectingItem(item)}
                      className="w-full py-2.5 px-4 rounded-xl bg-error-container text-on-error-container hover:bg-error-container/80 font-label-bold text-xs flex items-center justify-center gap-2 transition-colors font-bold"
                    >
                      <span className="material-symbols-outlined text-[20px]">block</span>
                      <span>Rechazar</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Reject Modal */}
        {rejectingItem && (
          <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-5 border border-outline-variant">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">gavel</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-primary font-bold text-lg">Rechazar Publicación</h3>
                    <span className="text-xs text-on-surface-variant">Selecciona el motivo institucional</span>
                  </div>
                </div>
                <button
                  onClick={() => setRejectingItem(null)}
                  className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-label-bold text-xs text-on-surface font-semibold">
                  Motivo principal del rechazo:
                </label>
                {[
                  'Precio incongruente o desproporcionado',
                  'Imágenes no corresponden a recursos académicos o baja calidad',
                  'Artículo no permitido por reglamento UTP',
                  'Descripción incompleta o engañosa'
                ].map((reason) => (
                  <label
                    key={reason}
                    className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors border border-outline-variant/20"
                  >
                    <input
                      type="radio"
                      name="rejectReason"
                      checked={rejectReason === reason}
                      onChange={() => setRejectReason(reason)}
                      className="accent-secondary"
                    />
                    <span className="font-body-sm text-xs text-on-surface font-medium">{reason}</span>
                  </label>
                ))}

                <label className="font-label-bold text-xs text-on-surface mt-2 font-semibold">
                  Nota adicional para el estudiante:
                </label>
                <textarea
                  className="w-full h-20 p-3 rounded-xl bg-surface-container-low text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-secondary"
                  placeholder="Detalla qué debe corregir el estudiante para publicar nuevamente..."
                  value={rejectNotes}
                  onChange={(e) => setRejectNotes(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/30">
                <button
                  onClick={() => setRejectingItem(null)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-label-bold text-xs hover:bg-surface-container-high transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmReject}
                  className="px-5 py-2 rounded-xl bg-error text-white font-label-bold text-xs hover:bg-error/90 transition-colors shadow-sm font-bold"
                >
                  Confirmar Rechazo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
