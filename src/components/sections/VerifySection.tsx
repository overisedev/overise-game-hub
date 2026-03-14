import { useState } from 'react';

const ALL_GAMES = [
  { n: 'Elden Ring', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg' },
  { n: 'GTA V', p: 'R$99', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg' },
  { n: 'God of War', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg' },
  { n: 'Cyberpunk 2077', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg' },
  { n: 'RDR2', p: 'R$299', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg' },
  { n: 'Hogwarts Legacy', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg' },
  { n: "Baldur's Gate 3", p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg' },
  { n: 'Spider-Man', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg' },
  { n: 'Forza Horizon 5', p: 'R$299', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg' },
  { n: 'RE4', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg' },
  { n: 'The Witcher 3', p: 'R$79', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg' },
  { n: 'Dark Souls III', p: 'R$159', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg' },
  { n: 'Horizon Zero Dawn', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/header.jpg' },
  { n: 'The Last of Us Part I', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/header.jpg' },
  { n: 'Hollow Knight', p: 'R$28', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg' },
  { n: 'Hades', p: 'R$57', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg' },
  { n: 'Stardew Valley', p: 'R$24', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg' },
  { n: 'Sekiro', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg' },
  { n: 'Ghost of Tsushima', p: 'R$299', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2215430/header.jpg' },
  { n: 'Lies of P', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1627720/header.jpg' },
  { n: 'Resident Evil Village', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/header.jpg' },
  { n: 'Palworld', p: 'R$79', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1623730/header.jpg' },
  { n: 'Days Gone', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1259420/header.jpg' },
  { n: 'Dying Light 2', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/534380/header.jpg' },
];

export function VerifySection() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof ALL_GAMES>([]);
  const [searched, setSearched] = useState(false);

  const doSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) { setResults([]); setSearched(false); return; }
    setResults(ALL_GAMES.filter(g => g.n.toLowerCase().includes(q)));
    setSearched(true);
  };

  return (
    <section id="verify" className="sec-dark">
      <div className="container text-center">
        <div className="reveal">
          <div className="tag g">Verificar disponibilidade</div>
          <h2 className="h2 on-dark">O jogo que você quer<br /><em>tá aqui?</em></h2>
          <p className="sub on-dark center">Pesquisa pelo nome. Se tiver no catálogo, você joga hoje mesmo.</p>
        </div>
        <div className="verify-box reveal rd1">
          <div className="verify-row">
            <input className="verify-input" type="text" placeholder="Ex: Elden Ring, GTA V, Minecraft..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && doSearch()} />
            <button className="verify-btn" onClick={doSearch}>Verificar</button>
          </div>
          {searched && (
            <div className="verify-status" style={{ color: results.length ? 'var(--accent2)' : 'var(--red)' }}>
              {results.length ? `✔ ${results.length} jogo(s) encontrado(s)` : 'Não encontrado — novos jogos são adicionados toda semana'}
            </div>
          )}
          <div className="verify-grid">
            {results.slice(0, 6).map((g, i) => (
              <div key={i} className="v-card">
                <img src={g.img} alt={g.n} loading="lazy" />
                <div className="v-card-body">
                  <div className="v-card-name">{g.n}</div>
                  <div className="v-card-row">
                    <div className="v-card-old">Steam: {g.p}</div>
                    <div className="v-card-tag">INCLUSO</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {results.length > 0 && (
            <div className="verify-cta-row">
              <a href="#pricing" className="btn btn-accent-dark btn-lg">Ver planos a partir de R$9,97</a>
              <div className="verify-cta-sub">Esse jogo + +1000 outros inclusos na licença.</div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .verify-box { background: var(--light); border: 1px solid var(--light-border); border-radius: 10px; padding: 28px; margin-top: 40px; max-width: 800px; margin-left: auto; margin-right: auto; }
        .verify-row { display: flex; gap: 8px; margin-bottom: 12px; }
        .verify-input { flex: 1; background: #fff; border: 2px solid rgba(0,0,0,.08); border-radius: 6px; padding: 13px 16px; font-size: 15px; font-weight: 500; color: var(--on-light); font-family: var(--fb); transition: border-color .2s; }
        .verify-input::placeholder { color: rgba(0,0,0,.3); }
        .verify-input:focus { outline: none; border-color: var(--accent2); }
        .verify-btn { background: var(--accent2); color: #fff; font-family: var(--fh); font-size: 14px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; padding: 13px 24px; border-radius: 6px; border: none; cursor: pointer; transition: all .2s; }
        .verify-btn:hover { background: var(--accent); color: #0b0e11; }
        .verify-status { font-family: var(--fh); font-size: 13px; font-weight: 700; margin-bottom: 12px; }
        .verify-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-top: 12px; }
        .v-card { background: #fff; border: 1px solid var(--light-border); border-radius: 8px; overflow: hidden; text-align: left; transition: all .25s; }
        .v-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,.08); }
        .v-card img { width: 100%; aspect-ratio: 460/215; object-fit: cover; }
        .v-card-body { padding: 10px 12px; }
        .v-card-name { font-family: var(--fh); font-size: 13px; font-weight: 700; color: var(--on-light); text-transform: uppercase; letter-spacing: .02em; margin-bottom: 6px; }
        .v-card-row { display: flex; align-items: center; justify-content: space-between; }
        .v-card-old { font-size: 11px; color: var(--on-light-muted); text-decoration: line-through; opacity: .6; }
        .v-card-tag { font-family: var(--fh); font-size: 10px; font-weight: 700; background: rgba(45,212,14,.1); color: var(--accent2); padding: 2px 8px; border-radius: 3px; letter-spacing: .06em; }
        .verify-cta-row { margin-top: 16px; text-align: center; }
        .verify-cta-sub { font-size: 13px; color: var(--on-light-muted); margin-top: 8px; }
        @media (max-width: 768px) {
          .verify-row { flex-direction: column; }
          .verify-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
