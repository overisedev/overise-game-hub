export function PricingSection() {
  const plans = [
    {
      name: 'Plano Básico',
      price: 'R$ 9,90',
      originalPrice: 'R$ 29,90',
      pack: '500+ Jogos',
      packSub: 'Acesso imediato à biblioteca',
      urgency: '⚡ Últimas 12 vagas',
      features: [
        'Suporte via Discord',
        'Acesso instantâneo',
        'Garantia de 7 dias',
      ],
    },
    {
      name: 'Plano Avançado',
      price: 'R$ 19,90',
      originalPrice: 'R$ 59,90',
      pack: '700+ Jogos',
      packSub: 'Biblioteca expandida + atualizações',
      badge: '🔥 Plano mais escolhido',
      featured: true,
      urgency: '⚡ Últimas 8 vagas',
      features: [
        'Suporte Prioritário 24/7',
        'Acesso instantâneo',
        'Garantia de 7 dias',
        'Grupo VIP de atualizações',
        'BÔNUS: Pack de jogos indie',
      ],
    },
    {
      name: 'Plano Permanente',
      price: 'R$ 49,90',
      originalPrice: 'R$ 149,90',
      pack: '741+ Jogos',
      packSub: 'Acesso vitalício + todos os bônus',
      urgency: '🚀 Oferta por tempo limitado',
      features: [
        'Suporte Prioritário VIP',
        'Acesso instantâneo',
        'Garantia de 7 dias',
        'Atualizações vitalícias',
        'BÔNUS: 100 jogos extras',
        'BÔNUS: Acesso antecipado',
      ],
    },
  ];

  return (
    <section id="planos" className="section container-main">
      <div className="pricing-header">
        <span className="pricing-pill">💎 Oferta Especial</span>
        <h2>Escolha seu plano</h2>
        <p>Desbloqueie sua biblioteca agora. Acesso imediato após o pagamento.</p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`pricing-card ${plan.featured ? 'featured' : ''}`}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="pricing-badge">{plan.badge}</div>
            )}

            {/* Urgency */}
            <div className={`urgency-tag ${plan.featured ? 'urgency-featured' : ''}`}>
              {plan.urgency}
            </div>

            {/* Header */}
            <div className="pricing-card-header">
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="price-was">{plan.originalPrice}</span>
                <span className="price-value">{plan.price}</span>
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
                <li key={idx} className={feature.startsWith('BÔNUS') ? 'bonus' : ''}>
                  <span className="check-icon">{feature.startsWith('BÔNUS') ? '🎁' : '✓'}</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button className={`plan-cta ${plan.featured ? 'cta-featured' : ''}`}>
              Desbloquear agora
            </button>

            <p className="plan-note">🔒 Pagamento 100% seguro</p>
          </div>
        ))}
      </div>

      <style>{`
        .pricing-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .pricing-pill {
          display: inline-block;
          padding: 10px 18px;
          border-radius: 999px;
          background: rgba(0,255,65,.12);
          border: 1px solid rgba(0,255,65,.25);
          color: var(--neon);
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 16px;
          letter-spacing: 0.5px;
        }
        
        .pricing-header h2 {
          font-size: clamp(28px, 5vw, 38px);
          font-weight: 950;
          color: #fff;
          text-transform: uppercase;
          margin: 0 0 10px;
          letter-spacing: -1.5px;
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
            max-width: 420px;
            margin: 0 auto;
          }
        }
        
        .pricing-card {
          position: relative;
          padding: 24px;
          border-radius: var(--r2);
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(10,10,10,.85);
          backdrop-filter: blur(10px);
          transition: .3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .pricing-card:hover {
          transform: translateY(-6px);
          border-color: rgba(0,255,65,.30);
          box-shadow: 0 20px 60px rgba(0,0,0,.5);
        }
        
        .pricing-card.featured {
          border-color: rgba(0,255,65,.50);
          background: linear-gradient(180deg, rgba(0,255,65,.06), rgba(10,10,10,.95));
          box-shadow: 0 0 80px rgba(0,255,65,.12);
          transform: scale(1.03);
        }
        
        .pricing-card.featured:hover {
          transform: scale(1.03) translateY(-6px);
          box-shadow: 0 20px 80px rgba(0,255,65,.18);
        }
        
        .pricing-badge {
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          padding: 10px 20px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(0,255,65,.95), rgba(0,200,55,.85));
          color: #000;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
          box-shadow: 0 6px 24px rgba(0,255,65,.35);
        }
        
        .urgency-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 14px;
          border-radius: 10px;
          background: rgba(255,100,100,.12);
          border: 1px solid rgba(255,100,100,.25);
          color: #ff6b6b;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }
        
        .urgency-tag.urgency-featured {
          background: rgba(0,255,65,.12);
          border-color: rgba(0,255,65,.25);
          color: var(--neon);
        }
        
        .pricing-card-header {
          text-align: center;
          margin-bottom: 16px;
        }
        
        .pricing-card.featured .pricing-card-header {
          padding-top: 8px;
        }
        
        .plan-name {
          font-size: 22px;
          font-weight: 950;
          color: #fff;
          margin: 0 0 14px;
          text-transform: uppercase;
          letter-spacing: -0.5px;
        }
        
        .plan-price {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        
        .price-was {
          font-size: 14px;
          color: rgba(255,255,255,.35);
          text-decoration: line-through;
          font-weight: 700;
        }
        
        .price-value {
          font-size: 48px;
          font-weight: 950;
          color: var(--neon);
          letter-spacing: -3px;
          line-height: 1;
          text-shadow: 0 0 40px rgba(0,255,65,.3);
        }
        
        .pack-info {
          background: rgba(0,0,0,.35);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 14px;
          padding: 16px;
          text-align: center;
          margin-bottom: 18px;
        }
        
        .pricing-card.featured .pack-info {
          border-color: rgba(0,255,65,.20);
          background: rgba(0,255,65,.08);
        }
        
        .pack-title {
          display: block;
          font-size: 18px;
          font-weight: 950;
          color: #fff;
          margin-bottom: 4px;
          letter-spacing: -0.5px;
        }
        
        .pack-sub {
          font-size: 12px;
          color: var(--muted2);
        }
        
        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 20px;
          flex: 1;
        }
        
        .plan-features li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,.05);
          font-size: 13px;
          color: rgba(255,255,255,.75);
          line-height: 1.4;
          font-weight: 600;
        }
        
        .plan-features li.bonus {
          color: var(--neon);
          font-weight: 800;
        }
        
        .plan-features li:last-child {
          border-bottom: none;
        }
        
        .check-icon {
          color: var(--neon);
          font-weight: 900;
          flex-shrink: 0;
          font-size: 14px;
        }
        
        .plan-cta {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.06);
          color: #fff;
          font-size: 14px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: .25s ease;
        }
        
        .plan-cta:hover {
          transform: translateY(-2px);
          border-color: rgba(0,255,65,.40);
          background: rgba(0,255,65,.10);
        }
        
        .plan-cta.cta-featured {
          background: linear-gradient(180deg, rgba(0,255,65,.95), rgba(0,200,55,.85));
          color: #000;
          border: none;
          font-size: 15px;
          padding: 18px;
        }
        
        .plan-cta.cta-featured:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0,255,65,.30);
        }
        
        .plan-note {
          text-align: center;
          font-size: 11px;
          color: var(--muted2);
          margin: 14px 0 0;
          font-weight: 600;
        }
      `}</style>
    </section>
  );
}