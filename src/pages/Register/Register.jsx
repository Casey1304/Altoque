import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/storage';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !university || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      registerUser({ fullName, email, university, password });
      setLoading(false);
      navigate('/');
    }, 400);
  };

  return (
    <div 
      className="bg-background min-h-screen flex flex-col font-sans text-on-surface antialiased py-8 px-4" 
      style={{ background: 'linear-gradient(135deg, rgb(11, 61, 89) 0%, rgb(0, 106, 106) 100%)' }}
    >
      <main className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(11,61,89,0.05)] border border-surface-variant overflow-hidden shadow-2xl">
          <div className="p-stack-lg flex flex-col items-center">
            {/* Logo */}
            <Link to="/" className="mb-stack-md hover:opacity-90 transition-opacity">
              <img 
                alt="AlToque Logo" 
                className="h-16 w-auto object-contain" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4K96lIHCTg2ceMZ4ketVlvfNHfCLRiKO5AlvCUTZ-si-M23WrkVHofK73emmfMs3-ILlVQT72WG484my8ZmrPiXgHxGCu6KtozXrTZ59fjXNI2HXzqGvfR-nnZKh30wzz2qmsDOV9qeT_uKwXWeZLRabyhmnCfurOpW3f__ywV1sFbot0IQT-hIQ2DO5otwidDfGPZZKebbs9H2OdeBD9Cr17rbNXQi7Oc3VIZyW9W0_D59RclQs_a5KrL4__BrJ4zQ" 
              />
            </Link>

            {/* Header */}
            <div className="text-center mb-stack-lg">
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-stack-sm font-bold">
                Únete a la comunidad
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Crea tu cuenta para empezar a intercambiar al toque.
              </p>
            </div>

            {error && (
              <div className="w-full mb-4 p-3 rounded-lg bg-error-container text-on-error-container text-body-sm font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              {/* Nombre Completo */}
              <div>
                <label className="block font-label-bold text-label-bold text-on-surface mb-1" htmlFor="fullName">
                  Nombre completo
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute inset-y-0 left-0 pl-3 flex items-center text-outline pointer-events-none">
                    person
                  </span>
                  <input 
                    className="w-full pl-10 pr-3 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-fixed focus:border-transparent transition-colors" 
                    id="fullName" 
                    name="fullName" 
                    placeholder="Ej. Juan Pérez" 
                    required 
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              {/* Correo Institucional */}
              <div>
                <label className="block font-label-bold text-label-bold text-on-surface mb-1" htmlFor="email">
                  Correo institucional (.edu)
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute inset-y-0 left-0 pl-3 flex items-center text-outline pointer-events-none">
                    mail
                  </span>
                  <input 
                    className="w-full pl-10 pr-3 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-fixed focus:border-transparent transition-colors" 
                    id="email" 
                    name="email" 
                    placeholder="estudiante@universidad.edu.pe" 
                    required 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <p className="mt-1 font-body-sm text-[12px] text-on-surface-variant">Solo correos universitarios válidos.</p>
              </div>

              {/* Universidad */}
              <div>
                <label className="block font-label-bold text-label-bold text-on-surface mb-1" htmlFor="university">
                  Selecciona tu Universidad
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute inset-y-0 left-0 pl-3 flex items-center text-outline pointer-events-none">
                    school
                  </span>
                  <select 
                    className="w-full pl-10 pr-10 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-fixed focus:border-transparent appearance-none transition-colors" 
                    id="university" 
                    name="university" 
                    required
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                  >
                    <option disabled value="">Elige una opción...</option>
                    <option value="UTP">Universidad Tecnológica del Perú (UTP)</option>
                    <option value="UNMSM">Universidad Nacional Mayor de San Marcos (UNMSM)</option>
                    <option value="PUCP">Pontificia Universidad Católica del Perú (PUCP)</option>
                    <option value="UNI">Universidad Nacional de Ingeniería (UNI)</option>
                    <option value="UPC">Universidad Peruana de Ciencias Aplicadas (UPC)</option>
                    <option value="Otro">Otra Universidad</option>
                  </select>
                  <span className="material-symbols-outlined absolute inset-y-0 right-0 pr-3 flex items-center text-outline pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label className="block font-label-bold text-label-bold text-on-surface mb-1" htmlFor="password">
                  Contraseña
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute inset-y-0 left-0 pl-3 flex items-center text-outline pointer-events-none">
                    lock
                  </span>
                  <input 
                    className="w-full pl-10 pr-10 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary-fixed focus:border-transparent transition-colors" 
                    id="password" 
                    minLength={8} 
                    name="password" 
                    placeholder="Mínimo 8 caracteres" 
                    required 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    aria-label="Toggle password visibility" 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface focus:outline-none" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                className="w-full h-12 bg-primary-container text-on-primary font-label-bold text-label-bold rounded-lg hover:bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container mt-4 flex justify-center items-center gap-2 shadow-sm disabled:opacity-50" 
                type="submit"
                disabled={loading}
              >
                <span>{loading ? 'Creando cuenta...' : 'Registrarse'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>

            {/* Footer / Login Link */}
            <div className="mt-6 text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                ¿Ya tienes una cuenta? 
                <Link className="text-primary-container font-label-bold text-label-bold hover:underline underline-offset-4 rounded px-1 ml-1" to="/login">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

