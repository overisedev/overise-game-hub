import { useState, useEffect, useMemo } from 'react';
import type { Game } from '@/types/game';
import overiseLogo from '@/assets/overise-logo.png';

const FEATURED_NAMES = [
  'Cyberpunk 2077',
  'ELDEN RING',
  'Hogwarts Legacy',
  'Spider-Man',
  'God of War',
  'Red Dead Redemption 2',
  'Baldur\'s Gate 3',
  'Resident Evil',
  'Grand Theft Auto V',
  'Dark Souls III',
  'Horizon Zero Dawn',
  'The Last of Us',
];

const ROTATING_TEXTS = [
  '✅ 100% Seguro',
  '⚡ Acesso Imediato',
  '🔒 Falta só 1 passo',
  '🎮 Jogue Hoje Mesmo',
  '🛡️ Garantia de 7 Dias',
  '🚀 Download via Steam',
];

export default function CheckoutBanner() {
  const [games, setGames] = useState<Game[]>([]);
  const [textIndex, setTextIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => {
    fetch('/data/games.json')
      .then(r => r.json())
      .then((data: Game[]) => setGames(data.filter((g: Game) => g.cover)));
  }, []);

  // Rotate text
  useEffect(() => {
    const interval = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => {
        setTextIndex(i => (i + 1) % ROTATING_TEXTS.length);
        setTextVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const featuredGames = useMemo(() => {
    const result: Game[] = [];
    for (const name of FEATURED_NAMES) {
      const game = games.find(g =>
        g.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(g.name.toLowerCase())
      );
      if (game) result.push(game);
    }
    return result.slice(0, 12);
  }, [games]);

  return (
    <div className="banner-root">
      {/* Left content */}
      <div className="banner-left">
        <div className="banner-logo-row">
          <img src={overiseLogo} alt="Overise" className="banner-logo" />
          <span className="banner-store-label">OVERISE STORE</span>
        </div>

        <h1 className="banner-title">
          PLANO<br />
          <span className="banner-title-highlight">INICIANTE</span>
        </h1>

        <ul className="banner-features">
          <li>✓ ACESSO INICIANTE</li>
          <li>✓ JOGOS AAA OFFLINE</li>
          <li>✓ ATUALIZAÇÕES FREQUENTES</li>
        </ul>

        <div className="banner-badge">
          OFERTA POR TEMPO LIMITADO
        </div>

        <div className={`banner-rotating-text ${textVisible ? 'visible' : ''}`}>
          {ROTATING_TEXTS[textIndex]}
        </div>

        <div className="banner-site">overisestore.com.br</div>
      </div>

      {/* Center price */}
      <div className="banner-center">
        <div className="banner-old-price">DE R$ 19,97 POR APENAS</div>
        <div className="banner-price">
          <span className="banner-currency">R$</span>
          <span className="banner-price-main">9</span>
          <span className="banner-price-cents">,97</span>
        </div>
        <div className="banner-price-tag">TAXA ÚNICA</div>
      </div>

      {/* Right game grid */}
      <div className="banner-right">
        <div className="banner-grid">
          {featuredGames.map((game, i) => (
            <div
              key={game.steam_appid}
              className="banner-game-card"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <img src={game.cover} alt={game.name} loading="eager" />
            </div>
          ))}
        </div>
        <div className="banner-grid-fade" />
      </div>

      {/* Scanlines overlay */}
      <div className="banner-scanlines" />

      <style>{`
        .banner-root {
          width: 100%;
          max-width: 1200px;
          aspect-ratio: 1200 / 400;
          margin: 0 auto;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #050505 0%, #0a0f0a 40%, #080808 100%);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          padding: 32px 40px;
          gap: 24px;
          font-family: 'Sora', sans-serif;
          box-shadow: 0 0 60px rgba(0,255,65,.08), inset 0 0 120px rgba(0,0,0,.5);
          border: 1px solid rgba(255,255,255,.06);
        }

        .banner-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,.03) 2px,
            rgba(0,0,0,.03) 4px
          );
          pointer-events: none;
          z-index: 10;
        }

        /* LEFT */
        .banner-left {
          flex: 0 0 320px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 2;
        }

        .banner-logo-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .banner-logo {
          width: 22px;
          height: 22px;
          object-fit: contain;
        }
        .banner-store-label {
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,.5);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .banner-title {
          font-size: 38px;
          font-weight: 950;
          color: #fff;
          line-height: 1;
          letter-spacing: -1px;
          margin: 0;
        }
        .banner-title-highlight {
          color: #00FF41;
          text-shadow: 0 0 30px rgba(0,255,65,.4), 0 0 60px rgba(0,255,65,.15);
          font-size: 48px;
        }

        .banner-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .banner-features li {
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,.85);
          letter-spacing: .5px;
        }

        .banner-badge {
          display: inline-block;
          width: fit-content;
          padding: 5px 12px;
          background: rgba(0,255,65,.12);
          border: 1px solid rgba(0,255,65,.3);
          border-radius: 6px;
          color: #00FF41;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .5px;
          text-transform: uppercase;
        }

        .banner-rotating-text {
          font-size: 14px;
          font-weight: 800;
          color: #fff;
          min-height: 22px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity .35s ease, transform .35s ease;
        }
        .banner-rotating-text.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .banner-site {
          font-size: 10px;
          color: rgba(255,255,255,.25);
          letter-spacing: 1px;
          margin-top: auto;
        }

        /* CENTER */
        .banner-center {
          flex: 0 0 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .banner-old-price {
          font-size: 10px;
          color: rgba(255,255,255,.4);
          font-weight: 600;
          letter-spacing: .5px;
          text-transform: uppercase;
        }

        .banner-price {
          display: flex;
          align-items: flex-start;
          gap: 2px;
          line-height: 1;
        }
        .banner-currency {
          font-size: 18px;
          font-weight: 700;
          color: rgba(255,255,255,.5);
          margin-top: 12px;
        }
        .banner-price-main {
          font-size: 96px;
          font-weight: 950;
          color: #fff;
          text-shadow: 0 0 40px rgba(255,255,255,.15);
          animation: price-pulse 3s ease-in-out infinite;
        }
        .banner-price-cents {
          font-size: 28px;
          font-weight: 800;
          color: rgba(255,255,255,.7);
          margin-top: 14px;
        }

        .banner-price-tag {
          font-size: 10px;
          font-weight: 800;
          color: #00FF41;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 4px;
        }

        @keyframes price-pulse {
          0%, 100% { text-shadow: 0 0 40px rgba(255,255,255,.1); }
          50% { text-shadow: 0 0 60px rgba(0,255,65,.2), 0 0 100px rgba(0,255,65,.1); }
        }

        /* RIGHT */
        .banner-right {
          flex: 1;
          position: relative;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .banner-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          transform: perspective(800px) rotateY(-8deg) rotateX(2deg);
          transform-origin: right center;
        }

        .banner-game-card {
          border-radius: 6px;
          overflow: hidden;
          aspect-ratio: 460 / 215;
          animation: card-float 6s ease-in-out infinite alternate;
          border: 1px solid rgba(255,255,255,.06);
        }
        .banner-game-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .banner-game-card:nth-child(odd) {
          animation-direction: alternate-reverse;
        }

        @keyframes card-float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }

        .banner-grid-fade {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(to right, #050505 0%, transparent 30%),
            linear-gradient(to left, rgba(5,5,5,.6) 0%, transparent 15%),
            linear-gradient(to top, #050505 0%, transparent 20%),
            linear-gradient(to bottom, #050505 0%, transparent 20%);
          pointer-events: none;
          z-index: 3;
        }

        /* Shine sweep on cards */
        .banner-game-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 30%,
            rgba(255,255,255,.06) 45%,
            rgba(255,255,255,.12) 50%,
            rgba(255,255,255,.06) 55%,
            transparent 70%
          );
          animation: banner-shine 5s ease-in-out infinite;
          animation-delay: inherit;
        }

        @keyframes banner-shine {
          0%, 100% { transform: translateX(-150%); }
          50% { transform: translateX(150%); }
        }
      `}</style>
    </div>
  );
}
