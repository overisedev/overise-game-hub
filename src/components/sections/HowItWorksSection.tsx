export function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Escolha seu plano', desc: 'Básico, Avançado ou Vitalício' },
    { num: '02', title: 'Acesse o app', desc: 'Link enviado na hora' },
    { num: '03', title: 'Baixe pela Steam', desc: 'Servidor oficial, velocidade máxima' },
  ];

  return (
    <section id="como-funciona" className="section container-main">
      <div className="hiw-wrapper">
        <div className="hiw-header">
          <h2>3 passos. É só isso.</h2>
        </div>

        <div className="hiw-steps">
          {steps.map((step, idx) => (
            <div key={idx} className="hiw-step">
              <span className="hiw-num">{step.num}</span>
              <div className="hiw-text">
                <span className="hiw-title">{step.title}</span>
                <span className="hiw-desc">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="hiw-cta-wrap">
          <a href="#planos" className="hiw-cta">Desbloquear Steam</a>
        </div>
      </div>

      <style>{`
        .hiw-wrapper {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .hiw-header h2 {
          font-size: clamp(24px, 4vw, 32px);
          font-weight: 950;
          color: #fff;
          margin: 0 0 32px;
          letter-spacing: -1px;
        }

        .hiw-steps {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .hiw-step {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 16px;
          text-align: left;
          transition: .25s ease;
        }

        .hiw-step:hover {
          border-color: rgba(0,255,65,.25);
          transform: translateX(4px);
        }

        .hiw-num {
          font-size: 28px;
          font-weight: 950;
          color: var(--neon);
          min-width: 48px;
        }

        .hiw-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .hiw-title {
          font-size: 16px;
          font-weight: 800;
          color: #fff;
        }

        .hiw-desc {
          font-size: 13px;
          color: var(--muted);
        }

        .hiw-cta-wrap {
          margin-top: 28px;
        }

        .hiw-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 32px;
          border-radius: 14px;
          background: var(--neon);
          color: #000;
          font-weight: 900;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-decoration: none;
          transition: .25s ease;
        }

        .hiw-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,255,65,.25);
        }

        @media (max-width: 640px) {
          .hiw-step {
            padding: 14px 16px;
          }
          .hiw-num {
            font-size: 24px;
            min-width: 40px;
          }
          .hiw-title {
            font-size: 15px;
          }
          .hiw-cta {
            width: 100%;
            padding: 14px 24px;
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}