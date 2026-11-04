import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initStorage } from './services/storage';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import SellerProfile from './pages/SellerProfile/SellerProfile';
import CategoryView from './pages/CategoryView/CategoryView';
import Dashboard from './pages/Dashboard/Dashboard';
import Messages from './pages/Messages/Messages';
import SellProduct from './pages/SellProduct/SellProduct';
import NotFound from './pages/NotFound/NotFound';

function App() {
  useEffect(() => {
    // Inicializar almacenamiento local con datos de prueba ricos y consistentes
    initStorage();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/vendedor/:id" element={<SellerProfile />} />
        <Route path="/categoria/:slug" element={<CategoryView />} />
        <Route path="/mis-compras" element={<Dashboard />} />
        <Route path="/mensajes" element={<Messages />} />
        <Route path="/vender" element={<SellProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
