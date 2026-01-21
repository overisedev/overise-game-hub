import { useGames } from '@/hooks/useGames';
import { useState } from 'react';

const InstagramCarousel = () => {
  const { games } = useGames();
  const [exportMode, setExportMode] = useState(false);

  // Jogos em destaque para o carrossel - usando vertical capsule para melhor qualidade
  const featuredGames = [
    { name: 'Elden Ring', appid: 1245620 },
    { name: 'Cyberpunk 2077', appid: 1091500 },
    { name: 'Red Dead Redemption 2', appid: 1174180 },
    { name: "Baldur's Gate 3", appid: 1086940 },
    { name: 'Hogwarts Legacy', appid: 990080 },
    { name: 'God of War', appid: 1593500 },
    { name: 'GTA V', appid: 271590 },
    { name: 'Resident Evil 4', appid: 2050650 },
    { name: 'Dark Souls III', appid: 374320 },
  ];

  // URLs de alta resolução para backgrounds verticais
  const getVerticalImage = (appid: number) => 
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/library_600x900.jpg`;
  
  const getVerticalCapsule = (appid: number) =>
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/library_600x900_2x.jpg`;

  const getHeroImage = (appid: number) =>
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/library_hero.jpg`;

  return (
    <div className={`carousel-page ${exportMode ? 'export-mode' : ''}`}>
      <div className="carousel-header">
        <h1>Carrossel Instagram — OVERISE</h1>
        <p>Clique direito no slide → Inspecionar → selecione <code>.slide</code> → "Capture node screenshot"</p>
        <div className="export-controls">
          <button 
            className={`export-toggle ${exportMode ? 'active' : ''}`}
            onClick={() => setExportMode(!exportMode)}
          >
            {exportMode ? '✓ Modo Export Ativo' : 'Ativar Modo Export'}
          </button>
          <div className="export-instructions">
            <strong>Instruções para DPR 2x/3x:</strong>
            <ol>
              <li>Zoom do Chrome = 100% (Ctrl+0)</li>
              <li>Abra Device Toolbar (Ctrl+Shift+M)</li>
              <li>Defina viewport: 1080×1350</li>
              <li>No menu ⋮ → More tools → Rendering → Force DPR: 2 ou 3</li>
              <li>Inspecione o .slide → "Capture node screenshot"</li>
            </ol>
            <p className="export-result">
              DPR 2 → PNG ~2160×2700 | DPR 3 → PNG ~3240×4050
            </p>
          </div>
        </div>
      </div>

      {/* ========== SLIDE 1 - CAPA ========== */}
      <div className="slide" id="slide-1">
        <div className="slide-inner">
          {/* Background com mosaico de jogos - usando imagens VERTICAIS de alta resolução */}
          <div className="slide-bg-mosaic">
            <img src={getVerticalImage(1245620)} alt="" loading="eager" />
            <img src={getVerticalImage(1091500)} alt="" loading="eager" />
            <img src={getVerticalImage(1174180)} alt="" loading="eager" />
          </div>
          <div className="slide-overlay" />
          <div className="slide-glow glow-left" />
          <div className="slide-glow glow-right" />

          <div className="slide-content">
            <div className="slide-logo">
              <span className="logo-white">OVER</span>
              <span className="logo-neon">ISE</span>
            </div>

            <div className="slide-main">
              <div className="slide-pill">
                <span className="pill-dot" />
                Sistema Online • Baixe na Steam
              </div>

              <h1 className="slide-headline">
                Sua Steam,<br />
                <span className="headline-accent">desbloqueada.</span>
              </h1>

              <p className="slide-subtext">
                Acesso a <span className="text-neon">+1000 jogos AAA</span> por uma fração do preço.
                <br />
                <strong>Baixe direto dos servidores oficiais.</strong>
              </p>

              <div className="slide-swipe">
                Arraste para o lado
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>

            <div className="slide-footer">
              <div className="slide-dots">
                <span className="dot active" />
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
              <span className="footer-url">overisestore.com.br</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== SLIDE 2 - COMO FUNCIONA ========== */}
      <div className="slide" id="slide-2">
        <div className="slide-inner">
          <div className="slide-bg-image">
            <img src={getVerticalImage(1086940)} alt="" loading="eager" />
          </div>
          <div className="slide-overlay overlay-stronger" />
          <div className="slide-glow glow-bottom" />

          <div className="slide-content">
            <div className="slide-logo">
              <span className="logo-white">OVER</span>
              <span className="logo-neon">ISE</span>
            </div>

            <div className="slide-main center">
              <h2 className="slide-headline smaller">
                Como <span className="headline-accent">funciona</span>?
              </h2>

              <div className="glass-card">
                <div className="steps-list">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <span className="step-text">Você escolhe um plano</span>
                  </div>
                  <div className="step-item">
                    <div className="step-number">2</div>
                    <span className="step-text">Recebe acesso ao catálogo</span>
                  </div>
                  <div className="step-item">
                    <div className="step-number">3</div>
                    <span className="step-text">Baixa direto pela Steam</span>
                  </div>
                </div>
              </div>

              <p className="slide-subtext italic">
                Simples assim. <strong>Sem complicação.</strong>
              </p>

              <div className="slide-swipe">
                Arraste para o lado
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>

            <div className="slide-footer">
              <div className="slide-dots">
                <span className="dot" />
                <span className="dot active" />
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
              <span className="footer-url">overisestore.com.br</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== SLIDE 3 - CATÁLOGO ========== */}
      <div className="slide" id="slide-3">
        <div className="slide-inner slide-dark">
          <div className="slide-glow glow-left" />
          <div className="slide-glow glow-top-right" />

          <div className="slide-content">
            <div className="slide-header-row">
              <div className="slide-logo">
                <span className="logo-white">OVER</span>
                <span className="logo-neon">ISE</span>
              </div>
              <div className="badge-neon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="6" width="20" height="12" rx="2"/>
                  <path d="M6 12h4M14 12h4"/>
                </svg>
                +1000 jogos
              </div>
            </div>

            <div className="slide-main">
              <h2 className="slide-headline smaller center-text">
                Uma prévia do <span className="headline-accent">catálogo</span>
              </h2>

              <div className="games-grid">
                {featuredGames.map((game) => (
                  <div key={game.appid} className="game-card">
                    <img 
                      src={`https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`} 
                      alt={game.name}
                      loading="eager"
                    />
                    <div className="game-card-overlay" />
                  </div>
                ))}
              </div>

              <p className="slide-subtext center-text">
                E muito mais... <span className="text-neon">atualizações toda semana.</span>
              </p>

              <div className="slide-swipe">
                Arraste para o lado
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>

            <div className="slide-footer">
              <div className="slide-dots">
                <span className="dot" />
                <span className="dot" />
                <span className="dot active" />
                <span className="dot" />
                <span className="dot" />
              </div>
              <span className="footer-url">overisestore.com.br</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== SLIDE 4 - GARANTIA ========== */}
      <div className="slide" id="slide-4">
        <div className="slide-inner">
          <div className="slide-bg-image saturated">
            <img src={getVerticalImage(1593500)} alt="" loading="eager" />
          </div>
          <div className="slide-overlay" />
          <div className="slide-glow glow-center" />

          <div className="slide-content">
            <div className="slide-logo">
              <span className="logo-white">OVER</span>
              <span className="logo-neon">ISE</span>
            </div>

            <div className="slide-main center">
              <div className="shield-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>

              <h2 className="slide-headline smaller">
                Garantia <span className="headline-accent">total</span>
              </h2>

              <div className="neon-line" />

              <p className="quote-text">
                Testou e não funcionou?<br />
                <span className="highlight-box">Devolvemos seu dinheiro.</span>
              </p>

              <p className="slide-subtext italic center-text">
                Com a <strong className="text-neon">Overise</strong> você não corre risco.
                <br />
                <strong>Mas isso não é tudo.</strong>
              </p>

              <div className="slide-swipe">
                Arraste para o lado
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>

            <div className="slide-footer">
              <div className="slide-dots">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="dot active" />
                <span className="dot" />
              </div>
              <span className="footer-url">overisestore.com.br</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== SLIDE 5 - CTA FINAL ========== */}
      <div className="slide" id="slide-5">
        <div className="slide-inner">
          <div className="slide-bg-grid">
            {featuredGames.slice(0, 9).map((game, i) => (
              <img 
                key={i}
                src={getVerticalImage(game.appid)} 
                alt=""
                loading="eager"
              />
            ))}
          </div>
          <div className="slide-overlay overlay-radial" />
          <div className="slide-glow glow-center large" />

          <div className="slide-content">
            <div className="slide-main center full-height">
              <div className="slide-logo large">
                <span className="logo-white">OVER</span>
                <span className="logo-neon">ISE</span>
              </div>

              <h2 className="slide-headline cta-headline">
                Acesse o link<br />
                <span className="text-muted">na bio e</span><br />
                <span className="headline-accent">libere sua Steam.</span>
              </h2>

              <div className="pills-row">
                <div className="pill">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="6" width="20" height="12" rx="2"/>
                    <path d="M6 12h4M14 12h4"/>
                  </svg>
                  +1000 jogos
                </div>
                <div className="pill">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                  Download rápido
                </div>
                <div className="pill">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Garantia
                </div>
              </div>

              <div className="ig-icons">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </div>
            </div>

            <div className="slide-footer">
              <div className="slide-dots">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="dot active" />
              </div>
              <span className="footer-url">overisestore.com.br</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .carousel-page {
          min-height: 100vh;
          background: #050505;
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 80px;
        }

        .carousel-header {
          text-align: center;
          max-width: 700px;
        }

        .carousel-header h1 {
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 12px;
        }

        .carousel-header p {
          font-size: 15px;
          color: rgba(255,255,255,.5);
        }

        .carousel-header code {
          background: rgba(255,255,255,.1);
          padding: 2px 8px;
          border-radius: 4px;
          font-family: monospace;
        }

        /* ========== EXPORT CONTROLS ========== */
        .export-controls {
          margin-top: 24px;
          padding: 20px;
          background: rgba(0,255,65,0.05);
          border: 1px solid rgba(0,255,65,0.2);
          border-radius: 12px;
        }

        .export-toggle {
          padding: 12px 24px;
          background: rgba(0,255,65,0.1);
          border: 1px solid rgba(0,255,65,0.4);
          border-radius: 8px;
          color: #00FF41;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .export-toggle:hover {
          background: rgba(0,255,65,0.2);
        }

        .export-toggle.active {
          background: #00FF41;
          color: #000;
        }

        .export-instructions {
          margin-top: 16px;
          text-align: left;
          font-size: 13px;
          color: rgba(255,255,255,0.7);
        }

        .export-instructions strong {
          color: #fff;
        }

        .export-instructions ol {
          margin: 8px 0;
          padding-left: 20px;
        }

        .export-instructions li {
          margin: 4px 0;
        }

        .export-result {
          margin-top: 12px;
          padding: 8px 12px;
          background: rgba(0,255,65,0.1);
          border-radius: 6px;
          color: #00FF41;
          font-weight: 600;
          text-align: center;
        }

        /* ========== SLIDE BASE ========== */
        .slide {
          width: 1080px;
          height: 1350px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 
            0 50px 100px rgba(0,0,0,.8),
            0 0 0 1px rgba(255,255,255,.05);
          /* GPU acceleration para render mais nítido */
          transform: translateZ(0);
          will-change: auto;
        }

        .slide-inner {
          width: 100%;
          height: 100%;
          position: relative;
          background: var(--bg, #030303);
        }

        .slide-dark {
          background: linear-gradient(180deg, #040404 0%, #080808 100%);
        }

        /* ========== BACKGROUNDS - ALTA QUALIDADE ========== */
        .slide-bg-mosaic {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }

        .slide-bg-mosaic img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          /* Render otimizado sem banding */
          image-rendering: auto;
          transform: translateZ(0);
        }

        /* Overlay gradiente ao invés de filter direto na imagem */
        .slide-bg-mosaic::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.1) 100%
          );
          pointer-events: none;
        }

        .slide-bg-image {
          position: absolute;
          inset: 0;
        }

        .slide-bg-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          /* Render de alta qualidade */
          image-rendering: auto;
          transform: translateZ(0);
        }

        /* Overlay gradiente para escurecer sem banding */
        .slide-bg-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.65);
          pointer-events: none;
        }

        .slide-bg-image.saturated::after {
          background: rgba(0,0,0,0.75);
        }

        .slide-bg-grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 12px;
          padding: 60px;
          opacity: 0.18;
        }

        .slide-bg-grid img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
          image-rendering: auto;
          transform: translateZ(0);
        }

        /* ========== OVERLAYS ========== */
        .slide-overlay {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse 120% 80% at 50% 100%, rgba(0,0,0,0.97) 0%, transparent 55%),
            radial-gradient(ellipse 100% 60% at 0% 50%, rgba(0,0,0,0.92) 0%, transparent 45%),
            linear-gradient(to top, rgba(0,0,0,0.99) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.7) 100%);
        }

        .slide-overlay.overlay-stronger {
          background: 
            radial-gradient(ellipse 120% 80% at 50% 100%, rgba(0,0,0,0.98) 0%, transparent 50%),
            linear-gradient(to top, rgba(0,0,0,0.99) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.75) 100%);
        }

        .slide-overlay.overlay-radial {
          background: radial-gradient(ellipse at center, rgba(3,3,3,0.8) 0%, rgba(3,3,3,0.97) 100%);
        }

        /* ========== GLOWS ========== */
        .slide-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,255,65,0.25) 0%, transparent 65%);
          filter: blur(60px);
          pointer-events: none;
        }

        .glow-left {
          bottom: -200px;
          left: -200px;
        }

        .glow-right {
          top: -100px;
          right: -200px;
          opacity: 0.4;
        }

        .glow-bottom {
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
        }

        .glow-top-right {
          top: -150px;
          right: -150px;
          opacity: 0.5;
        }

        .glow-center {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .glow-center.large {
          width: 800px;
          height: 800px;
        }

        /* ========== CONTENT ========== */
        .slide-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 72px 80px;
        }

        .slide-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .slide-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 32px;
        }

        .slide-main.center {
          align-items: center;
          text-align: center;
        }

        .slide-main.full-height {
          justify-content: center;
          gap: 40px;
        }

        /* ========== LOGO ========== */
        .slide-logo {
          display: flex;
          align-items: center;
        }

        .slide-logo.large .logo-white,
        .slide-logo.large .logo-neon {
          font-size: 80px;
        }

        .logo-white {
          font-size: 48px;
          font-weight: 950;
          color: #fff;
          letter-spacing: 2px;
        }

        .logo-neon {
          font-size: 48px;
          font-weight: 950;
          color: var(--neon, #00FF41);
          letter-spacing: 2px;
          text-shadow: 0 0 60px rgba(0,255,65,0.6);
        }

        /* ========== PILL ========== */
        .slide-pill {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 16px 24px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 999px;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: rgba(255,255,255,.9);
          backdrop-filter: blur(12px);
          width: fit-content;
        }

        .pill-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--neon, #00FF41);
          box-shadow: 0 0 20px rgba(0,255,65,0.7);
        }

        /* ========== TYPOGRAPHY ========== */
        .slide-headline {
          font-size: 100px;
          font-weight: 950;
          line-height: 0.98;
          color: #fff;
          letter-spacing: -4px;
        }

        .slide-headline.smaller {
          font-size: 82px;
          letter-spacing: -3px;
        }

        .slide-headline.cta-headline {
          font-size: 78px;
          line-height: 1.05;
        }

        .headline-accent {
          color: var(--neon, #00FF41);
          text-shadow: 
            0 0 80px rgba(0,255,65,0.5),
            0 4px 40px rgba(0,255,65,0.3);
        }

        .slide-subtext {
          font-size: 34px;
          font-weight: 500;
          color: rgba(255,255,255,.6);
          line-height: 1.55;
          max-width: 850px;
        }

        .slide-subtext.italic {
          font-style: italic;
          color: rgba(255,255,255,.7);
        }

        .slide-subtext strong {
          color: #fff;
          font-weight: 700;
        }

        .text-neon {
          color: var(--neon, #00FF41);
          font-weight: 700;
        }

        .text-muted {
          color: rgba(255,255,255,.5);
          font-weight: 700;
        }

        .center-text {
          text-align: center;
        }

        /* ========== SWIPE INDICATOR ========== */
        .slide-swipe {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 22px 44px;
          background: rgba(0,255,65,0.1);
          border: 2px solid rgba(0,255,65,0.5);
          border-radius: 60px;
          color: var(--neon, #00FF41);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.3px;
          box-shadow: 
            0 0 50px rgba(0,255,65,0.15),
            inset 0 0 30px rgba(0,255,65,0.05);
          margin-top: 20px;
        }

        .slide-swipe svg {
          animation: swipeArrow 1.2s ease-in-out infinite;
        }

        @keyframes swipeArrow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(12px); }
        }

        /* ========== FOOTER ========== */
        .slide-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .slide-dots {
          display: flex;
          gap: 12px;
        }

        .dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(255,255,255,.25);
        }

        .dot.active {
          background: var(--neon, #00FF41);
          box-shadow: 0 0 20px rgba(0,255,65,0.6);
        }

        .footer-url {
          font-size: 26px;
          font-weight: 600;
          color: rgba(255,255,255,.35);
          letter-spacing: 0.5px;
        }

        /* ========== GLASS CARD ========== */
        .glass-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 28px;
          padding: 52px 56px;
          backdrop-filter: blur(20px);
          box-shadow: 
            0 20px 60px rgba(0,0,0,.4),
            inset 0 1px 0 rgba(255,255,255,.05);
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .step-number {
          width: 76px;
          height: 76px;
          background: linear-gradient(135deg, var(--neon, #00FF41), rgba(0,200,55,0.9));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          font-weight: 900;
          color: #000;
          flex-shrink: 0;
          box-shadow: 0 10px 40px rgba(0,255,65,0.4);
        }

        .step-text {
          font-size: 36px;
          font-weight: 600;
          color: #fff;
        }

        /* ========== GAMES GRID ========== */
        .games-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .game-card {
          aspect-ratio: 460/215;
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255,255,255,.12);
          background: #0a0a0a;
        }

        .game-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(1.15) contrast(1.05);
        }

        .game-card-overlay {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 40%),
            linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%);
        }

        .game-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.08) 0%,
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
          z-index: 2;
        }

        /* ========== BADGE ========== */
        .badge-neon {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 26px;
          background: rgba(0,255,65,0.1);
          border: 1px solid rgba(0,255,65,0.4);
          border-radius: 50px;
          color: var(--neon, #00FF41);
          font-size: 22px;
          font-weight: 700;
        }

        .badge-neon svg {
          flex-shrink: 0;
        }

        /* ========== SHIELD ========== */
        .shield-icon {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, rgba(0,255,65,0.15), rgba(0,255,65,0.05));
          border: 2px solid rgba(0,255,65,0.4);
          border-radius: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .shield-icon svg {
          width: 60px;
          height: 60px;
          color: var(--neon, #00FF41);
        }

        /* ========== DECORATIVE ========== */
        .neon-line {
          width: 160px;
          height: 5px;
          background: linear-gradient(90deg, var(--neon, #00FF41), rgba(0,255,65,0.4));
          border-radius: 3px;
          box-shadow: 0 0 40px rgba(0,255,65,0.5);
          margin: 20px 0;
        }

        .quote-text {
          font-size: 44px;
          font-weight: 600;
          color: #fff;
          line-height: 1.45;
        }

        .highlight-box {
          display: inline;
          background: var(--neon, #00FF41);
          color: #000;
          padding: 6px 28px;
          font-weight: 900;
          box-shadow: 0 10px 50px rgba(0,255,65,0.4);
        }

        /* ========== PILLS ROW ========== */
        .pills-row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .pill {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 32px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 60px;
          color: #fff;
          font-size: 24px;
          font-weight: 600;
        }

        .pill svg {
          color: var(--neon, #00FF41);
          flex-shrink: 0;
        }

        /* ========== IG ICONS ========== */
        .ig-icons {
          display: flex;
          gap: 32px;
          justify-content: center;
          margin-top: 24px;
        }

        .ig-icons svg {
          width: 44px;
          height: 44px;
          color: rgba(255,255,255,.6);
        }

        /* ========== EXPORT MODE ========== */
        .export-mode .slide {
          /* Remove sombras pesadas para export limpo */
          box-shadow: none;
          border-radius: 0;
        }

        .export-mode .slide-bg-mosaic img,
        .export-mode .slide-bg-image img,
        .export-mode .slide-bg-grid img,
        .export-mode .game-card img {
          /* Nitidez extra para export */
          filter: contrast(1.02) saturate(1.05);
        }

        .export-mode .slide-glow {
          /* Reduz blur para render mais limpo */
          filter: blur(40px);
        }

        /* Força anti-aliasing de alta qualidade */
        .slide * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        /* Previne compressão de cores */
        .slide img {
          color-interpolation: sRGB;
        }
      `}</style>
    </div>
  );
};

export default InstagramCarousel;