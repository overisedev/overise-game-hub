import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from 'lucide-react';

import jzAvatar from '@/assets/testimonials/jz.jpg';
import adriellyAvatar from '@/assets/testimonials/adrielly.jpg';
import maiconAvatar from '@/assets/testimonials/maicon.jpg';
import wlAvatar from '@/assets/testimonials/wl.jpeg';

import feedbackInstagram from '@/assets/proofs/feedback-instagram.jpg';
import feedbackWhatsapp1 from '@/assets/proofs/feedback-whatsapp-1.jpg';
import feedbackWhatsapp2 from '@/assets/proofs/feedback-whatsapp-2.jpg';
import feedbackYoutube from '@/assets/proofs/feedback-youtube.jpg';
import feedbackDm1 from '@/assets/proofs/feedback-dm-1.jpg';
import feedbackDm2 from '@/assets/proofs/feedback-dm-2.jpg';
import feedbackWhatsapp3 from '@/assets/proofs/feedback-whatsapp-3.jpg';

const testimonials = [
  { name: 'Jz', avatar: jzAvatar, text: 'Sinceramente achei que fosse mentira pelo preço baixo. Paguei para ver e me surpreendi. Em 10 minutos eu já estava baixando o jogo pela minha Steam com velocidade total. É surreal.' },
  { name: 'Maicon', avatar: maiconAvatar, text: 'O melhor para mim é baixar na velocidade máxima. Nada daqueles sites lentos cheios de vírus. Aqui vem direto do servidor oficial e jogo online com meus amigos sem travar.' },
  { name: 'Wl', avatar: wlAvatar, text: 'Só neste mês eu economizei uns 500 reais. Eu ia comprar dois lançamentos caros mas peguei o plano vitalício aqui e já estou jogando os dois. Recomendo demais.' },
  { name: 'Cliente', avatar: null, text: 'Obrigado irmão slc. Tem tudo mesmo. Brabo demais!' },
];

const videoTestimonials = [
  { id: 1, src: '/videos/testimonial-1.mp4' },
  { id: 2, src: '/videos/testimonial-2.mov' },
  { id: 3, src: '/videos/testimonial-3.mp4' },
];

const proofImages = [
  feedbackInstagram, feedbackWhatsapp1, feedbackWhatsapp2, feedbackYoutube,
  feedbackDm1, feedbackDm2, feedbackWhatsapp3,
];

function VideoCard({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause(); else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) { videoRef.current.muted = !isMuted; setIsMuted(!isMuted); }
  };

  return (
    <div className="ts-video-card" onClick={togglePlay}>
      <video ref={videoRef} src={src} muted loop autoPlay playsInline preload="auto" className="ts-video"
        onLoadedData={() => setHasLoaded(true)} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
      {!hasLoaded && <div className="ts-video-placeholder"><Play size={32} fill="white" style={{ opacity: 0.5 }} /></div>}
      <div className={`ts-video-overlay ${isPlaying ? 'playing' : ''}`}>
        {!isPlaying && <div className="ts-play-btn"><Play size={32} fill="white" /></div>}
      </div>
      <button className="ts-mute-btn" onClick={toggleMute}>
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}

