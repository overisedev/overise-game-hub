export function AboutSection() {
  return (
    <section id="sobre" className="section container-main">
      <div className="about-wrapper">
        {/* Logo Grande */}
        <div className="about-logo">
          <span className="logo-text">OVER<span className="accent">ISE</span></span>
          <div className="logo-glow" />
        </div>

        {/* Tagline */}
        <p className="about-tagline">
          Sua biblioteca de jogos, reinventada.
        </p>

        {/* Descrição */}
        <p className="about-desc">
          A Overise nasceu para entregar uma experiência <strong>premium</strong>: organizada, 
          rápida e elegante — do jeito que uma biblioteca de jogos deveria ser. 
          Nosso foco é <strong>simplicidade</strong>, <strong>performance</strong> e uma vitrine 
          que valoriza os melhores títulos.
        </p>

        {/* Features Grid */}
        <div className="about-features">
          <div className="about-feature">
            <div className="feature-icon">⚡</div>
            <div className="feature-content">
              <h4>Performance</h4>
              <p>Catálogo local, sem dependências externas. Carregamento instantâneo.</p>
            </div>
          </div>
          <div className="about-feature">
            <div className="feature-icon">🎯</div>
            <div className="feature-content">
              <h4>Simplicidade</h4>
              <p>Interface limpa e direta. Encontre o que procura em segundos.</p>
            </div>
          </div>
          <div className="about-feature">
            <div className="feature-icon">✨</div>
            <div className="feature-content">
              <h4>Premium</h4>
              <p>Experiência visual refinada, inspirada nos melhores launchers.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-wrapper {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .about-logo {
          position: relative;
          display: inline-block;
          margin-bottom: 24px;
        }
        
        .logo-text {
          font-size: clamp(48px, 10vw, 80px);
          font-weight: 950;
          letter-spacing: -3px;
          color: #fff;
          text-transform: uppercase;
          position: relative;
          z-index: 1;
        }
        
        .logo-text .accent {
          color: var(--neon);
          text-shadow: 0 0 40px rgba(0,255,65,.5);
        }
        
        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 100px;
          background: radial-gradient(ellipse, rgba(0,255,65,.15), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        
        .about-tagline {
          font-size: 20px;
          font-weight: 700;
          color: var(--muted);
          margin: 0 0 16px;
          letter-spacing: -0.5px;
        }
        
        .about-desc {
          font-size: 15px;
          line-height: 1.8;
          color: var(--muted2);
          margin: 0 0 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .about-desc strong {
          color: #fff;
          font-weight: 800;
        }
        
        .about-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        
        @media (max-width: 768px) {
          .about-features {
            grid-template-columns: 1fr;
          }
        }
        
        .about-feature {
          padding: 24px;
          border-radius: var(--r2);
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.03);
          text-align: left;
          transition: .25s ease;
        }
        
        .about-feature:hover {
          transform: translateY(-4px);
          border-color: rgba(0,255,65,.25);
          background: rgba(0,255,65,.03);
        }
        
        .feature-icon {
          font-size: 28px;
          margin-bottom: 12px;
        }
        
        .feature-content h4 {
          font-size: 16px;
          font-weight: 900;
          color: #fff;
          margin: 0 0 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .feature-content p {
          font-size: 13px;
          color: var(--muted2);
          margin: 0;
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
}
