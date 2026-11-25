import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout';
import {
  getReports,

  addMediationMessage,
  resolveReport
} from '../../../services/storage';
import './AdminReports.css';

import { getReportImages, missingReportImage } from './reportImages';

function ReportImage({ src, ...props }) {
  return <img key={src} src={src} {...props} onError={event => {
    const image = event.currentTarget;
    if (image.getAttribute('src') !== missingReportImage) image.src = missingReportImage;
  }} />;
}

export default function AdminReports() {
  const [reports, setReports] = useState(getReports);
  const [selectedCaseId, setSelectedCaseId] = useState('INC-1042');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [privateNote, setPrivateNote] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const loadData = () => {
    const list = getReports();
    setReports(list);
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

  const selectedCase = reports.find(r => r.id === selectedCaseId) || reports[0];
  const reportImages = selectedCase ? getReportImages(selectedCase) : null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedCase) return;
    addMediationMessage(selectedCase.id, {
      senderName: 'Admin UTP (Moderador Oficial)',
      senderRole: 'admin',
      senderCode: 'UTP Central',
      text: chatInput.trim()
    });
    setChatInput('');
    showToast('Mensaje guardado en el expediente.');
  };

  const handleResolve = (actionType) => {
    if (!selectedCase) return;
    resolveReport(selectedCase.id, actionType);
    if (actionType === 'agreement') {
      showToast('Acuerdo de mediación registrado.');
    } else if (actionType === 'dismiss') {
      showToast('Reporte desestimado.');
    } else {
      showToast('Resolución de moderación registrada.');
    }
  };

  const handleSaveNote = () => {
    if (!privateNote.trim()) return;
    showToast('Nota de auditoría confidencial guardada en el expediente.');
    setPrivateNote('');
  };

  // Filter reports
  const filteredReports = reports.filter(r => {
    if (activeTab === 'disputes' && r.category !== 'Disputa') return false;
    if (activeTab === 'prohibited' && r.category !== 'Prohibido') return false;
    if (activeTab === 'closed' && r.status !== 'resolved') return false;

    const q = searchQuery.toLowerCase();
    const matchSearch =
      r.id.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.buyer.name.toLowerCase().includes(q) ||
      r.seller.name.toLowerCase().includes(q);

    return matchSearch;
  });

  return (
    <AdminLayout activeTitle="Reportes e Incidencias">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-secondary transition-all">
          <span className="material-symbols-outlined text-secondary text-[20px]">gavel</span>
          <span className="font-label-bold text-sm">{toastMsg}</span>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-primary/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setPreviewImage(null)}
        >
          <div className="max-w-3xl max-h-[85vh] bg-surface rounded-2xl overflow-hidden p-2 shadow-2xl">
            <ReportImage src={previewImage.src} alt={previewImage.alt} className="w-full h-full object-contain rounded-xl max-h-[75vh]" />
            <p className="text-center font-label-bold text-xs text-on-surface-variant pt-2">Click en cualquier lugar para cerrar</p>
          </div>
        </div>
      )}

      <div className="px-4 sm:px-8 py-8 flex flex-col gap-6 max-w-[1560px] mx-auto w-full">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-caps text-xs shadow-sm font-bold">
                <span className="material-symbols-outlined text-[14px] text-secondary-fixed">verified_user</span>
                CENTRO DE RESOLUCIÓN Y SEGURIDAD • Campus UTP
              </span>
              <span className="text-on-surface-variant font-label-caps text-xs">• Sede Central Lima</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold text-2xl sm:text-3xl">
              Gestión de Reportes, Incidencias y Mediación
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl text-sm sm:text-base">
              Gestiona reclamos entre estudiantes, mediaciones en vivo, artículos reportados y conducta en el campus con trazabilidad institucional.
            </p>
          </div>

          <div className="flex items-center gap-3">

          </div>
        </div>

        {/* 4 KPI Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group border border-outline-variant/30">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Reportes Abiertos</span>
                <span className="font-headline-xl text-primary font-bold text-3xl mt-1">{reports.filter(report => report.status !== 'resolved').length}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[22px]">crisis_alert</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error text-on-error font-label-caps text-[10px] font-bold">
                <span className="material-symbols-outlined text-[13px]">priority_high</span> Requiere Atención
              </span>
              <span className="font-body-sm text-xs text-on-surface-variant">{reports.filter(report => report.createdAt && report.status !== 'resolved' && Date.parse(report.createdAt) < Date.now() - 172800000).length} fuera del objetivo de 48 h</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group border border-outline-variant/30">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Mediaciones Activas</span>
                <span className="font-headline-xl text-primary font-bold text-3xl mt-1">{reports.filter(report => report.status === 'in_mediation').length}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">gavel</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-body-sm text-xs text-secondary font-label-bold flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[16px]">timer</span> Objetivo: menos de 48 h
              </span>
              <span className="font-label-caps text-[10px] text-on-surface-variant">Expedientes en mediación</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group border border-outline-variant/30">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Casos resueltos</span>
                <span className="font-headline-xl text-primary font-bold text-3xl mt-1">{reports.filter(report => report.status === 'resolved').length}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">check_circle</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="font-body-sm text-xs text-on-surface font-label-bold font-semibold">Ver encuesta en Dashboard</span>
              </div>
              <span className="font-body-sm text-xs text-on-surface-variant"></span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group border border-outline-variant/30">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Sanciones / Bloqueos</span>
                <span className="font-headline-xl text-primary font-bold text-3xl mt-1">{reports.filter(report => report.resolutionType === 'sanction').length}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">person_off</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-body-sm text-xs text-on-surface-variant">Medidas registradas</span>
              <span className="font-label-caps text-[10px] text-error bg-error-container/60 px-2 py-0.5 rounded font-bold">Código UTP</span>
            </div>
          </div>
        </div>

        {/* Filters & Tabs */}
        <div className="p-3 bg-surface-container-lowest rounded-xl shadow-sm flex flex-col lg:flex-row items-center justify-between gap-3 border border-outline-variant/30">
          <div className="flex items-center gap-1 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg font-label-bold text-xs shrink-0 transition-colors shadow-xs ${
                activeTab === 'all' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              Todos ({reports.length})
            </button>
            <button
              onClick={() => setActiveTab('disputes')}
              className={`px-3.5 py-1.5 rounded-lg font-label-bold text-xs shrink-0 transition-colors flex items-center gap-1.5 ${
                activeTab === 'disputes' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span>Disputas Entrega/Pago</span>
              <span className="w-5 h-5 rounded-full bg-error-container text-on-error-container font-label-caps text-[10px] flex items-center justify-center font-bold">5</span>
            </button>
            <button
              onClick={() => setActiveTab('closed')}
              className={`px-3.5 py-1.5 rounded-lg font-label-bold text-xs shrink-0 transition-colors ${
                activeTab === 'closed' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              Cerrados
            </button>
          </div>

          <div className="flex items-center gap-2.5 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">search</span>
              <input
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-secondary"
                placeholder="Buscar ID caso, estudiante..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Incident Feed (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="font-label-caps text-xs uppercase text-on-surface-variant font-bold">
                Expedientes en Cola ({filteredReports.length})
              </span>
              <span className="font-label-caps text-xs text-secondary font-semibold">Actualizado en tiempo real</span>
            </div>

            {filteredReports.map((item) => {
              const isSelected = selectedCase?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCaseId(item.id)}
                  className={`p-4 rounded-xl transition-all cursor-pointer flex flex-col gap-3 relative overflow-hidden border ${
                    isSelected
                      ? 'bg-surface-container-lowest shadow-md ring-2 ring-secondary border-transparent'
                      : 'bg-surface-container-lowest shadow-sm hover:shadow-md border-outline-variant/30'
                  }`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isSelected ? 'bg-secondary' : 'bg-transparent'}`}></div>

                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-label-bold text-xs text-primary font-bold">#{item.id}</span>
                      <span className={`px-2 py-0.5 rounded-full font-label-caps text-[10px] font-bold ${
                        item.status === 'in_mediation' ? 'bg-secondary text-on-secondary' :
                        item.status === 'resolved' ? 'bg-surface-container text-on-surface' :
                        'bg-error-container text-on-error-container'
                      }`}>
                        {item.statusLabel}
                      </span>
                    </div>
                    <span className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> {item.createdAt ? ((Date.now() - Date.parse(item.createdAt)) / 3600000 >= 48 ? 'Objetivo de 48 h superado' :
                        (Date.now() - Date.parse(item.createdAt)) / 3600000 >= 42 ? 'Próximo a vencer' : 'Dentro del objetivo de 48 h') : item.timeAgo}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-label-bold text-xs text-on-surface font-semibold">{item.title}</h2>
                    <p className="font-body-sm text-xs text-on-surface-variant line-clamp-1 mt-0.5">{item.summary}</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-on-surface-variant flex items-center gap-1.5 truncate">
                        <span className="material-symbols-outlined text-[16px] text-primary">person</span>
                        {item.buyer.name} <span className="text-[10px] text-on-surface-variant">({item.buyer.code})</span>
                      </span>
                      <span className="font-label-caps text-secondary font-bold text-[10px]">Compradora</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-on-surface-variant flex items-center gap-1.5 truncate">
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant">storefront</span>
                        {item.seller.name} <span className="text-[10px] text-on-surface-variant">({item.seller.code})</span>
                      </span>
                      <span className="font-label-caps text-on-surface-variant text-[10px]">Vendedor</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-xs">
                      <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                      <span>{item.campusPoint}</span>
                    </div>
                    <div className="font-headline-md text-primary font-bold text-sm">
                      Mediación
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Case Detail & Tri-Party Dispute Room (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {selectedCase ? (
              <>
                {/* Case Header Card */}
                <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-5 border border-outline-variant/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-md font-bold shadow-sm">
                        {selectedCase.id.slice(-2)}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-headline-md text-primary tracking-tight font-bold text-lg">
                            Expediente #{selectedCase.id}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-xs font-bold">
                            {selectedCase.statusLabel}
                          </span>
                        </div>
                        <span className="font-body-sm text-xs text-on-surface-variant">
                          Iniciado el {selectedCase.startDate} • {selectedCase.campusPoint}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-surface-container font-label-bold text-xs text-primary font-bold">
                      Coordinación directa entre estudiantes
                    </span>
                  </div>

                  {/* Product & Conflict Bento */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-5 p-3 rounded-xl bg-surface-container-low flex gap-3 items-center border border-outline-variant/20">
                      <ReportImage
                        className="w-16 h-16 rounded-lg object-contain bg-surface-container-high shrink-0"
                        src={reportImages.product}
                        alt={selectedCase.productTitle}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-caps text-secondary font-bold text-[10px]">Artículo en Transacción</span>
                        <span className="font-label-bold text-on-surface truncate text-xs font-semibold">{selectedCase.productTitle}</span>
                        <span className="font-body-sm text-xs text-on-surface-variant">Publicado como: "{selectedCase.productCondition}"</span>
                      </div>
                    </div>
                    <div className="md:col-span-7 p-3 rounded-xl bg-surface-container-low flex flex-col justify-center border border-outline-variant/20">
                      <span className="font-label-caps text-on-surface-variant uppercase text-[10px] font-bold">Motivo del Reclamo</span>
                      <p className="font-body-sm text-on-surface mt-0.5 text-xs">
                        "{selectedCase.claimNarrative}"
                      </p>
                    </div>
                  </div>

                  {/* Evidences Gallery */}
                  <div className="flex flex-col gap-2">
                    <span className="font-label-caps uppercase text-on-surface-variant text-[11px] font-bold">
                      Evidencias Adjuntas ({reportImages.evidences.length} archivos)
                      {reportImages.evidences.some(evidence => evidence.simulated) && " \u00b7 Incluye evidencias simuladas"}
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      {reportImages.evidences.map((ev, i) => {
                        const label = ev.label + (ev.simulated ? " · Evidencia simulada" : "");
                        return (
                          <div
                            key={i}
                            onClick={() => setPreviewImage({ src: ev.src, alt: label })}
                            className="relative group rounded-xl overflow-hidden aspect-video bg-surface-container cursor-pointer shadow-sm border border-outline-variant/30"
                          >
                            <ReportImage
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                              src={ev.src}
                              alt={label}
                            />
                            <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-primary/80 backdrop-blur-md text-on-primary font-label-caps text-[10px] font-bold">
                              {ev.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* TRI-PARTY LIVE MEDIATION CHAT */}
                <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-4 border border-outline-variant/30">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-secondary">forum</span>
                      <h3 className="font-label-bold text-primary font-bold text-sm">
                        Sala de Mediación Institucional UTP
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                      <span className="font-label-caps text-secondary font-bold text-[11px]">Canal Seguro Grabado</span>
                    </div>
                  </div>

                  {/* Chat Stream */}
                  <div className="flex flex-col gap-3.5 max-h-[360px] overflow-y-auto pr-1">
                    {selectedCase.messages?.map((msg) => {
                      const isAdmin = msg.senderRole === 'admin';
                      const senderName = msg.senderName || msg.author || 'Participante';
                      return (
                        <div key={msg.id} className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-caps text-xs shrink-0 font-bold ${
                            isAdmin
                              ? 'bg-secondary text-on-secondary shadow-sm'
                              : msg.senderRole === 'buyer'
                              ? 'bg-primary-container text-on-primary'
                              : 'bg-surface-container-highest text-primary'
                          }`}>
                            {isAdmin ? 'UTP' : senderName.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="flex flex-col max-w-[88%]">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`font-label-bold text-xs font-semibold ${isAdmin ? 'text-secondary' : 'text-on-surface'}`}>
                                {senderName}
                              </span>
                              <span className="text-[11px] text-on-surface-variant">{msg.senderCode}</span>
                              <span className="text-[10px] text-on-surface-variant">{msg.time}</span>
                            </div>
                            <div className={`p-3 rounded-xl rounded-tl-none font-body-sm text-xs shadow-xs ${
                              isAdmin
                                ? 'bg-surface-container text-on-surface ring-1 ring-secondary/30'
                                : 'bg-surface-container-low text-on-surface'
                            }`}>
                              {msg.text}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleSendMessage} className="pt-2 flex items-center gap-2">
                    <input
                      className="w-full h-10 px-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-secondary border border-outline-variant/30"
                      placeholder="Enviar instrucción de mediación a ambas partes..."
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="h-10 px-4 rounded-lg bg-primary text-on-primary font-label-bold text-xs flex items-center gap-1.5 hover:bg-primary-container transition-colors shadow-sm font-bold shrink-0"
                    >
                      <span>Enviar</span>
                      <span className="material-symbols-outlined text-[16px]">send</span>
                    </button>
                  </form>
                </div>

                {/* RESOLUTION ACTIONS */}
                <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-4 border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-primary">balance</span>
                      <h3 className="font-label-bold text-primary font-bold text-sm">
                        Dictamen y Resolución Administrativa
                      </h3>
                    </div>
                    <span className="font-label-caps text-on-surface-variant text-[11px]">Acción Definitiva con Registro UTP</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => handleResolve('agreement')}
                      className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-secondary text-on-secondary hover:opacity-95 transition-all text-center gap-1 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[22px]">assignment_return</span>
                      <span className="font-label-bold text-xs font-bold leading-tight">Registrar acuerdo</span>
                      <span className="font-label-caps text-[10px] opacity-90">Registrar acuerdo</span>
                    </button>

                    <button
                      onClick={() => handleResolve('dismiss')}
                      className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-surface-container-low text-primary hover:bg-surface-container transition-all text-center gap-1 border border-outline-variant/30"
                    >
                      <span className="material-symbols-outlined text-[22px]">cancel</span>
                      <span className="font-label-bold text-xs font-bold leading-tight">Desestimar Reclamo</span>
                      <span className="font-label-caps text-[10px] text-on-surface-variant">Desestimar reporte a Vendedor</span>
                    </button>

                    <button
                      onClick={() => handleResolve('sanction')}
                      className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-error-container text-on-error-container hover:bg-error hover:text-white transition-all text-center gap-1 group"
                    >
                      <span className="material-symbols-outlined text-[22px]">block</span>
                      <span className="font-label-bold text-xs font-bold leading-tight">Suspender por Falsa Info</span>
                      <span className="font-label-caps text-[10px]">Apercibimiento 7 días</span>
                    </button>
                  </div>

                  {/* Private internal audit note */}
                  <div className="pt-2 flex flex-col gap-1.5">
                    <label className="font-label-caps text-on-surface-variant uppercase text-[10px] font-bold">
                      Nota Privada de Auditoría (Visible solo para administradores UTP)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        className="flex-1 h-9 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-secondary border border-outline-variant/30"
                        placeholder="Ej: Se constata acuerdo verbal previo. Se solicita entrega de calculadora a tutor de sede..."
                        type="text"
                        value={privateNote}
                        onChange={(e) => setPrivateNote(e.target.value)}
                      />
                      <button
                        onClick={handleSaveNote}
                        className="h-9 px-3 rounded-lg bg-surface-container font-label-bold text-xs text-primary hover:bg-surface-container-high transition-colors font-bold shrink-0"
                      >
                        Guardar Nota
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30">
                <p className="font-label-bold text-sm text-on-surface">Selecciona un expediente para ver los detalles.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
