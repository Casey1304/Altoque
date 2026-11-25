
import { useState } from 'react';
import { useStorageRefresh } from '../../services/useStorageRefresh';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout';
import * as store from '../../services/storage';
import './Services.css';

const date = value => value ? new Date(value).toLocaleString('es-PE') : '—';
const money = value => 'S/ ' + Number(value).toFixed(2);
const ticketTypes = ['Consulta', 'Problema técnico', 'Solicitud de servicio'];
const ticketStatuses = ['Pendiente', 'En atención', 'Resuelto'];
const adStatuses = ['Pendiente', 'Activo', 'Finalizado', 'Rechazado'];


function Form({ onSave, label, children }) {
  const [feedback, setFeedback] = useState(null);
  function submit(event) {
    event.preventDefault();
    try {
      onSave(Object.fromEntries(new FormData(event.currentTarget)));
      setFeedback({ text: 'Cambios guardados.' });
    } catch (error) {
      setFeedback({ error: true, text: error.message });
    }
  }
  return <form onSubmit={submit} className="service-form">
    {children}
    <button type="submit">{label}</button>
    {feedback && <p role={feedback.error ? 'alert' : 'status'}>{feedback.text}</p>}
  </form>;
}

function Field({ label, name, options, multiline, ...props }) {
  return <label>{label}
    {options ? <select name={name} {...props}>{options.map(option =>
      typeof option === 'string' ? <option key={option}>{option}</option> :
        <option key={option.value} value={option.value}>{option.label}</option>)}</select>
      : multiline ? <textarea name={name} {...props} /> : <input name={name} {...props} />}
  </label>;
}

function TicketDetails({ ticket }) {
  const hours = (Date.now() - Date.parse(ticket.createdAt)) / 3600000;
  const due = ticket.type === 'Consulta' && !ticket.attendedAt && ticket.status !== 'Resuelto';
  return <>
    <h2>{ticket.subject}</h2>
    <p>{ticket.type} · {ticket.status} · Prioridad {ticket.priority}</p>
    {due && <p>{hours >= 24 ? 'Tiempo objetivo superado' : hours >= 20 ? 'Próxima a vencer' : 'Objetivo de respuesta inferior a 24 horas'}</p>}
    <p>Creada {date(ticket.createdAt)} · Primera atención {date(ticket.attendedAt)} · Resolución {date(ticket.resolvedAt)}</p>
    <p>{ticket.message}</p>
    {ticket.responses.map((response, index) => <p key={index}><strong>Respuesta · {date(response.date)}</strong> {response.text}</p>)}
  </>;
}

export function HelpCenter() {
  useStorageRefresh();
  const tickets = store.getMyTickets();
  const user = store.getCurrentUser();
  const student = store.getStudents().find(item => item.id === user.id);
  return <MainLayout><div className="service-page">
    <h1>Centro de ayuda</h1>
    <section><h2>Mi perfil</h2><p>{user.name} · {user.email}</p>
      <p>{user.id === store.DEMO_CLIENT.id ? 'Cuenta de prueba con excepción institucional' :
        student?.idCardVerified ? 'Validación institucional completada' : 'Validación institucional pendiente'}</p>
    </section>
    <section><h2>Nueva solicitud</h2>
      <Form label="Enviar solicitud" onSave={store.submitTicket}>
        <Field label="Tipo" name="type" options={ticketTypes} />
        <Field label="Asunto" name="subject" required maxLength={100} />
        <Field label="Descripción" name="message" multiline required maxLength={2000} />
      </Form>
    </section>
    <section><h2>Historial de solicitudes</h2>
      {tickets.length ? tickets.map(ticket => <article key={ticket.id}><TicketDetails ticket={ticket} /></article>) : <p>Aún no tienes solicitudes.</p>}
    </section>
    <section><h2>Encuesta de satisfacción</h2>
      <Form label="Guardar calificación" onSave={({ score }) => store.submitSurvey(Number(score))}>
        <Field label="¿Qué tan satisfecho estás con Altoque?" name="score" options={['5', '4', '3', '2', '1']} />
      </Form>
    </section>
  </div></MainLayout>;
}

