import { useState } from 'react';

// Catálogo expandido de jogos populares (com imagens reais da Steam)
const POPULAR_GAMES = [
  { n: 'Elden Ring', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg' },
  { n: 'GTA V', p: 'R$99', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg' },
  { n: 'God of War', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg' },
  { n: 'Cyberpunk 2077', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg' },
  { n: 'Red Dead Redemption 2', p: 'R$299', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg' },
  { n: 'Hogwarts Legacy', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg' },
  { n: "Baldur's Gate 3", p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg' },
  { n: 'Spider-Man Remastered', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg' },
  { n: 'Forza Horizon 5', p: 'R$299', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg' },
  { n: 'Resident Evil 4', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg' },
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
  { n: 'Counter-Strike 2', p: 'Grátis', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg' },
  { n: 'Dota 2', p: 'Grátis', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg' },
  { n: 'PUBG', p: 'Grátis', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg' },
  { n: 'Apex Legends', p: 'Grátis', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg' },
  { n: 'Rust', p: 'R$99', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252490/header.jpg' },
  { n: 'ARK Survival Evolved', p: 'R$129', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/346110/header.jpg' },
  { n: 'Valheim', p: 'R$57', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/892970/header.jpg' },
  { n: 'Terraria', p: 'R$19', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg' },
  { n: 'It Takes Two', p: 'R$159', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/header.jpg' },
  { n: 'Sons of the Forest', p: 'R$79', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1326470/header.jpg' },
  { n: 'Helldivers 2', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/553850/header.jpg' },
  { n: 'Black Myth Wukong', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/header.jpg' },
  { n: 'EA Sports FC 25', p: 'R$299', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/header.jpg' },
  { n: 'Call of Duty', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg' },
  { n: 'Battlefield 2042', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1517290/header.jpg' },
  { n: 'Far Cry 6', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2369390/header.jpg' },
  { n: 'Mortal Kombat 1', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/header.jpg' },
  { n: 'Street Fighter 6', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1364780/header.jpg' },
  { n: 'Tekken 8', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/header.jpg' },
  { n: 'NBA 2K25', p: 'R$299', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2820290/header.jpg' },
  { n: 'F1 24', p: 'R$299', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2488620/header.jpg' },
  { n: 'Need for Speed Unbound', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1846380/header.jpg' },
  { n: 'Dead Space Remake', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1693980/header.jpg' },
  { n: 'Alan Wake 2', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2622380/header.jpg' },
  { n: 'Starfield', p: 'R$299', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg' },
  { n: 'Diablo IV', p: 'R$299', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2344520/header.jpg' },
  { n: 'World of Warcraft', p: 'R$59', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/265630/header.jpg' },
  { n: 'Path of Exile', p: 'Grátis', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/238960/header.jpg' },
  { n: 'Lost Ark', p: 'Grátis', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1599340/header.jpg' },
  { n: 'New World', p: 'R$99', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1063730/header.jpg' },
  { n: 'Final Fantasy XVI', p: 'R$349', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2515020/header.jpg' },
  { n: 'Persona 5 Royal', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1687950/header.jpg' },
  { n: 'Yakuza Like a Dragon', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1235140/header.jpg' },
  { n: 'Monster Hunter World', p: 'R$159', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/582010/header.jpg' },
  { n: 'Monster Hunter Rise', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1446780/header.jpg' },
  { n: 'Dragon Ball Sparking Zero', p: 'R$349', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1790600/header.jpg' },
  { n: 'Naruto Storm 4', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/349040/header.jpg' },
  { n: 'One Piece Odyssey', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1366540/header.jpg' },
  { n: 'Devil May Cry 5', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/601150/header.jpg' },
  { n: 'Bayonetta', p: 'R$99', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/460790/header.jpg' },
  { n: 'Nier Automata', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/524220/header.jpg' },
  { n: 'Stellar Blade', p: 'R$299', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/3489700/header.jpg' },
  { n: 'Tomb Raider', p: 'R$79', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/203160/header.jpg' },
  { n: 'Shadow of the Tomb Raider', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/750920/header.jpg' },
  { n: 'Uncharted', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1659420/header.jpg' },
  { n: 'Death Stranding', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1850570/header.jpg' },
  { n: 'Metal Gear Solid V', p: 'R$129', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/287700/header.jpg' },
  { n: 'Metro Exodus', p: 'R$159', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/412020/header.jpg' },
  { n: 'Fallout 4', p: 'R$129', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/377160/header.jpg' },
  { n: 'Skyrim', p: 'R$129', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg' },
  { n: 'Doom Eternal', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/782330/header.jpg' },
  { n: 'BioShock', p: 'R$99', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/409710/header.jpg' },
  { n: 'Borderlands 3', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/397540/header.jpg' },
  { n: 'Mass Effect Legendary', p: 'R$249', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1328670/header.jpg' },
  { n: 'Civilization VI', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg' },
  { n: 'Age of Empires IV', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1466860/header.jpg' },
  { n: 'Cities Skylines II', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/949230/header.jpg' },
  { n: 'The Sims 4', p: 'Grátis', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1222670/header.jpg' },
  { n: 'Football Manager 2024', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2252570/header.jpg' },
  { n: 'PEAK', p: 'R$24', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/3527290/header.jpg' },
  { n: 'Schedule I', p: 'R$39', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/3164500/header.jpg' },
  { n: 'REPO', p: 'R$24', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/3241660/header.jpg' },
  { n: 'Lethal Company', p: 'R$24', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1966720/header.jpg' },
  { n: 'Phasmophobia', p: 'R$28', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/739630/header.jpg' },
  { n: 'Content Warning', p: 'R$15', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2881650/header.jpg' },
  { n: 'Manor Lords', p: 'R$79', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1363080/header.jpg' },
  { n: 'No Mans Sky', p: 'R$199', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/275850/header.jpg' },
  { n: 'Subnautica', p: 'R$79', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/264710/header.jpg' },
];

// Imagem placeholder genérica do Steam
const FALLBACK_IMG = 'https://cdn.cloudflare.steamstatic.com/store/home/store_home_share.jpg';

interface Game {
  n: string;
  p: string;
  img: string;
}

export function VerifySection() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>([]);
  const [searched, setSearched] = useState(false);

  // Capitaliza primeira letra de cada palavra
  const capitalize = (str: string): string => {
    return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  };

  // Valida se a query parece ser um nome de jogo legítimo
  const isValidGameQuery = (q: string): boolean => {
    if (q.length < 2) return false;
    if (!/[a-záéíóúãõâêôç]/i.test(q)) return false;
    const vowels = (q.match(/[aeiouáéíóúãõâêô]/gi) || []).length;
    const letters = (q.match(/[a-záéíóúãõâêôç]/gi) || []).length;
    if (letters >= 4 && vowels === 0) return false;
    if (/(.)\1{4,}/.test(q)) return false;
    return true;
  };

  const doSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      setSearched(false);
      return;
    }

    // 1. Procura match no catálogo
    const matches = POPULAR_GAMES.filter(g => g.n.toLowerCase().includes(q));

    if (matches.length > 0) {
      setResults(matches);
      setSearched(true);
      return;
    }

    // 2. Se não achou no catálogo MAS parece nome de jogo válido, retorna como "incluso"
    if (isValidGameQuery(q)) {
      const prices = ['R$59', 'R$79', 'R$99', 'R$129', 'R$159', 'R$199', 'R$249', 'R$299'];
      const randomPrice = prices[Math.floor(Math.random() * prices.length)];

      setResults([{
        n: capitalize(query.trim()),
        p: randomPrice,
        img: FALLBACK_IMG
      }]);
      setSearched(true);
      return;
    }

    // 3. Query inválida (asdfgh, qwerty), mostra "não encontrado"
    setResults([]);
    setSearched(true);
  };

  return (
    <section id="verify" className="sec-dark section-grid">
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
              {results.length ? `✔ ${results.length} jogo(s) encontrado(s)` : 'Não encontrado — tenta digitar o nome corretamente'}
            </div>
          )}
          <div className="verify-grid">
            {results.slice(0, 6).map((g, i) => (
              <div key={i} className="v-card">
                <img src={g.img} alt={g.n} loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }} />
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
        .verify-box { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 28px; margin-top: 40px; max-width: 800px; margin-left: auto; margin-right: auto; }
        .verify-row { display: flex; gap: 8px; margin-bottom: 12px; }
        .verify-input { flex: 1; background: rgba(255,255,255,.06); border: 2px solid var(--border); border-radius: 6px; padding: 13px 16px; font-size: 15px; font-weight: 500; color: var(--white); font-family: var(--fb); transition: border-color .2s; }
        .verify-input::placeholder { color: var(--dim); }
        .verify-input:focus { outline: none; border-color: var(--accent); }
        .verify-btn { background: var(--accent); color: #0b0e11; font-family: var(--fh); font-size: 14px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; padding: 13px 24px; border-radius: 6px; border: none; cursor: pointer; transition: all .2s; }
        .verify-btn:hover { background: #4dff33; }
        .verify-status { font-family: var(--fh); font-size: 13px; font-weight: 700; margin-bottom: 12px; }
        .verify-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-top: 12px; }
        .v-card { background: rgba(255,255,255,.04); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; text-align: left; transition: all .25s; }
        .v-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,.3); border-color: rgba(57,255,20,.15); }
        .v-card img { width: 100%; aspect-ratio: 460/215; object-fit: cover; }
        .v-card-body { padding: 10px 12px; }
        .v-card-name { font-family: var(--fh); font-size: 13px; font-weight: 700; color: var(--white); text-transform: uppercase; letter-spacing: .02em; margin-bottom: 6px; }
        .v-card-row { display: flex; align-items: center; justify-content: space-between; }
        .v-card-old { font-size: 11px; color: var(--dim); text-decoration: line-through; opacity: .6; }
        .v-card-tag { font-family: var(--fh); font-size: 10px; font-weight: 700; background: rgba(57,255,20,.1); color: var(--accent); padding: 2px 8px; border-radius: 3px; letter-spacing: .06em; }
        .verify-cta-row { margin-top: 16px; text-align: center; }
        .verify-cta-sub { font-size: 13px; color: var(--dim); margin-top: 8px; }
        @media (max-width: 768px) {
          .verify-row { flex-direction: column; }
          .verify-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
