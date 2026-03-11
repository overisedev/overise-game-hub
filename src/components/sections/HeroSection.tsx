import { useState, useEffect, useRef } from 'react';

const FEATURED_GAMES = [
  { name: 'Elden Ring', dev: 'Ação, RPG · FromSoftware', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg' },
  { name: 'God of War', dev: 'Ação, Aventura · Santa Monica', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg' },
  { name: 'Red Dead Redemption 2', dev: 'Ação, Aventura · Rockstar', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg' },
  { name: 'Cyberpunk 2077', dev: 'RPG, Mundo Aberto · CD Projekt', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg' },
  { name: "Baldur's Gate 3", dev: 'RPG · Larian Studios', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg' },
];

FEATURED_GAMES.forEach(g => { const i = new Image(); i.src = g.img; });

export function HeroSection() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'moving' | 'clicking' | 'unlocking' | 'unlocked'>('idle');
  const cancelRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;
    let currentIdx = 0;

    const wait = (ms: number) => new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (cancelRef.current) reject('cancelled');
        else resolve();
      }, ms);
    });

    const loop = async () => {
      try {
        while (!cancelRef.current) {
          // Show locked state
          setPhase('idle');
          setIdx(currentIdx);
          await wait(2500);

          // Mouse moves toward button
          setPhase('moving');
          await wait(1200);

          // Click effect
          setPhase('clicking');
          await wait(600);

          // Unlocking progress
          setPhase('unlocking');
          await wait(2000);

          // Unlocked!
          setPhase('unlocked');
          await wait(3500);

          // Next game
          currentIdx = (currentIdx + 1) % FEATURED_GAMES.length;
          setIdx(currentIdx);
          await wait(500);
        }
      } catch {
        // cancelled
      }
    };

    loop();
    return () => { cancelRef.current = true; };
  }, []);

  const game = FEATURED_GAMES[idx];
  const isUnlocked = phase === 'unlocked';
  const isUnlocking = phase === 'unlocking';
  const isClicking = phase === 'clicking';
  const showCursor = phase === 'moving' || phase === 'clicking';

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-layout">
        {/* Left: Text content */}
        <div className="hero-left">
          <div className="hero-badge reveal">Taxa única R$9,97 · licença vitalícia</div>
          <h1 className="hero-h1 reveal rd1">
            Desbloqueie sua Steam.<br />
            <em>+1000 jogos por R$9,97.</em>
          </h1>
          <p className="hero-sub reveal rd1">
            Ative o desbloqueador, escolha o jogo e baixe direto pela Steam. <strong>100% seguro, anti-ban e invisível.</strong> Pague uma vez, use pra sempre.
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

        {/* Right: Simulator */}
        <div className="hero-right">
          <div className={`sim-card-wrap ${isUnlocked ? 'sim-unlocked' : ''}`}>
            <div className="sim-card-header">
              <div className="sim-card-logo">OVERISE</div>
              <div className={`sim-card-status ${isUnlocked ? 'active' : ''}`}>
                {isUnlocked ? '● DESBLOQUEADO' : '○ BLOQUEADO'}
              </div>
            </div>
            <div className="sim-card-body">
              <div
                className="sim-card-imgwrap"
                style={{ backgroundImage: `url(${game.img})` }}
              />
              <div className="sim-card-gradient" />
              <div className="sim-card-info">
                <div className="sim-card-name">{game.name}</div>
                <div className="sim-card-dev">{game.dev}</div>

                {isUnlocking && (
                  <div className="sim-unlock-progress">
                    <div className="sim-unlock-bar" />
                    <span className="sim-unlock-label">Desbloqueando...</span>
                  </div>
                )}

                {!isUnlocking && (
                  <div className={`sim-card-btn ${isUnlocked ? 'go' : ''} ${isClicking ? 'clicked' : ''}`}>
                    {isUnlocked ? '▶ Instalar Agora' : 'Desbloquear Jogo'}
                  </div>
                )}
              </div>

              {/* Animated cursor */}
              {showCursor && (
                <div className={`sim-cursor ${isClicking ? 'sim-cursor-click' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 3l14 8-6 2-4 6-4-16z" fill="#fff" stroke="#000" strokeWidth="1.5"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section { background: var(--bg); padding: 48px 0 64px; position: relative; overflow: hidden; }
        .hero-section::before { content: ''; position: absolute; top: -120px; left: 50%; transform: translateX(-50%); width: 900px; height: 500px; background: radial-gradient(ellipse,rgba(57,255,20,.035) 0%,transparent 65%); pointer-events: none; }

        .hero-layout { display: flex; align-items: center; gap: 48px; }
        .hero-left { flex: 1; text-align: left; }
        .hero-right { flex: 1; display: flex; justify-content: flex-end; }

        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-dim); border: 1px solid rgba(57,255,20,.15); border-radius: 4px; padding: 5px 12px; font-family: var(--fh); font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; animation: floatY 3s ease-in-out infinite, borderGlow 3s ease-in-out infinite; }
        .hero-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 6px var(--accent); animation: livep 1.3s ease-in-out infinite; }
        .hero-h1 { font-family: var(--fh); font-size: clamp(36px,5vw,72px); font-weight: 900; line-height: .9; text-transform: uppercase; color: #fff; margin-bottom: 16px; }
        .hero-h1 em { color: var(--accent); font-style: normal; }
        .hero-sub { font-size: 16px; font-weight: 400; color: var(--muted); max-width: 480px; line-height: 1.65; font-family: var(--fb); }
        .hero-sub strong { color: var(--white); font-weight: 600; }

        .hero-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 24px; margin-bottom: 18px; }
        .hero-trust { display: flex; gap: 16px; flex-wrap: wrap; }
        .trust-pill { display: flex; align-items: center; gap: 6px; font-family: var(--fh); font-size: 11px; font-weight: 700; letter-spacing: .04em; color: var(--dim); transition: all .2s ease; }
        .trust-pill:hover { color: var(--accent); transform: scale(1.05); }
        .trust-pill .chk { color: var(--accent); font-weight: 900; }

        /* Simulator card */
        .sim-card-wrap { max-width: 520px; width: 100%; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,.08); background: #0c0e12; box-shadow: 0 0 60px rgba(57,255,20,.03), 0 24px 56px rgba(0,0,0,.5); transition: border-color .6s, box-shadow .6s; }
        .sim-card-wrap.sim-unlocked { border-color: rgba(57,255,20,.18); box-shadow: 0 0 60px rgba(57,255,20,.1), 0 24px 56px rgba(0,0,0,.5); }

        .sim-card-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; background: #111318; border-bottom: 1px solid rgba(255,255,255,.05); }
        .sim-card-logo { font-family: var(--fh); font-size: 12px; font-weight: 800; color: rgba(255,255,255,.3); letter-spacing: .1em; text-transform: uppercase; }
        .sim-card-status { font-family: var(--fb); font-size: 10px; font-weight: 700; letter-spacing: .06em; padding: 5px 12px; border-radius: 4px; background: rgba(255,68,68,.08); color: var(--red); transition: all .5s; text-transform: uppercase; }
        .sim-card-status.active { background: rgba(57,255,20,.1); color: var(--accent); box-shadow: 0 0 14px rgba(57,255,20,.15); }

        .sim-card-body { position: relative; overflow: hidden; min-height: 180px; }

        .sim-card-imgwrap { width: 100%; padding-bottom: 46.7%; background-size: cover; background-position: center; transition: filter .8s ease, transform .8s ease; filter: grayscale(85%) brightness(.55); }
        .sim-unlocked .sim-card-imgwrap { filter: grayscale(0%) brightness(1); transform: scale(1.03); }

        .sim-card-gradient { position: absolute; inset: 0; background: linear-gradient(to top, rgba(11,14,17,.92) 0%, rgba(11,14,17,.4) 35%, transparent 65%); pointer-events: none; }

        .sim-card-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 18px 20px; text-align: left; }
        .sim-card-name { font-family: var(--fh); font-size: 22px; font-weight: 800; color: #fff; text-transform: uppercase; letter-spacing: -.01em; line-height: 1.1; margin-bottom: 3px; }
        .sim-card-dev { font-family: var(--fb); font-size: 12px; color: rgba(255,255,255,.5); font-weight: 500; margin-bottom: 12px; }
        .sim-card-btn { display: inline-block; font-family: var(--fb); font-size: 12px; font-weight: 700; padding: 10px 20px; border-radius: 6px; transition: all .4s; background: rgba(255,255,255,.06); color: var(--dim); letter-spacing: .02em; }
        .sim-card-btn.go { background: var(--accent); color: #0b0e11; box-shadow: 0 0 20px rgba(57,255,20,.25); }
        .sim-card-btn.clicked { transform: scale(0.93); background: rgba(255,255,255,.12); }

        /* Unlock progress bar */
        .sim-unlock-progress { position: relative; height: 36px; background: rgba(255,255,255,.06); border-radius: 6px; overflow: hidden; }
        .sim-unlock-bar { position: absolute; top: 0; left: 0; height: 100%; width: 0; background: linear-gradient(90deg, var(--accent), #2dd40e); border-radius: 6px; animation: unlockFill 2s ease-in-out forwards; }
        .sim-unlock-label { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--fb); font-size: 11px; font-weight: 700; color: #fff; letter-spacing: .04em; z-index: 1; }

        @keyframes unlockFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        /* Animated cursor */
        .sim-cursor { position: absolute; bottom: 28px; right: 60px; z-index: 10; animation: cursorMove 1.2s ease-in-out forwards; pointer-events: none; filter: drop-shadow(0 2px 4px rgba(0,0,0,.5)); }
        .sim-cursor-click { animation: cursorClick .6s ease forwards; }

        @keyframes cursorMove {
          0% { transform: translate(60px, -40px); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(0, 0); opacity: 1; }
        }

        @keyframes cursorClick {
          0% { transform: scale(1); }
          40% { transform: scale(0.8); }
          100% { transform: scale(1); }
        }

        /* Mobile: stack vertically */
        @media (max-width: 900px) {
          .hero-layout { flex-direction: column; gap: 24px; }
          .hero-left { text-align: center; }
          .hero-right { justify-content: center; }
          .hero-sub { margin: 0 auto; }
          .hero-btns { justify-content: center; flex-direction: column; align-items: stretch; }
          .hero-trust { justify-content: center; }
          .hero-section { padding: 24px 0 32px; }
          .hero-badge { font-size: 10px; padding: 4px 10px; margin-bottom: 12px; }
          .hero-h1 { font-size: clamp(26px,8vw,42px); margin-bottom: 10px; line-height: .88; }
          .hero-sub { font-size: 13px; line-height: 1.55; }
          .hero-btns .btn-xl { font-size: 14px; padding: 14px 20px; }
          .hero-trust { gap: 12px; }
          .trust-pill { font-size: 10px; }
          .sim-card-wrap { max-width: 100%; }
          .sim-card-name { font-size: 16px; }
          .sim-card-dev { font-size: 11px; margin-bottom: 10px; }
          .sim-card-btn { font-size: 11px; padding: 8px 16px; }
          .sim-card-header { padding: 10px 14px; }
          .sim-card-logo { font-size: 11px; }
          .sim-card-status { font-size: 9px; padding: 4px 10px; }
        }
      `}</style>
    </section>
  );
}
