export function PricingSection() {
  const plans = [
    {
      name: 'Plano Básico',
      price: 'R$ 9,90',
      priceLabel: 'Taxa Única',
      games: 'Pacote com 500 Jogos',
      colorTheme: 'blue',
      features: [
        'Pacote com 500 Jogos',
        'Baixe pela Steam',
        'Jogue o Modo História',
        'Acesso Imediato',
      ],
      btnText: 'Escolher Básico',
      checkoutUrl: 'https://www.ggcheckout.com/checkout/v4/6Ed9FJE8HXebnxREUKCQ',
    },
    {
      name: 'Plano Avançado',
      price: 'R$ 19,90',
      priceLabel: 'Taxa Única',
      games: 'Pacote com 700 Jogos',
      badge: 'Mais Vendido',
      colorTheme: 'red',
      features: [
        'Pacote com 700 Jogos',
        'Inclui Lançamentos',
        'Jogue Online nos Compatíveis',
        'Suporte no WhatsApp',
      ],
      btnText: 'Quero Este',
      checkoutUrl: 'https://www.ggcheckout.com/checkout/v4/BvIb4ex53LM73mU3DJsX',
    },
    {
      name: 'Plano Vitalício',
      price: 'R$ 49,90',
      priceLabel: 'Taxa Única',
      games: 'Liberar a Lista Toda',
      badge: 'Melhor Custo-Benefício',
      colorTheme: 'green',
      featured: true,
      features: [
        'Mais de 1000 Jogos',
        'Receba Lançamentos Futuros',
        'Multiplayer Garantido',
        'Acesso Vitalício',
      ],
      btnText: 'Desbloquear Tudo',
      checkoutUrl: 'https://www.ggcheckout.com/checkout/v4/pdDOCAlm20ZQxjUiglc3',
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
            className={`pricing-card ${plan.featured ? 'featured' : ''} theme-${plan.colorTheme}`}
          >
            {plan.badge && (
              <span className={`pricing-badge badge-${plan.colorTheme}`}>{plan.badge}</span>
            )}

            <h3 className="plan-name">{plan.name}</h3>
            
            <div className={`plan-price price-${plan.colorTheme}`}>{plan.price}</div>
            <div className="plan-price-label">{plan.priceLabel}</div>
            
            <div className="plan-games">{plan.games}</div>

            <ul className="plan-features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>
                  <span className={`check check-${plan.colorTheme}`}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <a 
              href={plan.checkoutUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`plan-btn btn-${plan.colorTheme}`}
            >
              {plan.btnText || 'Desbloquear'}
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
        
        /* Blue theme - Básico */
        .pricing-card.theme-blue:hover {
          border-color: rgba(76, 125, 240, 0.32);
          transform: translateY(-4px);
        }
        
        /* Red theme - Avançado */
        .pricing-card.theme-red:hover {
          border-color: rgba(240, 48, 31, 0.32);
          transform: translateY(-4px);
        }
        
        /* Green theme - Vitalício */
        .pricing-card.theme-green:hover {
          border-color: rgba(0,255,65,.20);
          transform: translateY(-4px);
        }
        
        .pricing-card.featured {
          border-color: rgba(0,255,65,.35);
          background: rgba(0,255,65,.04);
        }
        
        /* Badges */
        .pricing-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        
        .pricing-badge.badge-blue {
          background: rgb(76, 125, 240);
          color: #fff;
        }
        
        .pricing-badge.badge-red {
          background: rgb(240, 48, 31);
          color: #fff;
        }
        
        .pricing-badge.badge-green {
          background: var(--neon);
          color: #000;
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
        
        /* Prices */
        .plan-price {
          font-size: 36px;
          font-weight: 950;
          letter-spacing: -2px;
          margin-bottom: 4px;
          text-align: center;
        }
        
        .plan-price.price-blue {
          color: rgb(76, 125, 240);
        }
        
        .plan-price.price-red {
          color: rgb(240, 48, 31);
        }
        
        .plan-price.price-green {
          color: var(--neon);
        }
        
        .plan-price-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
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
        
        /* Checkmarks */
        .check {
          font-weight: 700;
        }
        
        .check.check-blue {
          color: rgb(76, 125, 240);
        }
        
        .check.check-red {
          color: rgb(240, 48, 31);
        }
        
        .check.check-green {
          color: var(--neon);
        }
        
        /* Buttons */
        .plan-btn {
          display: block;
          width: 100%;
          text-align: center;
          padding: 14px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
          text-decoration: none;
          transition: .25s ease;
        }
        
        .plan-btn.btn-blue {
          border: 1px solid rgba(76, 125, 240, 0.25);
          background: rgba(76, 125, 240, 0.08);
          color: rgb(76, 125, 240);
        }
        
        .plan-btn.btn-blue:hover {
          border-color: rgba(76, 125, 240, 0.32);
          background: rgba(76, 125, 240, 0.22);
          box-shadow: 0 8px 30px rgba(76, 125, 240, 0.25);
        }
        
        .plan-btn.btn-red {
          border: 1px solid rgba(240, 48, 31, 0.25);
          background: rgba(240, 48, 31, 0.08);
          color: rgb(240, 48, 31);
        }
        
        .plan-btn.btn-red:hover {
          border-color: rgba(240, 48, 31, 0.32);
          background: rgba(240, 48, 31, 0.22);
          box-shadow: 0 8px 30px rgba(240, 48, 31, 0.25);
        }
        
        .plan-btn.btn-green {
          background: var(--neon);
          color: #000;
          border: none;
        }
        
        .plan-btn.btn-green:hover {
          box-shadow: 0 8px 30px rgba(0,255,65,.25);
        }
      `}</style>
    </section>
  );
}