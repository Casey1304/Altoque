import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout/AdminLayout';
import {
  getStudents,
  verifyStudentCard,
  toggleStudentStatus
} from '../../../services/storage';
import './AdminStudents.css';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDossierModal, setShowDossierModal] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const loadData = () => {
    const list = getStudents();
    setStudents(list);
    if (selectedStudent) {
      const updated = list.find(s => s.id === selectedStudent.id);
      if (updated) setSelectedStudent(updated);
    }
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

  const handleVerifyCard = (studentId) => {
    verifyStudentCard(studentId);
    showToast('Carnet universitario validado exitosamente. Estudiante verificado.');
  };

  const handleToggleStatus = (studentId) => {
    const updated = toggleStudentStatus(studentId);
    if (updated) {
      showToast(`Estado actualizado: ${updated.status === 'suspended' ? 'Usuario suspendido' : 'Usuario reactivado'}.`);
    }
  };

  const handleExport = () => {
    const headers = "ID,Nombre,Codigo,Email,Facultad,Campus,Estado,Ventas,Compras,Reputacion\n";
    const rows = students.map(s => `"${s.id}","${s.name}","${s.code}","${s.email}","${s.faculty}","${s.campus}","${s.status}","${s.salesCount}","${s.purchasesCount}","${s.rating}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `estudiantes_utp_altoque_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Padrón de estudiantes descargado en formato CSV.');
  };

  // Filter logic
  const filteredStudents = students.filter(student => {
    const query = searchQuery.toLowerCase();
    const matchSearch =
      student.name.toLowerCase().includes(query) ||
      student.code.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query);

    const matchFaculty = facultyFilter === 'all' ||
      (facultyFilter === 'ing' && student.faculty.toLowerCase().includes('ing')) ||
      (facultyFilter === 'salud' && student.faculty.toLowerCase().includes('salud')) ||
      (facultyFilter === 'negocios' && student.faculty.toLowerCase().includes('admin')) ||
      (facultyFilter === 'derecho' && student.faculty.toLowerCase().includes('derecho')) ||
      (facultyFilter === 'arq' && student.faculty.toLowerCase().includes('arq'));

    const matchStatus = statusFilter === 'all' || student.status === statusFilter;

    return matchSearch && matchFaculty && matchStatus;
  });

  return (
    <AdminLayout activeTitle="Gestión de Estudiantes">
      <div className="p-4 sm:p-8 max-w-[1520px] mx-auto w-full flex flex-col gap-8">
        {/* Toast */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-secondary transition-all">
            <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
            <span className="font-label-bold text-sm">{toastMsg}</span>
          </div>
        )}

        {/* Top Administrative Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-xs uppercase tracking-wider font-bold">
                Control de Identidad Universitaria
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
              <span className="font-label-caps text-xs text-on-surface-variant">Sede Lima Centro & Nacional</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold text-2xl sm:text-3xl">
              Gestión de Estudiantes y Usuarios
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-sm sm:text-base">
              Administra cuentas universitarias verificadas, reputación, sanciones y accesos del campus.
            </p>
          </div>
          <div className="flex items-center gap-3">

            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-bold text-xs transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">file_download</span>
              <span>Exportar lista de estudiantes</span>
            </button>
          </div>
        </div>

        {/* Summary Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Estudiantes */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border border-outline-variant/30">
            <div className="absolute right-0 top-0 w-24 h-24 bg-primary-fixed/30 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Total de Estudiantes</span>
              <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">groups</span>
              </div>
            </div>
            <div>
              <div className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight text-3xl">3,892</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="flex items-center text-secondary font-label-bold text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">verified</span> {students.length ? Math.round(100 * students.filter(item => item.idCardVerified).length / students.length) : 0}%
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant truncate">correos institucional @utp.edu.pe</span>
              </div>
            </div>
          </div>

          {/* Vendedores Activos */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border border-outline-variant/30">
            <div className="absolute right-0 top-0 w-24 h-24 bg-secondary-container/20 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Vendedores Activos</span>
              <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">storefront</span>
              </div>
            </div>
            <div>
              <div className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight text-3xl">1,140</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-caps text-[10px] font-bold">Cuentas activas verificadas</span>
                <span className="font-body-sm text-xs text-on-surface-variant">con publicaciones activas</span>
              </div>
            </div>
          </div>

          {/* Solicitudes de Validación */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border border-outline-variant/30">
            <div className="absolute right-0 top-0 w-24 h-24 bg-primary-container/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Validación de Cuenta</span>
              <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[20px]">badge</span>
              </div>
            </div>
            <div>
              <div className="font-headline-xl text-headline-xl text-primary-container font-bold tracking-tight text-3xl">19</div>
              <div className="flex items-center gap-1.5 mt-2 text-on-surface-variant font-body-sm text-xs">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span>Pendientes por carnet universitario</span>
              </div>
            </div>
          </div>

          {/* Suspendidos / Reportados */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border border-outline-variant/30">
            <div className="absolute right-0 top-0 w-24 h-24 bg-error-container/40 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-caps text-on-surface-variant uppercase tracking-wider text-xs">Suspendidos / Reportados</span>
              <div className="w-9 h-9 rounded-xl bg-error-container text-on-error-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">gavel</span>
              </div>
            </div>
            <div>
              <div className="font-headline-xl text-headline-xl text-error font-bold tracking-tight text-3xl">8</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-caps text-[10px] font-bold">Alta Prioridad</span>
                <span className="font-body-sm text-xs text-on-surface-variant">Cuentas bajo investigación</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table Workspace */}
        <div className="w-full bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col border border-outline-variant/30">
          {/* Filters & Command Toolbar */}
          <div className="p-5 bg-surface-container-low flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center border-b border-outline-variant/30">
            {/* Search input */}
            <div className="relative flex-1 max-w-lg">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
              <input
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-lowest text-on-surface font-body-sm text-sm placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm"
                placeholder="Buscar por Nombre, Código UTP (ej: U2021), Correo..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-xl shadow-sm border border-outline-variant/30">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">school</span>
                <select
                  className="bg-transparent font-label-bold text-xs text-on-surface focus:outline-none cursor-pointer"
                  value={facultyFilter}
                  onChange={(e) => setFacultyFilter(e.target.value)}
                >
                  <option value="all">Todas las Facultades</option>
                  <option value="ing">Ingeniería y Tecnología</option>
                  <option value="salud">Ciencias de la Salud</option>
                  <option value="negocios">Administración y Negocios</option>
                  <option value="derecho">Derecho y Humanidades</option>
                  <option value="arq">Arquitectura y Diseño</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-xl shadow-sm border border-outline-variant/30">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">filter_alt</span>
                <select
                  className="bg-transparent font-label-bold text-xs text-on-surface focus:outline-none cursor-pointer"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Todos los Estados</option>
                  <option value="verified">Verificado Completo</option>
                  <option value="pending_id">Pendiente Carnet</option>
                  <option value="warning">Con Advertencia</option>
                  <option value="suspended">Suspendido</option>
                </select>
              </div>
            </div>
          </div>

          {/* Student Master Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant font-label-caps text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-5">Estudiante</th>
                  <th className="py-3.5 px-4">Facultad y Campus</th>
                  <th className="py-3.5 px-4">Reputación</th>
                  <th className="py-3.5 px-4 text-center">Intercambios</th>
                  <th className="py-3.5 px-4">Estado Verificación</th>
                  <th className="py-3.5 px-4">Última Actividad</th>
                  <th className="py-3.5 px-5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low font-body-sm text-sm text-on-surface">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-on-surface-variant">
                      No se encontraron estudiantes con los filtros seleccionados.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      onClick={() => { setSelectedStudent(student); setShowDossierModal(true); }}
                      className={`group hover:bg-surface-container/60 transition-colors cursor-pointer ${
                        student.status === 'suspended' ? 'bg-error-container/10' : ''
                      }`}
                    >
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3.5">
                          <div className="relative">
                            <img
                              className={`w-11 h-11 rounded-full object-cover shadow-sm ${
                                student.status === 'suspended' ? 'grayscale opacity-70' : 'ring-2 ring-secondary'
                              }`}
                              src={student.avatar}
                              alt={student.name}
                            />
                            <span
                              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-surface-container-lowest ${
                                student.status === 'suspended' ? 'bg-error' : student.status === 'pending_id' ? 'bg-amber-400' : 'bg-secondary'
                              }`}
                            ></span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className={`font-label-bold text-on-surface truncate ${student.status === 'suspended' ? 'line-through decoration-error' : ''}`}>
                              {student.name}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-label-caps text-[10px] text-primary px-1.5 py-0.2 bg-primary-fixed rounded font-bold">
                                {student.code}
                              </span>
                              <span className="text-on-surface-variant truncate text-xs">{student.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-label-bold text-on-surface text-xs font-semibold">{student.faculty}</span>
                          <span className="text-on-surface-variant text-xs">{student.campus} • {student.cycle}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[18px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="font-label-bold text-on-surface font-bold text-xs">{student.rating}</span>
                          <span className="text-on-surface-variant text-xs">({student.reviewsCount} reseñas)</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low text-xs">
                          <span className="text-secondary font-label-bold font-bold">{student.salesCount} vtas</span>
                          <span className="text-outline">/</span>
                          <span className="text-on-surface-variant font-label-bold">{student.purchasesCount} cmp</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1">
                          {student.badges?.map((badge, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-[10px] w-fit font-semibold">
                              <span className="material-symbols-outlined text-[13px]">check_circle</span>
                              {badge}
                            </span>
                          ))}
                          {student.status === 'pending_id' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-caps text-[10px] w-fit font-bold">
                              <span className="material-symbols-outlined text-[13px]">hourglass_empty</span>
                              Revisión Carnet
                            </span>
                          )}
                          {student.status === 'suspended' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error text-white font-label-caps text-[10px] w-fit font-bold">
                              <span className="material-symbols-outlined text-[13px]">block</span>
                              Suspendido
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-label-bold text-on-surface text-xs">{student.status === 'pending_id' && student.joinedAt ? (Date.parse(student.joinedAt) < Date.now() - 7200000 ? 'Objetivo de 2 h superado' : 'Pendiente de validación') : student.lastActivity || (student.joinedAt ? new Date(student.joinedAt).toLocaleDateString("es-PE") : "—")}</span>
                          <span className="text-[11px] text-on-surface-variant">{student.lastActivityDetail}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
                            onClick={() => { setSelectedStudent(student); setShowDossierModal(true); }}
                            title="Ver Expediente"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          {student.status === 'pending_id' && (
                            <button
                              className="p-2 rounded-lg text-secondary hover:bg-secondary-container transition-colors"
                              onClick={() => handleVerifyCard(student.id)}
                              title="Validar Carnet UTP"
                            >
                              <span className="material-symbols-outlined text-[18px]">verified</span>
                            </button>
                          )}
                          <button
                            className={`p-2 rounded-lg transition-colors ${
                              student.status === 'suspended' ? 'text-secondary hover:bg-secondary-container' : 'text-error hover:bg-error-container'
                            }`}
                            onClick={() => handleToggleStatus(student.id)}
                            title={student.status === 'suspended' ? 'Reactivar estudiante' : 'Suspender estudiante'}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {student.status === 'suspended' ? 'check' : 'block'}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dossier Modal */}
        {showDossierModal && selectedStudent && (
          <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full p-6 shadow-2xl flex flex-col gap-6 border border-outline-variant max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold">
                    UTP
                  </div>
                  <div>
                    <h3 className="font-headline-md text-primary font-bold text-lg">Expediente del Estudiante</h3>
                    <span className="text-xs text-on-surface-variant">Verificación Institucional AlToque</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowDossierModal(false)}
                  className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>

              {/* Student Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 rounded-xl bg-surface-container-low">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-primary-container"
                />
                <div className="flex flex-col flex-1 min-w-0 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4 className="font-headline-md text-primary font-bold text-lg">{selectedStudent.name}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-xs font-bold">
                      {selectedStudent.status === 'suspended' ? 'SUSPENDIDO' : 'ACTIVO'}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-0.5">{selectedStudent.email}</p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-xs font-semibold">
                    <span className="text-primary font-bold">Código: {selectedStudent.code}</span>
                    <span>•</span>
                    <span>{selectedStudent.faculty}</span>
                    <span>•</span>
                    <span>{selectedStudent.campus}</span>
                  </div>
                </div>
              </div>

              {/* Carnet Universitario Section */}
              <div className="flex flex-col gap-2">
                <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
                  Foto de Carnet Universitario Presentado
                </label>
                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={selectedStudent.carnetImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuAyg_pZAdj1ptrTqBEXKtJBL9aJoflMFuY9nNC1RWaA_gKn3y1ZXT5GF8bxLMiF-6k0DkNfhllscbay7RppU3Jlfu67ccXvp8WVN-emlZCM-cNp6Y7RhyQvOxjfq436UXS5FZs-b9rKlZClpoYeNjFtGCLxTEmUlGKO7A11CQd91-DwRdRptURbC7xS-E8U3ZFwe_YrV71amBRiW_rhZq3cJE9a-Q_xklSVVZ4xqic"}
                    alt="Carnet Universitario"
                    className="w-48 h-32 rounded-lg object-cover shadow-sm border border-outline-variant"
                  />
                  <div className="flex flex-col gap-2 flex-1">
                    <span className="text-xs text-on-surface-variant">
                      Validación visual del holograma institucional y vigencia del semestre en curso.
                    </span>
                    {selectedStudent.status === 'pending_id' ? (
                      <button
                        onClick={() => { handleVerifyCard(selectedStudent.id); }}
                        className="py-2 px-4 rounded-xl bg-secondary text-on-secondary font-label-bold text-xs flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        <span>Aprobar Carnet y Verificar Cuenta</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-secondary font-label-bold text-xs">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span>Carnet validado conforme a normativa UTP.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/30">
                <button
                  onClick={() => setShowDossierModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-label-bold text-xs hover:bg-surface-container-high transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => handleToggleStatus(selectedStudent.id)}
                  className={`px-4 py-2 rounded-xl font-label-bold text-xs transition-colors shadow-sm ${
                    selectedStudent.status === 'suspended'
                      ? 'bg-secondary text-on-secondary hover:brightness-105'
                      : 'bg-error text-white hover:bg-error/90'
                  }`}
                >
                  {selectedStudent.status === 'suspended' ? 'Levantar Suspensión' : 'Suspender Acceso al Marketplace'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
