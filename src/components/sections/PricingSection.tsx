import { motion } from 'framer-motion';

export function PricingSection() {
  const plans = [
    {
      name: 'Plano Básico',
      originalPrice: 'R$ 29,97',
      price: 'R$ 9,97',
      priceLabel: 'Taxa Única',
      games: 'Pacote com 500 Jogos',
      colorTheme: 'blue',
      features: [
        '500 jogos inclusos',
        'Download via Steam',
        'Modo história liberado',
        'Acesso na hora',
      ],
      btnText: 'Escolher Básico',
      checkoutUrl: 'https://www.ggcheckout.com/checkout/v4/6Ed9FJE8HXebnxREUKCQ',
    },
    {
      name: 'Plano Avançado',
      originalPrice: 'R$ 49,97',
      price: 'R$ 19,97',
      priceLabel: 'Taxa Única',
      games: 'Pacote com 700 Jogos',
      badge: 'Mais Vendido',
      colorTheme: 'red',
      features: [
        '700 jogos inclusos',
        'Jogos novos e lançamentos',
        'Online nos compatíveis',
        'Suporte via WhatsApp',
      ],
      btnText: 'Quero Esse',
      checkoutUrl: 'https://www.ggcheckout.com/checkout/v4/BvIb4ex53LM73mU3DJsX',
    },
    {
      name: 'Plano Vitalício',
      originalPrice: 'R$ 120,97',
      price: 'R$ 49,97',
      priceLabel: 'Taxa Única',
      games: 'Liberar a Lista Toda',
      badge: 'Melhor Custo-Benefício',
      colorTheme: 'green',
      featured: true,
      features: [
        '+1000 jogos liberados',
        'Recebe jogos novos pra sempre',
        'Multiplayer funcionando',
        'Pede qualquer jogo que a gente adiciona',
        'Seu pra sempre',
      ],
      btnText: 'Desbloquear Tudo',
      checkoutUrl: 'https://www.ggcheckout.com/checkout/v4/pdDOCAlm20ZQxjUiglc3',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section id="planos" className="section container-main">
      <motion.div 
        className="pricing-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>Escolha seu plano</h2>
        <p>Acesso imediato após o pagamento. Escolha o que melhor se encaixa para você.</p>
      </motion.div>

      <motion.div 
        className="pricing-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {plans.map((plan, index) => (
          <motion.div 
            key={plan.name} 
            className={`pricing-card ${plan.featured ? 'featured' : ''} theme-${plan.colorTheme}`}
            variants={cardVariants}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.2 }
            }}
          >
            {plan.badge && (
              <span className={`pricing-badge badge-${plan.colorTheme}`}>{plan.badge}</span>
            )}

            <h3 className="plan-name">{plan.name}</h3>
            
            <div className="plan-price-wrapper">
              <span className="plan-original-price">de {plan.originalPrice}</span>
              <div className={`plan-price price-${plan.colorTheme}`}>{plan.price}</div>
            </div>
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

            <motion.a 
              href={plan.checkoutUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`plan-btn btn-${plan.colorTheme}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).fbq) {
                  (window as any).fbq('track', 'InitiateCheckout', {
                    content_name: plan.name,
                    value: parseFloat(plan.price.replace('R$ ', '').replace(',', '.')),
                    currency: 'BRL'
                  });
                }
              }}
            >
              {plan.btnText || 'Desbloquear'}
            </motion.a>
          </motion.div>
        ))}
      </motion.div>

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
          transition: border-color .25s ease, box-shadow .25s ease;
        }
        
        /* Blue theme - Básico */
        .pricing-card.theme-blue:hover {
          border-color: rgba(76, 125, 240, 0.4);
          box-shadow: 0 0 40px rgba(76, 125, 240, 0.15);
        }
        
        /* Red theme - Avançado */
        .pricing-card.theme-red:hover {
          border-color: rgba(240, 48, 31, 0.4);
          box-shadow: 0 0 40px rgba(240, 48, 31, 0.15);
        }
        
        /* Green theme - Vitalício */
        .pricing-card.theme-green:hover {
          border-color: rgba(0,255,65,.35);
          box-shadow: 0 0 40px rgba(0,255,65,.12);
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
          animation: badge-pulse 2s ease-in-out infinite;
        }
        
        @keyframes badge-pulse {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.05); }
        }
        
        .pricing-badge.badge-blue {
          background: linear-gradient(135deg, rgb(76, 125, 240), rgb(100, 150, 255));
          color: #fff;
          box-shadow: 0 4px 15px rgba(76, 125, 240, 0.4);
        }
        
        .pricing-badge.badge-red {
          background: linear-gradient(135deg, rgb(240, 48, 31), rgb(255, 80, 60));
          color: #fff;
          box-shadow: 0 4px 15px rgba(240, 48, 31, 0.4);
        }
        
        .pricing-badge.badge-green {
          background: linear-gradient(135deg, var(--neon), #7fff7f);
          color: #000;
          box-shadow: 0 4px 15px rgba(0,255,65,.4);
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
        .plan-price-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        
        .plan-original-price {
          font-size: 14px;
          font-weight: 600;
          color: var(--muted2);
          text-decoration: line-through;
          opacity: 0.7;
        }
        
        .plan-price {
          font-size: 36px;
          font-weight: 950;
          letter-spacing: -2px;
          margin-bottom: 4px;
          text-align: center;
        }
        
        .plan-price.price-blue {
          color: rgb(76, 125, 240);
          text-shadow: 0 0 20px rgba(76, 125, 240, 0.5);
        }
        
        .plan-price.price-red {
          color: rgb(240, 48, 31);
          text-shadow: 0 0 20px rgba(240, 48, 31, 0.5);
        }
        
        .plan-price.price-green {
          color: var(--neon);
          text-shadow: 0 0 20px rgba(0,255,65,.5);
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
        
        /* Buttons - Vibrant styles */
        .plan-btn {
          display: block;
          width: 100%;
          text-align: center;
          padding: 16px 20px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }
        
        
        /* Blue Button */
        .plan-btn.btn-blue {
          background: linear-gradient(135deg, rgb(76, 125, 240), rgb(50, 100, 220));
          color: #fff;
          border: none;
          box-shadow: 0 4px 20px rgba(76, 125, 240, 0.35),
                      inset 0 1px 0 rgba(255,255,255,0.2);
        }
        
        .plan-btn.btn-blue::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .plan-btn.btn-blue:hover::before {
          left: 100%;
        }
        
        .plan-btn.btn-blue:hover {
          box-shadow: 0 8px 35px rgba(76, 125, 240, 0.5),
                      inset 0 1px 0 rgba(255,255,255,0.2);
        }
        
        /* Red Button */
        .plan-btn.btn-red {
          background: linear-gradient(135deg, rgb(240, 48, 31), rgb(200, 30, 20));
          color: #fff;
          border: none;
          box-shadow: 0 4px 20px rgba(240, 48, 31, 0.35),
                      inset 0 1px 0 rgba(255,255,255,0.2);
        }
        
        .plan-btn.btn-red::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .plan-btn.btn-red:hover::before {
          left: 100%;
        }
        
        .plan-btn.btn-red:hover {
          box-shadow: 0 8px 35px rgba(240, 48, 31, 0.5),
                      inset 0 1px 0 rgba(255,255,255,0.2);
        }
        
        /* Green Button - Vitalício */
        .plan-btn.btn-green {
          background: linear-gradient(135deg, var(--neon), #00cc52);
          color: #000;
          border: none;
          box-shadow: 0 4px 20px rgba(0,255,65,.35),
                      inset 0 1px 0 rgba(255,255,255,0.3);
        }
        
        .plan-btn.btn-green::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }
        
        .plan-btn.btn-green:hover::before {
          left: 100%;
        }
        
        .plan-btn.btn-green:hover {
          box-shadow: 0 8px 35px rgba(0,255,65,.5),
                      inset 0 1px 0 rgba(255,255,255,0.3);
        }
      `}</style>
    </section>
  );
}
