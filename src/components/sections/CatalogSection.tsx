import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
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

  // Lista fixa de jogos para a vitrine rotativa (sem GTA V Legacy)
  const SHOWCASE_GAME_NAMES = [
    'The Witcher 3: Wild Hunt',
    'Sekiro: Shadows Die Twice',
    'Dark Souls III',
    'Horizon Forbidden West',
    'Detroit: Become Human',
    "Assassin's Creed Valhalla",
    'Red Dead Redemption 2',
    'ELDEN RING',
    'Cyberpunk 2077',
    'God of War Ragnarök',
    'The Last of Us Part I',
    "Baldur's Gate 3",
    'Hogwarts Legacy',
    'Forza Horizon 5',
    'Counter-Strike 2',
  ];

  // Filtra apenas os jogos da lista de showcase
  const showcasePool = useMemo(() => {
    const pool = games.filter(game => 
      SHOWCASE_GAME_NAMES.some(name => 
        game.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(game.name.toLowerCase())
      )
    );
    // Embaralha aleatoriamente
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [games]);

  // 3 jogos na vitrine - pula de 3 em 3 para mudar todos de uma vez
  const showcaseGames = useMemo(() => {
    if (showcasePool.length === 0) return [];
    const result = [];
    const startIndex = (showcaseIndex * 3) % showcasePool.length;
    for (let i = 0; i < 3; i++) {
      result.push(showcasePool[(startIndex + i) % showcasePool.length]);
    }
    return result;
  }, [showcasePool, showcaseIndex]);

  // Manual navigation - no auto-rotate
  const maxShowcaseIndex = Math.max(0, Math.floor(showcasePool.length / 3) - 1);
  
  const handlePrevShowcase = () => {
    setShowcaseIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNextShowcase = () => {
    setShowcaseIndex(prev => Math.min(maxShowcaseIndex, prev + 1));
  };

  // Reset on category change
  useEffect(() => {
    setShowcaseIndex(0);
  }, [selectedCategory]);

  // Full catalog search
  const fullCatalogGames = useMemo(() => {
    const base = selectedCategory ? getGamesByCategory(selectedCategory) : games;
    if (!searchQuery.trim()) return base;
    const q = searchQuery.toLowerCase().trim();
    return base.filter(g => g.name.toLowerCase().includes(q));
  }, [searchQuery, selectedCategory, games, getGamesByCategory]);

  const ITEMS_PER_PAGE = 8;
  const paginatedGames = useMemo(() => {
    const start = fullCatalogPage * ITEMS_PER_PAGE;
    return fullCatalogGames.slice(start, start + ITEMS_PER_PAGE);
  }, [fullCatalogGames, fullCatalogPage]);

  const hasMore = (fullCatalogPage + 1) * ITEMS_PER_PAGE < fullCatalogGames.length;

  return (
    <section id="catalogo" className="catalog-section"  style={{ padding: 'clamp(50px, 8vw, 80px) 0' }}>
      {/* Header */}
      <div className="catalog-header">
        <div>
          <h2>Verificar Disponibilidade</h2>
          <p>Pesquise abaixo. Se o jogo está na Steam, é quase certo que nossa ferramenta consegue desbloqueá-lo para você.</p>
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
          {/* Showcase Carousel */}
          <div className="showcase-carousel">
            <button 
              className="showcase-arrow showcase-arrow-left"
              onClick={handlePrevShowcase}
              disabled={showcaseIndex === 0}
              aria-label="Jogos anteriores"
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="showcase-row">
              {showcaseGames.map((game, idx) => (
                <div
                  key={`${game.steam_appid}-${showcaseIndex}-${idx}`}
                  className="game showcase-animate"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  onClick={() => onOpenDetails(game)}
                >
                  <div className="game-img" style={{ position: 'relative' }}>
                    <img src={game.cover} alt={game.name} loading="lazy" decoding="async" width={460} height={215} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="game-grad" />
                  </div>
                  <div className="game-info">
                    <span className="game-name">{game.name}</span>
                    <div className="tag-row">
                      {game.categories.slice(0, 1).map((c) => (
                        <span key={c} className="tag">{c}</span>
                      ))}
                      <span className="tag ok">Disponível</span>
                    </div>
                    <div className="game-cta">
                      <span className="tiny">Steam</span>
                      <a href="#como-funciona" className="unlock-btn" onClick={(e) => e.stopPropagation()}>Desbloquear</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="showcase-arrow showcase-arrow-right"
              onClick={handleNextShowcase}
              disabled={showcaseIndex >= maxShowcaseIndex}
              aria-label="Próximos jogos"
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* More Button */}
          <div className="catalog-more-row">
            <button 
              onClick={() => setShowFullCatalog(!showFullCatalog)} 
              className="btn catalog-more-btn"
            >
              <span className="catalog-more-icon"><Search size={16} /></span>
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
                  <p className="full-sub">Pesquise pelo nome e clique para ver detalhes.</p>
                </div>
                <div className="full-search">
                  <span className="full-search-icon"><Search size={16} /></span>
                  <input
                    type="text"
                    placeholder="Digite o nome do jogo..."
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
                      key={`${game.steam_appid}-${game.name}`}
                      className="full-card"
                      onClick={() => onOpenDetails(game)}
                    >
                      <div className="full-card-img" style={{ aspectRatio: '600/900' }}>
                        <img 
                          src={game.cover} 
                          alt={game.name} 
                          loading="lazy"
                          decoding="async"
                          width={150}
                          height={225}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.opacity = '0';
                          }}
                        />
                        <div className="full-card-grad" />
                      </div>
                      <div className="full-card-info">
                        <span className="full-card-name">{game.name}</span>
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
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        .catalog-section {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          overflow: visible;
        }
        @media (max-width: 640px) {
          .catalog-section {
            width: calc(100% - 32px);
          }
        }
        .catalog-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .catalog-header {
            flex-direction: column;
            gap: 14px;
          }
        }
        .catalog-header h2 {
          margin: 0;
          font-size: 28px;
          font-weight: 950;
          letter-spacing: -1px;
          color: #fff;
          text-transform: uppercase;
        }
        @media (max-width: 640px) {
          .catalog-header {
            text-align: center;
            align-items: center;
          }
          .catalog-header h2 {
            font-size: 22px;
          }
        }
        .catalog-header p {
          margin: 8px 0 0;
          color: rgba(255,255,255,.80);
          max-width: 56ch;
          line-height: 1.7;
          font-size: 15px;
          font-weight: 500;
        }
        @media (max-width: 640px) {
          .catalog-header p {
            font-size: 14px;
            line-height: 1.6;
            text-align: center;
          }
        }
        .catalog-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
        @media (max-width: 640px) {
          .catalog-actions {
            width: 100%;
            justify-content: flex-start;
          }
        }
        
        .catalog-shell {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 14px;
          align-items: start;
        }
        @media (max-width: 980px) {
          .catalog-shell { 
            grid-template-columns: 1fr; 
            gap: 16px;
          }
        }
        
        .side {
          position: sticky;
          top: 86px;
          padding: 14px;
          border-radius: var(--r2);
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          box-shadow: var(--shadowSoft);
          z-index: 10;
        }
        @media (max-width: 980px) {
          .side {
            position: relative;
            top: auto;
            z-index: 1;
          }
        }
        @media (max-width: 640px) {
          .side {
            padding: 12px;
          }
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
        @media (max-width: 640px) {
          .cats {
            gap: 6px;
          }
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
        @media (max-width: 640px) {
          .cat {
            padding: 8px 10px;
            font-size: 11px;
            border-radius: 12px;
          }
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

        .showcase-carousel {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .showcase-arrow {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.15);
          background: rgba(255,255,255,.05);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .2s ease;
        }
        .showcase-arrow:hover:not(:disabled) {
          background: rgba(0,255,65,.15);
          border-color: rgba(0,255,65,.4);
          color: var(--neon);
        }
        .showcase-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        @media (max-width: 640px) {
          .showcase-arrow {
            display: none;
          }
        }

        .showcase-row {
          flex: 1;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 14px;
        }
        .showcase-row .game {
          flex: 1 1 calc(33.333% - 10px);
          min-width: 200px;
          max-width: 100%;
        }
        @media (max-width: 980px) {
          .showcase-row .game {
            flex: 1 1 calc(50% - 7px);
            min-width: 180px;
          }
        }
        @media (max-width: 640px) {
          .showcase-row {
            flex-direction: column;
            gap: 16px;
          }
          .showcase-row .game {
            flex: 1 1 100%;
            min-width: 100%;
            width: 100%;
          }
        }
        
        .game {
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          box-shadow: var(--shadowSoft);
          overflow: hidden;
          cursor: pointer;
          min-width: 0;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        @media (max-width: 640px) {
          .game {
            border-radius: 14px;
          }
        }
        
        .game.showcase-animate {
          animation: showcaseEnter 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        
        @keyframes showcaseEnter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .game:hover {
          transform: translateY(-4px);
          border-color: rgba(0,255,65,.22);
        }
        .game-img {
          aspect-ratio: 16/9;
          max-height: 140px;
          background: #0a0a0a;
          border-radius: 12px 12px 0 0;
          overflow: hidden;
          width: 100%;
        }
        @media (max-width: 640px) {
          .game-img {
            max-height: 120px;
          }
        }
        .game-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform .35s ease;
          opacity: 1 !important;
        }
        .game:hover .game-img img {
          filter: saturate(1.12) contrast(1.10) brightness(1.05);
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
        @media (max-width: 640px) {
          .game-info {
            padding: 10px;
            gap: 8px;
          }
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
        @media (max-width: 640px) {
          .game-name {
            font-size: 11px;
          }
        }
        .tag-row { 
          display: flex; 
          gap: 6px; 
          flex-wrap: wrap;
          max-width: 100%;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          .tag-row { 
            gap: 5px; 
          }
        }
        .tag {
          font-size: 10px;
          font-weight: 950;
          letter-spacing: .4px;
          text-transform: uppercase;
          padding: 6px 8px;
          border-radius: 999px;
          background: rgba(0,0,0,.30);
          border: 1px solid rgba(255,255,255,.10);
          color: #fff;
          text-shadow: 0 10px 30px rgba(0,0,0,.95);
          white-space: nowrap;
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 640px) {
          .tag {
            padding: 5px 7px;
            font-size: 9px;
            max-width: 100px;
          }
        }
        .tag.ok { border-color: rgba(0,255,65,.30); }
        .game-cta {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
        }
        @media (max-width: 640px) {
          .game-cta { 
            gap: 8px;
            margin-top: 2px; 
          }
        }
        .tiny {
          font-size: 11px;
          color: var(--muted2);
          letter-spacing: .4px;
        }
        @media (max-width: 640px) {
          .tiny { font-size: 10px; }
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
        .unlock-btn {
          padding: 10px 14px;
          border-radius: 12px;
          background: linear-gradient(180deg, rgba(0,255,65,.95), rgba(0,200,55,.85));
          color: #000;
          font-weight: 950;
          text-transform: uppercase;
          font-size: 11px;
          cursor: pointer;
          transition: .2s ease;
          white-space: nowrap;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .unlock-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0,255,65,.25);
        }
        .btn-primary-small {
          padding: 10px 16px;
          border-radius: 12px;
          background: linear-gradient(180deg, rgba(0,255,65,.95), rgba(0,200,55,.85));
          color: #000;
          font-weight: 950;
          text-transform: uppercase;
          font-size: 12px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: .2s ease;
        }
        .btn-primary-small:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,255,65,.25);
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
          background: #0a0a0a;
          overflow: hidden;
          cursor: pointer;
          transition: transform .25s ease, border-color .25s ease;
          min-width: 0;
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          user-select: none;
          outline: none;
        }
        .full-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0,255,65,.22);
        }
        .full-card:active {
          transform: scale(0.98);
          transition: transform 0.1s ease;
        }
        .full-card:focus {
          outline: none;
        }
        .full-card-img {
          aspect-ratio: 16 / 9;
          background: #0a0a0a;
          position: relative;
          overflow: hidden;
        }
        .full-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(1.08) contrast(1.06);
          -webkit-user-drag: none;
          pointer-events: none;
          background: #0a0a0a;
        }
        .full-card:hover .full-card-img img {
          filter: saturate(1.12) contrast(1.10) brightness(1.05);
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
