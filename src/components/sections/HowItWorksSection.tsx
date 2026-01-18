export function HowItWorksSection() {
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
          <div className="video-placeholder">
            <div className="play-btn">▶</div>
            <p>Clique para assistir</p>
          </div>
          <div className="video-overlay" />
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
        .video-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          z-index: 2;
          cursor: pointer;
          transition: .25s ease;
        }
        .video-placeholder:hover {
          color: #fff;
        }
        .video-placeholder:hover .play-btn {
          transform: scale(1.1);
          background: rgba(0,255,65,.25);
          border-color: rgba(0,255,65,.5);
          color: var(--neon);
        }
        .play-btn {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255,255,255,.08);
          border: 2px solid rgba(255,255,255,.15);
          display: grid;
          place-items: center;
          font-size: 28px;
          margin-bottom: 16px;
          transition: .3s ease;
        }
        .video-placeholder p {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .video-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(900px 360px at 30% 20%, rgba(0,255,65,.08), transparent 55%),
            linear-gradient(to top, rgba(0,0,0,.65), transparent 55%);
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}