import { useState, useEffect, useRef } from 'react';

const FEATURED_GAMES = [
  { name: 'Elden Ring', dev: 'Ação, RPG · FromSoftware', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg' },
  { name: 'God of War', dev: 'Ação, Aventura · Santa Monica', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg' },
  { name: 'Red Dead Redemption 2', dev: 'Ação, Aventura · Rockstar', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg' },
  { name: 'Cyberpunk 2077', dev: 'RPG, Mundo Aberto · CD Projekt', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg' },
  { name: "Baldur's Gate 3", dev: 'RPG · Larian Studios', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg' },
];

FEATURED_GAMES.forEach(g => { const i = new Image(); i.src = g.img; });

type Phase = 'locked' | 'cursor-moving' | 'cursor-clicking' | 'unlocking' | 'unlocked' | 'switching';

export function HeroSection() {
  const [gameIdx, setGameIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('locked');
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    let idx = 0;

    const wait = (ms: number) =>
      new Promise<void>((res, rej) => {
        setTimeout(() => (alive.current ? res() : rej()), ms);
      });

    (async () => {
      try {
        while (alive.current) {
          // Show locked game
          setPhase('locked');
          setGameIdx(idx);
          await wait(2500);

          // Cursor slides to button
          setPhase('cursor-moving');
          await wait(1500);

          // Cursor clicks
          setPhase('cursor-clicking');
          await wait(500);

          // Progress bar fills
          setPhase('unlocking');
          await wait(2200);

          // Show unlocked
          setPhase('unlocked');
          await wait(4000);

          // Switch: disable transitions, swap game already locked
          idx = (idx + 1) % FEATURED_GAMES.length;
          setPhase('switching');
          setGameIdx(idx);
          await wait(80); // one frame for no-transition grayscale to apply
        }
      } catch { /* unmounted */ }
    })();

    return () => { alive.current = false; };
  }, []);

  const game = FEATURED_GAMES[gameIdx];
  const isUnlocked = phase === 'unlocked';
  const isUnlocking = phase === 'unlocking';
  const isSwitching = phase === 'switching';

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-layout">
        <div className="hero-left">
          <div className="hero-badge reveal">Taxa única R$9,97 · licença vitalícia</div>
          <h1 className="hero-h1 reveal rd1">
            Desbloqueie sua Steam.<br />
            <em>+1000 jogos por R$9,97.</em>
          </h1>
          <p className="hero-sub reveal rd1">
            Ative o desbloqueador, escolha o jogo e baixe direto pela Steam.{' '}
            <strong>100% seguro, anti-ban e invisível.</strong> Pague uma vez, use pra sempre.
          </p>
          <div className="hero-btns reveal rd1">
            <a href="#pricing" className="btn btn-accent btn-xl">Desbloquear minha Steam</a>
            <a href="#how" className="btn btn-ghost btn-xl">Ver como funciona</a>
          </div>
          <div className="hero-trust reveal rd1">
            <div className="trust-pill"><span className="chk">✔</span> 7 dias de garantia</div>
            <div className="trust-pill"><span className="chk">✔</span> Jogando em 5 min</div>
            <div className="trust-pill"><span className="chk">✔</span> +5.000 clientes</div>
          </div>
        </div>

        <div className="hero-right">
          <div className={`sim-wrap ${isUnlocked ? 'sim-unlocked' : ''} ${isSwitching ? 'sim-notransition' : ''}`}>
            <div className="sim-header">
              <div className="sim-logo">OVERISE</div>
              <div className={`sim-status ${isUnlocked ? 'on' : ''}`}>
                {isUnlocked ? '● DESBLOQUEADO' : '○ BLOQUEADO'}
              </div>
            </div>
            <div className="sim-body">
              <div className="sim-img" style={{ backgroundImage: `url(${game.img})` }} />
              <div className="sim-overlay" />
              <div className="sim-info">
                <div className="sim-name">{game.name}</div>
                <div className="sim-dev">{game.dev}</div>
                {isUnlocking ? (
                  <div className="sim-progress">
                    <div className="sim-progress-fill" />
                    <span className="sim-progress-text">Desbloqueando...</span>
                  </div>
                ) : (
                  <div className={`sim-btn ${isUnlocked ? 'sim-btn-go' : ''} ${phase === 'cursor-clicking' ? 'sim-btn-pressed' : ''}`}>
                    {isUnlocked ? '▶ Instalar Agora' : 'Desbloquear Jogo'}
                  </div>
                )}
              </div>

              {(phase === 'cursor-moving' || phase === 'cursor-clicking') && (
                <div className={`sim-cursor ${phase === 'cursor-clicking' ? 'sim-cursor-click' : 'sim-cursor-move'}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 3l14 8-6 2-4 6-4-16z" fill="#fff" stroke="#111" strokeWidth="1.2" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section { background:var(--bg); padding:48px 0 64px; position:relative; overflow:hidden; }
        .hero-section::before { content:''; position:absolute; top:-120px; left:50%; transform:translateX(-50%); width:900px; height:500px; background:radial-gradient(ellipse,rgba(57,255,20,.035) 0%,transparent 65%); pointer-events:none; }

        .hero-layout { display:flex; align-items:center; gap:48px; }
        .hero-left { flex:1; text-align:left; }
        .hero-right { flex:1; display:flex; justify-content:flex-end; }

        .hero-badge { display:inline-flex; align-items:center; gap:8px; background:var(--accent-dim); border:1px solid rgba(57,255,20,.15); border-radius:4px; padding:5px 12px; font-family:var(--fh); font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--accent); margin-bottom:16px; animation:floatY 3s ease-in-out infinite, borderGlow 3s ease-in-out infinite; }
        .hero-badge::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--accent); box-shadow:0 0 6px var(--accent); animation:livep 1.3s ease-in-out infinite; }
        .hero-h1 { font-family:var(--fh); font-size:clamp(36px,5vw,72px); font-weight:900; line-height:.9; text-transform:uppercase; color:#fff; margin-bottom:16px; }
        .hero-h1 em { color:var(--accent); font-style:normal; }
        .hero-sub { font-size:16px; font-weight:400; color:var(--muted); max-width:480px; line-height:1.65; font-family:var(--fb); }
        .hero-sub strong { color:var(--white); font-weight:600; }
        .hero-btns { display:flex; gap:10px; flex-wrap:wrap; margin-top:24px; margin-bottom:18px; }
        .hero-trust { display:flex; gap:16px; flex-wrap:wrap; }
        .trust-pill { display:flex; align-items:center; gap:6px; font-family:var(--fh); font-size:11px; font-weight:700; letter-spacing:.04em; color:var(--dim); transition:all .2s; }
        .trust-pill:hover { color:var(--accent); transform:scale(1.05); }
        .trust-pill .chk { color:var(--accent); font-weight:900; }

        .sim-wrap { max-width:520px; width:100%; border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,.08); background:#0c0e12; box-shadow:0 0 60px rgba(57,255,20,.03),0 24px 56px rgba(0,0,0,.5); transition:border-color .6s, box-shadow .6s; }
        .sim-wrap.sim-unlocked { border-color:rgba(57,255,20,.22); box-shadow:0 0 80px rgba(57,255,20,.12),0 24px 56px rgba(0,0,0,.5); }
        .sim-wrap.sim-notransition, .sim-wrap.sim-notransition .sim-img { transition:none !important; }

        .sim-header { display:flex; align-items:center; justify-content:space-between; padding:12px 18px; background:#111318; border-bottom:1px solid rgba(255,255,255,.05); }
        .sim-logo { font-family:var(--fh); font-size:12px; font-weight:800; color:rgba(255,255,255,.3); letter-spacing:.1em; text-transform:uppercase; }
        .sim-status { font-family:var(--fb); font-size:10px; font-weight:700; letter-spacing:.06em; padding:5px 12px; border-radius:4px; background:rgba(255,68,68,.08); color:var(--red); transition:all .5s; text-transform:uppercase; }
        .sim-status.on { background:rgba(57,255,20,.1); color:var(--accent); box-shadow:0 0 14px rgba(57,255,20,.15); }

        .sim-body { position:relative; overflow:hidden; }

        .sim-img { width:100%; padding-bottom:46.7%; background-size:cover; background-position:center; transition:filter .8s ease, transform .8s ease; filter:grayscale(85%) brightness(.55); }
        .sim-unlocked .sim-img { filter:grayscale(0%) brightness(1); transform:scale(1.03); }

        .sim-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(11,14,17,.92) 0%, rgba(11,14,17,.4) 35%, transparent 65%); pointer-events:none; }

        .sim-info { position:absolute; bottom:0; left:0; right:0; padding:18px 20px; text-align:left; }
        .sim-name { font-family:var(--fh); font-size:22px; font-weight:800; color:#fff; text-transform:uppercase; letter-spacing:-.01em; line-height:1.1; margin-bottom:3px; }
        .sim-dev { font-family:var(--fb); font-size:12px; color:rgba(255,255,255,.5); font-weight:500; margin-bottom:12px; }

        .sim-btn { display:inline-flex; align-items:center; gap:6px; font-family:var(--fb); font-size:12px; font-weight:700; padding:10px 20px; border-radius:6px; background:rgba(255,255,255,.08); color:var(--dim); letter-spacing:.02em; transition:all .3s; position:relative; }
        .sim-btn-go { background:var(--accent); color:#0b0e11; box-shadow:0 0 20px rgba(57,255,20,.25); }
        .sim-btn-pressed { transform:scale(0.9); background:rgba(57,255,20,.15); color:var(--accent); box-shadow:0 0 12px rgba(57,255,20,.2); }

        .sim-progress { position:relative; height:36px; background:rgba(255,255,255,.06); border-radius:6px; overflow:hidden; }
        .sim-progress-fill { position:absolute; top:0; left:0; height:100%; width:0; background:linear-gradient(90deg, var(--accent), #2dd40e); border-radius:6px; animation:progressFill 2.2s ease-in-out forwards; }
        .sim-progress-text { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-family:var(--fb); font-size:11px; font-weight:700; color:#fff; letter-spacing:.04em; z-index:1; }
        @keyframes progressFill { 0%{width:0%} 100%{width:100%} }

        .sim-cursor { position:absolute; z-index:20; pointer-events:none; filter:drop-shadow(0 2px 6px rgba(0,0,0,.7)); }

        /* Cursor slides from top-right corner to directly on top of button (bottom:18px left:20px in sim-info, ~20px from bottom-left of sim-body) */
        .sim-cursor-move { animation:cursorSlide 1.5s cubic-bezier(.4,0,.2,1) forwards; }
        @keyframes cursorSlide {
          0%   { bottom:auto; top:20%; left:75%; opacity:0; }
          15%  { opacity:1; }
          100% { bottom:auto; top:calc(100% - 42px); left:85px; opacity:1; }
        }

        .sim-cursor-click { top:calc(100% - 42px); left:85px; animation:cursorPress .5s ease forwards; }
        @keyframes cursorPress {
          0%   { transform:scale(1); }
          35%  { transform:scale(0.7) translate(2px, 3px); }
          100% { transform:scale(1); opacity:0; }
        }

        @media (max-width:900px) {
          .hero-layout { flex-direction:column; gap:24px; }
          .hero-left { text-align:center; }
          .hero-right { justify-content:center; }
          .hero-sub { margin:0 auto; }
          .hero-btns { justify-content:center; flex-direction:column; align-items:stretch; }
          .hero-trust { justify-content:center; }
          .hero-section { padding:24px 0 32px; }
          .hero-badge { font-size:10px; padding:4px 10px; margin-bottom:12px; }
          .hero-h1 { font-size:clamp(26px,8vw,42px); margin-bottom:10px; line-height:.88; }
          .hero-sub { font-size:13px; line-height:1.55; }
          .hero-btns .btn-xl { font-size:14px; padding:14px 20px; }
          .hero-trust { gap:12px; }
          .trust-pill { font-size:10px; }
          .sim-wrap { max-width:100%; }
          .sim-name { font-size:16px; }
          .sim-dev { font-size:11px; margin-bottom:10px; }
          .sim-btn { font-size:11px; padding:8px 16px; }
          .sim-header { padding:10px 14px; }
          .sim-logo { font-size:11px; }
          .sim-status { font-size:9px; padding:4px 10px; }
        }
      `}</style>
    </section>
  );
}
