import { useState, useEffect, useMemo } from 'react';
import type { Game } from '@/types/game';
import { CATEGORIES } from '@/types/game';

interface CatalogSectionProps {
  games: Game[];
  totalGames: number;
  getGamesByCategory: (cat: string) => Game[];
  searchGames: (query: string) => Game[];
  onOpenDetails: (game: Game) => void;
}

export function CatalogSection({ 
  games, 
  totalGames, 
  getGamesByCategory, 
  searchGames,
  onOpenDetails 
}: CatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const [showFullCatalog, setShowFullCatalog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fullCatalogPage, setFullCatalogPage] = useState(0);

  const filteredGames = useMemo(() => {
    if (!selectedCategory) return games;
    return getGamesByCategory(selectedCategory);
  }, [selectedCategory, games, getGamesByCategory]);

  // 3 jogos na vitrine
  const showcaseGames = useMemo(() => {
    if (filteredGames.length === 0) return [];
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(filteredGames[(showcaseIndex + i) % filteredGames.length]);
    }
    return result;
  }, [filteredGames, showcaseIndex]);

  // Auto-rotate showcase
  useEffect(() => {
    if (filteredGames.length <= 3) return;
    const interval = setInterval(() => {
      setShowcaseIndex((prev) => (prev + 1) % filteredGames.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [filteredGames.length]);

  // Reset on category change
  useEffect(() => {
    setShowcaseIndex(0);
  }, [selectedCategory]);

  // Full catalog search
  const fullCatalogGames = useMemo(() => {
    return searchGames(searchQuery);
  }, [searchQuery, searchGames]);

  const ITEMS_PER_PAGE = 8;
  const paginatedGames = useMemo(() => {
    const start = fullCatalogPage * ITEMS_PER_PAGE;
    return fullCatalogGames.slice(start, start + ITEMS_PER_PAGE);
  }, [fullCatalogGames, fullCatalogPage]);

  const hasMore = (fullCatalogPage + 1) * ITEMS_PER_PAGE < fullCatalogGames.length;

  return (
    <section id="catalogo" className="section-tight container-main">
      {/* Header */}
      <div className="catalog-header">
        <div>
          <h2>Catálogo</h2>
          <p>Navegue por categorias. A vitrine exibe uma seleção rotativa com transição suave — clique para abrir detalhes.</p>
        </div>
        <div className="catalog-actions">
          <a href="#planos" className="btn btn-small">Ver planos</a>
        </div>
      </div>

      {/* Catalog Shell */}
      <div className="catalog-shell">
        {/* Sidebar */}
        <aside className="side">
          <div className="side-title">
            <span>Categorias</span>
            <span>Filtro</span>
          </div>
          <div className="cats">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`cat ${!selectedCategory ? 'active' : ''}`}
            >
              Todos
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cat ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="catalog-main">
          {/* Showcase Row */}
          <div className="showcase-row">
            {showcaseGames.map((game, idx) => (
              <div
                key={`${game.steam_appid}-${showcaseIndex}-${idx}`}
                className="game animate-swap"
                onClick={() => onOpenDetails(game)}
              >
                <div className="game-img">
                  <img src={game.cover} alt={game.name} loading="lazy" />
                  <div className="game-grad" />
                </div>
                <div className="game-info">
                  <span className="game-name">{game.name}</span>
                  <div className="tag-row">
                    {game.categories.slice(0, 2).map((c) => (
                      <span key={c} className="tag">{c}</span>
                    ))}
                    <span className="tag ok">Disponível</span>
                  </div>
                  <div className="game-cta">
                    <span className="tiny">Steam</span>
                    <button className="ghost-btn">Ver detalhes</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More Button */}
          <div className="catalog-more-row">
            <button 
              onClick={() => setShowFullCatalog(!showFullCatalog)} 
              className="btn catalog-more-btn"
            >
              <span className="catalog-more-icon">⌕</span>
              {showFullCatalog ? 'Fechar catálogo' : 'Ver catálogo completo'}
            </button>
            <span className="catalog-more-hint">Abra a biblioteca completa com busca e paginação.</span>
          </div>

          {/* Full Catalog */}
          {showFullCatalog && (
            <div className="full-catalog show">
              <div className="full-top">
                <div>
                  <h3 className="full-title">Catálogo completo</h3>
                  <p className="full-sub">Pesquise pelo nome (aceita abreviações como GTA, RDR2, TLOU) e clique para abrir detalhes.</p>
                </div>
                <div className="full-search">
                  <span className="full-search-icon">⌕</span>
                  <input
                    type="text"
                    placeholder="Buscar jogo..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setFullCatalogPage(0);
                    }}
                  />
                  <button 
                    className="ghost-btn"
                    onClick={() => setShowFullCatalog(false)}
                  >
                    Fechar
                  </button>
                </div>
              </div>

              <div className="full-grid">
                {paginatedGames.length > 0 ? (
                  paginatedGames.map((game) => (
                    <div
                      key={game.steam_appid}
                      className="full-card"
                      onClick={() => onOpenDetails(game)}
                    >
                      <div className="full-card-img">
                        <img src={game.cover} alt={game.name} loading="lazy" />
                        <div className="full-card-grad" />
                      </div>
                      <div className="full-card-info">
                        <span className="full-card-name">{game.name}</span>
                        <button className="full-card-btn">Ver</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <b>Nenhum resultado</b>
                    <span>Tente outra busca ou limpe o filtro.</span>
                  </div>
                )}
              </div>

              <div className="full-bottom">
                {hasMore && (
                  <button 
                    className="btn btn-small"
                    onClick={() => setFullCatalogPage((p) => p + 1)}
                  >
                    Carregar mais
                  </button>
                )}
                <span className="tiny">{fullCatalogGames.length} jogos encontrados</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .catalog-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 18px;
        }
        .catalog-header h2 {
          margin: 0;
          font-size: 28px;
          font-weight: 950;
          letter-spacing: -1px;
          color: #fff;
          text-transform: uppercase;
        }
        .catalog-header p {
          margin: 8px 0 0;
          color: var(--muted);
          max-width: 56ch;
          line-height: 1.6;
        }
        .catalog-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
        
        .catalog-shell {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 14px;
          align-items: start;
        }
        @media (max-width: 980px) {
          .catalog-shell { grid-template-columns: 1fr; }
          .side { position: relative; top: auto; }
        }
        
        .side {
          position: sticky;
          top: 86px;
          padding: 14px;
          border-radius: var(--r2);
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          box-shadow: var(--shadowSoft);
        }
        .side-title {
          font-weight: 950;
          letter-spacing: .6px;
          text-transform: uppercase;
          font-size: 12px;
          color: var(--muted2);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .cats {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        .cat {
          cursor: pointer;
          user-select: none;
          padding: 10px 12px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(0,0,0,.22);
          font-weight: 950;
          font-size: 12px;
          letter-spacing: .4px;
          color: #d7d7d7;
          transition: .2s ease;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .cat:hover {
          transform: translateY(-1px);
          border-color: rgba(0,255,65,.25);
        }
        .cat.active {
          background: rgba(0,255,65,.90);
          color: #000;
          border-color: rgba(0,255,65,.55);
        }

        .showcase-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          align-items: stretch;
        }
        @media (max-width: 980px) {
          .showcase-row { grid-template-columns: 1fr; }
        }
        
        .game {
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          box-shadow: var(--shadowSoft);
          overflow: hidden;
          cursor: pointer;
          transform: translateZ(0);
          transition: .25s ease;
          min-width: 0;
        }
        .game:hover {
          transform: translateY(-4px);
          border-color: rgba(0,255,65,.22);
        }
        .game-img {
          aspect-ratio: 16/9;
          background: #000;
          position: relative;
          overflow: hidden;
        }
        .game-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.03);
          transition: .45s ease;
          filter: saturate(1.08) contrast(1.08);
        }
        .game:hover .game-img img {
          transform: scale(1.07);
        }
        .game-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.86), rgba(0,0,0,.06));
          pointer-events: none;
        }
        .game-info {
          padding: 12px 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
        }
        .game-name {
          font-weight: 950;
          font-size: 12px;
          letter-spacing: .4px;
          color: #fff;
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tag-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .tag {
          font-size: 10px;
          font-weight: 950;
          letter-spacing: .5px;
          text-transform: uppercase;
          padding: 7px 9px;
          border-radius: 999px;
          background: rgba(0,0,0,.30);
          border: 1px solid rgba(255,255,255,.10);
          color: #fff;
          text-shadow: 0 10px 30px rgba(0,0,0,.95);
          white-space: nowrap;
        }
        .tag.ok { border-color: rgba(0,255,65,.30); }
        .game-cta {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: space-between;
        }
        .tiny {
          font-size: 11px;
          color: var(--muted2);
          letter-spacing: .4px;
        }
        .ghost-btn {
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(0,0,0,.22);
          color: #fff;
          font-weight: 950;
          text-transform: uppercase;
          font-size: 11px;
          cursor: pointer;
          transition: .2s ease;
          white-space: nowrap;
        }
        .ghost-btn:hover {
          transform: translateY(-1px);
          border-color: rgba(255,255,255,.22);
        }

        .catalog-more-row {
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 14px;
          flex-wrap: wrap;
        }
        .catalog-more-btn {
          padding: 12px 16px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 950;
        }
        .catalog-more-icon {
          width: 28px;
          height: 28px;
          border-radius: 10px;
          background: rgba(0,255,65,.12);
          border: 1px solid rgba(0,255,65,.22);
          color: var(--neon);
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          font-weight: 950;
        }
        .catalog-more-hint {
          color: var(--muted2);
          font-size: 12px;
          line-height: 1.4;
        }

        .full-catalog {
          margin-top: 16px;
          border-radius: var(--r2);
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          box-shadow: var(--shadowSoft);
          padding: 16px;
          overflow: hidden;
          animation: floatIn .45s ease both;
        }
        .full-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .full-title {
          font-weight: 950;
          letter-spacing: -.8px;
          text-transform: uppercase;
          color: #fff;
          font-size: 18px;
          margin: 0 0 2px;
        }
        .full-sub {
          color: var(--muted2);
          font-size: 12px;
          line-height: 1.4;
          margin: 0;
        }
        .full-search {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(0,0,0,.24);
          flex: 1 1 420px;
          min-width: 280px;
        }
        .full-search-icon {
          width: 28px;
          height: 28px;
          border-radius: 10px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.08);
          display: grid;
          place-items: center;
          color: #cfcfcf;
          flex: 0 0 auto;
        }
        .full-search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #fff;
          font-weight: 800;
          letter-spacing: .2px;
          font-size: 13px;
          min-width: 0;
        }
        .full-search input::placeholder {
          color: rgba(255,255,255,.42);
        }

        .full-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        @media (max-width: 980px) {
          .full-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .full-grid { grid-template-columns: 1fr; }
        }

        .full-card {
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(0,0,0,.20);
          overflow: hidden;
          cursor: pointer;
          transition: .25s ease;
          min-width: 0;
        }
        .full-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0,255,65,.22);
        }
        .full-card-img {
          aspect-ratio: 16 / 9;
          background: #000;
          position: relative;
          overflow: hidden;
        }
        .full-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.03);
          filter: saturate(1.08) contrast(1.06);
          transition: .35s ease;
        }
        .full-card:hover .full-card-img img {
          transform: scale(1.07);
        }
        .full-card-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.88), rgba(0,0,0,.06));
          pointer-events: none;
        }
        .full-card-info {
          padding: 10px 10px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-width: 0;
        }
        .full-card-name {
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: .4px;
          font-size: 11px;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1 1 auto;
          min-width: 0;
        }
        .full-card-btn {
          padding: 9px 10px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(0,0,0,.22);
          color: #fff;
          font-weight: 950;
          text-transform: uppercase;
          font-size: 10px;
          cursor: pointer;
          white-space: nowrap;
        }
        .full-bottom {
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        .empty-state {
          grid-column: 1 / -1;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(0,0,0,.18);
          padding: 18px;
        }
        .empty-state b {
          display: block;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: .4px;
        }
        .empty-state span {
          display: block;
          margin-top: 6px;
          color: var(--muted2);
          font-size: 12px;
        }

        .btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 18px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.05);
          color: #fff;
          font-weight: 950;
          letter-spacing: .5px;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition: .22s ease;
          overflow: hidden;
          white-space: nowrap;
        }
        .btn:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,.18);
          box-shadow: var(--shadowSoft);
        }
        .btn-small {
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 12px;
        }
      `}</style>
    </section>
  );
}
