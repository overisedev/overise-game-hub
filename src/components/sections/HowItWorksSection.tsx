export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="section container-main">
      <div className="demo-grid">
        {/* Left - Info */}
        <div className="card pad">
          <h2 className="card-title">Como funciona</h2>
          <p className="card-text">
            Um fluxo simples: você entra, explora por categorias e abre detalhes em segundos.
            Tudo com uma interface premium, rápida e organizada.
          </p>

          <div className="how-grid">
            <div className="how">
              <span className="k">1) Acesse</span>
              <span className="s">Entre no painel e navegue pelo catálogo.</span>
            </div>
            <div className="how">
              <span className="k">2) Explore</span>
              <span className="s">Filtre por categorias e encontre títulos rapidamente.</span>
            </div>
            <div className="how">
              <span className="k">3) Desbloqueie</span>
              <span className="s">Abra detalhes e avance para desbloquear.</span>
            </div>
          </div>
        </div>

        {/* Right - Video placeholder */}
        <div className="card video-wrap">
          <div className="video-placeholder">
            <span>▶</span>
            <p>Demonstração em vídeo</p>
          </div>
          <div className="video-overlay" />
        </div>
      </div>

      <style>{`
        .demo-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          align-items: stretch;
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
        .card-title {
          font-size: 22px;
          font-weight: 950;
          margin: 0 0 10px;
          color: #fff;
          letter-spacing: -.8px;
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
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 980px) {
          .how-grid { grid-template-columns: 1fr; }
        }
        .how {
          background: rgba(0,0,0,.25);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 16px;
          padding: 16px;
          min-height: 92px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          transition: .25s ease;
        }
        .how:hover {
          transform: translateY(-3px);
          border-color: rgba(0,255,65,.22);
        }
        .how .k {
          font-weight: 950;
          color: #fff;
          letter-spacing: -.4px;
        }
        .how .s {
          color: var(--muted2);
          font-size: 12px;
          margin-top: 6px;
          line-height: 1.5;
        }
        .video-wrap {
          height: 100%;
          min-height: 340px;
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
        }
        .video-placeholder span {
          font-size: 48px;
          margin-bottom: 10px;
        }
        .video-placeholder p {
          font-size: 14px;
          font-weight: 600;
        }
        .video-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(900px 360px at 30% 20%, rgba(0,255,65,.10), transparent 55%),
            linear-gradient(to top, rgba(0,0,0,.75), transparent 55%);
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
