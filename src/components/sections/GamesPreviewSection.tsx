import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { Game } from '@/types/game';
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Lista fixa de jogos para exibir no grid (ordem específica)
  const FEATURED_GAMES = [
    'Baldur\'s Gate 3',
    'Cyberpunk 2077', 
    'Dark Souls III',
    'ELDEN RING',
    'Grand Theft Auto V',
    'Hogwarts Legacy',
    'The Last of Us',
    'Resident Evil Village',
    'Hollow Knight: Silksong',
  ];

  const aaaGames = useMemo(() => {
    const result: Game[] = [];
    for (const name of FEATURED_GAMES) {
      const game = games.find(g => 
        g.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(g.name.toLowerCase())
      );
      if (game && game.cover) {
        result.push(game);
      }
    }
    return result.slice(0, 9);
  }, [games]);

  if (games.length === 0) return null;

  return (
    <section className="games-preview-section section">
      <div className="container-main">
        <div className="preview-container">
          {/* Grid de jogos à esquerda */}
          <motion.div 
            className="preview-grid"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {aaaGames.map((game, index) => (
              <motion.div
                key={game.steam_appid}
                className={`preview-card ${hoveredIndex === index ? 'hovered' : ''}`}
                onClick={() => onOpenDetails(game)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.06,
                  ease: "easeOut"
                }}
              >
                <motion.div 
                  className="card-inner"
                  animate={{
                    scale: hoveredIndex === index ? 1.08 : 1,
                    y: hoveredIndex === index ? -8 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="card-glow" />
                  <img src={game.cover} alt={game.name} loading="lazy" />
                  <div className="preview-overlay" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Texto à direita */}
          <motion.div 
            className="preview-content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
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
          </motion.div>
        </div>
      </div>

      <style>{`
        .games-preview-section {
          padding: clamp(60px, 10vw, 100px) 0;
        }

        .preview-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 980px) {
          .preview-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .preview-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          width: 100%;
        }
        @media (max-width: 480px) {
          .preview-grid {
            gap: 6px;
          }
        }

        .preview-card {
          position: relative;
          cursor: pointer;
        }

        .card-inner {
          position: relative;
          width: 100%;
          aspect-ratio: 460 / 215;
          border-radius: 10px;
          overflow: hidden;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,.08);
          transition: border-color .3s ease, box-shadow .3s ease;
        }

        .preview-card.hovered .card-inner {
          border-color: rgba(0,255,65,.6);
          box-shadow: 
            0 12px 40px rgba(0,0,0,.7),
            0 0 40px rgba(0,255,65,.2),
            0 0 80px rgba(0,255,65,.1);
        }

        .card-glow {
          position: absolute;
          inset: -100%;
          background: radial-gradient(circle at 50% 50%, rgba(0,255,65,.2), transparent 50%);
          opacity: 0;
          transition: opacity .4s ease;
          pointer-events: none;
          z-index: 2;
        }
        .preview-card.hovered .card-glow {
          opacity: 1;
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        .card-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .preview-card.hovered .card-inner img {
          transform: scale(1.1);
        }

        .preview-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.4) 0%, transparent 60%);
          pointer-events: none;
          transition: opacity .3s ease;
        }
        .preview-card.hovered .preview-overlay {
          opacity: .2;
        }

        .preview-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        @media (max-width: 980px) {
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
        @media (max-width: 980px) {
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
        @media (max-width: 980px) {
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
