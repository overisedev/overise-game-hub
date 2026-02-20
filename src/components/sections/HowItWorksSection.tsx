import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Static featured games for the mockup
const mockupGames = [
  { id: 1, name: 'Elden Ring', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900.jpg' },
  { id: 2, name: 'God of War', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_600x900.jpg' },
  { id: 3, name: 'Hogwarts', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_600x900.jpg' },
  { id: 4, name: 'Spider-Man', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/library_600x900.jpg' },
  { id: 5, name: 'Forza 5', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900.jpg' },
];

export function HowItWorksSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation (max 15 degrees)
    const rotateY = (mouseX / (rect.width / 2)) * 12;
    const rotateX = -(mouseY / (rect.height / 2)) * 12;
    
    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <section id="como-funciona" className="section section-light">
      <div className="container-main">
      <div className="app-section-grid">
        {/* Left Content */}
        <div className="app-section-content">
          <span className="app-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            Windows App
          </span>

          <h2 className="app-title">
            Overise App<br/>
            <span className="app-title-accent">Baixe jogos em segundos</span>
          </h2>

          <p className="app-desc">
            O jeito mais fácil de acessar sua biblioteca.<br/>
            Escolha o jogo, clique e baixe direto pela Steam.
          </p>

          <div className="app-features">
            <span className="app-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              Download Instantâneo
            </span>
            <span className="app-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              100% Seguro
            </span>
            <span className="app-feature">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Acesso Vitalício
            </span>
          </div>

          <a href="#planos" className="app-cta">
            Desbloquear Steam
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Right - 3D Tilting Mockup */}
        <div className="app-mockup-container">
          <div 
            ref={cardRef}
            className={`app-mockup-wrapper ${isHovering ? 'hovering' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
              transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
            }}
          >
            {/* Glow effect */}
            <div className="mockup-glow" />
            
            {/* Device frame */}
            <div className="mockup-device">
              {/* Title bar */}
              <div className="mockup-titlebar">
                <div className="titlebar-dots">
                  <span className="dot-red"></span>
                  <span className="dot-yellow"></span>
                  <span className="dot-green"></span>
                </div>
                <span className="titlebar-text">Overise</span>
              </div>

              {/* App content */}
              <div className="mockup-app-content">
                {/* Sidebar */}
                <div className="mockup-sidebar">
                  <div className="sidebar-logo">
                    <span className="logo-w">OVER</span><span className="logo-g">ISE</span>
                  </div>
                  <div className="sidebar-menu">
                    <div className="menu-item active">
                      <span className="menu-dot"></span>
                      Biblioteca
                    </div>
                    <div className="menu-item">Downloads</div>
                    <div className="menu-item">Configurações</div>
                  </div>
                  <div className="sidebar-status">
                    <span className="status-dot"></span>
                    Online
                  </div>
                </div>

                {/* Main content */}
                <div className="mockup-main">
                  {/* Featured game */}
                  <div className="featured-game">
                    <img src={mockupGames[0].cover} alt={mockupGames[0].name} loading="lazy" decoding="async" width={480} height={140} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="featured-overlay">
                      <span className="featured-tag">Destaque</span>
                      <h4>{mockupGames[0].name}</h4>
                      <span className="featured-price">Liberado</span>
                    </div>
                  </div>

                  {/* Game grid */}
                  <div className="mockup-game-grid">
                    {mockupGames.slice(1, 5).map((game) => (
                      <div key={game.id} className="mockup-game-item" style={{ aspectRatio: '2/3' }}>
                        <img src={game.cover} alt={game.name} loading="lazy" decoding="async" width={120} height={180} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reflection */}
            <div className="mockup-reflection" />
        </div>
      </div>
      </div>
      </div>

      <style>{`
        .app-section-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 980px) {
          .app-section-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .app-section-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        @media (max-width: 980px) {
          .app-section-content {
            align-items: center;
            text-align: center;
          }
        }

        .app-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: rgba(0,255,65,.08);
          border: 1px solid rgba(0,255,65,.25);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          color: var(--neon);
          margin-bottom: 20px;
        }

        .app-title {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 950;
          color: #fff;
          margin: 0 0 16px;
          letter-spacing: -1.5px;
          line-height: 1.1;
        }

        .app-title-accent {
          color: var(--neon);
        }

        .app-desc {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.7;
          margin: 0 0 24px;
          max-width: 400px;
        }

        .app-features {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 28px;
        }

        .app-feature {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,.85);
        }

        .app-feature svg {
          color: var(--neon);
        }

        .app-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 28px;
          background: var(--neon);
          color: #000;
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-radius: 14px;
          text-decoration: none;
          transition: 0.25s ease;
        }

        .app-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0,255,65,.35);
        }

        /* 3D Mockup */
        .app-mockup-container {
          display: flex;
          justify-content: center;
          perspective: 1000px;
        }

        .app-mockup-wrapper {
          position: relative;
          transition: transform 0.1s ease-out;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .app-mockup-wrapper.hovering {
          transition: transform 0.05s ease-out;
        }

        .mockup-glow {
          position: absolute;
          inset: -40px;
          background: radial-gradient(ellipse at center, rgba(0,255,65,.15), transparent 70%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .app-mockup-wrapper.hovering .mockup-glow {
          opacity: 1;
        }

        .mockup-device {
          width: 480px;
          background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.1);
          overflow: hidden;
          box-shadow: 
            0 50px 100px rgba(0,0,0,.6),
            0 0 0 1px rgba(255,255,255,.05) inset;
          transform-style: preserve-3d;
        }

        @media (max-width: 640px) {
          .mockup-device {
            width: 340px;
          }
        }

        .mockup-titlebar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(0,0,0,.5);
          border-bottom: 1px solid rgba(255,255,255,.06);
        }

        .titlebar-dots {
          display: flex;
          gap: 6px;
        }

        .titlebar-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .dot-red { background: #ff5f57; }
        .dot-yellow { background: #febc2e; }
        .dot-green { background: #28c840; }

        .titlebar-text {
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,.5);
          letter-spacing: 0.5px;
        }

        .mockup-app-content {
          display: flex;
          height: 300px;
        }

        @media (max-width: 640px) {
          .mockup-app-content {
            height: 220px;
          }
        }

        .mockup-sidebar {
          width: 120px;
          background: rgba(0,0,0,.4);
          border-right: 1px solid rgba(255,255,255,.06);
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 640px) {
          .mockup-sidebar {
            width: 90px;
            padding: 12px 8px;
          }
        }

        .sidebar-logo {
          font-size: 14px;
          font-weight: 900;
          margin-bottom: 20px;
        }

        .logo-w { color: #fff; }
        .logo-g { color: var(--neon); }

        .sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .menu-item {
          font-size: 11px;
          color: rgba(255,255,255,.4);
          padding: 8px 10px;
          border-radius: 6px;
          cursor: default;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .menu-item.active {
          background: rgba(0,255,65,.1);
          color: var(--neon);
        }

        .menu-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--neon);
        }

        .sidebar-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: var(--neon);
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--neon);
          box-shadow: 0 0 8px var(--neon);
        }

        .mockup-main {
          flex: 1;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .featured-game {
          position: relative;
          height: 140px;
          border-radius: 10px;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .featured-game {
            height: 100px;
          }
        }

        .featured-game img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }

        .featured-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.9), transparent 70%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 12px;
        }

        .featured-tag {
          position: absolute;
          top: 10px;
          left: 10px;
          padding: 4px 8px;
          background: var(--neon);
          color: #000;
          font-size: 9px;
          font-weight: 800;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .featured-overlay h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 800;
          color: #fff;
        }

        .featured-price {
          font-size: 11px;
          color: var(--neon);
          font-weight: 700;
        }

        .mockup-game-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          flex: 1;
        }

        .mockup-game-item {
          border-radius: 6px;
          overflow: hidden;
          background: rgba(255,255,255,.05);
        }

        .mockup-game-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mockup-reflection {
          position: absolute;
          left: 10%;
          right: 10%;
          bottom: -60px;
          height: 60px;
          background: linear-gradient(to bottom, rgba(0,255,65,.08), transparent);
          filter: blur(20px);
          transform: scaleY(-0.3);
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}