export function Advertise() {
  return <MainLayout><div className="service-page">
    <h1>Anúnciate en Altoque</h1>
    <section><h2>Solicita un espacio publicitario</h2><p>Presenta tu negocio a estudiantes cerca del campus UTP Lima Norte.</p>
      <Form label="Enviar solicitud comercial" onSave={store.submitAd}>
        <Field label="Nombre del negocio" name="businessName" required maxLength={120} />
        <Field label="Correo de contacto" name="email" type="email" required />
        <Field label="Describe tu negocio y el anuncio" name="description" multiline required maxLength={2000} />
      </Form>
    </section>
  </div></MainLayout>;
}

export function AdPlacement() {
  const ads = store.getActiveAds();
  return <aside className="service-ad" aria-label="Publicidad">
    <Link to="/anunciate">Anúnciate en Altoque</Link>
    {ads.map(ad => <article key={ad.id}>
      {ad.image && <img src={ad.image} alt="" loading="lazy" />}
      <div><small>Publicidad</small><h3>{ad.businessName}</h3><p>{ad.description}</p>
        {ad.link && <a href={ad.link} target="_blank" rel="noreferrer">Visitar negocio</a>}
      </div>
    </article>)}
  </aside>;
}

export function ListingActions({ item }) {
  useStorageRefresh();
  const [showPlans, setShowPlans] = useState(false);
  const [feedback, setFeedback] = useState('');
  const promotion = store.getListingPromotion(item.id);
  const active = promotion && store.isPromotionActive(promotion);
  const stats = store.getListingStats(item.id);
  const plans = store.getPlans().map(plan => ({ value: plan.id, label: plan.name + ' · ' + plan.days + ' días · ' + money(plan.price) }));
  const welcomeDays = store.getWelcomeDays();
  if (welcomeDays) plans.push({ value: 'welcome', label: 'Bienvenida · ' + welcomeDays + ' días · Gratis' });
  return <div className="service-actions">
    <p>{stats.views} visualizaciones · {stats.favorites} favoritos</p>
    {promotion && <p>{active ? 'Promoción activa hasta ' : 'Promoción vencida el '}{date(promotion.endsAt)}</p>}
    <div className="flex flex-wrap gap-3">
      <Link to={'/vender/' + item.id}>Editar</Link>
      <button type="button" onClick={() => {
        if (!window.confirm('¿Eliminar esta publicación?')) return;
        try { store.deleteProduct(item.id); } catch (error) { setFeedback(error.message); }
      }}>Eliminar</button>
      {store.isListingActive(item) && !active && <button type="button" onClick={() => setShowPlans(!showPlans)}>Promocionar publicación</button>}
    </div>
    {showPlans && !active && <Form label="Confirmar promoción (pago simulado)" onSave={({ plan }) => {
      store.promoteListing(item.id, plan);
      setShowPlans(false);
      setFeedback('Promoción activada.');
    }}>
      <p>Tu publicación aparecerá primero en el catálogo y llevará la etiqueta Destacado mientras dure el plan.</p>
      <Field label="Plan, duración y precio" name="plan" options={plans} />
    </Form>}
    {feedback && <p role="status">{feedback}</p>}
  </div>;
}

export function OperationHistory() {
  useStorageRefresh();
  const operations = store.getOperations();
  const user = store.getCurrentUser();
  return <section className="service-page">
    <h2>Historial de operaciones</h2>
    {operations.length ? operations.map(operation => {
      const other = operation.participants.find(id => id !== user.id);
      return <article key={operation.id}>
        <h3>{operation.title} · {operation.type}</h3>
        <p>{operation.completedAt ? 'Completada ' + date(operation.completedAt) : 'Confirmaciones: ' + operation.confirmations.length + '/2'}</p>
        {!operation.completedAt && !operation.confirmations.includes(user.id) &&
          <Form label="Confirmar operación completada" onSave={() => store.confirmOperation(operation.id)} />}
        {operation.completedAt && <Link to={'/vendedor/' + other}>Perfil y reseñas de la contraparte</Link>}
      </article>;
    }) : <p>Aún no has registrado operaciones.</p>}
  </section>;
}

