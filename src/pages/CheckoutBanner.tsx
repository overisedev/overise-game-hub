import { useState, useEffect, useRef, useMemo } from 'react';
import type { Game } from '@/types/game';
import overiseLogo from '@/assets/overise-logo.png';

const ROTATING_TEXTS = [
  '✅ 100% Seguro',
  '⚡ Acesso Imediato',
  '🔒 Compra Blindada',
  '🎮 Jogue Hoje Mesmo',
  '🛡️ Garantia de 7 Dias',
  '🚀 Download via Steam',
];

const FEATURED_NAMES = [
  'Cyberpunk 2077', 'ELDEN RING', 'Hogwarts Legacy', 'Spider-Man',
  'God of War', 'Red Dead Redemption 2', 'Baldur\'s Gate 3', 'Resident Evil',
  'Grand Theft Auto V', 'Dark Souls III', 'Horizon Zero Dawn', 'The Last of Us',
  'Call of Duty', 'Battlefield', 'Apex',
];

export default function CheckoutBanner() {
  const [games, setGames] = useState<Game[]>([]);
  const [textIndex, setTextIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/data/games.json')
      .then(r => r.json())
      .then((data: Game[]) => setGames(data.filter((g: Game) => g.cover)));
  }, []);

  // Rotating text
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(i => (i + 1) % ROTATING_TEXTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 15 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bannerRef.current) return;
    const { left, top, width, height } = bannerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    bannerRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  };

  const handleMouseLeave = () => {
    if (bannerRef.current) {
      bannerRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sc = (s % 60).toString().padStart(2, '0');
    return `${m}:${sc}`;
  };

  const featuredGames = useMemo(() => {
    const result: Game[] = [];
    for (const name of FEATURED_NAMES) {
      const game = games.find(g =>
        g.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(g.name.toLowerCase())
      );
      if (game && !result.includes(game)) result.push(game);
    }
    return result.slice(0, 15);
  }, [games]);

  const col1 = useMemo(() => {
    const s = featuredGames.slice(0, 5);
    return [...s, ...s];
  }, [featuredGames]);
  const col2 = useMemo(() => {
    const s = featuredGames.slice(5, 10);
    return [...s, ...s];
  }, [featuredGames]);
  const col3 = useMemo(() => {
    const s = featuredGames.slice(10, 15);
    return [...s, ...s];
  }, [featuredGames]);

  return (
    <div
      className="cb-root"
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* LEFT */}
      <div className="cb-left">
        <div className="cb-logo-row">
          <img src={overiseLogo} alt="Overise" className="cb-logo" />
          <span className="cb-store-label">OVERISE STORE</span>
        </div>

        <h1 className="cb-title">
          PLANO<br />
          <span className="cb-title-hl">INICIANTE</span>
        </h1>

        <ul className="cb-features">
          <li><span className="cb-check">✓</span> ACESSO IMEDIATO</li>
          <li><span className="cb-check">✓</span> JOGOS AAA OFFLINE</li>
          <li><span className="cb-check">✓</span> ATUALIZAÇÕES GRÁTIS</li>
        </ul>

        <div className="cb-badge">
          <div className="cb-pulse-dot" />
          OFERTA ENCERRA EM {formatTime(timeLeft)}
        </div>

        <div className="cb-rotating-text">
          <span key={textIndex}>{ROTATING_TEXTS[textIndex]}</span>
        </div>
      </div>

      {/* CENTER */}
      <div className="cb-center">
        <div className="cb-old-price">DE R$ 19,97 POR</div>
        <div className="cb-price">
          <span className="cb-currency">R$</span>
          <span className="cb-price-main">14</span>
          <span className="cb-price-cents">,97</span>
        </div>
        <div className="cb-price-tag">TAXA ÚNICA</div>
      </div>

      {/* RIGHT - Scrolling columns */}
      <div className="cb-right">
        <div className="cb-scroll-container">
          <div className="cb-scroll-col cb-scroll-up" style={{ animationDuration: '25s' }}>
            {col1.map((g, i) => (
              <div key={`c1-${i}`} className="cb-scroll-card">
                <img src={g.cover} alt={g.name} loading="eager" />
              </div>
            ))}
          </div>
          <div className="cb-scroll-col cb-scroll-down" style={{ marginTop: '-50px', animationDuration: '20s' }}>
            {col2.map((g, i) => (
              <div key={`c2-${i}`} className="cb-scroll-card">
                <img src={g.cover} alt={g.name} loading="eager" />
              </div>
            ))}
          </div>
          <div className="cb-scroll-col cb-scroll-up" style={{ animationDuration: '30s' }}>
            {col3.map((g, i) => (
              <div key={`c3-${i}`} className="cb-scroll-card">
                <img src={g.cover} alt={g.name} loading="eager" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cb-scanlines" />

      <style>{`
        .cb-root {
          width: 100%;
          max-width: 1200px;
          aspect-ratio: 1200 / 420;
          margin: 0 auto;
          display: flex;
          align-items: center;
          background: radial-gradient(circle at 30% 50%, #0a0f0a 0%, #050505 100%);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          padding: 32px 40px;
          gap: 24px;
          font-family: 'Sora', sans-serif;
          box-shadow: 0 20px 50px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.05), inset 0 0 60px rgba(0,255,65,.02);
          transition: transform 0.1s ease-out;
        }

        .cb-scanlines {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,.2) 50%, rgba(0,0,0,.2));
          background-size: 100% 4px;
          pointer-events: none; z-index: 10; opacity: .3;
        }

        /* LEFT */
        .cb-left { flex: 0 0 340px; display: flex; flex-direction: column; gap: 12px; z-index: 5; }
        .cb-logo-row { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
        .cb-logo { width: 22px; height: 22px; object-fit: contain; }
        .cb-store-label { font-size: 11px; font-weight: 800; color: rgba(255,255,255,.4); letter-spacing: 3px; text-transform: uppercase; }

        .cb-title { font-size: 42px; font-weight: 800; color: #fff; line-height: .9; letter-spacing: -2px; margin: 0; }
        .cb-title-hl {
          color: #00FF41;
          text-shadow: 0 0 20px rgba(0,255,65,.6);
          font-size: 52px;
          display: inline-block;
          animation: cb-glitch 3s infinite linear alternate-reverse;
        }
        @keyframes cb-glitch {
          0%, 90% { transform: skew(0deg); }
          92% { transform: skew(-2deg); filter: hue-rotate(0deg); }
          94% { transform: skew(2deg); filter: hue-rotate(90deg); }
          96% { transform: skew(0deg); filter: hue-rotate(0deg); }
          100% { transform: skew(0deg); }
        }

        .cb-features { list-style: none; padding: 0; margin: 8px 0; display: flex; flex-direction: column; gap: 6px; }
        .cb-features li { font-size: 13px; font-weight: 600; color: #ccc; display: flex; align-items: center; gap: 8px; }
        .cb-check { color: #00FF41; font-weight: 900; }

        .cb-badge {
          display: flex; align-items: center; gap: 8px; width: fit-content;
          padding: 6px 14px;
          background: rgba(220,38,38,.15); border: 1px solid rgba(220,38,38,.4); border-radius: 8px;
          color: #ef4444; font-size: 11px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase;
          box-shadow: 0 0 15px rgba(220,38,38,.1);
        }
        .cb-pulse-dot {
          width: 6px; height: 6px; background: #ef4444; border-radius: 50%;
          animation: cb-pulse-red 1.5s infinite;
        }
        @keyframes cb-pulse-red {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(1.5); }
          100% { opacity: 1; transform: scale(1); }
        }

        .cb-rotating-text { font-size: 14px; font-weight: 600; color: #fff; min-height: 22px; margin-top: 4px; }
        .cb-rotating-text span { animation: cb-fadeUp .4s ease forwards; }
        @keyframes cb-fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* CENTER */
        .cb-center {
          flex: 0 0 220px; display: flex; flex-direction: column; align-items: center; justify-content: center;
          z-index: 5; position: relative;
        }
        .cb-center::before, .cb-center::after {
          content: ''; position: absolute; top: 10%; height: 80%; width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,.1), transparent);
        }
        .cb-center::before { left: 0; }
        .cb-center::after { right: 0; }

        .cb-old-price { font-size: 11px; color: #666; font-weight: 700; text-decoration: line-through; margin-bottom: -5px; }
        .cb-price { display: flex; align-items: flex-start; line-height: 1; filter: drop-shadow(0 0 10px rgba(0,255,65,.3)); }
        .cb-currency { font-size: 20px; font-weight: 700; color: #00FF41; margin-top: 12px; margin-right: 4px; }
        .cb-price-main { font-size: 100px; font-weight: 800; color: #fff; letter-spacing: -4px; }
        .cb-price-cents { font-size: 32px; font-weight: 700; color: #fff; margin-top: 16px; }
        .cb-price-tag {
          font-size: 11px; font-weight: 800; background: #00FF41; color: #000;
          padding: 4px 12px; border-radius: 4px; text-transform: uppercase; margin-top: 8px;
          transform: skewX(-10deg);
        }

        /* RIGHT - Scrolling */
        .cb-right {
          flex: 1; height: 100%; position: relative; overflow: hidden; z-index: 1;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .cb-right::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to right, #050505 0%, transparent 20%, transparent 80%, #050505 100%);
          pointer-events: none; z-index: 2;
        }

        .cb-scroll-container {
          display: flex; gap: 12px; height: 150%;
          transform: translateY(-15%) rotate(5deg) scale(1.1);
        }

        .cb-scroll-col { flex: 1; display: flex; flex-direction: column; gap: 12px; }
        .cb-scroll-up { animation: cb-scrollUp linear infinite; }
        .cb-scroll-down { animation: cb-scrollDown linear infinite; }

        .cb-scroll-card {
          border-radius: 8px; overflow: hidden; aspect-ratio: 2/3; position: relative;
          box-shadow: 0 4px 10px rgba(0,0,0,.5); border: 1px solid rgba(255,255,255,.1);
          flex-shrink: 0;
        }
        .cb-scroll-card img { width: 100%; height: 100%; object-fit: cover; display: block; }

        @keyframes cb-scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes cb-scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
