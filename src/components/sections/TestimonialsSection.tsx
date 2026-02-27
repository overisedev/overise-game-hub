import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

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
  {
    name: 'Lynguinho',
    avatar: null,
    text: 'Simplesmente uma obra prima, comprei e deu tudo certinho, e o suporte atende muito rápido além de ser bom, super recomendo.',
  },
  {
    name: 'Cliente',
    avatar: null,
    text: 'Obrigado irmão slc. Tem tudo mesmo. Brabo demais!',
  },
];

const videoTestimonials = [
  { id: 1, src: '/videos/testimonial-1.mp4', poster: '' },
  { id: 2, src: '/videos/testimonial-2.mov', poster: '' },
  { id: 3, src: '/videos/testimonial-3.mp4', poster: '' },
];

function VideoCard({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="video-testimonial-card" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        className="video-testimonial-video"
        onLoadedData={() => setHasLoaded(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {!hasLoaded && (
        <div className="video-loading-placeholder">
          <Play size={32} fill="white" style={{ opacity: 0.5 }} />
        </div>
      )}
      <div className={`video-overlay ${isPlaying ? 'playing' : ''}`}>
        {!isPlaying && (
          <div className="play-button">
            <Play size={32} fill="white" />
          </div>
        )}
      </div>
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
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
  
  // Check if mobile on mount and resize
  useState(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 640);
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
        setVisibleCount(getVisibleCount());
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  });
  
  const maxIndex = Math.max(0, testimonials.length - visibleCount);
  const maxVideoIndex = videoTestimonials.length - 1;
  
  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };
  
  const handleVideoPrev = () => {
    setVideoIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleVideoNext = () => {
    setVideoIndex(prev => Math.min(maxVideoIndex, prev + 1));
  };
  
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section id="testemunhos" className="section section-light" style={{ padding: '80px 0' }}>
      <div className="container-main">
      <motion.div 
        className="testimonials-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="testimonials-title">QUEM JÁ DESBLOQUEOU, APROVOU.</h2>
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
                    {t.avatar ? (
                      <img 
                        src={t.avatar} 
                        alt={`Foto de ${t.name}`}
                        className="testimonial-avatar-img"
                      />
                    ) : (
                      <div className="testimonial-avatar-placeholder">
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                    )}
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

      {/* Video Testimonials Section */}
      <motion.div 
        className="video-testimonials-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="video-testimonials-title">DEPOIMENTOS EM VÍDEO</h3>
        
        {/* Desktop/Tablet: Grid */}
        <div className="video-testimonials-grid video-grid-desktop">
          {videoTestimonials.map((video) => (
            <VideoCard key={video.id} src={video.src} />
          ))}
        </div>
        
        {/* Mobile: Carousel */}
        <div className="video-carousel-mobile">
          <div className="video-carousel-container">
            <button 
              className="carousel-arrow video-carousel-arrow-left"
              onClick={handleVideoPrev}
              disabled={videoIndex === 0}
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="video-carousel-track">
              <AnimatePresence mode="wait">
                <motion.div
                  key={videoIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <VideoCard src={videoTestimonials[videoIndex].src} />
                </motion.div>
              </AnimatePresence>
            </div>
            
            <button 
              className="carousel-arrow video-carousel-arrow-right"
              onClick={handleVideoNext}
              disabled={videoIndex >= maxVideoIndex}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Video dots indicator */}
          <div className="carousel-dots video-carousel-dots">
            {videoTestimonials.map((_, idx) => (
              <button
                key={idx}
                className={`carousel-dot ${idx === videoIndex ? 'active' : ''}`}
                onClick={() => setVideoIndex(idx)}
              />
            ))}
          </div>
        </div>
      </motion.div>
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

        .testimonial-avatar-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(0,255,65,.3), rgba(0,255,65,.1));
          border: 2px solid rgba(0,255,65,.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 16px;
          color: var(--neon);
        }

        .video-testimonials-section {
          margin-top: 48px;
          text-align: center;
        }

        .video-testimonials-title {
          font-size: clamp(18px, 3vw, 24px);
          font-weight: 900;
          color: #fff;
          margin-bottom: 24px;
          letter-spacing: -0.5px;
        }

        .video-testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        
        .video-grid-desktop {
          display: grid;
        }
        
        .video-carousel-mobile {
          display: none;
        }

        @media (max-width: 1024px) {
          .video-testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .video-grid-desktop {
            display: none;
          }
          
          .video-carousel-mobile {
            display: block;
          }
          
          .video-carousel-container {
            display: flex;
            align-items: center;
            gap: 12px;
            justify-content: center;
          }
          
          .video-carousel-track {
            width: 200px;
            flex-shrink: 0;
          }
          
          .video-carousel-arrow-left,
          .video-carousel-arrow-right {
            width: 36px;
            height: 36px;
            flex-shrink: 0;
          }
          
          .video-carousel-dots {
            margin-top: 16px;
          }
        }

        .video-testimonial-card {
          position: relative;
          border-radius: var(--r2);
          overflow: hidden;
          background: #111;
          aspect-ratio: 9/16;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,.10);
        }

        .video-testimonial-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #111;
        }
        
        .video-loading-placeholder {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .3s ease;
        }

        .video-overlay.playing {
          background: transparent;
          opacity: 0;
        }

        .video-testimonial-card:hover .video-overlay.playing {
          opacity: 1;
          background: rgba(0,0,0,.2);
        }

        .play-button {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(0,255,65,.9);
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 4px;
          transition: transform .2s ease;
        }

        .video-testimonial-card:hover .play-button {
          transform: scale(1.1);
        }

        .mute-button {
          position: absolute;
          bottom: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0,0,0,.6);
          border: 1px solid rgba(255,255,255,.2);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all .2s ease;
          z-index: 10;
        }

        .mute-button:hover {
          background: rgba(0,255,65,.3);
          border-color: rgba(0,255,65,.5);
        }
      `}</style>
    </section>
  );
}
