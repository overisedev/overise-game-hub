import { useState, useEffect, useRef } from 'react';

const FEATURED_GAMES = [
  { name: 'Elden Ring', dev: 'Ação, RPG · FromSoftware', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg' },
  { name: 'God of War', dev: 'Ação, Aventura · Santa Monica', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg' },
  { name: 'Red Dead Redemption 2', dev: 'Ação, Aventura · Rockstar', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg' },
  { name: 'Cyberpunk 2077', dev: 'RPG, Mundo Aberto · CD Projekt', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg' },
  { name: 'Baldur\'s Gate 3', dev: 'RPG · Larian Studios', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg' },
];

// Preload all images immediately
FEATURED_GAMES.forEach(g => { const i = new Image(); i.src = g.img; });

export function HeroSection() {
  const [idx, setIdx] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const cancelRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;
    let currentIdx = 0;

    const wait = (ms: number) => new Promise<void>(resolve => {
      const t = setTimeout(() => { if (!cancelRef.current) resolve(); }, ms);
    });

    (async () => {
      while (!cancelRef.current) {
        // Locked
        setUnlocked(false);
        setIdx(currentIdx);
        await wait(1800);
        if (cancelRef.current) break;

        // Unlock
        setUnlocked(true);
        await wait(3200);
        if (cancelRef.current) break;

        // Next game (stays unlocked briefly during switch)
        currentIdx = (currentIdx + 1) % FEATURED_GAMES.length;
        setIdx(currentIdx);
        await wait(400);
      }
    })();

    return () => { cancelRef.current = true; };
  }, []);

  const game = FEATURED_GAMES[idx];

  return (
    <section id="hero" className="hero-section">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

        <div className={`sim-card-wrap ${unlocked ? 'sim-unlocked' : ''}`}>
          <div className="sim-card-header">
            <div className="sim-card-logo">OVERISE</div>
            <div className={`sim-card-status ${unlocked ? 'active' : ''}`}>
              {unlocked ? '● DESBLOQUEADO' : '○ BLOQUEADO'}
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
              <div className={`sim-card-btn ${unlocked ? 'go' : ''}`}>
                {unlocked ? '▶ Instalar Agora' : 'Requer Desbloqueio'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section { background: var(--bg); padding: 48px 0 64px; position: relative; overflow: hidden; text-align: center; }
        .hero-section::before { content: ''; position: absolute; top: -120px; left: 50%; transform: translateX(-50%); width: 900px; height: 500px; background: radial-gradient(ellipse,rgba(57,255,20,.035) 0%,transparent 65%); pointer-events: none; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-dim); border: 1px solid rgba(57,255,20,.15); border-radius: 4px; padding: 5px 12px; font-family: var(--fh); font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; animation: floatY 3s ease-in-out infinite, borderGlow 3s ease-in-out infinite; }
        .hero-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 6px var(--accent); animation: livep 1.3s ease-in-out infinite; }
        .hero-h1 { font-family: var(--fh); font-size: clamp(36px,7vw,88px); font-weight: 900; line-height: .9; text-transform: uppercase; color: #fff; margin-bottom: 16px; }
        .hero-h1 em { color: var(--accent); font-style: normal; }
        .hero-sub { font-size: 16px; font-weight: 400; color: var(--muted); max-width: 560px; line-height: 1.65; margin: 0 auto; font-family: var(--fb); }
        .hero-sub strong { color: var(--white); font-weight: 600; }

        .hero-btns { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 20px; margin-bottom: 16px; }
        .hero-trust { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; margin-bottom: 8px; }
        .trust-pill { display: flex; align-items: center; gap: 6px; font-family: var(--fh); font-size: 11px; font-weight: 700; letter-spacing: .04em; color: var(--dim); transition: all .2s ease; }
        .trust-pill:hover { color: var(--accent); transform: scale(1.05); }
        .trust-pill .chk { color: var(--accent); font-weight: 900; }

        .sim-card-wrap { max-width: 580px; width: 100%; margin: 32px auto 0; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,.08); background: #0c0e12; box-shadow: 0 0 60px rgba(57,255,20,.03), 0 24px 56px rgba(0,0,0,.5); transition: border-color .6s, box-shadow .6s; }
        .sim-card-wrap.sim-unlocked { border-color: rgba(57,255,20,.18); box-shadow: 0 0 60px rgba(57,255,20,.1), 0 24px 56px rgba(0,0,0,.5); }

        .sim-card-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; background: #111318; border-bottom: 1px solid rgba(255,255,255,.05); }
        .sim-card-logo { font-family: var(--fh); font-size: 12px; font-weight: 800; color: rgba(255,255,255,.3); letter-spacing: .1em; text-transform: uppercase; }
        .sim-card-status { font-family: var(--fb); font-size: 10px; font-weight: 700; letter-spacing: .06em; padding: 5px 12px; border-radius: 4px; background: rgba(255,68,68,.08); color: var(--red); transition: all .5s; text-transform: uppercase; }
        .sim-card-status.active { background: rgba(57,255,20,.1); color: var(--accent); box-shadow: 0 0 14px rgba(57,255,20,.15); }

        .sim-card-body { position: relative; overflow: hidden; min-height: 180px; }

        .sim-card-imgwrap { width: 100%; padding-bottom: 46.7%; /* 460/215 aspect */ background-size: cover; background-position: center; transition: filter .7s ease, transform .7s ease; filter: grayscale(85%) brightness(.55); }
        .sim-unlocked .sim-card-imgwrap { filter: grayscale(0%) brightness(1); transform: scale(1.03); }

        .sim-card-gradient { position: absolute; inset: 0; background: linear-gradient(to top, rgba(11,14,17,.92) 0%, rgba(11,14,17,.4) 35%, transparent 65%); pointer-events: none; }

        .sim-card-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 18px 20px; text-align: left; }
        .sim-card-name { font-family: var(--fh); font-size: 22px; font-weight: 800; color: #fff; text-transform: uppercase; letter-spacing: -.01em; line-height: 1.1; margin-bottom: 3px; }
        .sim-card-dev { font-family: var(--fb); font-size: 12px; color: rgba(255,255,255,.5); font-weight: 500; margin-bottom: 12px; }
        .sim-card-btn { display: inline-block; font-family: var(--fb); font-size: 12px; font-weight: 700; padding: 10px 20px; border-radius: 6px; transition: all .5s; background: rgba(255,255,255,.06); color: var(--dim); letter-spacing: .02em; }
        .sim-card-btn.go { background: var(--accent); color: #0b0e11; box-shadow: 0 0 20px rgba(57,255,20,.25); }

        @media (max-width: 768px) {
          .hero-section { padding: 24px 0 32px; }
          .hero-badge { font-size: 10px; padding: 4px 10px; margin-bottom: 12px; }
          .hero-h1 { font-size: clamp(26px,8vw,42px); margin-bottom: 10px; line-height: .88; }
          .hero-sub { font-size: 13px; line-height: 1.55; }
          .hero-btns { margin-top: 16px; margin-bottom: 10px; flex-direction: column; align-items: stretch; gap: 8px; }
          .hero-btns .btn-xl { font-size: 14px; padding: 14px 20px; }
          .hero-trust { gap: 12px; margin-bottom: 0; }
          .trust-pill { font-size: 10px; }
          .sim-card-wrap { margin-top: 16px; }
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