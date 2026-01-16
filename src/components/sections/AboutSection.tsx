export function AboutSection() {
  return (
    <section id="sobre" className="section container-main">
      <div className="about-container">
        {/* Background com Hollow Knight */}
        <div className="about-bg">
          <img 
            src="https://images.igdb.com/igdb/image/upload/t_1080p/co1rgi.jpg" 
            alt="Hollow Knight background"
          />
          <div className="about-bg-overlay" />
        </div>

        {/* Content */}
        <div className="about-content">
          {/* Logo */}
          <div className="about-logo">
            <span className="logo-main">OVER</span>
            <span className="logo-accent">ISE</span>
          </div>

          {/* Description */}
          <p className="about-text">
            Nascemos para revolucionar a forma como você acessa sua biblioteca de jogos. 
            Uma experiência <strong>premium</strong>, <strong>rápida</strong> e <strong>sem complicação</strong> — 
            exatamente como deveria ser. Nosso compromisso é entregar simplicidade com um visual 
            que valoriza cada título da sua coleção.
          </p>

          <div className="about-divider" />

          <span className="about-tagline">
            Sua biblioteca. Sem limites.
          </span>
        </div>
      </div>

      <style>{`
        .about-container {
          position: relative;
          border-radius: var(--r2);
          overflow: hidden;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .about-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        
        .about-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          filter: saturate(0.8) brightness(0.5);
        }
        
        .about-bg-overlay {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at center, rgba(5,5,5,.65), rgba(5,5,5,.92)),
            linear-gradient(to top, rgba(5,5,5,.95), transparent 60%);
        }
        
        .about-content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 60px 30px;
          max-width: 700px;
        }
        
        .about-logo {
          margin-bottom: 28px;
        }
        
        .logo-main {
          font-size: clamp(56px, 12vw, 100px);
          font-weight: 950;
          letter-spacing: -4px;
          color: #fff;
          text-transform: uppercase;
          text-shadow: 0 10px 60px rgba(0,0,0,.8);
        }
        
        .logo-accent {
          font-size: clamp(56px, 12vw, 100px);
          font-weight: 950;
          letter-spacing: -4px;
          color: var(--neon);
          text-transform: uppercase;
          text-shadow: 0 0 60px rgba(0,255,65,.4), 0 10px 60px rgba(0,0,0,.8);
        }
        
        .about-text {
          font-size: 16px;
          line-height: 1.9;
          color: rgba(255,255,255,.75);
          margin: 0;
          text-shadow: 0 4px 20px rgba(0,0,0,.6);
        }
        
        .about-text strong {
          color: #fff;
          font-weight: 800;
        }
        
        .about-divider {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--neon), transparent);
          margin: 28px auto;
          border-radius: 2px;
        }
        
        .about-tagline {
          font-size: 14px;
          font-weight: 800;
          color: var(--neon);
          text-transform: uppercase;
          letter-spacing: 3px;
          text-shadow: 0 0 20px rgba(0,255,65,.4);
        }
      `}</style>
    </section>
  );
}