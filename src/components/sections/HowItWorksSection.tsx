import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Static featured games for the showcase with reliable cover images
const showcaseGames = [
  { id: 1, name: 'Elden Ring', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900.jpg' },
  { id: 2, name: 'God of War', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/library_600x900.jpg' },
  { id: 3, name: 'Red Dead 2', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg' },
  { id: 4, name: 'Cyberpunk', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg' },
  { id: 5, name: 'Hogwarts', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_600x900.jpg' },
  { id: 6, name: 'Spider-Man', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/library_600x900.jpg' },
  { id: 7, name: 'Baldurs Gate', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/library_600x900.jpg' },
  { id: 8, name: 'GTA V', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900.jpg' },
  { id: 9, name: 'Forza 5', cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900.jpg' },
];

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  return (
    <section id="como-funciona" className="section container-main" ref={containerRef}>
      <motion.div 
        className="hiw-wrapper"
        style={{ scale, opacity }}
      >
        <div className="hiw-header">
          <span className="hiw-badge">BIBLIOTECA COMPLETA</span>
          <h2>Escolha. Baixe. Jogue.</h2>
          <p>Mais de 1000 títulos esperando por você</p>
        </div>

        <div className="hiw-showcase">
          {/* Floating game cards */}
          <div className="hiw-grid">
            {showcaseGames.map((game, idx) => {
              const yTransform = idx % 3 === 0 ? y1 : idx % 3 === 1 ? y2 : y3;
              return (
                <motion.div 
                  key={game.id}
                  className="hiw-game-card"
                  style={{ y: yTransform }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                >
                  <img 
                    src={game.cover} 
                    alt={game.name}
                    loading="lazy"
                  />
                  <div className="hiw-game-overlay">
                    <span className="hiw-game-name">{game.name}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Center mockup overlay */}
          <div className="hiw-mockup-overlay">
            <motion.div 
              className="hiw-mockup"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
                <span className="mockup-title">OVERISE</span>
              </div>
              <div className="mockup-content">
                <div className="mockup-stat">
                  <span className="stat-value">1000+</span>
                  <span className="stat-label">Jogos Disponíveis</span>
                </div>
                <div className="mockup-divider"></div>
                <div className="mockup-stat">
                  <span className="stat-value">R$ 9,90</span>
                  <span className="stat-label">Plano Básico</span>
                </div>
              </div>
              <a href="#planos" className="mockup-cta">Desbloquear Steam</a>
            </motion.div>
          </div>
        </div>

        <div className="hiw-steps-row">
          <div className="hiw-step">
            <span className="step-num">01</span>
            <span className="step-text">Escolha seu plano</span>
          </div>
          <div className="hiw-step-arrow">→</div>
          <div className="hiw-step">
            <span className="step-num">02</span>
            <span className="step-text">Acesse o app</span>
          </div>
          <div className="hiw-step-arrow">→</div>
          <div className="hiw-step">
            <span className="step-num">03</span>
            <span className="step-text">Baixe e jogue</span>
          </div>
        </div>
      </motion.div>

      <style>{`
        .hiw-wrapper {
          text-align: center;
        }

        .hiw-header {
          margin-bottom: 40px;
        }

        .hiw-badge {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(0,255,65,.1);
          border: 1px solid rgba(0,255,65,.3);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          color: var(--neon);
          letter-spacing: 1px;
          margin-bottom: 16px;
        }

        .hiw-header h2 {
          font-size: clamp(28px, 5vw, 42px);
          font-weight: 950;
          color: #fff;
          margin: 0 0 10px;
          letter-spacing: -2px;
        }

        .hiw-header p {
          color: var(--muted);
          font-size: 16px;
          margin: 0;
        }

        .hiw-showcase {
          position: relative;
          min-height: 420px;
          margin-bottom: 40px;
        }

        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 700px;
          margin: 0 auto;
        }

        @media (max-width: 640px) {
          .hiw-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
        }

        .hiw-game-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 3/4;
          border: 1px solid rgba(255,255,255,.1);
          transition: transform 0.3s ease, border-color 0.3s ease;
          background: linear-gradient(145deg, rgba(0,255,65,.05), rgba(0,0,0,.3));
        }

        .hiw-game-card:hover {
          transform: scale(1.05) !important;
          border-color: rgba(0,255,65,.4);
          z-index: 10;
        }

        .hiw-game-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hiw-game-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.9) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          padding: 10px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .hiw-game-card:hover .hiw-game-overlay {
          opacity: 1;
        }

        .hiw-game-name {
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          line-height: 1.2;
        }

        .hiw-mockup-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .hiw-mockup {
          background: rgba(10,10,10,.95);
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 20px;
          padding: 0;
          width: 280px;
          backdrop-filter: blur(20px);
          box-shadow: 0 30px 80px rgba(0,0,0,.8), 0 0 60px rgba(0,255,65,.15);
          pointer-events: all;
          overflow: hidden;
        }

        .mockup-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: rgba(0,0,0,.5);
          border-bottom: 1px solid rgba(255,255,255,.08);
        }

        .mockup-dots {
          display: flex;
          gap: 6px;
        }

        .mockup-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,.15);
        }

        .mockup-dots span:first-child { background: #ff5f57; }
        .mockup-dots span:nth-child(2) { background: #febc2e; }
        .mockup-dots span:last-child { background: #28c840; }

        .mockup-title {
          font-size: 13px;
          font-weight: 900;
          color: #fff;
          letter-spacing: 1px;
        }

        .mockup-content {
          padding: 24px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .mockup-stat {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 26px;
          font-weight: 950;
          color: var(--neon);
          letter-spacing: -1px;
        }

        .stat-label {
          display: block;
          font-size: 11px;
          color: var(--muted);
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .mockup-divider {
          width: 1px;
          height: 40px;
          background: rgba(255,255,255,.1);
        }

        .mockup-cta {
          display: block;
          margin: 0 16px 16px;
          padding: 14px 20px;
          background: var(--neon);
          color: #000;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-radius: 12px;
          text-decoration: none;
          text-align: center;
          transition: 0.25s ease;
        }

        .mockup-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,255,65,.3);
        }

        .hiw-steps-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hiw-step {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 12px;
        }

        .step-num {
          font-size: 16px;
          font-weight: 950;
          color: var(--neon);
        }

        .step-text {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
        }

        .hiw-step-arrow {
          color: var(--muted);
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .hiw-showcase {
            min-height: 350px;
          }
          
          .hiw-mockup {
            width: 240px;
          }

          .mockup-content {
            padding: 18px 16px;
            gap: 14px;
          }

          .stat-value {
            font-size: 22px;
          }

          .hiw-steps-row {
            gap: 10px;
          }

          .hiw-step-arrow {
            display: none;
          }

          .hiw-step {
            padding: 10px 14px;
          }

          .step-text {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .hiw-steps-row {
            flex-direction: column;
            gap: 8px;
          }

          .hiw-step {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}