import { useEffect, useRef } from 'react';

const MARQUEE_GAMES = [
  { n: 'Elden Ring', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg' },
  { n: 'GTA V', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg' },
  { n: 'God of War', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg' },
  { n: 'Cyberpunk 2077', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg' },
  { n: 'RDR2', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg' },
  { n: 'Hogwarts Legacy', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg' },
  { n: "Baldur's Gate 3", img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg' },
  { n: 'Spider-Man', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg' },
  { n: 'Forza Horizon 5', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg' },
  { n: 'RE4', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg' },
  { n: 'Starfield', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg' },
  { n: 'The Witcher 3', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg' },
  { n: 'Sekiro', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg' },
  { n: 'Ghost of Tsushima', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2215430/header.jpg' },
  { n: 'It Takes Two', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/header.jpg' },
];

export function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    const speed = 0.5;
    let halfW = track.scrollWidth / 2;
    const measure = () => { halfW = track.scrollWidth / 2; };
    window.addEventListener('resize', measure);
    let raf: number;
    function tick() {
      pos -= speed;
      if (Math.abs(pos) >= halfW) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', measure); };
  }, []);

  const allGames = [...MARQUEE_GAMES, ...MARQUEE_GAMES, ...MARQUEE_GAMES, ...MARQUEE_GAMES];

  return (
    <div className="marquee-section">
      <div className="marquee-track" ref={trackRef}>
        {allGames.map((g, i) => (
          <div key={i} className="mi">
            <img src={g.img} alt={g.n} loading="lazy" />
            <div className="mi-name">{g.n}</div>
          </div>
        ))}
      </div>
      <style>{`
        .marquee-section { overflow: hidden; padding: 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--bg); width: 100%; }
        .marquee-track { display: flex; width: max-content; }
        .mi { flex-shrink: 0; width: 180px; aspect-ratio: 46/21; position: relative; overflow: hidden; border-right: 1px solid var(--border); }
        .mi img { width: 100%; height: 100%; object-fit: cover; display: block; opacity: .5; transition: opacity .3s; }
        .mi:hover img { opacity: .8; }
        .mi-name { position: absolute; bottom: 0; left: 0; right: 0; padding: 6px 8px; font-family: var(--fh); font-size: 9px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.7); background: linear-gradient(to top,rgba(0,0,0,.7),transparent); }
        @media (max-width: 768px) { .mi { width: 130px; } }
      `}</style>
    </div>
  );
}