export function TestimonialsSection() {
  const [textIdx, setTextIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const getVisible = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };
  const [visible, setVisible] = useState(getVisible());

  useState(() => {
    if (typeof window === 'undefined') return;
    const h = () => setVisible(getVisible());
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  });

  const maxIdx = Math.max(0, testimonials.length - visible);
  const shown = testimonials.slice(textIdx, textIdx + visible);

  return (
    <section id="testemunhos" className="sec-dark" style={{ padding: '80px 0' }}>
      <div className="container">
        {/* Header */}
        <motion.div className="text-center" style={{ marginBottom: 48 }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="tag g">Feedback real de clientes</div>
          <h2 className="h2 on-dark">Quem desbloqueou,<br /><em>aprovou.</em></h2>
          <p className="sub on-dark center">Depoimentos reais no WhatsApp, Instagram, YouTube e vídeo. Sem edição, sem filtro.</p>
        </motion.div>

        {/* 1) Video testimonials */}
        <div className="ts-videos-row">
          {videoTestimonials.map(v => <VideoCard key={v.id} src={v.src} />)}
        </div>

        {/* 2) Text testimonials carousel */}
        <div className="ts-text-carousel">
          <button className="ts-arrow" onClick={() => setTextIdx(i => Math.max(0, i - 1))} disabled={textIdx === 0}>
            <ChevronLeft size={24} />
          </button>
          <div className="ts-text-track">
            <AnimatePresence mode="wait">
              <motion.div key={textIdx} className="ts-text-grid"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                style={{ gridTemplateColumns: `repeat(${visible}, 1fr)` }}>
                {shown.map((t, i) => (
                  <div key={textIdx + i} className="ts-text-card">
                    <div className="ts-stars">{[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="var(--neon)" stroke="var(--neon)" />)}</div>
                    <p className="ts-text">"{t.text}"</p>
                    <div className="ts-author">
                      {t.avatar ? <img src={t.avatar} alt={t.name} className="ts-avatar" /> : <div className="ts-avatar-ph">{t.name[0]}</div>}
                      <span className="ts-name">{t.name}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <button className="ts-arrow" onClick={() => setTextIdx(i => Math.min(maxIdx, i + 1))} disabled={textIdx >= maxIdx}>
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="ts-dots">
          {Array.from({ length: maxIdx + 1 }).map((_, idx) => (
            <button key={idx} className={`ts-dot ${idx === textIdx ? 'active' : ''}`} onClick={() => setTextIdx(idx)} />
          ))}
        </div>

        {/* 3) Image proof gallery */}
        <div className="ts-proof-grid">
          {proofImages.map((src, i) => (
            <img key={i} className="ts-proof-img" src={src} alt={`Feedback ${i + 1}`} loading="lazy" onClick={() => setLightboxImg(src)} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="ts-lightbox" onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} alt="" />
        </div>
      )}

      <style>{`
        .ts-videos-row {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 48px;
        }
        @media (max-width: 640px) {
          .ts-videos-row { grid-template-columns: 1fr; max-width: 260px; margin: 0 auto 40px; }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .ts-videos-row { grid-template-columns: repeat(3, 1fr); }
        }

        .ts-video-card {
          position: relative; border-radius: var(--r2); overflow: hidden; background: #111;
          aspect-ratio: 9/16; cursor: pointer; border: 1px solid rgba(255,255,255,.10);
        }
        .ts-video { width: 100%; height: 100%; object-fit: cover; }
        .ts-video-placeholder { position: absolute; inset: 0; background: linear-gradient(135deg, #1a1a1a, #0a0a0a); display: flex; align-items: center; justify-content: center; }
        .ts-video-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.4); display: flex; align-items: center; justify-content: center; transition: all .3s; }
        .ts-video-overlay.playing { background: transparent; opacity: 0; }
        .ts-video-card:hover .ts-video-overlay.playing { opacity: 1; background: rgba(0,0,0,.2); }
        .ts-play-btn { width: 64px; height: 64px; border-radius: 50%; background: rgba(0,255,65,.9); display: flex; align-items: center; justify-content: center; padding-left: 4px; }
        .ts-mute-btn { position: absolute; bottom: 12px; right: 12px; width: 36px; height: 36px; border-radius: 50%; background: rgba(0,0,0,.6); border: 1px solid rgba(255,255,255,.2); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; }
        .ts-mute-btn:hover { background: rgba(0,255,65,.3); border-color: rgba(0,255,65,.5); }

        .ts-text-carousel { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; }
        .ts-arrow { flex-shrink: 0; width: 44px; height: 44px; border-radius: 12px; border: 1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.05); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; }
        .ts-arrow:hover:not(:disabled) { background: rgba(0,255,65,.15); border-color: rgba(0,255,65,.4); color: var(--neon); }
        .ts-arrow:disabled { opacity: .3; cursor: not-allowed; }
        .ts-text-track { flex: 1; overflow: hidden; }
        .ts-text-grid { display: grid; gap: 16px; }
        .ts-text-card { padding: 24px; border-radius: var(--r2); border: 1px solid rgba(255,255,255,.10); background: rgba(255,255,255,.04); display: flex; flex-direction: column; gap: 16px; }
        .ts-stars { display: flex; gap: 4px; }
        .ts-text { color: rgba(255,255,255,.85); font-size: 14px; line-height: 1.75; margin: 0; flex: 1; }
        .ts-author { display: flex; align-items: center; gap: 12px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,.08); }
        .ts-avatar { width: 40px; height: 40px; border-radius: 10px; object-fit: cover; border: 2px solid rgba(0,255,65,.3); }
        .ts-avatar-ph { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, rgba(0,255,65,.3), rgba(0,255,65,.1)); border: 2px solid rgba(0,255,65,.3); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; color: var(--neon); }
        .ts-name { font-weight: 800; font-size: 14px; color: #fff; }

        .ts-dots { display: flex; justify-content: center; gap: 8px; margin: 16px 0 48px; }
        .ts-dot { width: 8px; height: 8px; border-radius: 50%; border: none; background: rgba(255,255,255,.2); cursor: pointer; padding: 0; transition: all .2s; }
        .ts-dot:hover { background: rgba(255,255,255,.4); }
        .ts-dot.active { background: var(--neon); width: 24px; border-radius: 4px; }

        .ts-proof-grid { column-count: 3; column-gap: 10px; }
        .ts-proof-img { width: 100%; border-radius: 10px; margin-bottom: 10px; cursor: pointer; transition: transform .2s, opacity .2s; break-inside: avoid; }
        .ts-proof-img:hover { transform: scale(1.02); opacity: .85; }
        @media (max-width: 768px) { .ts-proof-grid { column-count: 2; } }

        .ts-lightbox { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,.92); display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 20px; }
        .ts-lightbox img { max-width: 90%; max-height: 90vh; border-radius: 12px; }
      `}</style>
    </section>
  );
}