function Promotions({ data }) {
  return <>
    <section><h2>Planes de promoción</h2>
      {data.plans.map(plan => <Form key={plan.id} label={'Guardar ' + plan.name} onSave={fields => store.configurePlan(plan.id, Number(fields.price), Number(fields.days))}>
        <Field label={plan.name + ' · Precio en soles'} name="price" type="number" min="0" step="0.01" required defaultValue={plan.price} />
        <Field label="Duración en días" name="days" type="number" min="1" max="365" required defaultValue={plan.days} />
      </Form>)}
      <Form label="Guardar promoción de bienvenida" onSave={({ days }) => store.configureWelcome(Number(days))}>
        <Field label="Días gratis de bienvenida (0 desactiva el beneficio)" name="days" type="number" min="0" max="365" required defaultValue={data.welcomeDays} />
      </Form>
    </section>
    <section><h2>Promociones contratadas</h2>{data.promotions.length ? data.promotions.map(promotion =>
      <p key={promotion.id}>{promotion.title} · {promotion.name} · {money(promotion.amount)} · {store.isPromotionActive(promotion) ? 'Activa' : 'Vencida'} · {date(promotion.endsAt)}</p>
    ) : <p>Aún no hay promociones contratadas.</p>}</section>
  </>;
}

function Advertising({ data }) {
  return <>
    <section><h2>Registrar anunciante</h2>
      <Form label="Crear solicitud" onSave={store.submitAd}>
        <Field label="Negocio" name="businessName" required />
        <Field label="Correo" name="email" type="email" required />
        <Field label="Descripción" name="description" multiline required />
      </Form>
    </section>
    <section><h2>Solicitudes y anuncios</h2>{data.ads.length ? data.ads.map(ad => <article key={ad.id}>
      <h3>{ad.businessName}</h3>
      <p>{ad.email} · {store.getAdStatus(ad)} · Fin {date(ad.endsAt)}</p>
      <Form label="Guardar anuncio" onSave={fields => store.updateAd(ad.id, { ...fields, price: Number(fields.price), days: Number(fields.days) })}>
        <Field label="Nombre del negocio" name="businessName" defaultValue={ad.businessName} required />
        <Field label="Correo de contacto" name="email" type="email" defaultValue={ad.email} required />
        <Field label="Descripción" name="description" multiline defaultValue={ad.description} required />
        <Field label="URL de imagen" name="image" type="url" defaultValue={ad.image} />
        <Field label="Enlace comercial" name="link" type="url" defaultValue={ad.link} />
        <Field label="Precio en soles" name="price" type="number" min="0" step="0.01" required defaultValue={ad.price ?? 0} />
        <Field label="Duración en días" name="days" type="number" min="1" required defaultValue={ad.days ?? 7} />
        <Field label="Estado" name="status" options={adStatuses} defaultValue={store.getAdStatus(ad)} />
      </Form>
    </article>) : <p>Aún no hay solicitudes comerciales.</p>}</section>
  </>;
}

