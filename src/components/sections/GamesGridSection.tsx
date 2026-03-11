const GAMES = [
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

export function GamesGridSection() {
  return (
    <section id="games" className="sec-dark">
      <div className="container text-center">
        <div className="reveal">
          <div className="tag g">Catálogo disponível</div>
          <h2 className="h2 on-dark">Alguns dos <em>+1000 jogos</em><br />disponíveis</h2>
        </div>
        <div className="games-grid reveal rd1">
          {GAMES.map((g, i) => (
            <div key={i} className="game-tile">
              <img src={g.img} alt={g.n} loading="lazy" />
              <div className="game-tile-ov" />
              <div className="game-tile-info">
                <div className="game-tile-name">{g.n}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '32px' }} className="reveal rd2">
          <a href="#pricing" className="btn btn-accent btn-lg">Ver Todos os Jogos →</a>
          <p style={{ fontFamily: 'var(--fh)', fontSize: '11px', fontWeight: 700, color: 'var(--dim)', marginTop: '10px', letterSpacing: '.08em' }}>+1000 TÍTULOS · NOVOS JOGOS TODA SEMANA</p>
        </div>
      </div>
      <style>{`
        .games-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 6px; margin-top: 44px; }
        .game-tile { border-radius: 6px; overflow: hidden; aspect-ratio: 46/21; position: relative; border: 1px solid var(--border); transition: all .25s; }
        .game-tile:hover { transform: scale(1.04); border-color: rgba(57,255,20,.25); box-shadow: 0 4px 20px rgba(0,0,0,.4); }
        .game-tile img { width: 100%; height: 100%; object-fit: cover; }
        .game-tile-ov { position: absolute; inset: 0; background: linear-gradient(to top,rgba(11,14,17,.85) 0%,transparent 50%); }
        .game-tile-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 8px 8px 6px; }
        .game-tile-name { font-family: var(--fh); font-size: 10px; font-weight: 700; text-transform: uppercase; color: #fff; letter-spacing: .04em; }
        @media (max-width: 768px) { .games-grid { grid-template-columns: repeat(3,1fr); gap: 4px; } }
      `}</style>
    </section>
  );
}
