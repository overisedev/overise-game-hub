export function PricingSection() {
  const plans = [
    {
      name: 'Plano Básico',
      price: 'R$ 9,90',
      games: '500+ jogos',
      features: [
        'Acesso instantâneo',
        'Suporte via Discord',
        'Garantia de 7 dias',
      ],
    },
    {
      name: 'Plano Avançado',
      price: 'R$ 19,90',
      games: '700+ jogos',
      badge: 'Mais escolhido',
      featured: true,
      features: [
        'Acesso instantâneo',
        'Suporte Prioritário 24/7',
        'Garantia de 7 dias',
        'Grupo VIP de atualizações',
      ],
    },
    {
      name: 'Plano Permanente',
      price: 'R$ 49,90',
      games: 'Mais de 1000 jogos',
      features: [
        'Acesso instantâneo',
        'Suporte VIP',
        'Garantia de 7 dias',
        'Atualizações vitalícias',
        'Bônus exclusivos',
      ],
    },
  ];

  return (
    <section id="planos" className="section container-main">
      <div className="pricing-header">
        <h2>Escolha seu plano</h2>
        <p>Acesso imediato após o pagamento. Escolha o que melhor se encaixa para você.</p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`pricing-card ${plan.featured ? 'featured' : ''}`}
          >
            {plan.badge && (
              <span className="pricing-badge">{plan.badge}</span>
            )}

            <h3 className="plan-name">{plan.name}</h3>
            
            <div className="plan-price">{plan.price}</div>
            
            <div className="plan-games">{plan.games}</div>

            <ul className="plan-features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>
                  <span className="check">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <a href="#como-funciona" className={`plan-btn ${plan.featured ? 'btn-featured' : ''}`}>
              Desbloquear
            </a>
          </div>
        ))}
      </div>

      <style>{`
        .pricing-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .pricing-header h2 {
          font-size: 28px;
          font-weight: 950;
          color: #fff;
          margin: 0 0 10px;
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
          gap: 16px;
        }
        
        @media (max-width: 980px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            max-width: 380px;
            margin: 0 auto;
          }
        }
        
        .pricing-card {
          padding: 28px 24px;
          border-radius: var(--r2);
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.03);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          transition: .25s ease;
        }
        
        .pricing-card:hover {
          border-color: rgba(0,255,65,.20);
          transform: translateY(-4px);
        }
        
        .pricing-card.featured {
          border-color: rgba(0,255,65,.35);
          background: rgba(0,255,65,.04);
        }
        
        .pricing-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          padding: 6px 14px;
          border-radius: 999px;
          background: var(--neon);
          color: #000;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        
        .plan-name {
          font-size: 18px;
          font-weight: 900;
          color: #fff;
          margin: 0 0 16px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          text-align: center;
        }
        
        .plan-price {
          font-size: 36px;
          font-weight: 950;
          color: var(--neon);
          letter-spacing: -2px;
          margin-bottom: 8px;
          text-align: center;
        }
        
        .plan-games {
          font-size: 14px;
          color: var(--muted);
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,.06);
          text-align: center;
          width: 100%;
        }
        
        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
          flex: 1;
          width: 100%;
        }
        
        .plan-features li {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 8px 0;
          font-size: 14px;
          color: rgba(255,255,255,.80);
        }
        
        .check {
          color: var(--neon);
          font-weight: 700;
        }
        
        .plan-btn {
          display: block;
          width: 100%;
          text-align: center;
          padding: 14px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          color: #fff;
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
          text-decoration: none;
          transition: .25s ease;
        }
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        
        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
          flex: 1;
        }
        
        .plan-features li {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          font-size: 14px;
          color: rgba(255,255,255,.80);
        }
        
        .check {
          color: var(--neon);
          font-weight: 700;
        }
        
        .plan-btn {
          display: block;
          text-align: center;
          padding: 14px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          color: #fff;
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
          text-decoration: none;
          transition: .25s ease;
        }
        
        .plan-btn:hover {
          border-color: rgba(0,255,65,.30);
          background: rgba(0,255,65,.08);
        }
        
        .plan-btn.btn-featured {
          background: var(--neon);
          color: #000;
          border: none;
        }
        
        .plan-btn.btn-featured:hover {
          box-shadow: 0 8px 30px rgba(0,255,65,.25);
        }
      `}</style>
    </section>
  );
}