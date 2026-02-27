import { useRef, useState } from 'react';

// Static featured games for the mockup background
const mockupGames = [
  { id: 1, name: 'Elden Ring', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900.jpg' },
  { id: 2, name: 'God of War', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_600x900.jpg' },
  { id: 3, name: 'Hogwarts', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_600x900.jpg' },
  { id: 4, name: 'Spider-Man', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/library_600x900.jpg' },
  { id: 5, name: 'Forza 5', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900.jpg' },
];

type WizardState = 1 | 2 | 3 | 4;

const WIZARD_STEPS: Record<WizardState, { title: string; text: string; button: string; loader: string }> = {
  1: {
    title: 'SINCRONIZAR SERVIDORES',
    text: 'O Overise se conecta direto com a loja oficial. Baixe os jogos com segurança máxima e sem enrolação.',
    button: 'SINCRONIZAR AGORA ⚡',
    loader: 'Buscando conexão segura...',
  },
  2: {
    title: 'ATIVAR PROTEÇÃO',
    text: 'Sua conta 100% blindada. Criamos um escudo protetor para você jogar sem risco de ban.',
    button: 'LIGAR ESCUDO ANTI-BAN 🛡️',
    loader: 'Ativando barreira de proteção...',
  },
  3: {
    title: 'DESBLOQUEAR A STEAM',
    text: 'Vamos neutralizar as travas da loja e liberar o seu passe livre para os melhores jogos do mercado.',
    button: 'DESBLOQUEAR MINHA STEAM 🔓',
    loader: 'Preparando sua nova biblioteca...',
  },
  4: {
    title: '✅ TUDO PRONTO PARA JOGAR!',
    text: 'O sistema configurou o seu acesso. Falta apenas a sua taxa de ativação para usar o app no seu PC.',
    button: 'PEGAR MINHA CHAVE (R$ 9,97)',
    loader: '',
  },
};

export function HowItWorksSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [wizardState, setWizardState] = useState<WizardState>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
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

  const handleWizardClick = () => {
    if (wizardState === 4) return;
    const step = WIZARD_STEPS[wizardState];
    setIsLoading(true);
    setLoaderText(step.loader);
    setTimeout(() => {
      setIsLoading(false);
      setLoaderText('');
      setWizardState((prev) => (prev + 1) as WizardState);
    }, 1500);
  };

  const currentStep = WIZARD_STEPS[wizardState];
  const isComplete = wizardState === 4;

  return (
    <section id="como-funciona" className="section section-light">
      <div className="container-main">
        <div className="hiw-grid">
          {/* Left Content */}
          <div className="hiw-content">
            <span className="hiw-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Windows App
            </span>

            <h2 className="hiw-title">
              Overise App<br/>
              <span className="hiw-title-accent">Baixe jogos em segundos</span>
            </h2>

            <p className="hiw-desc">
              O jeito mais fácil de acessar sua biblioteca.<br/>
              Escolha o jogo, clique e baixe direto pela Steam.
            </p>

            <div className="hiw-features">
              <span className="hiw-feature">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                Download Instantâneo
              </span>
              <span className="hiw-feature">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                100% Seguro
              </span>
              <span className="hiw-feature">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Acesso Vitalício
              </span>
            </div>

            <a href="#planos" className="hiw-cta">
              Começar Agora
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Right - 3D Tilting Mockup with Interactive Wizard */}
          <div className="hiw-mockup-container">
            <div 
              ref={cardRef}
              className={`hiw-mockup-wrapper ${isHovering ? 'hovering' : ''}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              style={{
                transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
              }}
            >
              {/* Glow effect */}
              <div className="hiw-mockup-glow" />
              
              {/* Device frame */}
              <div className="hiw-device">
                {/* Title bar */}
                <div className="hiw-titlebar">
                  <div className="hiw-titlebar-dots">
                    <span className="hiw-dot-red"></span>
                    <span className="hiw-dot-yellow"></span>
                    <span className="hiw-dot-green"></span>
                  </div>
                  <span className="hiw-titlebar-text">Overise</span>
                </div>

                {/* App content area with blur + wizard overlay */}
                <div className="hiw-app-area">
                  {/* Background: game library (blurred until state 4) */}
                  <div className={`hiw-bg-content ${isComplete ? 'hiw-bg-revealed' : ''}`}>
                    <div className="hiw-bg-sidebar">
                      <div className="hiw-bg-logo">
                        <span style={{ color: '#fff' }}>OVER</span><span style={{ color: 'var(--neon)' }}>ISE</span>
                      </div>
                      <div className="hiw-bg-menu">
                        <div className="hiw-bg-menu-item active">
                          <span className="hiw-bg-dot"></span>
                          Biblioteca
                        </div>
                        <div className="hiw-bg-menu-item">Downloads</div>
                        <div className="hiw-bg-menu-item">Configurações</div>
                      </div>
                    </div>
                    <div className="hiw-bg-main">
                      <div className="hiw-bg-featured">
                        <img src={mockupGames[0].cover} alt={mockupGames[0].name} />
                        <div className="hiw-bg-featured-overlay">
                          <span className="hiw-bg-tag">Destaque</span>
                          <h4>{mockupGames[0].name}</h4>
                          <span className="hiw-bg-price">Liberado</span>
                        </div>
                      </div>
                      <div className="hiw-bg-grid">
                        {mockupGames.slice(1, 5).map((game) => (
                          <div key={game.id} className="hiw-bg-game">
                            <img src={game.cover} alt={game.name} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Blur overlay (disappears on state 4) */}
                  {!isComplete && <div className="hiw-blur-overlay" />}

                  {/* Wizard card */}
                  <div className={`hiw-wizard ${isComplete ? 'hiw-wizard-success' : ''}`}>
                    {/* Progress dots */}
                    <div className="hiw-progress">
                      {[1, 2, 3, 4].map((s) => (
                        <div key={s} className={`hiw-progress-dot ${s <= wizardState ? 'active' : ''} ${s === wizardState ? 'current' : ''}`} />
                      ))}
                    </div>

                    <h3 className="hiw-wizard-title">{currentStep.title}</h3>
                    <p className="hiw-wizard-text">{currentStep.text}</p>

                    {isLoading ? (
                      <div className="hiw-loader-area">
                        <div className="hiw-loader-bar">
                          <div className="hiw-loader-fill" />
                        </div>
                        <span className="hiw-loader-text">{loaderText}</span>
                      </div>
                    ) : isComplete ? (
                      <div className="hiw-success-area">
                        <a href="#planos" className="hiw-buy-btn">
                          {currentStep.button}
                        </a>
                        <span className="hiw-success-footer">🔒 Acesso Vitalício • Liberação Imediata no E-mail</span>
                      </div>
                    ) : (
                      <button className="hiw-wizard-btn" onClick={handleWizardClick}>
                        {currentStep.button}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Reflection */}
              <div className="hiw-reflection" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hiw-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 980px) {
          .hiw-grid { grid-template-columns: 1fr; gap: 40px; }
        }

        .hiw-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        @media (max-width: 980px) {
          .hiw-content { align-items: center; text-align: center; }
        }

        .hiw-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 14px;
          background: rgba(0,255,65,.08); border: 1px solid rgba(0,255,65,.25);
          border-radius: 999px; font-size: 12px; font-weight: 700;
          color: var(--neon); margin-bottom: 20px;
        }

        .hiw-title {
          font-size: clamp(28px, 4vw, 40px); font-weight: 950; color: #fff;
          margin: 0 0 16px; letter-spacing: -1.5px; line-height: 1.1;
        }
        .hiw-title-accent { color: var(--neon); }

        .hiw-desc {
          font-size: 16px; color: var(--muted); line-height: 1.7;
          margin: 0 0 24px; max-width: 400px;
        }

        .hiw-features { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; }
        .hiw-feature {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 16px; background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.08); border-radius: 10px;
          font-size: 13px; font-weight: 600; color: rgba(255,255,255,.85);
        }
        .hiw-feature svg { color: var(--neon); }

        .hiw-cta {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 28px; background: var(--neon); color: #000;
          font-size: 14px; font-weight: 900; text-transform: uppercase;
          letter-spacing: 0.5px; border-radius: 14px;
          text-decoration: none; transition: 0.25s ease;
        }
        .hiw-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0,255,65,.35);
        }

        /* 3D Mockup */
        .hiw-mockup-container { display: flex; justify-content: center; perspective: 1000px; }
        .hiw-mockup-wrapper {
          position: relative; transition: transform 0.1s ease-out;
          transform-style: preserve-3d; will-change: transform;
        }
        .hiw-mockup-wrapper.hovering { transition: transform 0.05s ease-out; }

        .hiw-mockup-glow {
          position: absolute; inset: -40px;
          background: radial-gradient(ellipse at center, rgba(0,255,65,.15), transparent 70%);
          pointer-events: none; opacity: 0; transition: opacity 0.3s ease;
        }
        .hiw-mockup-wrapper.hovering .hiw-mockup-glow { opacity: 1; }

        .hiw-device {
          width: 480px;
          background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
          border-radius: 16px; border: 1px solid rgba(255,255,255,.1);
          overflow: hidden;
          box-shadow: 0 50px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.05) inset;
          transform-style: preserve-3d;
        }
        @media (max-width: 640px) { .hiw-device { width: 340px; } }

        .hiw-titlebar {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px; background: rgba(0,0,0,.5);
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .hiw-titlebar-dots { display: flex; gap: 6px; }
        .hiw-titlebar-dots span { width: 10px; height: 10px; border-radius: 50%; }
        .hiw-dot-red { background: #ff5f57; }
        .hiw-dot-yellow { background: #febc2e; }
        .hiw-dot-green { background: #28c840; }
        .hiw-titlebar-text { font-size: 12px; font-weight: 700; color: rgba(255,255,255,.5); letter-spacing: 0.5px; }

        /* App area with stacked layers */
        .hiw-app-area {
          position: relative;
          height: 340px;
          overflow: hidden;
        }
        @media (max-width: 640px) { .hiw-app-area { height: 280px; } }

        /* Background game library */
        .hiw-bg-content {
          position: absolute; inset: 0;
          display: flex;
          filter: blur(6px) brightness(0.5);
          transition: filter 0.6s ease, transform 0.6s ease;
          transform: scale(1.05);
        }
        .hiw-bg-content.hiw-bg-revealed {
          filter: blur(0px) brightness(1);
          transform: scale(1);
        }

        .hiw-bg-sidebar {
          width: 120px; background: rgba(0,0,0,.4);
          border-right: 1px solid rgba(255,255,255,.06);
          padding: 16px 12px; display: flex; flex-direction: column;
        }
        @media (max-width: 640px) { .hiw-bg-sidebar { width: 90px; padding: 12px 8px; } }

        .hiw-bg-logo { font-size: 14px; font-weight: 900; margin-bottom: 20px; }
        .hiw-bg-menu { display: flex; flex-direction: column; gap: 6px; }
        .hiw-bg-menu-item {
          font-size: 11px; color: rgba(255,255,255,.4);
          padding: 8px 10px; border-radius: 6px; display: flex; align-items: center; gap: 6px;
        }
        .hiw-bg-menu-item.active { background: rgba(0,255,65,.1); color: var(--neon); }
        .hiw-bg-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--neon); }

        .hiw-bg-main { flex: 1; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
        .hiw-bg-featured {
          position: relative; height: 140px; border-radius: 10px; overflow: hidden;
        }
        @media (max-width: 640px) { .hiw-bg-featured { height: 100px; } }
        .hiw-bg-featured img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
        .hiw-bg-featured-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.9), transparent 70%);
          display: flex; flex-direction: column; justify-content: flex-end; padding: 12px;
        }
        .hiw-bg-tag {
          position: absolute; top: 10px; left: 10px;
          padding: 4px 8px; background: var(--neon); color: #000;
          font-size: 9px; font-weight: 800; border-radius: 4px; text-transform: uppercase;
        }
        .hiw-bg-featured-overlay h4 { margin: 0; font-size: 14px; font-weight: 800; color: #fff; }
        .hiw-bg-price { font-size: 11px; color: var(--neon); font-weight: 700; }

        .hiw-bg-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; flex: 1; }
        .hiw-bg-game { border-radius: 6px; overflow: hidden; background: rgba(255,255,255,.05); }
        .hiw-bg-game img { width: 100%; height: 100%; object-fit: cover; }

        /* Blur overlay */
        .hiw-blur-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 1;
        }

        /* Wizard card */
        .hiw-wizard {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          width: 85%;
          max-width: 340px;
          background: rgba(10,10,10,.92);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 16px;
          padding: 28px 24px;
          text-align: center;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .hiw-wizard-success {
          border-color: rgba(0,255,65,.4);
          box-shadow: 0 0 40px rgba(0,255,65,.15), 0 0 0 1px rgba(0,255,65,.2);
        }

        /* Progress dots */
        .hiw-progress { display: flex; gap: 8px; justify-content: center; margin-bottom: 20px; }
        .hiw-progress-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,.15); transition: all 0.3s ease;
        }
        .hiw-progress-dot.active { background: var(--neon); }
        .hiw-progress-dot.current {
          box-shadow: 0 0 10px var(--neon);
          transform: scale(1.2);
        }

        .hiw-wizard-title {
          font-size: 16px; font-weight: 800; color: #fff;
          margin: 0 0 10px; letter-spacing: 0.5px;
        }
        @media (max-width: 640px) { .hiw-wizard-title { font-size: 14px; } }

        .hiw-wizard-text {
          font-size: 13px; color: rgba(255,255,255,.65);
          line-height: 1.6; margin: 0 0 20px;
        }
        @media (max-width: 640px) { .hiw-wizard-text { font-size: 12px; } }

        /* Pulsing action button */
        .hiw-wizard-btn {
          width: 100%; padding: 14px 20px;
          background: var(--neon); color: #000;
          border: none; border-radius: 12px;
          font-size: 13px; font-weight: 900;
          cursor: pointer; transition: all 0.25s ease;
          text-transform: uppercase; letter-spacing: 0.3px;
          animation: hiw-pulse-btn 2s ease-in-out infinite;
          font-family: 'Sora', system-ui, sans-serif;
        }
        .hiw-wizard-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,255,65,.4);
        }
        @keyframes hiw-pulse-btn {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,65,.4); }
          50% { box-shadow: 0 0 0 8px rgba(0,255,65,0); }
        }

        /* Loader */
        .hiw-loader-area { display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .hiw-loader-bar {
          width: 100%; height: 4px; background: rgba(255,255,255,.1);
          border-radius: 2px; overflow: hidden;
        }
        .hiw-loader-fill {
          height: 100%; width: 30%; background: var(--neon);
          border-radius: 2px; animation: hiw-loading 1s ease-in-out infinite;
        }
        @keyframes hiw-loading {
          0% { transform: translateX(-100%); width: 30%; }
          50% { width: 60%; }
          100% { transform: translateX(400%); width: 30%; }
        }
        .hiw-loader-text {
          font-size: 12px; color: var(--neon); font-weight: 600;
          font-family: 'Consolas', monospace;
        }

        /* Success area */
        .hiw-success-area { display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .hiw-buy-btn {
          display: block; width: 100%; padding: 16px 20px;
          background: var(--neon); color: #000;
          border: none; border-radius: 12px;
          font-size: 14px; font-weight: 900;
          text-align: center; text-decoration: none;
          text-transform: uppercase; letter-spacing: 0.3px;
          transition: all 0.25s ease;
          animation: hiw-pulse-btn 2s ease-in-out infinite;
          font-family: 'Sora', system-ui, sans-serif;
        }
        .hiw-buy-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,255,65,.4);
        }
        .hiw-success-footer {
          font-size: 11px; color: rgba(255,255,255,.45);
          font-weight: 500;
        }

        /* Reflection */
        .hiw-reflection {
          position: absolute; left: 10%; right: 10%; bottom: -60px;
          height: 60px; background: linear-gradient(to bottom, rgba(0,255,65,.08), transparent);
          filter: blur(20px); transform: scaleY(-0.3); pointer-events: none;
        }
      `}</style>
    </section>
  );
}
