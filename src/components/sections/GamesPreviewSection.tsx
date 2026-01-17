import { useMemo } from 'react';
import type { Game } from '@/types/game';

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
  // Seleciona jogos aleatórios para prévia (12 jogos para grid 4x3)
  const previewGames = useMemo(() => {
    const shuffled = [...games].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 12);
  }, [games]);

  if (games.length === 0) return null;

  return (
    <section className="games-preview-section">
      {/* Título destacado */}
      <div className="preview-header">
        <h2 className="preview-title">
          Mais de <span className="highlight">{totalGames}</span> jogos para jogar!
        </h2>
      </div>

      {/* Grid de jogos */}
      <div className="preview-grid">
        {previewGames.map((game) => (
          <div
            key={game.steam_appid}
            className="preview-card"
            onClick={() => onOpenDetails(game)}
          >
            <img src={game.cover} alt={game.name} loading="lazy" />
            <div className="preview-overlay" />
            <span className="preview-name">{game.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        .games-preview-section {
          width: min(1280px, calc(100% - 48px));
          margin: 0 auto;
          padding: clamp(50px, 8vw, 80px) 0;
        }
        @media (max-width: 640px) {
          .games-preview-section {
            width: calc(100% - 32px);
            padding: 40px 0;
          }
        }

        .preview-header {
          text-align: center;
          margin-bottom: 32px;
        }
        @media (max-width: 640px) {
          .preview-header {
            margin-bottom: 24px;
          }
        }

        .preview-title {
          font-size: clamp(24px, 5vw, 42px);
          font-weight: 950;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: -1px;
          margin: 0;
        }
        .preview-title .highlight {
          color: var(--neon);
          text-shadow: 0 0 30px rgba(0,255,65,.4);
        }

        .preview-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        @media (max-width: 1100px) {
          .preview-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .preview-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }
        @media (max-width: 480px) {
          .preview-grid {
            gap: 8px;
          }
        }

        .preview-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,.08);
          transition: all .3s ease;
        }
        .preview-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(0,255,65,.35);
          box-shadow: 0 12px 40px rgba(0,0,0,.5), 0 0 20px rgba(0,255,65,.15);
          z-index: 2;
        }

        .preview-card img {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
          transition: transform .4s ease;
        }
        .preview-card:hover img {
          transform: scale(1.08);
        }

        .preview-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.1) 50%, transparent 100%);
          pointer-events: none;
        }

        .preview-name {
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 10px;
          color: #fff;
          font-weight: 800;
          font-size: 11px;
          letter-spacing: .3px;
          text-transform: uppercase;
          text-shadow: 0 2px 10px rgba(0,0,0,.9);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 640px) {
          .preview-name {
            font-size: 10px;
            left: 8px;
            right: 8px;
            bottom: 8px;
          }
        }
      `}</style>
    </section>
  );
}
