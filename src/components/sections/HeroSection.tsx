import type { Game } from '@/types/game';

interface HeroSectionProps {
  featuredGame: Game | undefined;
  onPrev: () => void;
  onNext: () => void;
  onOpenDetails: (game: Game) => void;
}

export function HeroSection({ featuredGame, onPrev, onNext, onOpenDetails }: HeroSectionProps) {
  return (
    <section className="section-top section" style={{ paddingTop: '120px' }}>
      <div className="container-main">
        <div className="hero-grid">
          {/* Left Content */}
          <div className="animate-float-in">
            {/* Pill */}
            <div className="pill">
              <span className="dot" />
              Sistema ativo • experiência premium
            </div>

            <h1 className="hero-title">
              Sua biblioteca, <span className="accent">sem complicação.</span>
            </h1>

            <p className="hero-sub">
              Uma experiência rápida e elegante para pesquisar, organizar e acessar sua coleção com uma interface moderna.
              Tudo otimizado para ser leve, direto e premium.
            </p>

            <div className="hero-actions">
              <a href="#planos" className="btn btn-primary-lg">Quero começar</a>
              <a href="#catalogo" className="btn btn-outline">Ver catálogo</a>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <b>Carregamento rápido</b>
                <span>Catálogo local</span>
              </div>
              <div className="stat">
                <b>Organização por categorias</b>
                <span>Experiência premium</span>
              </div>
              <div className="stat">
                <b>Busca inteligente</b>
                <span>Atalhos (GTA, RDR2…)</span>
              </div>
            </div>
          </div>

          {/* Right - Featured Card */}
          {featuredGame && (
            <div className="hero-card animate-fade-left">
              <div className="hero-card-glow" />
              <div className="hero-card-media">
                <img
                  src={`https://steamcdn-a.akamaihd.net/steam/apps/${featuredGame.steam_appid}/library_hero.jpg`}
                  alt={featuredGame.name}
                  onError={(e) => { e.currentTarget.src = featuredGame.cover; }}
                />
                <div className="hero-card-overlay" />
              </div>

              {/* Nav Buttons */}
              <button onClick={onPrev} className="feat-nav feat-prev">‹</button>
              <button onClick={onNext} className="feat-nav feat-next">›</button>

              {/* Info */}
              <div className="hero-card-info">
                <div className="hero-card-text">
                  <div className="badge-row">
                    <span className="chip green">Em destaque</span>
                    <span className="chip">AAA • pagos</span>
                  </div>
                  <h2 className="hero-card-name">{featuredGame.name}</h2>
                  <p className="hero-card-desc">Somente títulos AAA/pagos selecionados da sua lista.</p>
                </div>
                <div className="hero-card-btns">
                  <button onClick={() => onOpenDetails(featuredGame)} className="btn btn-small">Ver detalhes</button>
                  <a href="#catalogo" className="btn btn-small btn-primary-sm">Abrir catálogo</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,.05);
          border: 1px solid var(--border);
          font-weight: 800;
          letter-spacing: .6px;
          text-transform: uppercase;
          font-size: 12px;
          backdrop-filter: blur(10px);
          white-space: nowrap;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--neon);
          box-shadow: 0 0 14px rgba(0,255,65,.55);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          gap: 34px;
          align-items: center;
        }
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr; gap: 18px; }
        }
        .hero-title {
          margin: 18px 0 14px;
          font-weight: 950;
          font-size: clamp(36px, 5.2vw, 60px);
          line-height: 1.02;
          letter-spacing: -2px;
          color: #fff;
        }
        .hero-title .accent { color: var(--neon); }
        .hero-sub {
          max-width: 52ch;
          font-size: 16px;
          line-height: 1.7;
          color: var(--muted);
          margin-bottom: 26px;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 10px;
        }
        @media (max-width: 980px) {
          .hero-stats { grid-template-columns: 1fr; }
        }
        .stat {
          background: rgba(255,255,255,.04);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 14px;
          box-shadow: var(--shadowSoft);
          transition: .25s ease;
        }
        .stat:hover {
          transform: translateY(-3px);
          border-color: rgba(0,255,65,.25);
        }
        .stat b { display: block; font-size: 16px; color: #fff; }
        .stat span { font-size: 12px; color: var(--muted2); }

        .hero-card {
          border-radius: var(--r2);
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          box-shadow: var(--shadow);
          overflow: hidden;
          position: relative;
          isolation: isolate;
          min-height: 320px;
        }
        .hero-card-glow {
          position: absolute;
          inset: -2px;
          background: radial-gradient(700px 240px at 20% 10%, rgba(0,255,65,.16), transparent 60%);
          pointer-events: none;
          z-index: 0;
        }
        .hero-card-media {
          position: relative;
          height: 320px;
          background: #000;
          overflow: hidden;
        }
        .hero-card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(1.10) contrast(1.10);
          transform: scale(1.03);
        }
        .hero-card-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(800px 320px at 78% 45%, rgba(0,0,0,.12), rgba(0,0,0,.78)),
            linear-gradient(to top, rgba(0,0,0,.92), rgba(0,0,0,.16));
        }
        .hero-card-info {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 18px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 14px;
        }
        .hero-card-text { max-width: 62%; min-width: 0; }
        @media (max-width: 980px) {
          .hero-card-text { max-width: 100%; }
        }
        .badge-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: .5px;
          background: rgba(0,0,0,.35);
          border: 1px solid rgba(255,255,255,.12);
          color: #fff;
          text-shadow: 0 10px 30px rgba(0,0,0,.9);
          backdrop-filter: blur(10px);
          white-space: nowrap;
        }
        .chip.green {
          border-color: rgba(0,255,65,.35);
          box-shadow: 0 0 0 1px rgba(0,255,65,.10) inset;
        }
        .hero-card-name {
          margin: 0;
          font-weight: 950;
          font-size: 26px;
          color: #fff;
          letter-spacing: -1px;
          text-transform: uppercase;
          text-shadow: 0 10px 40px rgba(0,0,0,.95);
          line-height: 1.05;
        }
        .hero-card-desc {
          margin-top: 8px;
          color: rgba(255,255,255,.82);
          font-size: 13px;
          line-height: 1.35;
          text-shadow: 0 10px 30px rgba(0,0,0,.9);
          max-width: 55ch;
        }
        .hero-card-btns { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
        
        .feat-nav {
          position: absolute;
          top: 14px;
          width: 42px;
          height: 42px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(0,0,0,.35);
          color: #fff;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: .2s ease;
          z-index: 5;
          font-size: 18px;
        }
        .feat-nav:hover {
          transform: translateY(-1px);
          border-color: rgba(255,255,255,.22);
        }
        .feat-prev { right: 64px; }
        .feat-next { right: 14px; }

        .btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 18px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.05);
          color: #fff;
          font-weight: 950;
          letter-spacing: .5px;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition: .22s ease;
          overflow: hidden;
          white-space: nowrap;
        }
        .btn:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,.18);
          box-shadow: var(--shadowSoft);
        }
        .btn-primary-lg {
          background: linear-gradient(180deg, rgba(0,255,65,.95), rgba(0,200,55,.85));
          color: #000;
          border-color: rgba(0,255,65,.55);
        }
        .btn-primary-lg:hover {
          box-shadow: 0 18px 60px rgba(0,255,65,.15);
        }
        .btn-outline {
          background: rgba(255,255,255,.05);
        }
        .btn-small {
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 12px;
        }
        .btn-primary-sm {
          background: linear-gradient(180deg, rgba(0,255,65,.95), rgba(0,200,55,.85));
          color: #000;
          border-color: rgba(0,255,65,.55);
        }
      `}</style>
    </section>
  );
}