function Support({ data }) {
  const [filter, setFilter] = useState('');
  const tickets = data.tickets.filter(ticket => !filter || ticket.status === filter);
  return <section><h2>Solicitudes de soporte</h2>
    <label>Filtrar por estado <select value={filter} onChange={event => setFilter(event.target.value)}>
      <option value="">Todos</option>{ticketStatuses.map(status => <option key={status}>{status}</option>)}
    </select></label>
    {tickets.length ? tickets.map(ticket => <article key={ticket.id}>
      <TicketDetails ticket={ticket} />
      <Form label="Guardar atención" onSave={fields => store.updateTicket(ticket.id, fields)}>
        <Field label="Tipo" name="type" options={ticketTypes} defaultValue={ticket.type} />
        <Field label="Prioridad" name="priority" options={['Baja', 'Normal', 'Alta']} defaultValue={ticket.priority} />
        <Field label="Estado" name="status" options={ticketStatuses} defaultValue={ticket.status} />
        <Field label="Respuesta al estudiante" name="response" multiline maxLength={2000} />
      </Form>
    </article>) : <p>No hay solicitudes para este estado.</p>}
  </section>;
}

function Listings({ data }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const listings = store.getProducts().filter(item => item.title.toLowerCase().includes(query.toLowerCase()) &&
    (!status || (item.status || 'active') === status));
  return <>
    <section><h2>Categorías</h2>
      <p>{data.categories.map(item => item.name).join(' · ')}</p>
      <Form label="Agregar categoría" onSave={({ name }) => store.saveCategory(name)}>
        <Field label="Nombre" name="name" required maxLength={70} />
      </Form>
    </section>
    <section><h2>Publicaciones del catálogo</h2>
      <label>Buscar publicación <input value={query} onChange={event => setQuery(event.target.value)} /></label>
      <label>Estado <select value={status} onChange={event => setStatus(event.target.value)}>
        <option value="">Todos</option><option value="active">Activa</option><option value="removed">Retirada</option>
      </select></label>
      {listings.length ? listings.map(item => <details key={item.id}>
        <summary>{item.title} · {store.isListingActive(item) ? 'Activa' : 'Retirada'}</summary>
        <p>{item.categoryLabel || item.category} · {item.seller?.name} · {money(item.price)}</p>
        <p>{item.description}</p>
        <Form label={store.isListingActive(item) ? 'Retirar publicación' : 'Restaurar publicación'}
          onSave={({ reason }) => store.moderateListing(item.id, store.isListingActive(item) ? 'removed' : 'active', reason)}>
          <Field label="Motivo" name="reason" required maxLength={500} />
        </Form>
        {data.moderation.filter(entry => entry.productId === item.id).map(entry =>
          <p key={entry.date}>{date(entry.date)} · {entry.status === 'active' ? 'Restaurada' : 'Retirada'} · {entry.reason}</p>)}
      </details>) : <p>No hay publicaciones que coincidan.</p>}
    </section>
  </>;
}

