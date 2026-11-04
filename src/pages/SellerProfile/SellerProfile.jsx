import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import { INITIAL_SELLER } from '../../services/mockData';
import { getSellerReviews, addSellerReview, createQuickChat } from '../../services/storage';
import './SellerProfile.css';

export default function SellerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(INITIAL_SELLER);
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSeller(INITIAL_SELLER);
    setReviews(getSellerReviews());
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const updated = addSellerReview({
      rating: newRating,
      comment: newComment.trim()
    });
    setReviews(updated);
    setNewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const handleContactSeller = () => {
    createQuickChat("Contacto de Perfil", `Hola ${seller.name}, me gustaría consultar sobre tus artículos.`, seller);
    navigate('/mensajes');
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter py-4">
        {/* Left Column: Seller Identity */}
        <div className="lg:col-span-4 flex flex-col gap-stack-md">
          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container mb-4 relative shadow-md">
              <img 
                className="w-full h-full object-cover" 
                alt={seller.name} 
                src={seller.avatar} 
              />
            </div>
            
            <h1 className="font-headline-lg text-headline-lg text-primary mb-1 font-bold">
              {seller.name}
            </h1>
            
            <div className="flex items-center gap-1 text-secondary font-label-bold text-label-bold mb-3">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                school
              </span>
              <span>{seller.degree}</span>
            </div>

            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4].map(s => (
                <span key={s} className="material-symbols-outlined text-[#F59E0B]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              ))}
              <span className="material-symbols-outlined text-[#F59E0B]">
                star_half
              </span>
              <span className="font-label-bold text-label-bold ml-2 font-bold">{seller.rating}</span>
              <span className="text-on-surface-variant font-body-sm text-body-sm">
                ({reviews.length + 120} Calificaciones)
              </span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mt-3 w-full">
              <span className="bg-surface-container-low text-primary px-3 py-1 rounded-full font-label-caps text-label-caps border border-outline-variant font-semibold">
                {seller.badge1}
              </span>
              <span className="bg-surface-container-low text-primary px-3 py-1 rounded-full font-label-caps text-label-caps border border-outline-variant font-semibold">
                {seller.badge2}
              </span>
            </div>

            <div className="w-full mt-6 pt-6 border-t border-outline-variant flex flex-col gap-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant font-label-caps text-label-caps font-semibold">Miembro desde</span>
                <span className="text-on-surface font-label-bold text-label-bold">{seller.memberSince}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant font-label-caps text-label-caps font-semibold">Intercambios realizados</span>
                <span className="text-on-surface font-label-bold text-label-bold">{seller.tradesCount} exitosos</span>
              </div>
              <div className="mt-2">
                <span className="block text-on-surface-variant font-label-caps text-label-caps mb-1 font-semibold">Sobre mí</span>
                <p className="text-on-surface font-body-sm text-body-sm italic leading-relaxed bg-surface-container-low p-3 rounded-lg border border-outline-variant/40">
                  "{seller.bio}"
                </p>
              </div>
            </div>

            <button 
              onClick={handleContactSeller}
              className="mt-6 w-full bg-secondary text-on-secondary font-label-bold text-label-bold py-3 rounded-lg hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>Contactar vendedor</span>
            </button>
          </div>
        </div>

        {/* Right Column: Reviews & Forms */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Post Review Section */}
          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 className="font-headline-md text-headline-md text-primary mb-4 font-bold">
              Deja un comentario sobre el vendedor
            </h2>

            {reviewSubmitted && (
              <div className="mb-4 p-3 bg-secondary-container text-on-secondary-container rounded-lg font-label-bold text-body-sm flex items-center gap-2">
                <span className="material-symbols-outlined">check_circle</span>
                <span>¡Tu comentario ha sido publicado con éxito!</span>
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-label-bold text-label-bold text-on-surface mb-2 font-bold">
                  Puntuación de la experiencia
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="text-outline-variant hover:text-[#F59E0B] focus:outline-none transition-colors"
                    >
                      <span 
                        className={`material-symbols-outlined text-2xl ${star <= newRating ? 'text-[#F59E0B] fill' : ''}`}
                        style={{ fontVariationSettings: star <= newRating ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        star
                      </span>
                    </button>
                  ))}
                  <span className="ml-2 font-label-bold text-primary self-center font-bold">
                    {newRating} / 5
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-label-bold text-label-bold text-on-surface mb-2 font-bold" htmlFor="reviewText">
                  Comentario
                </label>
                <textarea 
                  className="w-full border border-outline-variant rounded-lg p-3 font-body-md text-body-md focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-surface-container-low outline-none" 
                  id="reviewText" 
                  placeholder="Comparte tu experiencia de intercambio con este vendedor..." 
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end">
                <button 
                  className="bg-secondary text-on-secondary font-label-bold text-label-bold px-6 py-3 rounded-lg hover:bg-primary-container transition-colors shadow-sm active:scale-95" 
                  type="submit"
                >
                  Publicar comentario
                </button>
              </div>
            </form>
          </div>

          {/* Review List */}
          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 className="font-headline-md text-headline-md text-primary mb-6 font-bold flex items-center justify-between">
              <span>Comentarios recientes</span>
              <span className="text-body-sm text-on-surface-variant font-normal">
                {reviews.length} testimonios verificados
              </span>
            </h2>

            <div className="flex flex-col gap-6">
              {reviews.map((rev) => (
                <div key={rev.id} className="border-b border-outline-variant pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container border border-outline-variant">
                        <img 
                          className="w-full h-full object-cover" 
                          alt={rev.author} 
                          src={rev.avatar} 
                        />
                      </div>
                      <div>
                        <div className="font-label-bold text-label-bold text-primary font-bold">
                          {rev.author}
                        </div>
                        <div className="text-on-surface-variant font-body-sm text-[12px]">
                          {rev.date}
                        </div>
                      </div>
                    </div>

                    <div className="flex text-[#F59E0B]">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <span 
                          key={i} 
                          className="material-symbols-outlined text-sm" 
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="font-body-md text-body-md text-on-surface mt-2 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

