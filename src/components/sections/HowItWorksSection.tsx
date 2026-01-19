import { useState } from 'react';

export function HowItWorksSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section id="como-funciona" className="section container-main">
      <div className="vsl-header">
        <h2>É SÓ ESCOLHER E JOGAR</h2>
        <p>Veja como é simples liberar sua biblioteca Steam.</p>
      </div>

      <div className="demo-grid">
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
              <div className="thumb-bg" />
              
              <div className="thumb-content">
                <div className="thumb-logo">
                  <span className="logo-white">OVER</span>
                  <span className="logo-green">ISE</span>
                </div>
                
                <h3 className="thumb-title">COMO FUNCIONA O DESBLOQUEIO</h3>
                <p className="thumb-subtitle">Assista e entenda em 2 minutos</p>
              </div>
              
              <div className="play-btn">
                <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

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
          background: #0a0a0a;
        }
        .video-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        
        .custom-thumbnail {
          position: absolute;
          inset: 0;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }
        
        .thumb-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, #0d0d0d 0%, #050505 100%);
        }
        
        .thumb-content {
          position: relative;
          z-index: 2;
          text-align: center;
        }
        
        .thumb-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-bottom: 16px;
        }
        
        .logo-white {
          font-size: 28px;
          font-weight: 950;
          letter-spacing: 1px;
          color: #fff;
        }
        
        .logo-green {
          font-size: 28px;
          font-weight: 950;
          letter-spacing: 1px;
          color: var(--neon);
        }
        
        .thumb-title {
          font-size: clamp(16px, 3vw, 20px);
          font-weight: 800;
          color: #fff;
          margin: 0 0 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .thumb-subtitle {
          font-size: 13px;
          color: var(--muted);
          margin: 0;
        }
        
        .play-btn {
          position: relative;
          z-index: 2;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--neon);
          display: grid;
          place-items: center;
          transition: .3s ease;
        }
        
        .custom-thumbnail:hover .play-btn {
          transform: scale(1.08);
          box-shadow: 0 0 40px rgba(0,255,65,.4);
        }
        
        .play-icon {
          width: 26px;
          height: 26px;
          color: #000;
          margin-left: 3px;
        }
      `}</style>
    </section>
  );
}