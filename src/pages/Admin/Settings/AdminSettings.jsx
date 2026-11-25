import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout';
import { getCampusSettings, saveCampusSettings } from '../../../services/storage';
import './AdminSettings.css';

export default function AdminSettings() {
  const [settings, setSettings] = useState(getCampusSettings());
  const [selectedHubFilter, setSelectedHubFilter] = useState('all');
  const [searchCampus, setSearchCampus] = useState('');
  const [showNewHubModal, setShowNewHubModal] = useState(false);
  const [newPointData, setNewPointData] = useState({ name: '', location: '', totem: 'Tótem #04' });
  const [toastMsg, setToastMsg] = useState(null);

  const loadData = () => {
    setSettings(getCampusSettings());
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

  const handleSaveParams = () => {
    const updated = saveCampusSettings(settings);
    setSettings(updated);
    showToast('Parámetros globales del campus UTP guardados correctamente.');
  };

  const handleAddSafePoint = (e) => {
    e.preventDefault();
    if (!newPointData.name.trim()) return;

    const updatedSettings = { ...settings };
    const limaCentro = updatedSettings.campusList.find(c => c.id === 'lima-centro');
    if (limaCentro) {
      limaCentro.safePoints.push({
        id: `sp-${Date.now()}`,
        name: newPointData.name,
        location: newPointData.location || 'Punto Oficial',
        icon: 'verified_user',
        totem: newPointData.totem,
        feature: 'QR Fijo + Cámara PTZ'
      });
      limaCentro.safePointsCount = limaCentro.safePoints.length;
      saveCampusSettings(updatedSettings);
      setShowNewHubModal(false);
      setNewPointData({ name: '', location: '', totem: 'Tótem #04' });
      showToast('Nuevo punto seguro añadido exitosamente a Sede Lima Centro.');
    }
  };

  return (
    <AdminLayout activeTitle="Sedes y Parámetros">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-secondary transition-all">
          <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
          <span className="font-label-bold text-sm">{toastMsg}</span>
        </div>
      )}

      {/* Modal Nueva Sede / Punto Seguro */}
      {showNewHubModal && (
        <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4 border border-outline-variant">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
              <h3 className="font-headline-md text-primary font-bold text-lg">Nuevo Punto de Entrega Seguro</h3>
              <button onClick={() => setShowNewHubModal(false)} className="p-1 rounded-lg hover:bg-surface-container">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleAddSafePoint} className="flex flex-col gap-3">
              <div>
                <label className="font-label-bold text-xs text-on-surface">Nombre del Punto (ej: Pabellón C - 2do Piso)</label>
                <input
                  type="text"
                  required
                  value={newPointData.name}
                  onChange={(e) => setNewPointData({...newPointData, name: e.target.value})}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low text-xs border border-outline-variant/40 mt-1 focus:ring-1 focus:ring-secondary focus:outline-none"
                  placeholder="Ej: Sala de Lectura Silenciosa"
                />
              </div>
              <div>
                <label className="font-label-bold text-xs text-on-surface">Ubicación exacta / Referencia</label>
                <input
                  type="text"
                  value={newPointData.location}
                  onChange={(e) => setNewPointData({...newPointData, location: e.target.value})}
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low text-xs border border-outline-variant/40 mt-1 focus:ring-1 focus:ring-secondary focus:outline-none"
                  placeholder="Ej: Frente al Módulo de Atención estudiantil"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewHubModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container"
                >
                  Registrar Punto Seguro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="p-4 sm:p-8 max-w-[1440px] mx-auto w-full flex flex-col gap-8">
        {/* Top Header Section with Actions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-surface-container-high text-secondary font-label-caps text-xs tracking-wide font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              CONFIGURACIÓN DEL CAMPUS • Red UTP Nacional
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold text-2xl sm:text-3xl">
              Sedes y Puntos de Encuentro Seguros
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl text-sm sm:text-base">
              Administra las sedes habilitadas, zonas oficiales de entrega (Safety Hubs), horarios autorizados de intercambio y límites operativos del marketplace universitario.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={() => showToast('Descargando catálogo institucional de sedes y puntos seguros...')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container-low transition-all duration-200 font-label-bold text-xs shadow-sm border border-outline-variant/30"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] text-secondary">file_download</span>
              <span>Descargar Catálogo de Sedes</span>
            </button>
            <button
              onClick={() => setShowNewHubModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all duration-200 font-label-bold text-xs shadow-md font-bold"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] text-secondary-fixed">add_circle</span>
              <span>+ Nueva Sede / Punto Seguro</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* KPI 1 */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-4 border border-outline-variant/30">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-caps text-on-surface-variant uppercase text-xs">Sedes Activas</span>
                <span className="font-headline-xl text-primary mt-1 font-bold text-3xl">12</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">corporate_fare</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 100% operativas
              </span>
              <span className="font-body-sm text-xs text-on-surface-variant truncate">Lima y Provincias</span>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-4 border border-outline-variant/30">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-caps text-on-surface-variant uppercase text-xs">Puntos Seguros Verificados</span>
                <span className="font-headline-xl text-primary mt-1 font-bold text-3xl">48</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">videocam</span>
              <span className="font-body-sm text-xs text-on-surface-variant">Con cámaras y tótems de auxilio</span>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-4 border border-outline-variant/30">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-caps text-on-surface-variant uppercase text-xs">Horario Límite Intercambios</span>
                <div className="flex items-baseline gap-1 mt-1 font-bold text-primary text-xl">
                  <span>07:00</span>
                  <span>-</span>
                  <span>21:30</span>
                  <span className="text-xs font-normal text-on-surface-variant">hrs</span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">nest_clock_farsight_analog</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-caps text-[10px] font-bold">
                Toque nocturno activo
              </span>
              <span className="font-body-sm text-xs text-on-surface-variant">Seguridad UTP</span>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-4 border border-outline-variant/30">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-caps text-on-surface-variant uppercase text-xs">Tasa de Entrega Exitosa</span>
                <span className="font-headline-xl text-secondary mt-1 font-bold text-3xl">98.4%</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-secondary-container/40 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">task_alt</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="font-body-sm text-xs text-on-surface-variant">En puntos seguros oficiales</span>
              <span className="font-label-bold text-xs text-secondary font-bold">+1.2% este mes</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Campus Hubs & Locations (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Filter Bar */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 border border-outline-variant/30">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-low w-full sm:w-auto">
                <button
                  onClick={() => setSelectedHubFilter('all')}
                  className={`px-3.5 py-1.5 rounded-lg font-label-bold text-xs ${
                    selectedHubFilter === 'all' ? 'bg-surface-container-lowest text-primary shadow-xs font-bold' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Todas las Sedes (12)
                </button>
                <button
                  onClick={() => setSelectedHubFilter('lima')}
                  className={`px-3.5 py-1.5 rounded-lg font-label-bold text-xs ${
                    selectedHubFilter === 'lima' ? 'bg-surface-container-lowest text-primary shadow-xs font-bold' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Lima Metropolitana (8)
                </button>
                <button
                  onClick={() => setSelectedHubFilter('prov')}
                  className={`px-3.5 py-1.5 rounded-lg font-label-bold text-xs ${
                    selectedHubFilter === 'prov' ? 'bg-surface-container-lowest text-primary shadow-xs font-bold' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Provincias (4)
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">search</span>
                <input
                  className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container"
                  placeholder="Filtrar por sede o zona..."
                  type="text"
                  value={searchCampus}
                  onChange={(e) => setSearchCampus(e.target.value)}
                />
              </div>
            </div>

            {/* Campus Card 1: Lima Centro (Expanded Featured) */}
            <div className="rounded-2xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col border border-outline-variant/30">
              <div className="p-6 bg-surface-container-low/70 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[26px]">school</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline-md text-primary font-bold text-lg">Sede Lima Centro</h3>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-[10px] font-bold">Habilitado</span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-caps text-[10px] font-bold">Sede Principal</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 font-body-sm text-xs text-on-surface-variant">
                      <span className="inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                        Av. Arequipa 265, Cercado de Lima
                      </span>
                      <span>•</span>
                      <span>Aforo: <strong>850 est.</strong></span>
                      <span>•</span>
                      <span className="text-secondary font-bold">6 Puntos Seguros Activos</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                  <button
                    onClick={() => setShowNewHubModal(true)}
                    className="px-3.5 py-1.5 rounded-lg bg-surface-container text-primary font-label-bold text-xs hover:bg-surface-container-high transition-colors font-semibold"
                  >
                    + Añadir Punto
                  </button>
                </div>
              </div>

              {/* Sub Hubs inside Lima Centro */}
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-on-surface-variant uppercase tracking-wider text-xs font-bold">
                    Zonas Oficiales de Entrega con Geocerca y QR
                  </span>
                  <span className="font-body-sm text-xs text-on-surface-variant">Vigilancia activa: <strong>Oficial Morales G.</strong></span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {(settings.campusList?.[0]?.safePoints || []).map((sp) => (
                    <div key={sp.id} className="p-4 rounded-xl bg-surface-container-low flex flex-col justify-between gap-3 group hover:bg-surface-container transition-colors border border-outline-variant/30">
                      <div className="flex items-start justify-between">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-lowest text-secondary flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">{sp.icon}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 font-label-caps text-[10px] text-secondary font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          {sp.totem}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-label-bold text-on-surface text-xs font-semibold">{sp.name}</h4>
                        <p className="font-body-sm text-[11px] text-on-surface-variant">{sp.location}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                        <span className="font-label-caps text-[10px] text-on-surface-variant">{sp.feature}</span>
                        <span className="material-symbols-outlined text-[18px] text-secondary">qr_code_2</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Campus Cards */}
            {settings.campusList?.slice(1).map((campus) => (
              <div key={campus.id} className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-outline-variant/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[26px]">apartment</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline-md text-primary font-bold text-lg">{campus.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-[10px] font-bold">Habilitado</span>
                      {campus.region && (
                        <span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-label-caps text-[10px]">{campus.region}</span>
                      )}
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                      {campus.address} • <strong>{campus.safePointsCount} Puntos Seguros:</strong> {campus.pointsSummary}
                    </p>
                    <div className="flex items-center gap-3 mt-2 font-label-caps text-[11px] text-on-surface-variant">
                      <span className="flex items-center gap-1 font-semibold text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Geocerca {campus.geofence}m
                      </span>
                      <span>•</span>
                      <span>Intercambios hoy: {campus.tradesToday}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                  <button
                    onClick={() => showToast(`Gestionando puntos seguros de ${campus.name}...`)}
                    className="px-3.5 py-1.5 rounded-lg bg-surface-container-low text-primary font-label-bold text-xs hover:bg-surface-container transition-colors font-semibold"
                  >
                    Editar Puntos
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Global Parameters (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="rounded-2xl bg-surface-container-lowest shadow-sm p-6 flex flex-col gap-6 border border-outline-variant/30">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-primary font-bold text-base">Parámetros Globales</h3>
                    <span className="font-label-caps text-on-surface-variant text-[10px]">Seguridad y Marketplace</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-caps text-[10px] font-bold">v2.4 UTP</span>
              </div>

              {/* Parameter 1: Monto Máximo */}
              <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-bold text-xs text-on-surface font-semibold">Monto máximo por transacción</span>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant" title="Límite directo">info</span>
                </div>
                <p className="font-body-sm text-[11px] text-on-surface-variant">
                  Límite máximo de operaciones directas entre estudiantes.
                </p>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-2 font-label-bold text-xs text-on-surface-variant">S/</span>
                  <input
                    className="w-full h-9 pl-9 pr-4 rounded-lg bg-surface-container-lowest text-primary font-headline-md font-bold text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                    type="number"
                    value={settings.maxAmount}
                    onChange={(e) => setSettings({...settings, maxAmount: Number(e.target.value)})}
                  />
                </div>
              </div>

              {/* Parameter 2: Token QR */}
              <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <div className="flex flex-col">
                  <span className="font-label-bold text-xs text-on-surface font-semibold">Confirmación por Token QR</span>
                  <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    Obliga a escanear en punto seguro para liberar la calificación y fondos.
                  </p>
                  <span className="font-label-caps text-secondary text-[10px] font-bold mt-1">RECOMENDADO</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={settings.qrRequired}
                    onChange={(e) => setSettings({...settings, qrRequired: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>

              {/* Parameter 3: Tolerancia Disputas */}
              <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-bold text-xs text-on-surface font-semibold">Tolerancia para mediación</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-label-caps text-[10px] font-bold">
                    {settings.toleranceDays} DÍAS
                  </span>
                </div>
                <p className="font-body-sm text-[11px] text-on-surface-variant">
                  Plazo máximo de espera antes de escalar reclamos a Bienestar Estudiantil.
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setSettings({...settings, toleranceDays: Math.max(1, settings.toleranceDays - 1)})}
                    className="w-9 h-9 rounded-lg bg-surface-container-lowest font-headline-md flex items-center justify-center text-primary hover:bg-surface-container font-bold"
                  >
                    -
                  </button>
                  <div className="flex-1 h-9 rounded-lg bg-surface-container-lowest flex items-center justify-center font-label-bold text-xs text-primary font-bold">
                    {settings.toleranceDays} días calendario
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettings({...settings, toleranceDays: settings.toleranceDays + 1})}
                    className="w-9 h-9 rounded-lg bg-surface-container-lowest font-headline-md flex items-center justify-center text-primary hover:bg-surface-container font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Parameter 4: Strict Email */}
              <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <div className="flex flex-col">
                  <span className="font-label-bold text-xs text-on-surface font-semibold">Validación estricta @utp.edu.pe</span>
                  <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    Restringe compras, ventas y mensajes exclusivamente a cuentas institucionales.
                  </p>
                  <div className="inline-flex items-center gap-1 mt-1 text-primary font-label-caps text-[10px] font-bold">
                    <span className="material-symbols-outlined text-[14px] text-secondary">lock</span>
                    FORZADO POR POLÍTICA UTP
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={settings.strictUtpEmail}
                    onChange={(e) => setSettings({...settings, strictUtpEmail: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5"></div>
                </label>
              </div>

              {/* Parameter 5: Night block */}
              <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <div className="flex flex-col">
                  <span className="font-label-bold text-xs text-on-surface font-semibold">Bloqueo de Citas Nocturnas</span>
                  <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    Impide pactar entregas entre las 22:00 y las 07:00 hrs por directiva de seguridad.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={settings.blockNightExchanges}
                    onChange={(e) => setSettings({...settings, blockNightExchanges: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>

              {/* Save Button */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={handleSaveParams}
                  className="w-full h-12 rounded-xl bg-secondary text-on-secondary hover:bg-on-secondary-container transition-all duration-200 font-label-bold text-xs flex items-center justify-center gap-2 shadow-md font-bold"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  <span>Guardar Parámetros del Campus</span>
                </button>
                <div className="flex items-center justify-center gap-1.5 text-center font-label-caps text-[10px] text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">history</span>
                  <span>Modificado por SuperAdmin el {settings.lastModified || '24 de Noviembre, 15:30'}</span>
                </div>
              </div>
            </div>

            {/* Protocol Notice */}
            <div className="p-5 rounded-2xl bg-surface-container text-primary flex flex-col gap-3 border border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-secondary">shield</span>
                <span className="font-label-bold text-xs font-bold">Protocolo “Al Toque Seguro”</span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Cualquier modificación en las coordenadas de los tótems de entrega sincronizará automáticamente la app móvil de los estudiantes y el mapa interactivo en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
