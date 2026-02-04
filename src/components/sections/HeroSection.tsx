import type { Game } from '@/types/game';

interface HeroSectionProps {
  featuredGame: Game | undefined;
  isTransitioning?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onOpenDetails: (game: Game) => void;
}

export function HeroSection({ featuredGame, isTransitioning, onPrev, onNext, onOpenDetails }: HeroSectionProps) {
  return (
    <section className="section-top section hero-section" style={{ paddingTop: 'clamp(80px, 12vw, 120px)' }}>
      <div className="container-main">
        <div className="hero-grid">
          {/* Mobile Layout: Scarcity + Card + Content */}
          <div className="hero-mobile-wrapper">
            {/* Scarcity Bar - Mobile */}
            <div className="scarcity-bar scarcity-bar-mobile">
              <span className="scarcity-pulse" />
              <span>⚠️ Lote de <strong>R$ 9,97</strong> acabando</span>
            </div>
            
            {/* Card */}
            {featuredGame && (
              <div className={`hero-card hero-card-mobile ${isTransitioning ? 'transitioning' : ''}`}>
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
                      <span className="chip green">Jogo Original</span>
                      <span className="chip">Multiplayer</span>
                    </div>
                    <h2 className="hero-card-name">{featuredGame.name}</h2>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Left Content */}
          <div className="hero-content">
            {/* Scarcity Bar - Top */}
            <div className="scarcity-bar">
              <span className="scarcity-pulse" />
              <span>⚠️ Lote Promocional de <strong>R$ 9,97</strong> encerrando em breve</span>
            </div>

            {/* Pill - Desktop Only */}
            <div className="pill pill-desktop">
              <span className="dot" />
              Acesso Imediato • Baixe pela Steam
            </div>

            <h1 className="hero-title">
              <span className="accent">+1000 jogos AAA</span>
              <span className="title-dlc">+ 150 DLCs Premium</span>
            </h1>

            {/* Price Anchoring */}
            <div className="hero-price-anchor">
              <span className="original-price">de R$ 15.000</span>
              <span className="current-price">R$ 9,97</span>
            </div>

            <p className="hero-sub">
              A maior biblioteca do Brasil direto na sua Steam.<br />
              <strong>Entrega Instantânea e Automatizada.</strong>
            </p>

            <div className="hero-actions">
              <a href="#planos" className="hero-cta">
                Garantir Meu Acesso
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              
              {/* Social Proof Badge */}
              <div className="social-proof-badge">
                <div className="stars">★★★★★</div>
                <span>+5K clientes</span>
              </div>
            </div>

            {/* Trust seal */}
            <div className="trust-seal">
              <span>🔒 Compra 100% Segura</span>
              <span className="separator">•</span>
              <span>Suporte via WhatsApp</span>
            </div>
          </div>

          {/* Right - Featured Card (Desktop) */}
          {featuredGame && (
            <div className={`hero-card hero-card-desktop ${isTransitioning ? 'transitioning' : ''}`}>
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
                    <span className="chip green">Jogo Original</span>
                    <span className="chip">Multiplayer</span>
                  </div>
                  <h2 className="hero-card-name">{featuredGame.name}</h2>
                  <p className="hero-card-desc">Baixe os arquivos oficiais e jogue online com seus amigos.</p>
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
        @media (max-width: 640px) {
          .pill {
            padding: 8px 12px;
            font-size: 10px;
            gap: 8px;
          }
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--neon);
          box-shadow: 0 0 14px rgba(0,255,65,.55);
        }
        @media (max-width: 640px) {
          .dot {
            width: 6px;
            height: 6px;
          }
        }
        /* Mobile Wrapper */
        .hero-mobile-wrapper {
          display: none;
        }
        @media (max-width: 640px) {
          .hero-mobile-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            width: 100%;
            position: relative;
          }
        }
        
        /* Scarcity Bar visibility */
        .scarcity-bar {
          display: inline-flex;
        }
        .scarcity-bar-mobile {
          display: none;
        }
        @media (max-width: 640px) {
          .hero-content .scarcity-bar {
            display: none;
          }
          .scarcity-bar-mobile {
            display: inline-flex;
            position: relative;
            z-index: 10;
          }
        }

        /* Pill visibility */
        .pill-desktop {
          display: inline-flex;
        }
        @media (max-width: 640px) {
          .pill-desktop {
            display: none;
          }
        }

        .hero-card-mobile {
          display: none;
        }
        .hero-card-desktop {
          display: block;
        }
        @media (max-width: 640px) {
          .hero-card-mobile {
            display: block;
            width: 100%;
            max-width: 340px;
            border-radius: var(--r2);
            margin-bottom: -20px;
            position: relative;
          }
          .hero-card-mobile::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: -1px;
            right: -1px;
            height: 60px;
            background: linear-gradient(to bottom, transparent, var(--bg));
            pointer-events: none;
            z-index: 10;
            border-radius: 0 0 var(--r2) var(--r2);
          }
          .hero-card-mobile .hero-card-media {
            height: 200px;
          }
          .hero-card-mobile .hero-card-overlay {
            background: linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 50%);
          }
          .hero-card-desktop {
            display: none;
          }
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          gap: 34px;
          align-items: center;
        }
        @media (max-width: 980px) {
          .hero-grid { 
            grid-template-columns: 1fr; 
            gap: 24px; 
          }
        }
        @media (max-width: 640px) {
          .hero-grid { 
            display: flex;
            flex-direction: column;
            gap: 0;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            position: relative;
            z-index: 5;
            padding-top: 16px;
          }
          .hero-content::before {
            content: '';
            position: absolute;
            top: -40px;
            left: -50vw;
            right: -50vw;
            height: 60px;
            background: linear-gradient(to bottom, transparent 0%, var(--bg) 80%, var(--bg) 100%);
            pointer-events: none;
            z-index: -1;
          }
        }

        /* Scarcity Bar */
        .scarcity-bar {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: rgba(255, 193, 7, 0.08);
          border: 1px solid rgba(255, 193, 7, 0.3);
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 8px;
        }
        .scarcity-bar strong {
          color: var(--neon);
          font-weight: 900;
        }
        .scarcity-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ffc107;
          box-shadow: 0 0 12px rgba(255, 193, 7, 0.6);
          animation: pulse-warning 1.5s ease-in-out infinite;
        }
        @keyframes pulse-warning {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        @media (max-width: 640px) {
          .scarcity-bar {
            padding: 10px 14px;
            font-size: 11px;
            gap: 8px;
            text-align: center;
          }
        }

        .hero-title {
          margin: 18px 0 8px;
          font-weight: 950;
          font-size: clamp(32px, 5.2vw, 58px);
          line-height: 1.05;
          letter-spacing: -2px;
          color: #fff;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hero-title .accent { 
          color: var(--neon); 
        }
        .title-dlc {
          font-size: clamp(18px, 3vw, 28px);
          color: rgba(255,255,255,.7);
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        @media (max-width: 640px) {
          .hero-title {
            font-size: 28px;
            letter-spacing: -1.5px;
            margin: 14px 0 8px;
            text-align: center;
            align-items: center;
          }
          .title-dlc {
            font-size: 16px;
          }
        }

        /* Price Anchoring */
        .hero-price-anchor {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .original-price {
          font-size: 18px;
          font-weight: 600;
          color: rgba(255,255,255,.5);
          text-decoration: line-through;
        }
        .current-price {
          font-size: 42px;
          font-weight: 950;
          color: var(--neon);
          text-shadow: 0 0 30px rgba(0,255,65,.4);
          letter-spacing: -2px;
          padding: 8px 20px;
          background: rgba(0,255,65,.08);
          border: 2px solid rgba(0,255,65,.3);
          border-radius: 12px;
        }
        @media (max-width: 640px) {
          .hero-price-anchor {
            justify-content: center;
            gap: 12px;
          }
          .original-price {
            font-size: 15px;
          }
          .current-price {
            font-size: 32px;
            padding: 6px 16px;
          }
        }

        .hero-sub {
          max-width: 52ch;
          font-size: 16px;
          line-height: 1.65;
          color: rgba(255,255,255,.8);
          margin-bottom: 20px;
          font-weight: 500;
        }
        .hero-sub strong {
          color: #fff;
          text-decoration: underline;
          text-decoration-color: var(--neon);
          text-underline-offset: 3px;
        }
        @media (max-width: 640px) {
          .hero-sub {
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 16px;
            text-align: center;
          }
          .hero-sub br {
            display: none;
          }
        }
        
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .hero-actions {
            gap: 12px;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }
          .hero-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }

        /* Social Proof Badge */
        .social-proof-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 12px;
        }
        .social-proof-badge .stars {
          color: #ffc107;
          font-size: 14px;
          letter-spacing: 1px;
        }
        .social-proof-badge span {
          font-size: 13px;
          font-weight: 700;
          color: rgba(255,255,255,.85);
        }
        @media (max-width: 640px) {
          .social-proof-badge {
            padding: 10px 14px;
            gap: 8px;
          }
          .social-proof-badge .stars {
            font-size: 12px;
          }
          .social-proof-badge span {
            font-size: 12px;
          }
        }

        /* Trust Seal */
        .trust-seal {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 16px;
          font-size: 12px;
          color: rgba(255,255,255,.6);
          font-weight: 500;
        }
        .trust-seal .separator {
          opacity: 0.4;
        }
        @media (max-width: 640px) {
          .trust-seal {
            justify-content: center;
            font-size: 11px;
            gap: 8px;
          }
        }

        @media (max-width: 640px) {
          .animate-float-in {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .pill {
            align-self: center;
          }
        }

        .hero-card {
          border-radius: var(--r2);
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          box-shadow: var(--shadow);
          overflow: hidden;
          position: relative;
          isolation: isolate;
          min-height: 280px;
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (max-width: 640px) {
          .hero-card {
            min-height: 220px;
          }
        }
        .hero-card.transitioning {
          opacity: 0;
          transform: scale(0.98);
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
          height: 280px;
          background: #000;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          .hero-card-media {
            height: 220px;
          }
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
          left: 14px;
          right: 14px;
          bottom: 14px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .hero-card-info {
            left: 12px;
            right: 12px;
            bottom: 12px;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
        .hero-card-text { max-width: 62%; min-width: 0; }
        @media (max-width: 980px) {
          .hero-card-text { max-width: 100%; }
        }
        .badge-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
        @media (max-width: 640px) {
          .badge-row { gap: 6px; margin-bottom: 8px; }
        }
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
        @media (max-width: 640px) {
          .chip {
            padding: 6px 8px;
            font-size: 10px;
          }
        }
        .chip.green {
          border-color: rgba(0,255,65,.35);
          box-shadow: 0 0 0 1px rgba(0,255,65,.10) inset;
        }
        .hero-card-name {
          margin: 0;
          font-weight: 950;
          font-size: 22px;
          color: #fff;
          letter-spacing: -1px;
          text-transform: uppercase;
          text-shadow: 0 10px 40px rgba(0,0,0,.95);
          line-height: 1.05;
        }
        @media (max-width: 640px) {
          .hero-card-name {
            font-size: 18px;
          }
        }
        .hero-card-desc {
          margin-top: 8px;
          color: rgba(255,255,255,.82);
          font-size: 13px;
          line-height: 1.35;
          text-shadow: 0 10px 30px rgba(0,0,0,.9);
          max-width: 55ch;
        }
        @media (max-width: 640px) {
          .hero-card-desc {
            font-size: 12px;
            margin-top: 6px;
          }
        }
        .hero-card-btns { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
        @media (max-width: 640px) {
          .hero-card-btns { 
            justify-content: flex-start;
            width: 100%;
          }
        }
        
        .feat-nav {
          position: absolute;
          top: 14px;
          width: 38px;
          height: 38px;
          border-radius: 12px;
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
        @media (max-width: 640px) {
          .feat-nav {
            width: 34px;
            height: 34px;
            font-size: 16px;
          }
        }
        .feat-nav:hover {
          transform: translateY(-1px);
          border-color: rgba(255,255,255,.22);
        }
        .feat-prev { right: 58px; }
        .feat-next { right: 14px; }
        @media (max-width: 640px) {
          .feat-prev { right: 52px; }
          .feat-next { right: 12px; }
        }

        .btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 14px;
          border: none;
          background: var(--neon);
          color: #000;
          font-weight: 900;
          letter-spacing: .5px;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition: .22s ease;
          overflow: hidden;
          white-space: nowrap;
          font-size: 14px;
        }
        @media (max-width: 640px) {
          .btn {
            padding: 14px 20px;
            font-size: 13px;
          }
        }
        .btn:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }
        .btn-primary-lg {
          background: var(--neon);
          color: #000;
          border: none;
          font-size: 14px;
          padding: 16px 28px;
        }
        .btn-primary-lg:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }
        .btn-outline {
          background: rgba(255,255,255,.05);
        }
        .btn-small {
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 12px;
        }
        @media (max-width: 640px) {
          .btn-small {
            padding: 8px 12px;
            font-size: 11px;
          }
        }
        .btn-primary-sm {
          background: var(--neon);
          color: #000;
          border: none;
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 28px;
          border-radius: 14px;
          background: var(--neon);
          color: #000;
          font-weight: 900;
          font-size: 14px;
          letter-spacing: .5px;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: .25s ease;
          border: none;
        }
        .hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0,255,65,.35);
        }
        .hero-cta svg {
          width: 16px;
          height: 16px;
        }
        @media (max-width: 640px) {
          .hero-cta {
            width: 100%;
            padding: 14px 24px;
            font-size: 13px;
            border-radius: 12px;
          }
        }
      `}</style>
    </section>
  );
}
