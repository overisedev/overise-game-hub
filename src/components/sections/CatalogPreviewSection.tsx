import { useState, useMemo } from 'react';
import type { Game } from '@/types/game';

interface CatalogPreviewSectionProps {
  games: Game[];
  totalGames: number;
  onOpenDetails: (game: Game) => void;
}

// Função para gerar preço fictício baseado no nome do jogo (consistente)
const generatePrice = (name: string): { current: number; original: number; discount: number } => {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const discounts = [40, 50, 60, 70, 80, 85, 90];
  const discount = discounts[hash % discounts.length];
  const originalPrices = [149.90, 179.90, 199.90, 229.90, 249.90, 279.90];
  const original = originalPrices[hash % originalPrices.length];
  const current = Math.round((original * (100 - discount) / 100) * 100) / 100;
  return { current, original, discount };
};

export function CatalogPreviewSection({ 
  games, 
  totalGames,
  onOpenDetails 
}: CatalogPreviewSectionProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Seleciona 12 jogos aleatórios para prévia
  const previewGames = useMemo(() => {
    const shuffled = [...games].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 12);
  }, [games]);

  return (
    <section id="catalogo" className="catalog-preview-section">
      {/* Header */}
      <div className="catalog-preview-header">
        <div className="header-left">
          <div className="steam-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12c0 5.5 3.7 10.1 8.8 11.5l3.5-4.5c-.1 0-.2 0-.3 0-2.2 0-4-1.8-4-4 0-2.2 1.8-4 4-4s4 1.8 4 4c0 .7-.2 1.4-.5 2l4.5-1.5C20 18.5 20 17.3 20 16c0-2.2-1.8-4-4-4-.4 0-.8.1-1.2.2l-3.8-3.8c.7-.3 1.5-.4 2.3-.4 3.3 0 6 2.7 6 6 0 1.7-.7 3.2-1.8 4.3l.5.5c1.4-1.4 2.3-3.3 2.3-5.4C24 5.4 18.6 0 12 0z"/>
            </svg>
            <span>Jogos Steam</span>
          </div>
          <span className="total-badge">{totalGames} jogos disponíveis</span>
        </div>
        <div className="header-right">
          <a href="#como-funciona" className="unlock-all-btn">
            <span>Desbloquear Acesso</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Games Grid */}
      <div className="catalog-preview-grid">
        {previewGames.map((game) => {
          const { current, original, discount } = generatePrice(game.name);
          const isHovered = hoveredId === game.steam_appid;
          
          return (
            <div
              key={game.steam_appid}
              className={`game-card ${isHovered ? 'hovered' : ''}`}
              onClick={() => onOpenDetails(game)}
              onMouseEnter={() => setHoveredId(game.steam_appid)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Discount Badge */}
              <div className="discount-badge">-{discount}%</div>
              
              {/* Image */}
              <div className="game-card-image">
                <img src={game.cover} alt={game.name} loading="lazy" />
                <div className="game-card-overlay" />
              </div>
              
              {/* Info */}
              <div className="game-card-info">
                <span className="game-card-name">{game.name}</span>
                <div className="game-card-pricing">
                  <span className="price-current">R$ {current.toFixed(2).replace('.', ',')}</span>
                  <span className="price-original">R$ {original.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Footer */}
      <div className="catalog-preview-footer">
        <p>Tenha acesso a todos os <strong>{totalGames}+ jogos</strong> com um único plano</p>
        <a href="#como-funciona" className="cta-btn">
          <span>Ver como funciona</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      <style>{`
        .catalog-preview-section {
          width: min(1280px, calc(100% - 48px));
          margin: 0 auto;
          padding: clamp(60px, 10vw, 100px) 0;
        }
        @media (max-width: 640px) {
          .catalog-preview-section {
            width: calc(100% - 32px);
            padding: 50px 0;
          }
        }

        .catalog-preview-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          gap: 16px;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .catalog-preview-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        @media (max-width: 640px) {
          .header-left {
            flex-wrap: wrap;
            gap: 10px;
          }
        }

        .steam-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(0,0,0,.4);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 12px;
          color: #fff;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: .3px;
        }
        .steam-badge svg {
          color: var(--neon);
        }

        .total-badge {
          font-size: 13px;
          color: var(--muted);
          font-weight: 600;
        }

        .unlock-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: var(--neon);
          color: #000;
          font-weight: 900;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: .5px;
          border-radius: 12px;
          text-decoration: none;
          transition: all .25s ease;
          box-shadow: 0 0 20px rgba(0,255,65,.25);
        }
        .unlock-all-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(0,255,65,.4);
        }
        @media (max-width: 640px) {
          .unlock-all-btn {
            width: 100%;
            justify-content: center;
          }
        }

        .catalog-preview-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }
        @media (max-width: 1200px) {
          .catalog-preview-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 900px) {
          .catalog-preview-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
        }
        @media (max-width: 640px) {
          .catalog-preview-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        .game-card {
          position: relative;
          border-radius: 14px;
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.08);
          overflow: hidden;
          cursor: pointer;
          transition: all .3s ease;
        }
        .game-card:hover {
          transform: translateY(-6px);
          border-color: rgba(0,255,65,.3);
          box-shadow: 0 12px 40px rgba(0,0,0,.4), 0 0 20px rgba(0,255,65,.1);
        }

        .discount-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          z-index: 2;
          padding: 4px 8px;
          background: var(--neon);
          color: #000;
          font-weight: 900;
          font-size: 11px;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,.3);
        }

        .game-card-image {
          position: relative;
          aspect-ratio: 3/4;
          background: #0a0a0a;
          overflow: hidden;
        }
        .game-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .4s ease;
        }
        .game-card:hover .game-card-image img {
          transform: scale(1.08);
        }
        .game-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.1) 50%, transparent 100%);
          pointer-events: none;
        }

        .game-card-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        @media (max-width: 640px) {
          .game-card-info {
            padding: 8px;
            gap: 4px;
          }
        }

        .game-card-name {
          font-weight: 700;
          font-size: 13px;
          color: #fff;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 640px) {
          .game-card-name {
            font-size: 11px;
            -webkit-line-clamp: 1;
          }
        }

        .game-card-pricing {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .price-current {
          font-weight: 900;
          font-size: 14px;
          color: var(--neon);
        }
        @media (max-width: 640px) {
          .price-current {
            font-size: 12px;
          }
        }

        .price-original {
          font-size: 11px;
          color: var(--muted);
          text-decoration: line-through;
        }
        @media (max-width: 640px) {
          .price-original {
            font-size: 10px;
          }
        }

        .catalog-preview-footer {
          margin-top: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 24px;
          background: rgba(255,255,255,.02);
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 16px;
        }
        @media (max-width: 640px) {
          .catalog-preview-footer {
            flex-direction: column;
            gap: 16px;
            padding: 20px;
            text-align: center;
          }
        }

        .catalog-preview-footer p {
          margin: 0;
          font-size: 15px;
          color: var(--muted);
        }
        .catalog-preview-footer strong {
          color: #fff;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: transparent;
          border: 2px solid var(--neon);
          color: var(--neon);
          font-weight: 800;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: .5px;
          border-radius: 12px;
          text-decoration: none;
          transition: all .25s ease;
        }
        .cta-btn:hover {
          background: var(--neon);
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 0 25px rgba(0,255,65,.3);
        }
        @media (max-width: 640px) {
          .cta-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
