export function PricingSection() {
  const plans = [
    {
      name: 'Modo Rookie',
      price: 'R$ 9,90',
      period: 'Mensal',
      pack: 'Pack com 500 jogos',
      packSub: 'Direto na sua Steam',
      features: [
        'Suporte Prioritário (24/7)',
        'Acesso Imediato & Instantâneo',
        'Garantia 7 dias (pagamento pela plataforma)',
      ],
      color: '#00d4ff',
    },
    {
      name: 'Modo Pro',
      price: 'R$ 19,90',
      period: 'Mensal',
      pack: 'Pack com 700 jogos',
      packSub: 'Direto na sua Steam',
      badge: 'Melhor custo-benefício',
      featured: true,
      features: [
        'Suporte Prioritário (24/7)',
        'Acesso Imediato & Instantâneo',
        'Garantia 7 dias (pagamento pela plataforma)',
        'Grupo de Atualizações (Discord/Telegram)',
      ],
      color: '#a855f7',
    },
    {
      name: 'Modo Vitalício',
      price: 'R$ 49,90',
      period: 'Único',
      pack: 'Pack com 741+ jogos',
      packSub: 'Acesso permanente',
      features: [
        'Suporte Prioritário (24/7)',
        'Acesso Imediato & Instantâneo',
        'Garantia 7 dias',
        'Atualização gratuita para sempre',
        'BÔNUS: 100 Jogos extras',
      ],
      color: '#00FF41',
    },
  ];

  return (
    <section id="planos" className="section container-main">
      <div className="pricing-header">
        <h2>Planos</h2>
        <p>Escolha o plano ideal para você. Todos incluem acesso imediato após pagamento.</p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`pricing-card ${plan.featured ? 'featured' : ''}`}
            style={{ '--plan-color': plan.color } as React.CSSProperties}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="pricing-badge">{plan.badge}</div>
            )}

            {/* Header */}
            <div className="pricing-card-header">
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="price-value">{plan.price}</span>
                <span className="price-period">{plan.period}</span>
              </div>
            </div>

            {/* Pack Info */}
            <div className="pack-info">
              <span className="pack-title">{plan.pack}</span>
              <span className="pack-sub">{plan.packSub}</span>
            </div>

            {/* Features */}
            <ul className="plan-features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>
                  <span className="check-icon">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button className="plan-cta">
              Assinar agora
            </button>

            <p className="plan-note">Acesso imediato após pagamento</p>
          </div>
        ))}
      </div>

      <style>{`
        .pricing-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .pricing-header h2 {
          font-size: 32px;
          font-weight: 950;
          color: #fff;
          text-transform: uppercase;
          margin: 0 0 8px;
          letter-spacing: -1px;
        }
        
        .pricing-header p {
          color: var(--muted);
          font-size: 15px;
          margin: 0;
        }
        
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: stretch;
        }
        
        @media (max-width: 980px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
            margin: 0 auto;
          }
        }
        
        .pricing-card {
          position: relative;
          padding: 28px 24px;
          border-radius: var(--r2);
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(10,10,15,.8);
          backdrop-filter: blur(10px);
          transition: .3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .pricing-card:hover {
          transform: translateY(-6px);
          border-color: var(--plan-color, rgba(255,255,255,.20));
          box-shadow: 0 20px 60px rgba(0,0,0,.4);
        }
        
        .pricing-card.featured {
          border-color: var(--plan-color);
          box-shadow: 0 0 40px rgba(168, 85, 247, .15);
        }
        
        .pricing-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px 16px;
          border-radius: 999px;
          background: linear-gradient(135deg, #a855f7, #7c3aed);
          color: #fff;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
        
        .pricing-card-header {
          text-align: center;
          margin-bottom: 20px;
          padding-top: ${10}px;
        }
        
        .pricing-card.featured .pricing-card-header {
          padding-top: 8px;
        }
        
        .plan-name {
          font-size: 20px;
          font-weight: 900;
          color: #fff;
          margin: 0 0 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .plan-price {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        
        .price-value {
          font-size: 42px;
          font-weight: 950;
          color: var(--plan-color);
          letter-spacing: -2px;
          line-height: 1;
        }
        
        .price-period {
          font-size: 13px;
          color: var(--muted2);
          font-weight: 700;
        }
        
        .pack-info {
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 14px;
          padding: 14px;
          text-align: center;
          margin-bottom: 20px;
        }
        
        .pack-title {
          display: block;
          font-size: 14px;
          font-weight: 900;
          color: #fff;
          margin-bottom: 4px;
        }
        
        .pack-sub {
          font-size: 12px;
          color: var(--muted2);
        }
        
        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
          flex: 1;
        }
        
        .plan-features li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,.05);
          font-size: 13px;
          color: var(--muted);
          line-height: 1.4;
        }
        
        .plan-features li:last-child {
          border-bottom: none;
        }
        
        .check-icon {
          color: var(--plan-color);
          font-weight: 900;
          flex-shrink: 0;
        }
        
        .plan-cta {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: none;
          background: var(--plan-color);
          color: #000;
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: .25s ease;
        }
        
        .plan-cta:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 30px rgba(0,0,0,.3);
        }
        
        .pricing-card.featured .plan-cta {
          background: linear-gradient(135deg, #a855f7, #7c3aed);
          color: #fff;
        }
        
        .plan-note {
          text-align: center;
          font-size: 11px;
          color: var(--muted2);
          margin: 12px 0 0;
        }
      `}</style>
    </section>
  );
}
