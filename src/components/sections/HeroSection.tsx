import { useState, useEffect, useRef, useCallback } from 'react';

const CATALOG_GAMES = [
  { name: 'The Last of Us Part I', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/header.jpg' },
  { name: 'Resident Evil 4', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg' },
  { name: 'Sekiro', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg' },
  { name: 'Baldur\'s Gate 3', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg' },
  { name: 'God of War', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg' },
  { name: 'Cyberpunk 2077', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg' },
  { name: 'Red Dead Redemption 2', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg' },
];

const FEATURED = {
  name: 'Elden Ring',
  dev: 'Ação, RPG · FromSoftware',
  price: 'R$ 249,90',
  img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
};

type Phase = 'waiting' | 'cursor-moving' | 'cursor-click' | 'activating' | 'unlocked';

export function HeroSection() {
  const [phase, setPhase] = useState<Phase>('waiting');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [cursorPos, setCursorPos] = useState({ x: 70, y: 30 }); // % based
  const [cursorClicked, setCursorClicked] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const unlocked = phase === 'unlocked';
  const activating = phase === 'activating';

  // The full automated animation loop
  const runSequence = useCallback(() => {
    // Phase 1: Cursor starts idle, then moves to the button
    setCursorPos({ x: 70, y: 30 });
    setCursorClicked(false);
    setPhase('waiting');
    setProgress(0);
    setStatusText('');

    // After 1.5s, start moving cursor to button
    setTimeout(() => {
      setPhase('cursor-moving');
      setCursorPos({ x: 12, y: 88 }); // Target: activate button area
    }, 1500);

    // After cursor arrives (1s transition), click
    setTimeout(() => {
      setPhase('cursor-click');
      setCursorClicked(true);
    }, 2800);

    // After click visual, start activation
    setTimeout(() => {
      setCursorClicked(false);
      setPhase('activating');
      setProgress(0);
      setStatusText('Conectando aos servidores Steam...');

      const steps = [
        { at: 15, text: 'Ativando proteção anti-ban...' },
        { at: 35, text: 'Validando licença Overise...' },
        { at: 60, text: 'Sincronizando Biblioteca Steam...' },
        { at: 80, text: 'Desbloqueando catálogo completo...' },
        { at: 95, text: 'Finalizando configuração...' },
      ];

      let current = 0;
      intervalRef.current = setInterval(() => {
        current += 1;
        setProgress(current);
        const step = steps.find(s => s.at === current);
        if (step) setStatusText(step.text);
        if (current >= 100) {
          clearInterval(intervalRef.current);
          setStatusText('Biblioteca Steam desbloqueada com sucesso');
          setTimeout(() => {
            setPhase('unlocked');
            // Move cursor away
            setCursorPos({ x: 55, y: 50 });
          }, 500);
        }
      }, 40);
    }, 3300);
  }, []);

  // Start loop and auto-replay
  useEffect(() => {
    const startDelay = setTimeout(runSequence, 800);
    return () => {
      clearTimeout(startDelay);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    if (phase === 'unlocked') {
      const t = setTimeout(runSequence, 5000);
      return () => clearTimeout(t);
    }
  }, [phase, runSequence]);

  return (
    <section id="hero" className="hero-section">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="hero-badge reveal">Taxa única R$9,97 · licença vitalícia</div>
        <h1 className="hero-h1 reveal rd1">
          Desbloqueie sua Steam.<br />
          <em>+1000 jogos por R$9,97.</em><br />
          <span style={{ fontSize: '.35em', fontWeight: 600, color: 'var(--muted)', letterSpacing: '.02em', textTransform: 'none' }}>
            Taxa única. Licença vitalícia. Sem mensalidade.
          </span>
        </h1>
        <p className="hero-sub reveal rd1">
          Ative o desbloqueador, escolha o jogo e baixe direto pela Steam. <strong>100% seguro, anti-ban e invisível.</strong> Pague uma vez, use pra sempre.
        </p>

        {/* SIMULATOR */}
        <div className="sim-wrap reveal rd2" ref={wrapRef}>
          {/* macOS bar */}
          <div className="sim-bar">
            <div className="sim-dots"><span /><span /><span /></div>
            <div className="sim-bar-title">OVERISE_DESKTOP_CLIENT</div>
          </div>

          <div className="sim-body">
            {/* Sidebar */}
            <div className="sim-sidebar">
              <div className="sim-logo-text">OVERISE</div>
              <div className="sim-nav">
                <div className="sim-nav-item active">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  Destaques
                </div>
                <div className="sim-nav-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  Biblioteca Steam
                  <span className={`sim-lock-badge ${unlocked ? 'open' : ''}`}>{unlocked ? 'ATIVA' : 'BLOQUEADA'}</span>
                </div>
              </div>
              <div className={`sim-activate-btn ${activating ? 'loading' : ''} ${unlocked ? 'done' : ''}`}>
                {activating ? (
                  <><span className="sim-spinner" /> Ativando...</>
                ) : unlocked ? (
                  <>Licença Ativa</>
                ) : (
                  <>Ativar Licença Overise</>
                )}
              </div>
            </div>

            {/* Main content */}
            <div className="sim-main">
              {/* Featured game */}
              <div className="sim-featured">
                <img src={FEATURED.img} alt={FEATURED.name} className="sim-featured-img" />
                <div className="sim-featured-info">
                  <h3 className="sim-featured-name">{FEATURED.name}</h3>
                  <div className="sim-featured-dev">{FEATURED.dev}</div>
                  <div className="sim-featured-price-box">
                    {unlocked ? (
                      <div className="sim-price-unlocked">DESBLOQUEADO</div>
                    ) : (
                      <>
                        <div className="sim-price-locked-label">BLOQUEADO</div>
                        <div className="sim-price-value">{FEATURED.price}</div>
                      </>
                    )}
                    <div className={`sim-buy-btn ${unlocked ? 'unlocked' : ''}`}>
                      {unlocked ? 'Instalar Agora' : 'Requer Compra'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bar during activation */}
              {activating && (
                <div className="sim-progress-area">
                  <div className="sim-progress-text">{statusText}</div>
                  <div className="sim-progress-track">
                    <div className="sim-progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="sim-progress-pct">{progress}%</div>
                </div>
              )}

              {/* Catalog grid */}
              <div className="sim-catalog">
                <div className="sim-catalog-title">{unlocked ? 'Biblioteca Steam — Catálogo Desbloqueado' : 'Biblioteca Steam — Catálogo Restrito'}</div>
                <div className="sim-catalog-grid">
                  {CATALOG_GAMES.map((g, i) => (
                    <div
                      key={i}
                      className={`sim-game-card ${unlocked ? 'unlocked' : ''}`}
                      style={{ transitionDelay: unlocked ? `${i * 80}ms` : '0ms' }}
                    >
                      <img src={g.img} alt={g.name} loading="lazy" />
                      <div className="sim-game-name">{g.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Animated cursor */}
            <div
              className={`sim-cursor ${cursorClicked ? 'clicked' : ''}`}
              style={{
                left: `${cursorPos.x}%`,
                top: `${cursorPos.y}%`,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5.65 3.15l12.7 8.47a1 1 0 0 1-.28 1.78l-4.9 1.63-3.18 4.24a1 1 0 0 1-1.82-.37L5.08 4.13a1 1 0 0 1 .57-.98z" fill="#fff" stroke="rgba(0,0,0,.4)" strokeWidth="1"/>
              </svg>
              {cursorClicked && <span className="sim-cursor-ring" />}
            </div>
          </div>
        </div>

        <div className="hero-btns reveal rd2">
          <a href="#pricing" className="btn btn-accent btn-xl">Desbloquear minha Steam</a>
          <a href="#how" className="btn btn-ghost btn-xl">Ver como funciona</a>
        </div>
        <div className="hero-trust reveal rd3">
          <div className="trust-pill"><span className="chk">✔</span> 7 dias de garantia</div>
          <div className="trust-pill"><span className="chk">✔</span> Jogando em 5 min</div>
          <div className="trust-pill"><span className="chk">✔</span> +5.000 clientes</div>
        </div>
      </div>

      <style>{`
        .hero-section { background: var(--bg); padding: 72px 0 64px; position: relative; overflow: hidden; text-align: center; }
        .hero-section::before { content: ''; position: absolute; top: -120px; left: 50%; transform: translateX(-50%); width: 900px; height: 500px; background: radial-gradient(ellipse,rgba(57,255,20,.035) 0%,transparent 65%); pointer-events: none; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-dim); border: 1px solid rgba(57,255,20,.15); border-radius: 4px; padding: 6px 14px; font-family: var(--fh); font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--accent); margin-bottom: 22px; animation: floatY 3s ease-in-out infinite, borderGlow 3s ease-in-out infinite; }
        .hero-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 6px var(--accent); animation: livep 1.3s ease-in-out infinite; }
        .hero-h1 { font-family: var(--fh); font-size: clamp(36px,7vw,88px); font-weight: 900; line-height: .9; text-transform: uppercase; color: #fff; margin-bottom: 20px; }
        .hero-h1 em { color: var(--accent); font-style: normal; }
        .hero-sub { font-size: 17px; font-weight: 400; color: var(--muted); max-width: 560px; line-height: 1.75; margin: 0 auto 0; }
        .hero-sub strong { color: var(--white); font-weight: 600; }

        /* ── Simulator Shell ── */
        .sim-wrap { max-width: 960px; width: 100%; margin: 40px auto 0; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,.08); box-shadow: 0 0 80px rgba(57,255,20,.04), 0 40px 80px rgba(0,0,0,.55); background: #0c0e12; }
        .sim-bar { display: flex; align-items: center; gap: 10px; padding: 11px 16px; background: rgba(255,255,255,.025); border-bottom: 1px solid rgba(255,255,255,.05); }
        .sim-dots { display: flex; gap: 7px; }
        .sim-dots span { width: 11px; height: 11px; border-radius: 50%; }
        .sim-dots span:first-child { background: #ff5f57; }
        .sim-dots span:nth-child(2) { background: #febc2e; }
        .sim-dots span:last-child { background: #28c840; }
        .sim-bar-title { font-family: var(--fh); font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.25); flex: 1; text-align: center; padding-right: 48px; }

        /* ── Simulator Body ── */
        .sim-body { display: flex; min-height: 420px; position: relative; }

        /* Sidebar */
        .sim-sidebar { width: 200px; background: rgba(255,255,255,.015); border-right: 1px solid rgba(255,255,255,.04); padding: 20px 14px; display: flex; flex-direction: column; gap: 16px; text-align: left; flex-shrink: 0; }
        .sim-logo-text { font-family: var(--fh); font-size: 13px; font-weight: 900; color: rgba(255,255,255,.3); letter-spacing: .08em; text-transform: uppercase; }
        .sim-nav { display: flex; flex-direction: column; gap: 3px; }
        .sim-nav-item { display: flex; align-items: center; gap: 10px; color: var(--muted); font-family: var(--fb); font-size: 13px; font-weight: 500; padding: 10px 12px; border-radius: 8px; transition: all .2s; }
        .sim-nav-item.active { background: rgba(255,255,255,.05); color: #fff; }
        .sim-lock-badge { margin-left: auto; font-family: var(--fh); font-size: 8px; font-weight: 800; letter-spacing: .06em; padding: 3px 7px; border-radius: 3px; background: rgba(255,68,68,.1); color: var(--red); transition: all .5s; }
        .sim-lock-badge.open { background: rgba(57,255,20,.1); color: var(--accent); }

        /* Activate button */
        .sim-activate-btn { margin-top: auto; background: var(--accent-dim); border: 1px solid rgba(57,255,20,.15); color: var(--accent); font-family: var(--fh); font-size: 12px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; padding: 14px 12px; border-radius: 8px; transition: all .3s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .sim-activate-btn.loading { opacity: .7; }
        .sim-activate-btn.done { background: var(--accent); color: #0b0e11; border-color: var(--accent); box-shadow: 0 0 24px var(--accent-glow); font-weight: 800; }
        .sim-spinner { width: 12px; height: 12px; border: 2px solid rgba(57,255,20,.25); border-top-color: var(--accent); border-radius: 50%; animation: spin .7s linear infinite; flex-shrink: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Animated Cursor ── */
        .sim-cursor { position: absolute; z-index: 20; pointer-events: none; transition: left 1.2s cubic-bezier(.4,.0,.2,1), top 1.2s cubic-bezier(.4,.0,.2,1); filter: drop-shadow(0 2px 6px rgba(0,0,0,.5)); }
        .sim-cursor.clicked svg { transform: scale(.85); }
        .sim-cursor svg { transition: transform .15s ease; }
        .sim-cursor-ring { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: rgba(57,255,20,.25); animation: cursorRing .4s ease-out forwards; pointer-events: none; }
        @keyframes cursorRing { 0% { transform: scale(.5); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }

        /* ── Main Area ── */
        .sim-main { flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 18px; overflow: hidden; text-align: left; }

        /* Featured */
        .sim-featured { display: flex; gap: 0; background: rgba(255,255,255,.02); border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,.05); }
        .sim-featured-img { width: 55%; aspect-ratio: 16/9; object-fit: cover; display: block; }
        .sim-featured-info { padding: 20px; display: flex; flex-direction: column; justify-content: center; flex: 1; }
        .sim-featured-name { font-family: var(--fh); font-size: 24px; font-weight: 900; color: #fff; letter-spacing: -.01em; text-transform: uppercase; margin-bottom: 4px; }
        .sim-featured-dev { font-size: 12px; color: var(--dim); margin-bottom: 18px; font-weight: 500; }
        .sim-featured-price-box { background: rgba(0,0,0,.25); padding: 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,.03); }
        .sim-price-locked-label { font-family: var(--fh); font-size: 10px; font-weight: 800; letter-spacing: .08em; color: var(--red); text-transform: uppercase; text-decoration: line-through; margin-bottom: 2px; }
        .sim-price-value { font-family: var(--fh); font-size: 20px; font-weight: 800; color: rgba(255,255,255,.5); margin-bottom: 10px; }
        .sim-price-unlocked { font-family: var(--fh); font-size: 14px; font-weight: 800; letter-spacing: .08em; color: var(--accent); text-transform: uppercase; margin-bottom: 10px; text-shadow: 0 0 16px var(--accent-glow); }
        .sim-buy-btn { width: 100%; padding: 11px; font-family: var(--fh); font-size: 12px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; border-radius: 6px; text-align: center; transition: all .5s; background: rgba(255,255,255,.04); color: var(--dim); }
        .sim-buy-btn.unlocked { background: var(--accent); color: #0b0e11; box-shadow: 0 0 20px var(--accent-glow); }

        /* Progress */
        .sim-progress-area { background: rgba(57,255,20,.025); border: 1px solid rgba(57,255,20,.08); border-radius: 8px; padding: 14px 16px; }
        .sim-progress-text { font-family: var(--fb); font-size: 12px; font-weight: 600; color: var(--accent); margin-bottom: 10px; }
        .sim-progress-track { height: 3px; background: rgba(255,255,255,.05); border-radius: 3px; overflow: hidden; margin-bottom: 6px; }
        .sim-progress-fill { height: 100%; background: var(--accent); border-radius: 3px; transition: width .08s linear; box-shadow: 0 0 8px var(--accent-glow); }
        .sim-progress-pct { font-family: var(--fh); font-size: 11px; font-weight: 800; color: var(--accent); text-align: right; letter-spacing: .04em; }

        /* Catalog */
        .sim-catalog-title { font-family: var(--fh); font-size: 12px; font-weight: 700; color: rgba(255,255,255,.5); letter-spacing: .06em; text-transform: uppercase; margin-bottom: 10px; }
        .sim-catalog-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }
        .sim-game-card { border-radius: 5px; overflow: hidden; border: 1px solid rgba(255,255,255,.04); filter: grayscale(100%) brightness(.6); opacity: .5; position: relative; transition: all .6s cubic-bezier(.16,1,.3,1); }
        .sim-game-card.unlocked { filter: grayscale(0%) brightness(1); opacity: 1; border-color: rgba(57,255,20,.12); box-shadow: 0 4px 16px rgba(0,0,0,.4); }
        .sim-game-card img { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; }
        .sim-game-name { position: absolute; bottom: 0; left: 0; right: 0; padding: 5px 6px; font-size: 8px; font-weight: 700; color: #fff; background: linear-gradient(to top, rgba(0,0,0,.85), transparent); letter-spacing: .03em; text-transform: uppercase; font-family: var(--fh); opacity: 0; transition: opacity .4s; }
        .sim-game-card.unlocked .sim-game-name { opacity: 1; }

        /* ── Buttons & Trust ── */
        .hero-btns { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 32px; margin-bottom: 24px; }
        .hero-trust { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
        .trust-pill { display: flex; align-items: center; gap: 6px; font-family: var(--fh); font-size: 11px; font-weight: 700; letter-spacing: .04em; color: var(--dim); transition: all .2s ease; }
        .trust-pill:hover { color: var(--accent); transform: scale(1.05); }
        .trust-pill .chk { color: var(--accent); font-weight: 900; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .hero-section { padding: 48px 0; }
          .hero-h1 { font-size: clamp(28px,8.5vw,48px); }
          .hero-sub { font-size: 15px; }
          .sim-wrap { margin: 24px 0 0; border-radius: 10px; }
          .sim-body { flex-direction: column; min-height: auto; }
          .sim-sidebar { width: 100%; flex-direction: row; flex-wrap: wrap; border-right: none; border-bottom: 1px solid rgba(255,255,255,.04); padding: 12px; gap: 8px; align-items: center; }
          .sim-logo-text { font-size: 11px; }
          .sim-nav { flex-direction: row; gap: 4px; }
          .sim-nav-item { padding: 8px 10px; font-size: 11px; gap: 6px; }
          .sim-activate-btn { margin-top: 0; margin-left: auto; padding: 10px 14px; font-size: 10px; }
          .sim-main { padding: 12px; gap: 12px; }
          .sim-featured { flex-direction: column; }
          .sim-featured-img { width: 100%; }
          .sim-featured-info { padding: 14px; }
          .sim-featured-name { font-size: 18px; }
          .sim-price-value { font-size: 16px; }
          .sim-catalog-grid { grid-template-columns: repeat(4, 1fr); }
          .sim-cursor { display: none; }
          .hero-btns { flex-direction: column; align-items: stretch; margin-top: 24px; }
          .hero-btns .btn-xl { font-size: 15px; padding: 15px 20px; }
        }
      `}</style>
    </section>
  );
}
