import { useEffect, useRef, useState } from 'react';

const DL_GAMES = [
  { n: 'ELDEN RING', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg', size: '67,0 GB' },
  { n: 'GOD OF WAR', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg', size: '62,3 GB' },
  { n: 'GTA V', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg', size: '94,5 GB' },
  { n: 'CYBERPUNK 2077', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg', size: '70,2 GB' },
  { n: 'RDR2', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg', size: '116,8 GB' },
];

export function AppSection() {
  const simRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const gameIdx = useRef(0);
  const percent = useRef(0);
  const chartData = useRef(new Array(40).fill(0));

  useEffect(() => {
    if (!simRef.current) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(simRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    function tick() {
      const game = DL_GAMES[gameIdx.current];
      const baseSpeed = 380 + Math.random() * 80;
      const speed = baseSpeed + Math.sin(percent.current / 5) * 30;
      percent.current += 0.08 + Math.random() * 0.06;
      if (percent.current >= 100) {
        percent.current = 0;
        gameIdx.current = (gameIdx.current + 1) % DL_GAMES.length;
        chartData.current = new Array(40).fill(0);
        const next = DL_GAMES[gameIdx.current];
        const nameEl = document.getElementById('dl-game-name');
        const coverEl = document.getElementById('dl-cover') as HTMLImageElement;
        if (nameEl) nameEl.textContent = next.n;
        if (coverEl) coverEl.src = next.img;
      }
      const speedEl = document.getElementById('dl-speed');
      const progressEl = document.getElementById('dl-progress-text');
      const barEl = document.getElementById('dl-bar-fill');
      const statusEl = document.getElementById('dl-status');
      if (speedEl) speedEl.textContent = speed.toFixed(1) + ' MB/s';
      if (progressEl) progressEl.textContent = Math.min(percent.current, 99).toFixed(0) + '%';
      if (barEl) barEl.style.width = Math.min(percent.current, 100) + '%';
      const downloaded = (percent.current / 100 * parseFloat(game.size)).toFixed(1);
      if (statusEl) statusEl.textContent = 'Baixando dados — ' + downloaded + ' / ' + game.size;
      chartData.current.shift();
      chartData.current.push(speed);
      const maxSpeed = Math.max(...chartData.current, 1);
      const bars = document.querySelectorAll('.dl-chart-bar');
      bars.forEach((bar, i) => {
        const h = chartData.current[i] > 0 ? Math.max((chartData.current[i] / maxSpeed) * 60, 2) : 2;
        (bar as HTMLElement).style.height = h + 'px';
      });
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started]);

  return (
    <section className="sec-dark">
      <div className="container">
        <div className="app-layout reveal">
          <div>
            <div className="tag dark">Overise App</div>
            <div className="app-title">Baixe pela Steam.<br /><em>Velocidade máxima.</em></div>
            <p className="app-desc">O desbloqueador cuida de tudo. Puxa arquivos limpos e oficiais da Steam, em velocidade máxima, e instala de forma automática.</p>
            <div className="app-tags">
              <div className="app-tag">Download rápido</div>
              <div className="app-tag">+1000 jogos</div>
              <div className="app-tag">Online liberado</div>
            </div>
            <a href="#pricing" className="btn btn-accent-dark btn-lg">Garantir Licença →</a>
          </div>
          <div className="dl-sim" ref={simRef}>
            <div className="dl-header">
              <img className="dl-cover" id="dl-cover" src={DL_GAMES[0].img} alt="" />
              <div className="dl-info">
                <div className="dl-game-name" id="dl-game-name">ELDEN RING</div>
                <div className="dl-status" id="dl-status">Baixando dados</div>
              </div>
              <div className="dl-speed-box">
                <div className="dl-speed-label">REDE</div>
                <div className="dl-speed-val" id="dl-speed">0 MB/s</div>
              </div>
              <div className="dl-speed-box">
                <div className="dl-speed-label">PROGRESSO</div>
                <div className="dl-speed-val dl-progress-text" id="dl-progress-text">0%</div>
              </div>
            </div>
            <div className="dl-bar-track"><div className="dl-bar-fill" id="dl-bar-fill" /></div>
            <div className="dl-chart" id="dl-chart">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="dl-chart-bar" style={{ height: '2px' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .app-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; margin-top: 48px; }
        .app-title { font-family: var(--fh); font-size: clamp(28px,4vw,48px); font-weight: 900; text-transform: uppercase; color: var(--on-light); line-height: .95; margin-bottom: 14px; }
        .app-title em { color: var(--accent2); font-style: normal; }
        .app-desc { font-size: 15px; color: var(--on-light-muted); line-height: 1.75; margin-bottom: 24px; }
        .app-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
        .app-tag { background: var(--light); border: 1px solid var(--light-border); border-radius: 4px; padding: 6px 14px; font-family: var(--fh); font-size: 11px; font-weight: 700; color: var(--on-light-muted); letter-spacing: .06em; text-transform: uppercase; }
        .dl-sim { background: #1b2838; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,.06); box-shadow: 0 8px 32px rgba(0,0,0,.3); }
        .dl-header { display: flex; align-items: center; gap: 14px; padding: 16px 18px; border-bottom: 1px solid rgba(255,255,255,.05); }
        .dl-cover { width: 80px; height: 38px; border-radius: 4px; object-fit: cover; flex-shrink: 0; }
        .dl-info { flex: 1; min-width: 0; }
        .dl-game-name { font-family: var(--fh); font-size: 14px; font-weight: 700; color: #c6d4df; text-transform: uppercase; letter-spacing: .03em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .dl-status { font-size: 11px; color: #67c0f4; margin-top: 2px; }
        .dl-speed-box { text-align: right; flex-shrink: 0; }
        .dl-speed-label { font-family: var(--fh); font-size: 8px; font-weight: 700; color: #56606b; letter-spacing: .1em; text-transform: uppercase; }
        .dl-speed-val { font-family: var(--fh); font-size: 16px; font-weight: 900; color: #67c0f4; }
        .dl-progress-text { color: var(--accent) !important; }
        .dl-bar-track { height: 4px; background: #0e1a26; }
        .dl-bar-fill { height: 100%; background: linear-gradient(90deg,#67c0f4,var(--accent)); width: 0%; transition: width .3s ease; }
        .dl-chart { height: 70px; padding: 0 18px 12px; display: flex; align-items: flex-end; gap: 2px; overflow: hidden; }
        .dl-chart-bar { flex: 1; background: linear-gradient(to top,#1a4a6e,#67c0f4); border-radius: 1px 1px 0 0; transition: height .3s ease; min-height: 2px; max-height: 58px; opacity: .7; }
        @media (max-width: 768px) {
          .app-layout { grid-template-columns: 1fr; }
          .dl-header { flex-wrap: wrap; gap: 8px; }
          .dl-cover { width: 50px; height: 24px; }
        }
      `}</style>
    </section>
  );
}
