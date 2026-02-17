import type { Game } from "@/types/game";

// Import testimonial avatars for social proof
import jzAvatar from "@/assets/testimonials/jz.jpg";
import adriellyAvatar from "@/assets/testimonials/adrielly.jpg";
import maiconAvatar from "@/assets/testimonials/maicon.jpg";
import wlAvatar from "@/assets/testimonials/wl.jpeg";

interface HeroSectionProps {
  featuredGame: Game | undefined;
  isTransitioning?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onOpenDetails: (game: Game) => void;
}

export function HeroSection({ featuredGame, isTransitioning, onPrev, onNext, onOpenDetails }: HeroSectionProps) {
  return (
    <section className="section-top section hero-section" style={{ paddingTop: "clamp(90px, 12vw, 140px)" }}>
      <div className="container-main">
        <div className="hero-grid">
          {/* Mobile Layout: Card + Content */}
          <div className="hero-mobile-wrapper">
            {/* Card */}
            {featuredGame && (
              <div className={`hero-card hero-card-mobile ${isTransitioning ? "transitioning" : ""}`}>
                <div className="hero-card-glow" />
                <div className="hero-card-media">
                  <img
                    src={`https://steamcdn-a.akamaihd.net/steam/apps/${featuredGame.steam_appid}/library_hero.jpg`}
                    alt={featuredGame.name}
                    onError={(e) => {
                      e.currentTarget.src = featuredGame.cover;
                    }}
                  />
                  <div className="hero-card-overlay" />
                </div>

                {/* Nav Buttons */}
                <button onClick={onPrev} className="feat-nav feat-prev">
                  ‹
                </button>
                <button onClick={onNext} className="feat-nav feat-next">
                  ›
                </button>

                {/* Info */}
                <div className="hero-card-info">
                  <div className="hero-card-text">
                    <div className="badge-row">
                      <span className="chip green">Jogo Original</span>
                      <span className="chip">Steam</span>
                    </div>
                    <h2 className="hero-card-name">{featuredGame.name}</h2>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Left Content */}
          <div className="hero-content">
            {/* Pill - Desktop Only */}
            <div className="pill pill-desktop">
              <span className="dot" />
              Acesso Imediato • Baixe pela Steam
            </div>

            <h1 className="hero-title">
              <span className="accent">+1000 jogos famosos</span>
              <span className="title-dlc">+ 150 DLCs Premium • Para PC</span>
            </h1>

            {/* Price Display - Clean */}
            <div className="hero-price">
              <span className="price-from">
                de <s>R$ 15.000</s>
              </span>
              <span className="price-now">por R$ 14,97</span>
            </div>

            <p className="hero-sub">
              A maior biblioteca do Brasil direto na sua Steam.
              <br />
              Entrega Instantânea e Automatizada. Exclusivo para PC.
            </p>

            <div className="hero-actions">
              <a href="#planos" className="hero-cta">
                Garantir Meu Acesso
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              {/* Social Proof with Real Avatars */}
              <div className="social-proof">
                <div className="avatars-stack">
                  <img src={jzAvatar} alt="" className="avatar-mini" />
                  <img src={adriellyAvatar} alt="" className="avatar-mini" />
                  <img src={maiconAvatar} alt="" className="avatar-mini" />
                  <img src={wlAvatar} alt="" className="avatar-mini" />
                </div>
                <div className="social-text">
                  <span className="stars">★★★★★</span>
                  <span className="count">+5K clientes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Featured Card (Desktop) */}
          {featuredGame && (
            <div className={`hero-card hero-card-desktop ${isTransitioning ? "transitioning" : ""}`}>
              <div className="hero-card-glow" />
              <div className="hero-card-media">
                <img
                  src={`https://steamcdn-a.akamaihd.net/steam/apps/${featuredGame.steam_appid}/library_hero.jpg`}
                  alt={featuredGame.name}
                  onError={(e) => {
                    e.currentTarget.src = featuredGame.cover;
                  }}
                />
                <div className="hero-card-overlay" />
              </div>

              {/* Nav Buttons */}
              <button onClick={onPrev} className="feat-nav feat-prev">
                ‹
              </button>
              <button onClick={onNext} className="feat-nav feat-next">
                ›
              </button>

              {/* Info */}
              <div className="hero-card-info">
                <div className="hero-card-text">
                  <div className="badge-row">
                    <span className="chip green">Jogo Original</span>
                    <span className="chip">Steam</span>
                  </div>
                  <h2 className="hero-card-name">{featuredGame.name}</h2>
                  <p className="hero-card-desc">Baixe os arquivos oficiais direto pela Steam.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* Pill style */
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
          margin-bottom: 12px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--neon);
          box-shadow: 0 0 14px rgba(0,255,65,.55);
        }
        .pill-desktop {
          display: inline-flex;
        }
        @media (max-width: 640px) {
          .pill {
            padding: 8px 12px;
            font-size: 10px;
            gap: 8px;
          }
          .dot {
            width: 6px;
            height: 6px;
          }
          .pill-desktop {
            display: none;
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
            gap: 8px;
            width: 100%;
            position: relative;
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
            max-width: 100%;
            border-radius: var(--r2);
            margin-bottom: 0;
            position: relative;
          }
          .hero-card-mobile::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: -1px;
            right: -1px;
            height: 80px;
            background: linear-gradient(to bottom, transparent, var(--bg));
            pointer-events: none;
            z-index: 10;
            border-radius: 0 0 var(--r2) var(--r2);
          }
          .hero-card-mobile .hero-card-media {
            height: 220px;
          }
          .hero-card-mobile .hero-card-overlay {
            background: linear-gradient(to top, rgba(0,0,0,.85) 0%, transparent 60%);
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
            padding-top: 10px;
            padding-bottom: 16px;
          }
        }

        .hero-title {
          margin: 12px 0 12px;
          font-weight: 950;
          font-size: clamp(32px, 5.2vw, 56px);
          line-height: 1.05;
          letter-spacing: -2px;
          color: #fff;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .hero-title .accent { 
          color: var(--neon); 
        }
        .title-dlc {
          font-size: clamp(16px, 2.5vw, 24px);
          color: rgba(255,255,255,.6);
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        @media (max-width: 640px) {
          .hero-title {
            font-size: 32px;
            letter-spacing: -1.5px;
            margin: 8px 0 8px;
            text-align: center;
            align-items: center;
            gap: 2px;
          }
          .title-dlc {
            font-size: 15px;
            color: rgba(255,255,255,.75);
            margin-top: 2px;
          }
        }

        /* Price Display - Clean & Minimal */
        .hero-price {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 14px;
        }
        .price-from {
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,.5);
        }
        .price-from s {
          text-decoration: line-through;
        }
        .price-now {
          font-size: 28px;
          font-weight: 950;
          color: var(--neon);
          letter-spacing: -1px;
        }
        @media (max-width: 640px) {
          .hero-price {
            justify-content: center;
            gap: 10px;
            margin-bottom: 12px;
            margin-top: 4px;
          }
          .price-from {
            font-size: 14px;
            color: rgba(255,255,255,.65);
          }
          .price-now {
            font-size: 28px;
          }
        }

        .hero-sub {
          max-width: 48ch;
          font-size: 16px;
          line-height: 1.65;
          color: rgba(255,255,255,.75);
          margin-bottom: 22px;
          font-weight: 500;
        }
        @media (max-width: 640px) {
          .hero-sub {
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 16px;
            text-align: center;
            color: rgba(255,255,255,.85);
            padding: 0 4px;
          }
          .hero-sub br {
            display: none;
          }
        }
        
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .hero-actions {
            gap: 14px;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }
        }

        /* Social Proof with Avatars */
        .social-proof {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .avatars-stack {
          display: flex;
        }
        .avatar-mini {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--bg);
          object-fit: cover;
          margin-left: -10px;
        }
        .avatar-mini:first-child {
          margin-left: 0;
        }
        .social-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .social-text .stars {
          color: var(--neon);
          font-size: 12px;
          letter-spacing: 1px;
        }
        .social-text .count {
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,.7);
        }
        @media (max-width: 640px) {
          .social-proof {
            gap: 10px;
          }
          .avatar-mini {
            width: 28px;
            height: 28px;
            margin-left: -8px;
          }
          .social-text .stars {
            font-size: 11px;
          }
          .social-text .count {
            font-size: 11px;
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
