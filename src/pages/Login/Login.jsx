import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/storage';
import loginIllustration from '../../assets/login-illustration.png';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      loginUser(email, password);
      setLoading(false);
      navigate('/');
    }, 400);
  };

  return (
    <div className="text-on-surface antialiased min-h-screen flex flex-col md:flex-row bg-surface-container-lowest">
      {/* Login Card */}
      <section 
        className="w-full md:w-1/2 flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-surface-container-lowest" 
        style={{ background: 'linear-gradient(135deg, rgb(249, 249, 255) 0%, rgb(240, 243, 255) 100%)' }}
      >
        <main className="w-full max-w-[440px] bg-surface-container-lowest rounded-xl p-8 md:p-10 shadow-2xl border border-outline-variant/30 relative z-10">
          <header className="flex flex-col items-center mb-stack-lg text-center">
            <Link to="/" className="w-24 mb-stack-md border border-outline-variant flex items-center justify-center bg-surface-container-low rounded-lg p-2 hover:opacity-90 transition-opacity">
              <img 
                alt="AlToque Logo" 
                className="w-full h-full object-contain" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDePoHICXj1dVioq1tg-FYw-0SQ6pB3jfRAOGnl10N3_l9ZGr4_OmAbh4gMztTT9l4MVzRV7cflgU0EJwBaAS8kovnXnpM0I5sg8FGuFsBHakZ1hZIzdNdYAWyQeqB_GE5QRElcUl7iE9DX5ay60xGkWxUBnRbBRWmp7R_YkFYHL4B02s76ayCz67-wpSP7jpKUEk0a0uos4DRVgukBqdW3IObIQBWyuTqWmaukH33nt5DO5m7675rHIDM5dYrj5hoxrg" 
              />
            </Link>
            <h1 className="font-headline-md text-headline-md text-primary mb-2 hidden md:block font-bold">
              Bienvenido a AlToque
            </h1>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-2 md:hidden font-bold">
              Bienvenido a AlToque
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Inicia sesión con tu cuenta universitaria.
            </p>
          </header>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-error-container text-on-error-container text-body-sm font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
            <div className="flex flex-col gap-unit">
              <label className="font-label-bold text-label-bold text-on-surface" htmlFor="email">
                Correo institucional o ID
              </label>
              <div className="relative flex items-center bg-surface-container-low rounded border border-outline-variant input-focus-ring transition-all duration-200">
                <span aria-hidden="true" className="material-symbols-outlined absolute left-3 text-outline">
                  mail
                </span>
                <input 
                  className="w-full bg-transparent border-none pl-10 pr-4 py-3 font-body-md text-body-md text-on-surface placeholder-outline focus:ring-0 outline-none" 
                  id="email" 
                  name="email" 
                  placeholder="correo institucional" 
                  required 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-unit">
              <label className="font-label-bold text-label-bold text-on-surface" htmlFor="password">
                Contraseña
              </label>
              <div className="relative flex items-center bg-surface-container-low rounded border border-outline-variant input-focus-ring transition-all duration-200">
                <span aria-hidden="true" className="material-symbols-outlined absolute left-3 text-outline">
                  lock
                </span>
                <input 
                  className="w-full bg-transparent border-none pl-10 pr-4 py-3 font-body-md text-body-md text-on-surface placeholder-outline focus:ring-0 outline-none" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end mt-1">
                <a 
                  className="font-label-bold text-label-bold text-primary hover:text-secondary transition-colors text-body-sm" 
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert("En modo demo, puedes ingresar con cualquier correo."); }}
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <button 
              className="w-full h-12 mt-2 bg-primary-container text-on-primary font-label-bold text-label-bold rounded flex items-center justify-center hover:bg-primary transition-colors duration-200 shadow-sm disabled:opacity-50" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              ¿No tienes una cuenta? 
              <Link className="font-label-bold text-label-bold text-primary hover:text-secondary-fixed-dim transition-colors ml-1" to="/registro">
                Crear una cuenta
              </Link>
            </p>
          </div>
        </main>
      </section>

      {/* Side Illustration Section - Exacto a Stitch */}
      <section className="hidden md:flex md:w-1/2 bg-primary-container items-center justify-center p-10 overflow-hidden relative">
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ backgroundImage: 'radial-gradient(#6ff7f6 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
        ></div>
        <div className="relative z-10 w-full max-w-xl flex items-center justify-center">
          <img 
            alt="AlToque Marketplace Illustration" 
            className="w-full max-w-[480px] h-auto rounded-xl shadow-2xl object-contain" 
            src={loginIllustration} 
          />
        </div>
      </section>
    </div>
  );
}
