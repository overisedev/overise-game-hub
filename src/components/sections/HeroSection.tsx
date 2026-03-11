import { useState, useEffect, useCallback } from 'react';

const CATALOG_GAMES = [
  { name: 'The Last of Us Part I', price: 'R$ 249,90', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/header.jpg' },
  { name: 'Resident Evil 4', price: 'R$ 199,90', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg' },
  { name: 'Sekiro', price: 'R$ 199,90', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg' },
  { name: 'Baldur\'s Gate 3', price: 'R$ 199,90', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg' },
  { name: 'God of War', price: 'R$ 199,90', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg' },
  { name: 'Cyberpunk 2077', price: 'R$ 199,90', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg' },
  { name: 'Red Dead 2', price: 'R$ 299,90', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg' },
];

const FEATURED = {
  name: 'Elden Ring',
  dev: 'Ação, RPG · FromSoftware',
  price: 'R$ 249,90',
  img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
};

type Phase = 'idle' | 'activating' | 'unlocked';

export function HeroSection() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');

  const activate = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('activating');
    setProgress(0);
    setStatusText('Sincronizando servidores...');

    const steps = [
      { at: 20, text: 'Ativando escudo anti-ban...' },
      { at: 50, text: 'Validando licença Overise...' },
      { at: 75, text: 'Desbloqueando biblioteca Steam...' },
      { at: 95, text: 'Finalizando...' },
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current);
      const step = steps.find(s => s.at === current);
      if (step) setStatusText(step.text);
      if (current >= 100) {
        clearInterval(interval);
        setStatusText('Biblioteca desbloqueada!');
        setTimeout(() => setPhase('unlocked'), 400);
      }
    }, 35);
  }, [phase]);

  // Auto-replay after unlock
  useEffect(() => {
    if (phase === 'unlocked') {
      const t = setTimeout(() => {
        setPhase('idle');
        setProgress(0);
        setStatusText('');
      }, 6000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const unlocked = phase === 'unlocked';
  const activating = phase === 'activating';

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
        <div className="sim-wrap reveal rd2">
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
                <button className="sim-nav-item active">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  Destaques
                </button>
                <button className="sim-nav-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  Biblioteca
                  <span className="sim-lock-badge">{unlocked ? 'OPEN' : 'LOCKED'}</span>
                </button>
              </div>
              <button
                className={`sim-activate-btn ${activating ? 'loading' : ''} ${unlocked ? 'done' : ''}`}
                onClick={activate}
                disabled={activating}
              >
                {activating ? (
                  <><span className="sim-spinner" /> Ativando...</>
                ) : unlocked ? (
                  <><span className="sim-check">✓</span> Licença Ativa</>
                ) : (
                  <>⚡ Ativar Licença Overise</>
                )}
              </button>
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
                    <button className={`sim-buy-btn ${unlocked ? 'unlocked' : ''}`}>
                      {unlocked ? '▶ Instalar Agora' : 'Requer Compra'}
                    </button>
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
                <div className="sim-catalog-title">Catálogo {unlocked ? 'Desbloqueado' : 'Restrito'}</div>
                <div className="sim-catalog-grid">
                  {CATALOG_GAMES.map((g, i) => (
                    <div key={i} className={`sim-game-card ${unlocked ? 'unlocked' : ''}`}>
                      <img src={g.img} alt={g.name} loading="lazy" />
                      <div className="sim-game-name">{g.name}</div>
                    </div>
                  ))}
                </div>
              </div>
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
        .sim-wrap { max-width: 960px; width: 100%; margin: 40px auto 0; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,.1); box-shadow: 0 0 80px rgba(57,255,20,.05), 0 40px 80px rgba(0,0,0,.55); background: #0d1014; }
        .sim-bar { display: flex; align-items: center; gap: 10px; padding: 10px 16px; background: rgba(255,255,255,.03); border-bottom: 1px solid rgba(255,255,255,.06); }
        .sim-dots { display: flex; gap: 6px; }
        .sim-dots span { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,.12); }
        .sim-dots span:first-child { background: #ff5f57; }
        .sim-dots span:nth-child(2) { background: #febc2e; }
        .sim-dots span:last-child { background: #28c840; }
        .sim-bar-title { font-family: var(--fh); font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--dim); flex: 1; text-align: center; padding-right: 40px; }

        /* ── Simulator Body ── */
        .sim-body { display: flex; min-height: 420px; }

        /* Sidebar */
        .sim-sidebar { width: 200px; background: rgba(255,255,255,.02); border-right: 1px solid rgba(255,255,255,.05); padding: 20px 14px; display: flex; flex-direction: column; gap: 16px; text-align: left; flex-shrink: 0; }
        .sim-logo-text { font-family: var(--fh); font-size: 14px; font-weight: 900; color: var(--accent); letter-spacing: .06em; text-transform: uppercase; opacity: .7; }
        .sim-nav { display: flex; flex-direction: column; gap: 4px; }
        .sim-nav-item { display: flex; align-items: center; gap: 10px; background: none; color: var(--muted); font-family: var(--fb); font-size: 13px; font-weight: 500; padding: 10px 12px; border-radius: 8px; border: none; cursor: default; transition: all .2s; width: 100%; text-align: left; }
        .sim-nav-item.active { background: rgba(255,255,255,.06); color: #fff; }
        .sim-lock-badge { margin-left: auto; font-family: var(--fh); font-size: 9px; font-weight: 800; letter-spacing: .08em; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,.06); color: var(--dim); transition: all .4s; }
        .sim-nav-item .sim-lock-badge { }

        /* Activate button */
        .sim-activate-btn { margin-top: auto; background: var(--accent-dim); border: 1px solid rgba(57,255,20,.2); color: var(--accent); font-family: var(--fh); font-size: 13px; font-weight: 700; letter-spacing: .04em; padding: 14px 12px; border-radius: 8px; cursor: pointer; transition: all .3s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .sim-activate-btn:hover:not(:disabled) { background: rgba(57,255,20,.12); border-color: rgba(57,255,20,.4); }
        .sim-activate-btn.loading { cursor: wait; opacity: .8; }
        .sim-activate-btn.done { background: var(--accent); color: #0b0e11; border-color: var(--accent); box-shadow: 0 0 24px var(--accent-glow); font-weight: 800; }
        .sim-spinner { width: 14px; height: 14px; border: 2px solid rgba(57,255,20,.3); border-top-color: var(--accent); border-radius: 50%; animation: spin .8s linear infinite; flex-shrink: 0; }
        .sim-check { font-weight: 900; font-size: 14px; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Main Area ── */
        .sim-main { flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 20px; overflow: hidden; text-align: left; }

        /* Featured */
        .sim-featured { display: flex; gap: 0; background: rgba(255,255,255,.02); border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,.06); }
        .sim-featured-img { width: 55%; aspect-ratio: 16/9; object-fit: cover; display: block; }
        .sim-featured-info { padding: 20px; display: flex; flex-direction: column; justify-content: center; flex: 1; }
        .sim-featured-name { font-family: var(--fh); font-size: 26px; font-weight: 900; color: #fff; letter-spacing: -.01em; text-transform: uppercase; margin-bottom: 4px; }
        .sim-featured-dev { font-size: 12px; color: var(--dim); margin-bottom: 20px; }
        .sim-featured-price-box { background: rgba(0,0,0,.3); padding: 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,.04); }
        .sim-price-locked-label { font-family: var(--fh); font-size: 10px; font-weight: 800; letter-spacing: .08em; color: var(--red); text-transform: uppercase; text-decoration: line-through; margin-bottom: 2px; }
        .sim-price-value { font-family: var(--fh); font-size: 20px; font-weight: 800; color: var(--muted); margin-bottom: 10px; }
        .sim-price-unlocked { font-family: var(--fh); font-size: 16px; font-weight: 800; letter-spacing: .06em; color: var(--accent); text-transform: uppercase; margin-bottom: 10px; text-shadow: 0 0 12px var(--accent-glow); }
        .sim-buy-btn { width: 100%; padding: 12px; font-family: var(--fh); font-size: 13px; font-weight: 700; letter-spacing: .04em; border-radius: 6px; border: none; cursor: default; transition: all .4s; background: rgba(255,255,255,.06); color: var(--dim); }
        .sim-buy-btn.unlocked { background: var(--accent); color: #0b0e11; box-shadow: 0 0 20px var(--accent-glow); cursor: pointer; }

        /* Progress */
        .sim-progress-area { background: rgba(57,255,20,.03); border: 1px solid rgba(57,255,20,.1); border-radius: 8px; padding: 14px 16px; }
        .sim-progress-text { font-family: var(--fh); font-size: 11px; font-weight: 700; letter-spacing: .06em; color: var(--accent); text-transform: uppercase; margin-bottom: 8px; }
        .sim-progress-track { height: 4px; background: rgba(255,255,255,.06); border-radius: 4px; overflow: hidden; margin-bottom: 6px; }
        .sim-progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent), #4dff33); border-radius: 4px; transition: width .1s linear; }
        .sim-progress-pct { font-family: var(--fh); font-size: 11px; font-weight: 800; color: var(--accent); text-align: right; letter-spacing: .04em; }

        /* Catalog */
        .sim-catalog-title { font-family: var(--fh); font-size: 14px; font-weight: 800; color: #fff; letter-spacing: .02em; text-transform: uppercase; margin-bottom: 10px; }
        .sim-catalog-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; }
        .sim-game-card { border-radius: 6px; overflow: hidden; border: 1px solid rgba(255,255,255,.05); transition: all .6s cubic-bezier(.16,1,.3,1); filter: grayscale(100%); opacity: .4; position: relative; }
        .sim-game-card.unlocked { filter: grayscale(0%); opacity: 1; border-color: rgba(57,255,20,.15); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,.4); }
        .sim-game-card img { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; }
        .sim-game-name { position: absolute; bottom: 0; left: 0; right: 0; padding: 6px 8px; font-size: 9px; font-weight: 700; color: #fff; background: linear-gradient(to top, rgba(0,0,0,.85), transparent); letter-spacing: .02em; text-transform: uppercase; font-family: var(--fh); opacity: 0; transition: opacity .4s; }
        .sim-game-card.unlocked .sim-game-name { opacity: 1; }

        /* ── Buttons & Trust (same as before) ── */
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
          .sim-sidebar { width: 100%; flex-direction: row; flex-wrap: wrap; border-right: none; border-bottom: 1px solid rgba(255,255,255,.05); padding: 14px; gap: 10px; align-items: center; }
          .sim-logo-text { font-size: 12px; }
          .sim-nav { flex-direction: row; gap: 4px; }
          .sim-nav-item { padding: 8px 10px; font-size: 12px; }
          .sim-activate-btn { margin-top: 0; margin-left: auto; padding: 10px 14px; font-size: 11px; }
          .sim-main { padding: 14px; gap: 14px; }
          .sim-featured { flex-direction: column; }
          .sim-featured-img { width: 100%; }
          .sim-featured-info { padding: 14px; }
          .sim-featured-name { font-size: 20px; }
          .sim-price-value { font-size: 16px; }
          .sim-catalog-grid { grid-template-columns: repeat(3, 1fr); }
          .sim-game-card .sim-game-name { font-size: 8px; }
          .hero-btns { flex-direction: column; align-items: stretch; margin-top: 24px; }
          .hero-btns .btn-xl { font-size: 15px; padding: 15px 20px; }
        }
      `}</style>
    </section>
  );
}
