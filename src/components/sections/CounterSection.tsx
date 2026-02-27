import { useState, useMemo } from 'react';
import type { Game } from '@/types/game';

// Preços estimados da Steam por jogo (appid -> preço em R$)
const STEAM_PRICES: Record<number, number> = {
  1245620: 249.90, // Elden Ring
  1174180: 199.90, // Red Dead Redemption 2
  1091500: 199.90, // Cyberpunk 2077
  1593500: 249.90, // God of War
  814380: 199.90,  // Sekiro
  1938010: 249.90, // Hogwarts Legacy
  292030: 79.99,   // The Witcher 3
  1551360: 249.90, // Forza Horizon 5
  374320: 99.99,   // Dark Souls III
  367520: 149.90,  // Hollow Knight
  1568590: 149.90, // TLOU Part I
  1085660: 179.90, // Baldur's Gate 3
  271590: 89.99,   // GTA V
  1817070: 249.90, // Spiderman 2
  1817190: 249.90, // Marvel's Spider-Man Remastered
  2358720: 299.90, // Black Myth Wukong
  418370: 99.90,   // Resident Evil 7
  883710: 199.90,  // Resident Evil Village
  1196590: 249.90, // Ghost of Tsushima
  1151640: 249.90, // Horizon Zero Dawn
  1222670: 99.90,  // Death Stranding
};

function getPrice(game: Game): number {
  return STEAM_PRICES[game.steam_appid] || 149.90;
}

