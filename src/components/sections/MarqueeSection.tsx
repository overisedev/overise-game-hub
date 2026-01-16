import type { Game } from '@/types/game';

interface MarqueeSectionProps {
  games: Game[];
}

export function MarqueeSection({ games }: MarqueeSectionProps) {
  if (games.length === 0) return null;

  const displayGames = [...games, ...games];

  return (
    <section className="marquee-wrap container-main">
      <div className="marquee-title">
        <span>Jogos em alta • vitrine premium</span>
        <span>Passe o mouse para pausar</span>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          {displayGames.map((game, idx) => (
            <div key={`${game.steam_appid}-${idx}`} className="mini-card">
              <img
                src={game.cover}
                alt={game.name}
                loading="lazy"
              />
              <div className="mini-overlay" />
              <span className="mini-label">{game.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-wrap {
          margin-top: 64px;
          padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,.06);
        }
        .marquee-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 14px;
          color: var(--muted2);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 12px;
          padding: 0 10px;
        }
        .marquee {
          width: 100%;
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.03);
          box-shadow: var(--shadowSoft);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .marquee-track {
          display: flex;
          gap: 14px;
          width: max-content;
          padding: 14px;
          animation: marquee 90s linear infinite;
          will-change: transform;
        }
        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }
        .mini-card {
          width: 280px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.10);
          background: #0b0b0b;
          flex: 0 0 auto;
          position: relative;
          transform: translateZ(0);
          transition: .25s ease;
          cursor: pointer;
        }
        .mini-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0,255,65,.25);
        }
        .mini-card img {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
          transform: scale(1.03);
          transition: .4s ease;
          filter: saturate(1.08) contrast(1.06);
        }
        .mini-card:hover img {
          transform: scale(1.07);
        }
        .mini-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.86), rgba(0,0,0,.06));
          pointer-events: none;
        }
        .mini-label {
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 10px;
          color: #fff;
          font-weight: 950;
          font-size: 12px;
          letter-spacing: .4px;
          text-transform: uppercase;
          text-shadow: 0 10px 30px rgba(0,0,0,.95);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </section>
  );
}
