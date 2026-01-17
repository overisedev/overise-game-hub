import { useMemo } from 'react';
import type { Game } from '@/types/game';
import { AAA_GAME_NAMES } from '@/types/game';
import { Gamepad2, Shield, Zap, Users } from 'lucide-react';

interface GamesPreviewSectionProps {
  games: Game[];
  totalGames: number;
  onOpenDetails: (game: Game) => void;
}

export function GamesPreviewSection({ 
  games, 
  totalGames,
  onOpenDetails 
}: GamesPreviewSectionProps) {
  // Filtra apenas jogos AAA/destaque
  const aaaGames = useMemo(() => {
    return games.filter(game => 
      AAA_GAME_NAMES.some(name => 
        game.name.toLowerCase().includes(name.toLowerCase())
      )
    ).slice(0, 9); // 9 jogos para grid 3x3
  }, [games]);

  if (games.length === 0) return null;

  return (
    <section className="games-preview-section">
      <div className="preview-container">
        {/* Grid de jogos à esquerda */}
        <div className="preview-grid-wrapper">
          <div className="preview-grid">
            {aaaGames.map((game) => (
              <div
                key={game.steam_appid}
                className="preview-card"
                onClick={() => onOpenDetails(game)}
              >
                <img src={game.cover} alt={game.name} loading="lazy" />
                <div className="preview-overlay" />
              </div>
            ))}
          </div>
        </div>

        {/* Texto à direita */}
        <div className="preview-content">
          <div className="content-badge">
            <Gamepad2 size={16} />
            <span>Biblioteca Premium</span>
          </div>
          
          <h2 className="content-title">
            Mais de <span className="highlight">{totalGames}+</span> jogos<br />
            para desbloquear
          </h2>
          
          <p className="content-description">
            Acesse uma biblioteca completa com os melhores títulos AAA e indies. 
            RPG, Ação, Aventura, Terror, Mundo Aberto e muito mais — tudo em um único lugar.
          </p>

          <div className="content-features">
            <div className="feature">
              <Shield size={18} />
              <span>Títulos originais</span>
            </div>
            <div className="feature">
              <Zap size={18} />
              <span>Acesso imediato</span>
            </div>
            <div className="feature">
              <Users size={18} />
              <span>Multiplayer incluso</span>
            </div>
          </div>

          <div className="content-categories">
            <span className="cat-label">Categorias disponíveis:</span>
            <div className="cat-tags">
              <span className="cat-tag">RPG</span>
              <span className="cat-tag">Ação</span>
              <span className="cat-tag">Aventura</span>
              <span className="cat-tag">Terror</span>
              <span className="cat-tag">FPS</span>
              <span className="cat-tag">+10</span>
            </div>
          </div>

          <a href="#como-funciona" className="cta-button">
            <span>Ver como desbloquear</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        .games-preview-section {
          width: min(1280px, calc(100% - 48px));
          margin: 0 auto;
          padding: clamp(60px, 10vw, 100px) 0;
        }
        @media (max-width: 640px) {
          .games-preview-section {
            width: calc(100% - 32px);
            padding: 50px 0;
          }
        }

        .preview-container {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .preview-container {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .preview-grid-wrapper {
          flex-shrink: 0;
        }

        .preview-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          max-width: 320px;
        }
        @media (max-width: 900px) {
          .preview-grid {
            max-width: 100%;
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 480px) {
          .preview-grid {
            gap: 6px;
          }
        }

        .preview-card {
          position: relative;
          aspect-ratio: 1 / 1;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,.08);
          transition: all .3s ease;
        }
        .preview-card:hover {
          transform: scale(1.05);
          border-color: rgba(0,255,65,.4);
          box-shadow: 0 8px 30px rgba(0,0,0,.5), 0 0 15px rgba(0,255,65,.2);
          z-index: 2;
        }

        .preview-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .4s ease;
        }
        .preview-card:hover img {
          transform: scale(1.1);
        }

        .preview-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.4) 0%, transparent 60%);
          pointer-events: none;
        }

        .preview-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        @media (max-width: 900px) {
          .preview-content {
            text-align: center;
            align-items: center;
          }
        }

        .content-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: rgba(0,255,65,.1);
          border: 1px solid rgba(0,255,65,.25);
          border-radius: 20px;
          color: var(--neon);
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: .5px;
          width: fit-content;
        }

        .content-title {
          font-size: clamp(28px, 5vw, 42px);
          font-weight: 950;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -1px;
          margin: 0;
        }
        .content-title .highlight {
          color: var(--neon);
          text-shadow: 0 0 30px rgba(0,255,65,.4);
        }

        .content-description {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.7;
          max-width: 480px;
          margin: 0;
        }

        .content-features {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .content-features {
            justify-content: center;
            gap: 14px;
          }
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,.7);
          font-size: 13px;
          font-weight: 600;
        }
        .feature svg {
          color: var(--neon);
        }

        .content-categories {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        @media (max-width: 900px) {
          .content-categories {
            align-items: center;
          }
        }

        .cat-label {
          font-size: 12px;
          color: var(--muted2);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .5px;
        }

        .cat-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        @media (max-width: 900px) {
          .cat-tags {
            justify-content: center;
          }
        }

        .cat-tag {
          padding: 6px 12px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,.8);
          text-transform: uppercase;
          letter-spacing: .3px;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: var(--neon);
          color: #000;
          font-weight: 900;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: .5px;
          border-radius: 12px;
          text-decoration: none;
          transition: all .25s ease;
          box-shadow: 0 0 25px rgba(0,255,65,.3);
          width: fit-content;
          margin-top: 8px;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(0,255,65,.5);
        }
      `}</style>
    </section>
  );
}