function payments(data) {
  return [
    ...data.promotions.filter(item => item.amount > 0).map(item => ({ ...item, type: 'Promociones' })),
    ...data.ads.filter(item => item.activatedAt && item.amount > 0).map(item => ({
      id: item.id, title: item.businessName, amount: item.amount, createdAt: item.activatedAt, type: 'Publicidad'
    }))
  ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function Revenue({ data }) {
  const [type, setType] = useState('');
  const [from, setFrom] = useState('');
  const [until, setUntil] = useState('');
  const rows = payments(data).filter(row => (!type || row.type === type) &&
    (!from || row.createdAt.slice(0, 10) >= from) && (!until || row.createdAt.slice(0, 10) <= until));
  const total = rows.reduce((sum, row) => sum + row.amount, 0);
  return <section><h2>Ingresos simulados de Nexu S.A.C.</h2>
    <div className="service-form">
      <label>Tipo <select value={type} onChange={event => setType(event.target.value)}>
        <option value="">Todos</option><option>Promociones</option><option>Publicidad</option>
      </select></label>
      <label>Desde <input type="date" value={from} onChange={event => setFrom(event.target.value)} /></label>
      <label>Hasta <input type="date" value={until} onChange={event => setUntil(event.target.value)} /></label>
    </div>
    <h3>Total {money(total)}</h3>
    {['Promociones', 'Publicidad'].map(category => {
      const subtotal = rows.filter(row => row.type === category).reduce((sum, row) => sum + row.amount, 0);
      return <div className="service-chart" key={category}><label>{category} · {money(subtotal)}
        <meter max={total || 1} value={subtotal} /></label></div>;
    })}
    {rows.length ? rows.map(row => <p key={row.id}>{date(row.createdAt)} · {row.type} · {row.title} · {money(row.amount)}</p>) : <p>No hay pagos para estos filtros.</p>}
  </section>;
}

export function AdminIndicators() {
  useStorageRefresh();
  const data = store.getBusinessAdmin();
  const products = store.getPublicProducts();
  const users = store.getStudents();
  const completed = store.getOperations().filter(item => item.completedAt);
  const satisfaction = data.surveys.length ? 100 * data.surveys.filter(item => item.score >= 4).length / data.surveys.length : null;
  const activeUsers = users.filter(user => user.status === 'verified').length;
  const sellers = new Set(store.getProducts().map(item => item.ownerId).filter(Boolean));
  const promotedSellers = new Set(data.promotions.map(item => item.userId));
  const paid = payments(data);
  const totals = category => money(paid.filter(row => row.type === category).reduce((sum, row) => sum + row.amount, 0));
  const indicators = [
    ['Usuarios registrados', users.length], ['Cuentas activas verificadas', activeUsers],
    ['Publicaciones activas', products.length], ['Operaciones completadas', completed.length],
    ['Publicaciones destacadas', products.filter(item => item.featured).length],
    ['Ingresos por promociones', totals('Promociones')], ['Ingresos por publicidad', totals('Publicidad')],
    ['Reportes pendientes', store.getReports().filter(item => item.status !== 'resolved').length],
    ['Solicitudes de soporte abiertas', data.tickets.filter(item => item.status !== 'Resuelto').length],
    ['Satisfacción (4 o 5 estrellas)', satisfaction === null ? 'Sin respuestas' : satisfaction.toFixed(1) + '%']
  ];
  return <div className="service-page"><section><h2>Indicadores del prototipo</h2>
    <dl className="service-indicators">{indicators.map(([label, value]) =>
      <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
  </section>
  <section><h2>Metas de Nexu S.A.C.</h2>
    <ul>
      <li>2 000 usuarios activos en 6 meses · {activeUsers} cuentas activas verificadas en el prototipo</li>
      <li>Más de 500 publicaciones exitosas en 6 meses · {new Set(completed.map(item => item.productId)).size} publicaciones con operación completada</li>
      <li>Satisfacción superior al 85 % · {satisfaction === null ? 'Sin respuestas' : satisfaction.toFixed(1) + '% de ' + data.surveys.length + ' respuestas'}</li>
      <li>5 % de vendedores con publicaciones destacadas en el primer año · {sellers.size ? (100 * [...promotedSellers].filter(id => sellers.has(id)).length / sellers.size).toFixed(1) + '% acumulado' : 'Sin vendedores registrados'}</li>
      <li>5 convenios con negocios en 8 meses · {new Set(data.ads.filter(ad => ad.activatedAt).map(ad => ad.email.toLowerCase())).size} negocios con anuncio activado</li>
    </ul>
    <p>Objetivos de servicio: consultas en menos de 24 h, validación institucional en menos de 2 h y revisión de reportes en menos de 48 h. Disponibilidad objetivo del 99 %. Medición de disponibilidad pendiente de monitoreo externo.</p>
  </section></div>;
}

const modules = {
  promociones: ['Promociones', Promotions],
  publicidad: ['Publicidad', Advertising],
  ingresos: ['Ingresos', Revenue],
  soporte: ['Soporte', Support],
  publicaciones: ['Publicaciones', Listings]
};

export function AdminModule({ module }) {
  useStorageRefresh();
  const [title, Content] = modules[module];
  return <AdminLayout activeTitle={title}>
    <div className="service-page"><h1>{title}</h1><Content data={store.getBusinessAdmin()} /></div>
  </AdminLayout>;
}
