export function GuaranteeSection() {
  return (
    <section className="section-tight container-main">
      <div className="guarantee-wrapper">
        <div className="guarantee-card">
          {/* Badge */}
          <div className="guarantee-badge">
            <span className="badge-icon">✓</span>
            Garantia Total
          </div>

          {/* Content */}
          <div className="guarantee-content">
            <h3>Reembolso em até 7 dias</h3>
            <p>
              Compra sem risco. Se por qualquer motivo você não curtir a experiência, 
              você pode solicitar reembolso em até <strong>7 dias</strong> após a compra.
              Transparente, simples e direto — padrão <strong>Overise</strong>.
            </p>
          </div>

          {/* Features */}
          <div className="guarantee-features">
            <div className="g-feature">
              <span className="check">✓</span>
              Pagamento 100% seguro
            </div>
            <div className="g-feature">
              <span className="check">✓</span>
              Ativação imediata via Steam
            </div>
            <div className="g-feature">
              <span className="check">✓</span>
              Suporte dedicado
            </div>
            <div className="g-feature">
              <span className="check">✓</span>
              Sem taxas ocultas
            </div>
          </div>

          {/* Glow Effect */}
          <div className="guarantee-glow" />
        </div>
      </div>

      <style>{`
        .guarantee-wrapper {
          max-width: 700px;
          margin: 0 auto;
        }
        
        .guarantee-card {
          position: relative;
          padding: 32px;
          border-radius: var(--r2);
          border: 1px solid rgba(0,255,65,.25);
          background: linear-gradient(135deg, rgba(0,255,65,.05) 0%, rgba(0,0,0,.3) 100%);
          box-shadow: 0 20px 60px rgba(0,255,65,.08);
          overflow: hidden;
          text-align: center;
        }
        
        .guarantee-glow {
          position: absolute;
          top: -50%;
          left: 50%;
          transform: translateX(-50%);
          width: 400px;
          height: 200px;
          background: radial-gradient(ellipse, rgba(0,255,65,.12), transparent 70%);
          pointer-events: none;
        }
        
        .guarantee-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(0,255,65,.15);
          border: 1px solid rgba(0,255,65,.35);
          color: var(--neon);
          font-weight: 900;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        
        .badge-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--neon);
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 900;
        }
        
        .guarantee-content {
          position: relative;
          z-index: 1;
          margin-bottom: 24px;
        }
        
        .guarantee-content h3 {
          font-size: 26px;
          font-weight: 950;
          color: #fff;
          margin: 0 0 12px;
          letter-spacing: -1px;
          text-transform: uppercase;
        }
        
        .guarantee-content p {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.7;
          margin: 0;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .guarantee-content strong {
          color: var(--neon);
          font-weight: 800;
        }
        
        .guarantee-features {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          position: relative;
          z-index: 1;
        }
        
        .g-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(0,0,0,.3);
          border: 1px solid rgba(255,255,255,.08);
          font-size: 12px;
          font-weight: 800;
          color: #d9d9d9;
        }
        
        .g-feature .check {
          color: var(--neon);
          font-weight: 900;
        }
      `}</style>
    </section>
  );
}
