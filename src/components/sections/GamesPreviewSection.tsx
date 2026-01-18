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
    'Resident Evil 4',
    'Silksong',
    'God of War',
    'Red Dead Redemption 2',
    'Horizon Zero Dawn',
    'Spider-Man',
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
    return result.slice(0, 12);
  }, [games]);

  // Últimos 3 cards são não-interativos
  const isInteractive = (index: number) => index < 9;

  if (games.length === 0) return null;

  return (
    <section className="games-preview-section section">
      <div className="container-main">
        <div className="preview-container">
          {/* Grid de jogos à esquerda */}
          <div className="preview-grid-wrapper">
            <motion.div 
              className="preview-grid"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {aaaGames.map((game, index) => {
                const interactive = isInteractive(index);
                return (
                  <motion.div
                    key={game.steam_appid}
                    className={`preview-card ${hoveredIndex === index && interactive ? 'hovered' : ''} ${!interactive ? 'faded' : ''}`}
                    onClick={() => interactive && onOpenDetails(game)}
                    onMouseEnter={() => interactive && setHoveredIndex(index)}
                    onMouseLeave={() => interactive && setHoveredIndex(null)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.06,
                      ease: "easeOut"
                    }}
                    style={{ cursor: interactive ? 'pointer' : 'default' }}
                  >
                    <motion.div 
                      className="card-inner"
                      animate={{
                        scale: hoveredIndex === index && interactive ? 1.08 : 1,
                        y: hoveredIndex === index && interactive ? -8 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="card-glow" />
                      <div className="card-shine" />
                      <img src={game.cover} alt={game.name} loading="lazy" />
                      <div className="preview-overlay" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
            <div className="grid-fade-overlay" />
          </div>

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
              <span>Arquivos Oficiais Steam</span>
            </div>
            
            <h2 className="content-title">
              Mais de <span className="highlight">1000+</span> jogos<br />
              para jogar
            </h2>
            
            <p className="content-description">
              Esqueça downloads lentos ou sites estranhos. Com a Overise, você transforma sua biblioteca. 
              Acesse lançamentos e clássicos baixando direto da fonte oficial.
            </p>

            <div className="content-features">
              <div className="feature">
                <Zap size={18} />
                <div className="feature-text">
                  <span className="feature-title">Velocidade Máxima</span>
                  <span className="feature-desc">Baixe direto dos servidores da Steam usando o máximo da sua internet.</span>
                </div>
              </div>
              <div className="feature">
                <Shield size={18} />
                <div className="feature-text">
                  <span className="feature-title">Segurança Total</span>
                  <span className="feature-desc">Nada de vírus ou arquivos suspeitos. Jogo original e limpo.</span>
                </div>
              </div>
              <div className="feature">
                <Users size={18} />
                <div className="feature-text">
                  <span className="feature-title">Jogue Online</span>
                  <span className="feature-desc">Jogue online e desafie seus amigos nos títulos competitivos.</span>
                </div>
              </div>
            </div>

            <div className="content-categories">
              <span className="cat-label">Categorias disponíveis:</span>
              <div className="cat-tags">
                <span className="cat-tag">Ação</span>
                <span className="cat-tag">RPG</span>
                <span className="cat-tag">Simulação</span>
                <span className="cat-tag">Estratégia</span>
                <span className="cat-tag">Terror</span>
                <span className="cat-tag">+10</span>
              </div>
            </div>

            <a href="#como-funciona" className="cta-button">
              <span>Ver como funciona</span>
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

        .preview-grid-wrapper {
          position: relative;
          width: 100%;
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

        .grid-fade-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(to top, var(--bg, #030303) 0%, transparent 100%);
          pointer-events: none;
          z-index: 5;
        }

        .preview-card {
          position: relative;
        }

        .preview-card.faded {
          opacity: 0.5;
          pointer-events: none;
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

        .card-shine {
          position: absolute;
          top: -100%;
          left: -100%;
          width: 60%;
          height: 200%;
          background: linear-gradient(
            115deg,
            transparent 20%,
            rgba(255,255,255,.08) 40%,
            rgba(255,255,255,.15) 50%,
            rgba(255,255,255,.08) 60%,
            transparent 80%
          );
          transform: rotate(25deg);
          pointer-events: none;
          z-index: 3;
          animation: shine-sweep 4s ease-in-out infinite;
          animation-delay: calc(var(--card-index, 0) * 0.15s);
        }

        .preview-card:nth-child(1) .card-shine { --card-index: 0; }
        .preview-card:nth-child(2) .card-shine { --card-index: 1; }
        .preview-card:nth-child(3) .card-shine { --card-index: 2; }
        .preview-card:nth-child(4) .card-shine { --card-index: 3; }
        .preview-card:nth-child(5) .card-shine { --card-index: 4; }
        .preview-card:nth-child(6) .card-shine { --card-index: 5; }
        .preview-card:nth-child(7) .card-shine { --card-index: 6; }
        .preview-card:nth-child(8) .card-shine { --card-index: 7; }
        .preview-card:nth-child(9) .card-shine { --card-index: 8; }
        .preview-card:nth-child(10) .card-shine { --card-index: 9; }
        .preview-card:nth-child(11) .card-shine { --card-index: 10; }
        .preview-card:nth-child(12) .card-shine { --card-index: 11; }

        @keyframes shine-sweep {
          0%, 100% {
            top: -100%;
            left: -100%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            top: 100%;
            left: 150%;
            opacity: 1;
          }
          60%, 100% {
            opacity: 0;
          }
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
          flex-direction: column;
          gap: 16px;
        }
        @media (max-width: 640px) {
          .content-features {
            gap: 14px;
          }
        }

        .feature {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: rgba(255,255,255,.7);
          font-size: 13px;
          font-weight: 600;
        }
        .feature svg {
          color: var(--neon);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .feature-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .feature-title {
          color: #fff;
          font-weight: 800;
          font-size: 14px;
        }
        .feature-desc {
          color: var(--muted);
          font-size: 12px;
          font-weight: 500;
          line-height: 1.5;
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