function fmt(val: number): string {
  return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

interface CounterSectionProps {
  games: Game[];
}

export function CounterSection({ games }: CounterSectionProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  // Pick top games that have known prices
  const counterGames = useMemo(() => {
    const withPrices = games.filter(g => STEAM_PRICES[g.steam_appid] && g.cover);
    const withoutPrices = games.filter(g => !STEAM_PRICES[g.steam_appid] && g.cover);
    return [...withPrices.slice(0, 12), ...withoutPrices.slice(0, 4)].slice(0, 14);
  }, [games]);

  const toggleGame = (appid: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(appid)) next.delete(appid);
      else next.add(appid);
      return next;
    });
  };

  const totalSteam = useMemo(() => {
    return counterGames
      .filter(g => selected.has(g.steam_appid))
      .reduce((sum, g) => sum + getPrice(g), 0);
  }, [selected, counterGames]);

  const saving = totalSteam - 9.97;

  return (
    <section id="calculadora" className="section-light section">
      <div className="container-main">
        <div className="counter-intro">
          <span className="counter-eyebrow">O preço da Steam vs o preço real</span>
          <h2 className="counter-headline">
            Quanto você pagaria<br />por esses jogos <em>na Steam?</em>
          </h2>
          <p className="counter-subline">
            Selecione os jogos que você quer jogar. Veja o que a Steam cobra por eles — e quanto você paga com a Overise.
          </p>
        </div>

        <div className="counter-wrap">
          {/* Game list */}
          <div className="counter-list">
            {counterGames.map(game => (
              <button
                key={game.steam_appid}
                className={`cg ${selected.has(game.steam_appid) ? 'cg-sel' : ''}`}
                onClick={() => toggleGame(game.steam_appid)}
              >
                <img className="cg-cover" src={game.cover} alt={game.name} loading="lazy" />
                <div className="cg-body">
                  <div className="cg-left">
                    <span className="cg-name">{game.name}</span>
                    <span className="cg-cat">{game.categories[0]}</span>
                  </div>
                  <div className="cg-right">
                    <span className="cg-price">{fmt(getPrice(game))}</span>
                    <span className={`cg-check ${selected.has(game.steam_appid) ? 'cg-check-on' : ''}`}>
                      {selected.has(game.steam_appid) ? '✓' : ''}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Result card */}
          <div className="counter-sticky">
            {selected.size === 0 && (
              <div className="rc-hint">👆 Selecione jogos ao lado</div>
            )}
            <div className="rc">
              <div className="rc-label">O que a Steam te cobraria:</div>
              <div className="rc-steam">{fmt(totalSteam)}</div>
              <div className="rc-vs">
                <span />com a Overise<span />
              </div>
              <div>
                <div className="rc-overise">R$ 9,97</div>
                <div className="rc-overise-sub">acesso a esses e a mais centenas de títulos</div>
              </div>
              {selected.size > 0 && (
                <div className="rc-saving">
                  <div className="rc-label">💚 Você economiza:</div>
                  <div className="rc-saving-val">{fmt(saving > 0 ? saving : 0)}</div>
                  <div className="rc-saving-sub">
                    {selected.size} jogo{selected.size > 1 ? 's' : ''} selecionado{selected.size > 1 ? 's' : ''}
                  </div>
                </div>
              )}
              <a href="#planos" className="rc-cta">🔓 Quero Esse Acesso →</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .counter-intro {
          text-align: center;
          margin-bottom: 48px;
        }
        .counter-eyebrow {
          font-family: 'Sora', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--neon);
          margin-bottom: 14px;
          display: block;
        }
        .counter-headline {
          font-size: clamp(28px, 5vw, 52px);
          font-weight: 900;
          line-height: .95;
          color: #fff;
          text-transform: uppercase;
          margin: 0 0 16px;
        }
        .counter-headline em {
          color: var(--neon);
          font-style: normal;
        }
        .counter-subline {
          font-size: 15px;
          color: var(--muted2);
          max-width: 520px;
          line-height: 1.75;
          margin: 0 auto;
        }
        .counter-wrap {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .counter-wrap {
            grid-template-columns: 1fr;
          }
        }
        .counter-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cg {
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color .2s;
          text-align: left;
          padding: 0;
          font-family: inherit;
          color: inherit;
        }
        .cg:hover {
          border-color: rgba(0,255,65,.2);
        }
        .cg-sel {
          border-color: var(--neon) !important;
          background: rgba(0,255,65,.04);
        }
        .cg-cover {
          width: 72px;
          height: 42px;
          object-fit: cover;
          flex-shrink: 0;
        }
        .cg-body {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex: 1;
          padding: 10px 14px;
          min-width: 0;
        }
        .cg-left {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .cg-name {
          font-size: 13px;
          font-weight: 500;
          color: #fff;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cg-cat {
          font-size: 10px;
          color: var(--muted2);
          text-transform: uppercase;
          letter-spacing: .06em;
        }
        .cg-right {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }
        .cg-price {
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: var(--muted2);
        }
        .cg-check {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          transition: all .2s;
          flex-shrink: 0;
        }
        .cg-check-on {
          background: var(--neon);
          border-color: var(--neon);
          color: #000;
        }

        /* Result card */
        .counter-sticky {
          position: sticky;
          top: 90px;
        }
        .rc-hint {
          text-align: center;
          font-size: 12px;
          color: var(--muted2);
          margin-bottom: 14px;
        }
        .rc {
          background: rgba(255,255,255,.03);
          border: 1.5px solid rgba(0,255,65,.12);
          border-radius: var(--r2);
          padding: 28px;
          box-shadow: 0 0 40px rgba(0,255,65,.06);
        }
        .rc-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--muted2);
          margin-bottom: 3px;
        }
        .rc-steam {
          font-family: 'Sora', sans-serif;
          font-size: 42px;
          font-weight: 900;
          color: #ff3b3b;
          line-height: 1;
          transition: all .3s;
        }
        .rc-vs {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 18px 0;
          font-family: 'Sora', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: var(--muted2);
        }
        .rc-vs span {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,.06);
        }
        .rc-overise {
          font-family: 'Sora', sans-serif;
          font-size: 42px;
          font-weight: 900;
          color: var(--neon);
          line-height: 1;
        }
        .rc-overise-sub {
          font-size: 12px;
          color: var(--muted2);
          margin-top: 3px;
        }
        .rc-saving {
          background: rgba(0,255,65,.05);
          border: 1px solid rgba(0,255,65,.12);
          border-radius: 10px;
          padding: 16px;
          text-align: center;
          margin-top: 18px;
        }
        .rc-saving-val {
          font-family: 'Sora', sans-serif;
          font-size: 34px;
          font-weight: 900;
          color: var(--neon);
          line-height: 1;
          transition: all .3s;
        }
        .rc-saving-sub {
          font-size: 11px;
          color: var(--muted2);
          margin-top: 4px;
        }
        .rc-cta {
          display: block;
          width: 100%;
          margin-top: 16px;
          padding: 15px;
          font-size: 16px;
          border-radius: 8px;
          background: var(--neon);
          color: #000;
          font-weight: 800;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: .5px;
          transition: .22s ease;
        }
        .rc-cta:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }
      `}</style>
    </section>
  );
}
