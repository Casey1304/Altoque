import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import { saveNewProduct } from '../../services/storage';
import './SellProduct.css';

export default function SellProduct() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('Como Nuevo');
  const [price, setPrice] = useState('');
  const [meetingPoint, setMeetingPoint] = useState('Entrada Principal - Campus Central');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Selector de imagen con FileReader
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('La imagen supera los 5MB permitidos.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !category || !price) {
      setError('Por favor completa el título, categoría y precio.');
      return;
    }

    setSubmitting(true);

    const categoryLabels = {
      libros: 'Libros de texto',
      electronica: 'Electrónica',
      laboratorio: 'Equipo de Laboratorio',
      papeleria: 'Papelería'
    };

    const newProd = saveNewProduct({
      title: title.trim(),
      category,
      categoryLabel: categoryLabels[category] || 'General',
      condition,
      price: parseFloat(price) || 0,
      meetingPoint: meetingPoint.trim(),
      description: description.trim() || 'Artículo universitario en buen estado.',
      image: imagePreview || "https://lh3.googleusercontent.com/aida-public/AB6AXuBENRdOAHcy_RbVJjeklHw3c2bVSjMGAExYFUe3wwBDs1P2XVWcH_HlTkb7hZKoPOxf7kOz_FHDEVi-m8LWhLPgIeoehp3h3x5dN-DFr3TvMIxEfSCsdll0E7S6lOqx5PIYoYXHbOE3qb4wbT2EGNnwXKTSo71EZKk0sErrm06d2gvzGxqAYZWLyo8J16tYTXxbKEt_ecdkbxIMbCXZpZmOFGaej0s9VdPMpbNXVt1x5nghEGmgPpY1",
      thumbnails: imagePreview ? [imagePreview] : []
    });

    setTimeout(() => {
      setSubmitting(false);
      navigate(`/producto/${newProd.id}`);
    }, 400);
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-4 md:py-6">
        {/* Page Header */}
        <div className="mb-stack-lg text-center md:text-left">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-1">
            Publicar Nuevo Artículo
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Completa los detalles para que otros estudiantes encuentren tu producto "Al Toque".
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-lg font-label-bold text-body-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(11,61,89,0.05)] border border-outline-variant/30 p-6 md:p-8 relative overflow-hidden">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* 1. Product Title */}
            <div className="flex flex-col gap-1">
              <label className="font-label-bold text-label-bold text-on-surface" htmlFor="title">
                Título del producto *
              </label>
              <input 
                className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface-container-lowest text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all shadow-sm outline-none" 
                id="title" 
                name="title" 
                placeholder="Ej. Libro de Cálculo de Stewart 8va Edición" 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* 2. Photos Upload Section */}
            <div className="flex flex-col gap-1">
              <label className="font-label-bold text-label-bold text-on-surface">
                Fotos del producto
              </label>
              
              {imagePreview ? (
                <div className="relative w-full h-64 rounded-xl overflow-hidden border border-outline-variant bg-surface-container-low group">
                  <img src={imagePreview} alt="Previsualización" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-3 right-3 bg-error text-white p-2 rounded-full shadow-md hover:bg-error/90 transition-colors"
                    title="Eliminar foto"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center text-center bg-surface hover:bg-surface-container transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" 
                  />
                  <div className="w-14 h-14 bg-secondary-container/40 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-secondary text-[32px]">
                      add_photo_alternate
                    </span>
                  </div>
                  <span className="font-label-bold text-label-bold text-primary mb-1 group-hover:text-secondary transition-colors">
                    Haz clic para subir una foto real desde tu dispositivo
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    JPG, PNG o WEBP. Máximo 5MB.
                  </span>
                </label>
              )}
            </div>

            {/* 3. Category & Condition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-bold text-label-bold text-on-surface" htmlFor="category">
                  Categoría *
                </label>
                <div className="relative">
                  <select 
                    className="appearance-none w-full border border-outline-variant rounded-lg px-4 py-3 pr-10 bg-surface-container-lowest text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all shadow-sm outline-none cursor-pointer" 
                    id="category" 
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option disabled value="">Selecciona una categoría</option>
                    <option value="libros">Libros de Texto</option>
                    <option value="electronica">Electrónica</option>
                    <option value="laboratorio">Equipo de Laboratorio</option>
                    <option value="papeleria">Papelería</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-bold text-label-bold text-on-surface" htmlFor="condition">
                  Estado del producto
                </label>
                <div className="relative">
                  <select 
                    className="appearance-none w-full border border-outline-variant rounded-lg px-4 py-3 pr-10 bg-surface-container-lowest text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all shadow-sm outline-none cursor-pointer" 
                    id="condition" 
                    name="condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    <option value="Nuevo">Nuevo (Sin abrir)</option>
                    <option value="Como Nuevo">Como Nuevo (Casi sin uso)</option>
                    <option value="Usado - Buen estado">Usado - Buen estado</option>
                    <option value="Usado - Aceptable">Usado - Aceptable</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Price & Meeting Point */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-bold text-label-bold text-on-surface" htmlFor="price">
                  Precio estimado (S/) *
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 font-bold text-primary">S/</span>
                  <input 
                    className="w-full border border-outline-variant rounded-lg pl-9 pr-4 py-3 bg-surface-container-lowest text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all shadow-sm outline-none" 
                    id="price" 
                    name="price" 
                    placeholder="Ej. 35.00" 
                    type="number" 
                    step="0.5"
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-bold text-label-bold text-on-surface" htmlFor="meetingPoint">
                  Punto de entrega sugerido
                </label>
                <input 
                  className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-surface-container-lowest text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all shadow-sm outline-none" 
                  id="meetingPoint" 
                  name="meetingPoint" 
                  placeholder="Ej. Entrada Pabellón C - Campus Norte" 
                  type="text"
                  value={meetingPoint}
                  onChange={(e) => setMeetingPoint(e.target.value)}
                />
              </div>
            </div>

            {/* 5. Description */}
            <div className="flex flex-col gap-1">
              <label className="font-label-bold text-label-bold text-on-surface" htmlFor="description">
                Descripción del artículo
              </label>
              <textarea 
                className="w-full border border-outline-variant rounded-lg p-4 bg-surface-container-lowest text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all shadow-sm outline-none" 
                id="description" 
                name="description" 
                placeholder="Indica detalles como el ciclo en el que lo usaste, si incluye accesorios, tapa protectora, etc." 
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full py-4 bg-secondary text-on-secondary font-label-bold text-label-bold rounded-lg hover:bg-secondary-fixed transition-colors active:scale-95 duration-150 shadow-md flex items-center justify-center gap-2 text-base disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span>{submitting ? 'Publicando en AlToque...' : 'Publicar Producto Ahora'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

