import { useState } from 'react';

export function HowItWorksSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section id="como-funciona" className="section container-main">
      {/* Título centralizado */}
      <div className="vsl-header">
        <h2>É SÓ ESCOLHER E JOGAR</h2>
        <p>Veja como é simples liberar sua biblioteca Steam.</p>
      </div>

      <div className="demo-grid">
        {/* Left - Video (MAIOR e À ESQUERDA) */}
        <div className="card video-wrap">
          {isPlaying ? (
            <iframe
              src="https://www.youtube.com/embed/diPCeBT0368?autoplay=1&rel=0"
              title="Como funciona o desbloqueio da Steam"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-iframe"
            />
          ) : (
            <div className="custom-thumbnail" onClick={handlePlayVideo}>
              {/* Background com gradiente */}
              <div className="thumb-bg" />
              
              {/* Conteúdo */}
              <div className="thumb-content">
                <div className="thumb-badge">
                  <span className="steam-icon">⚡</span>
                  STEAM
                </div>
                
                <h3 className="thumb-title">
                  VEJA COMO FUNCIONA<br />
                  <span className="thumb-highlight">O DESBLOQUEIO</span>
                </h3>
                
                <p className="thumb-subtitle">Acesso a +1000 jogos em minutos</p>
              </div>
              
              {/* Play Button */}
              <div className="play-btn-wrapper">
                <div className="play-btn-ring" />
                <div className="play-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              
              {/* Corner decorations */}
              <div className="thumb-corner top-left" />
              <div className="thumb-corner top-right" />
              <div className="thumb-corner bottom-left" />
              <div className="thumb-corner bottom-right" />
            </div>
          )}
        </div>

        {/* Right - Info */}
        <div className="card pad info-card">
          <h3 className="card-title">Passo a passo</h3>
          <p className="card-text">
            Um fluxo simples: você escolhe, baixa e joga. Tudo direto da Steam ou Epic Games.
          </p>

          <div className="how-grid">
            <div className="how">
              <span className="k">1) Entre no App</span>
              <span className="s">Use nosso sistema simples para escolher qual jogo você quer instalar no seu computador.</span>
            </div>
            <div className="how">
              <span className="k">2) Download Seguro</span>
              <span className="s">O jogo começa a baixar automaticamente pela plataforma oficial da Steam ou Epic Games.</span>
            </div>
            <div className="how">
              <span className="k">3) Diversão Garantida</span>
              <span className="s">Pronto. O jogo é seu. Salve seu progresso, jogue a história completa ou entre em partidas online.</span>
            </div>
          </div>

          <a href="#planos" className="cta-btn">Quero liberar minha Steam</a>
        </div>
      </div>

      <style>{`
        .vsl-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .vsl-header h2 {
          font-size: clamp(24px, 4vw, 32px);
          font-weight: 950;
          color: #fff;
          margin: 0 0 10px;
          text-transform: uppercase;
          letter-spacing: -1px;
        }
        .vsl-header p {
          color: var(--muted);
          font-size: 15px;
          margin: 0;
          max-width: 50ch;
          margin-left: auto;
          margin-right: auto;
        }

        .demo-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 980px) {
          .demo-grid { grid-template-columns: 1fr; }
        }
        .card {
          border-radius: var(--r2);
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          box-shadow: var(--shadowSoft);
          overflow: hidden;
          position: relative;
        }
        .card.pad { padding: 24px; }
        .info-card {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .card-title {
          font-size: 20px;
          font-weight: 950;
          margin: 0 0 10px;
          color: #fff;
          letter-spacing: -.6px;
          text-transform: uppercase;
        }
        .card-text {
          color: var(--muted);
          line-height: 1.7;
          font-size: 14px;
          margin: 0;
          max-width: 68ch;
        }
        .how-grid {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .how {
          background: rgba(0,0,0,.25);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 14px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          transition: .25s ease;
        }
        .how:hover {
          transform: translateY(-2px);
          border-color: rgba(0,255,65,.22);
        }
        .how .k {
          font-weight: 950;
          color: #fff;
          letter-spacing: -.4px;
          font-size: 14px;
        }
        .how .s {
          color: var(--muted2);
          font-size: 12px;
          margin-top: 4px;
          line-height: 1.5;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          padding: 14px 20px;
          border-radius: 14px;
          background: linear-gradient(180deg, rgba(0,255,65,.95), rgba(0,200,55,.85));
          color: #000;
          font-weight: 950;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-decoration: none;
          transition: .25s ease;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,255,65,.25);
        }
        .video-wrap {
          height: 400px;
          background: #000;
        }
        .video-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
          z-index: 3;
        }
        
        /* Custom Thumbnail Styles */
        .custom-thumbnail {
          position: absolute;
          inset: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .thumb-bg {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse 120% 80% at 20% 30%, rgba(0,255,65,.15) 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 80% 70%, rgba(0,180,80,.10) 0%, transparent 45%),
            linear-gradient(135deg, #0a0f0a 0%, #050805 50%, #0a0a0a 100%);
          z-index: 0;
        }
        
        .thumb-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,255,65,.02) 2px,
              rgba(0,255,65,.02) 4px
            );
          pointer-events: none;
        }
        
        .thumb-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,.4) 100%);
          pointer-events: none;
        }
        
        .thumb-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 20px;
        }
        
        .thumb-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(0,255,65,.12);
          border: 1px solid rgba(0,255,65,.30);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 900;
          color: var(--neon);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 20px;
        }
        
        .steam-icon {
          font-size: 14px;
        }
        
        .thumb-title {
          font-size: clamp(22px, 4vw, 32px);
          font-weight: 950;
          color: #fff;
          margin: 0 0 12px;
          text-transform: uppercase;
          letter-spacing: -0.5px;
          line-height: 1.2;
          text-shadow: 0 4px 20px rgba(0,0,0,.8);
        }
        
        .thumb-highlight {
          color: var(--neon);
          text-shadow: 
            0 0 20px rgba(0,255,65,.5),
            0 4px 20px rgba(0,0,0,.8);
        }
        
        .thumb-subtitle {
          font-size: 13px;
          color: var(--muted);
          margin: 0;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        
        .play-btn-wrapper {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
        }
        
        .play-btn-ring {
          position: absolute;
          inset: -8px;
          border: 2px solid rgba(0,255,65,.25);
          border-radius: 50%;
          animation: pulse-ring 2s ease-out infinite;
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        .play-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--neon), rgba(0,200,50,1));
          display: grid;
          place-items: center;
          box-shadow: 
            0 0 30px rgba(0,255,65,.4),
            0 8px 20px rgba(0,0,0,.5);
          transition: .3s ease;
        }
        
        .custom-thumbnail:hover .play-btn {
          transform: scale(1.1);
          box-shadow: 
            0 0 50px rgba(0,255,65,.6),
            0 12px 30px rgba(0,0,0,.5);
        }
        
        .play-icon {
          width: 28px;
          height: 28px;
          color: #000;
          margin-left: 3px;
        }
        
        .thumb-corner {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 2px solid rgba(0,255,65,.20);
          z-index: 1;
        }
        
        .thumb-corner.top-left {
          top: 16px;
          left: 16px;
          border-right: none;
          border-bottom: none;
        }
        
        .thumb-corner.top-right {
          top: 16px;
          right: 16px;
          border-left: none;
          border-bottom: none;
        }
        
        .thumb-corner.bottom-left {
          bottom: 16px;
          left: 16px;
          border-right: none;
          border-top: none;
        }
        
        .thumb-corner.bottom-right {
          bottom: 16px;
          right: 16px;
          border-left: none;
          border-top: none;
        }
      `}</style>
    </section>
  );
}