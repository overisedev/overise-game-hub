import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

// Import avatar images
import jzAvatar from '@/assets/testimonials/jz.jpg';
import adriellyAvatar from '@/assets/testimonials/adrielly.jpg';
import maiconAvatar from '@/assets/testimonials/maicon.jpg';
import wlAvatar from '@/assets/testimonials/wl.jpeg';

const testimonials = [
  {
    name: 'Jz',
    avatar: jzAvatar,
    text: 'Sinceramente achei que fosse mentira pelo preço baixo. Paguei para ver e me surpreendi. Em 10 minutos eu já estava baixando o jogo pela minha Steam com velocidade total. É surreal.',
  },
  {
    name: 'Adrielly',
    avatar: adriellyAvatar,
    text: 'Eu não entendo nada de computador e tinha medo de ser difícil de instalar. Mas o sistema faz tudo sozinho. É só clicar em Ativar e o jogo aparece na biblioteca pronto para jogar.',
  },
  {
    name: 'Maicon',
    avatar: maiconAvatar,
    text: 'O melhor para mim é baixar na velocidade máxima. Nada daqueles sites lentos cheios de vírus. Aqui vem direto do servidor oficial e jogo online com meus amigos sem travar.',
  },
  {
    name: 'Wl',
    avatar: wlAvatar,
    text: 'Só neste mês eu economizei uns 500 reais. Eu ia comprar dois lançamentos caros mas peguei o plano vitalício aqui e já estou jogando os dois. Recomendo demais.',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Desktop shows 3, tablet 2, mobile 1
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };
  
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  
  const maxIndex = Math.max(0, testimonials.length - visibleCount);
  
  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };
  
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section className="section container-main">
      <motion.div 
        className="testimonials-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="testimonials-title">QUEM BAIXOU, APROVOU</h2>
        <p className="testimonials-subtitle">
          Veja o que a nossa comunidade diz sobre a economia e a segurança que a Overise proporciona.
        </p>
      </motion.div>

      <div className="testimonials-carousel">
        <button 
          className="carousel-arrow carousel-arrow-left"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>

        <div className="testimonials-track">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className="testimonials-grid"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {visibleTestimonials.map((t, i) => (
                <div key={currentIndex + i} className="testimonial-card">
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={16} fill="var(--neon)" stroke="var(--neon)" />
                    ))}
                  </div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-author">
                    <img 
                      src={t.avatar} 
                      alt={`Foto de ${t.name}`}
                      className="testimonial-avatar-img"
                    />
                    <span className="testimonial-name">{t.name}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button 
          className="carousel-arrow carousel-arrow-right"
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="carousel-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>

      <style>{`
        .testimonials-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .testimonials-title {
          font-size: clamp(24px, 4vw, 32px);
          font-weight: 950;
          color: #fff;
          margin: 0 0 12px;
          letter-spacing: -1px;
        }
        
        .testimonials-subtitle {
          color: rgba(255,255,255,.75);
          font-size: 15px;
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto;
        }

        .testimonials-carousel {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .carousel-arrow {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.15);
          background: rgba(255,255,255,.05);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .2s ease;
        }
        .carousel-arrow:hover:not(:disabled) {
          background: rgba(0,255,65,.15);
          border-color: rgba(0,255,65,.4);
          color: var(--neon);
        }
        .carousel-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        @media (max-width: 640px) {
          .carousel-arrow {
            width: 40px;
            height: 40px;
            border-radius: 12px;
          }
        }

        .testimonials-track {
          flex: 1;
          overflow: hidden;
        }
        
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        
        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 640px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .testimonial-card {
          padding: 24px;
          border-radius: var(--r2);
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .testimonial-stars {
          display: flex;
          gap: 4px;
        }
        
        .testimonial-text {
          color: rgba(255,255,255,.85);
          font-size: 14px;
          line-height: 1.75;
          margin: 0;
          flex: 1;
        }
        
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,.08);
        }
        
        .testimonial-avatar-img {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          object-fit: cover;
          border: 2px solid rgba(0,255,65,.3);
        }
        
        .testimonial-name {
          font-weight: 800;
          font-size: 14px;
          color: #fff;
          letter-spacing: .3px;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }
        
        .carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,.2);
          cursor: pointer;
          transition: all .2s ease;
          padding: 0;
        }
        .carousel-dot:hover {
          background: rgba(255,255,255,.4);
        }
        .carousel-dot.active {
          background: var(--neon);
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}
