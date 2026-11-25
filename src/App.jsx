import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { getCurrentUser } from './services/storage';

// Student Marketplace Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import SellerProfile from './pages/SellerProfile/SellerProfile';
import CategoryView from './pages/CategoryView/CategoryView';
import Dashboard from './pages/Dashboard/Dashboard';
import Messages from './pages/Messages/Messages';
import SellProduct from './pages/SellProduct/SellProduct';
import Favorites from './pages/Favorites/Favorites';
import { AdminModule, HelpCenter, Advertise } from './pages/Services/Services';
import NotFound from './pages/NotFound/NotFound';

// Admin Modules (Stitch AI Integrated)
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import AdminStudents from './pages/Admin/Students/AdminStudents';
import AdminModeration from './pages/Admin/Moderation/AdminModeration';
import AdminReports from './pages/Admin/Reports/AdminReports';
import AdminSettings from './pages/Admin/Settings/AdminSettings';

function RoleRoute({ area, children }) {
  const [user, setUser] = useState(getCurrentUser);
  useEffect(() => {
    const update = () => setUser(getCurrentUser());
    window.addEventListener('altoque_storage_update', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('altoque_storage_update', update);
      window.removeEventListener('storage', update);
    };
  }, []);
  if (area === 'admin' && !user) return <Navigate to="/login" replace />;
  if (area === 'admin' && user.role !== 'admin') return <Navigate to="/" replace />;
  if (area !== 'admin' && user?.role === 'admin') return <Navigate to="/admin" replace />;
  if (area === 'client' && !user) return <Navigate to="/login" replace />;
  return children;
}

function ProductRoute() {
  const { id } = useParams();
  return <ProductDetail key={id} />;
}

export function AppRoutes() {
  return (
      <Routes>
        {/* Rutas Principales del Estudiante / Cliente */}
        <Route path="/" element={<RoleRoute area="public"><Home /></RoleRoute>} />
        <Route path="/login" element={<RoleRoute area="public"><Login /></RoleRoute>} />
        <Route path="/registro" element={<RoleRoute area="public"><Register /></RoleRoute>} />
        <Route path="/producto/:id" element={<RoleRoute area="public"><ProductRoute /></RoleRoute>} />
        <Route path="/vendedor/:id" element={<RoleRoute area="public"><SellerProfile /></RoleRoute>} />
        <Route path="/categoria/:slug" element={<RoleRoute area="public"><CategoryView /></RoleRoute>} />
        <Route path="/mis-compras" element={<RoleRoute area="client"><Dashboard /></RoleRoute>} />
        <Route path="/mensajes" element={<RoleRoute area="client"><Messages /></RoleRoute>} />
        <Route path="/vender" element={<RoleRoute area="client"><SellProduct /></RoleRoute>} />
        <Route path="/favoritos" element={<RoleRoute area="client"><Favorites /></RoleRoute>} />

        {/* Módulo de Administración AlToque UTP (Protegido por Rol: Admin) */}
        <Route path="/admin" element={<RoleRoute area="admin"><AdminDashboard /></RoleRoute>} />
        <Route path="/admin/dashboard" element={<RoleRoute area="admin"><AdminDashboard /></RoleRoute>} />
        <Route path="/admin/usuarios" element={<RoleRoute area="admin"><AdminStudents /></RoleRoute>} />
        <Route path="/admin/estudiantes" element={<RoleRoute area="admin"><AdminStudents /></RoleRoute>} />
        <Route path="/admin/moderacion" element={<RoleRoute area="admin"><AdminModeration /></RoleRoute>} />
        <Route path="/admin/reportes" element={<RoleRoute area="admin"><AdminReports /></RoleRoute>} />
        <Route path="/admin/sedes" element={<RoleRoute area="admin"><AdminSettings /></RoleRoute>} />
        <Route path="/admin/parametros" element={<RoleRoute area="admin"><AdminSettings /></RoleRoute>} />

        <Route path="/vender/:id" element={<RoleRoute area="client"><SellProduct /></RoleRoute>} />
        <Route path="/ayuda" element={<RoleRoute area="client"><HelpCenter /></RoleRoute>} />
        <Route path="/anunciate" element={<RoleRoute area="public"><Advertise /></RoleRoute>} />
        {['promociones', 'publicidad', 'ingresos', 'soporte', 'publicaciones'].map(module => (
          <Route key={module} path={'/admin/' + module} element={<RoleRoute area="admin"><AdminModule key={module} module={module} /></RoleRoute>} />
        ))}

        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}
