import { useRef, useEffect, useState } from 'react';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Auto-play mutado quando estiver visível na tela
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      },
      { threshold: 0.3 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePlayClick = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.muted) {
      // Ao clicar pela primeira vez, desmuta, volta pro início e tira o overlay
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    } else if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-layout">
        
        {/* Nova Headline Centralizada */}
        <h1 className="hero-h1 reveal rd1">
          SUA BIBLIOTECA STEAM.<br />
          <em>+43.725 JOGOS LIBERADOS.</em>
        </h1>

        {/* Player da VSL */}
        <div className="vsl-wrapper reveal rd1">
          <div className="vsl-container" onClick={handlePlayClick}>
            {/* ATENÇÃO: Substitua "/sua-vsl.mp4" pelo link direto do seu vídeo MP4 */}
            <video
              ref={videoRef}
              className="vsl-video"
              src="https://i.imgur.com/tpI4G8k.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              poster=""
            />
            {/* Overlay vermelho de "Ativar Áudio" como na imagem */}
            {isMuted && (
              <div className="vsl-audio-overlay">
                <button className="vsl-audio-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                  TOQUE PARA ATIVAR O ÁUDIO
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Textos, Botões e Provas Sociais Centralizados */}
        <div className="hero-content reveal rd1">
          <p className="hero-sub">
            Acesse o catálogo completo com a Almaz Store. Escolha o jogo, baixe direto pela Steam e jogue. <strong>Instalação limpa, rápida e segura.</strong> Pague uma vez, use pra sempre.
          </p>

          <div className="hero-btns">
            <a href="#pricing" className="btn btn-accent btn-xl">GARANTIR MEU ACESSO</a>
            <a href="#how" className="btn btn-ghost btn-xl">VER COMO FUNCIONA</a>
          </div>

          <div className="hero-trust">
            <div className="trust-pill"><span className="chk">✔</span> 7 dias de garantia</div>
            <div className="trust-pill"><span className="chk">✔</span> Jogando em 5 min</div>
            <div className="trust-pill"><span className="chk">✔</span> +5.000 clientes</div>
          </div>
        </div>

      </div>

      <style>{`
        .hero-section {
          background: var(--bg);
          padding: 64px 0 80px;
          position: relative;
          overflow: hidden;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 500px;
          /* Brilho de fundo atualizado para o tom de vermelho/laranja */
          background: radial-gradient(ellipse, rgba(254, 58, 47, 0.08) 0%, transparent 65%);
          pointer-events: none;
        }

        .hero-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 32px;
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-h1 {
          font-family: var(--fh);
          font-size: clamp(32px, 5.5vw, 64px);
          font-weight: 900;
          line-height: 1.05;
          text-transform: uppercase;
          color: #fff;
          margin: 0;
          letter-spacing: -0.02em;
        }
        
        .hero-h1 em {
          color: #fe3a2f; /* Cor vermelha vibrante igual da imagem */
          font-style: normal;
        }

        /* ── VSL Video ── */
        .vsl-wrapper {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }

        .vsl-container {
          position: relative;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(254, 58, 47, 0.15);
          background: #0a0a0a;
          box-shadow: 0 0 60px rgba(254, 58, 47, 0.08), 0 24px 56px rgba(0,0,0,.6);
          cursor: pointer;
          transition: transform .3s;
          aspect-ratio: 16/9;
        }
        
        .vsl-container:hover {
          transform: translateY(-4px);
        }

        .vsl-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .vsl-audio-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(3px);
          transition: opacity 0.3s;
        }

        .vsl-audio-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fe3a2f;
          color: #fff;
          border: none;
          padding: 16px 32px;
          border-radius: 50px;
          font-family: var(--fh, sans-serif);
          font-weight: 800;
          font-size: 15px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(254, 58, 47, 0.4);
          animation: pulseRed 2s infinite;
          transition: transform 0.2s;
        }
        
        .vsl-audio-btn:hover {
          transform: scale(1.05);
        }

        .vsl-audio-btn svg {
          width: 22px;
          height: 22px;
        }

        @keyframes pulseRed {
          0% { box-shadow: 0 0 0 0 rgba(254, 58, 47, 0.6); }
          70% { box-shadow: 0 0 0 15px rgba(254, 58, 47, 0); }
          100% { box-shadow: 0 0 0 0 rgba(254, 58, 47, 0); }
        }

        /* ── Textos e Botões Inferiores ── */
        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .hero-sub {
          font-size: 16px;
          font-weight: 400;
          color: rgba(255,255,255,0.7);
          max-width: 620px;
          line-height: 1.6;
          margin: 0;
        }
        
        .hero-sub strong {
          color: #fff;
          font-weight: 600;
        }

        .hero-btns {
          display: flex;
          gap: 16px;
          justify-content: center;
          width: 100%;
        }
        
        .hero-btns .btn {
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.5px;
          padding: 18px 36px;
          font-size: 14px;
        }
        
        .btn-accent {
          background: #fe3a2f;
          color: #fff;
          border: none;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.2s;
        }
        
        .btn-accent:hover {
          background: #e03228;
        }
        
        .btn-ghost {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.2s;
        }
        
        .btn-ghost:hover {
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.05);
        }

        .hero-trust {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 8px;
        }
        
        .trust-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
        }
        
        .trust-pill .chk {
          color: #fe3a2f;
          font-weight: 900;
        }

        @media (max-width: 768px) {
          .hero-section { padding: 40px 16px 64px; }
          .hero-h1 { font-size: 28px; line-height: 1.1; }
          .hero-sub { font-size: 14px; }
          .hero-btns { flex-direction: column; }
          .hero-btns .btn { width: 100%; text-align: center; }
          .vsl-audio-btn { padding: 14px 24px; font-size: 13px; }
          .hero-trust { gap: 12px; }
          .trust-pill { font-size: 11px; }
        }
      `}</style>
    </section>
  );
}
