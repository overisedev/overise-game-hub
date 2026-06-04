import { motion } from "framer-motion";
import { Zap } from "lucide-react";

function getUTMParams(): string {
  const params = new URLSearchParams(window.location.search);
  const utmParams = new URLSearchParams();
  const utmKeys = [
    "utm_source", "utm_medium", "utm_campaign", "utm_term",
    "utm_content", "utm_id", "fbclid", "gclid", "ttclid", "sck", "src",
  ];
  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) utmParams.append(key, value);
  });
  try {
    const storedUtms = localStorage.getItem("__utmify_session_data");
    if (storedUtms) {
      const parsed = JSON.parse(storedUtms);
      if (parsed.utm_source && !utmParams.has("utm_source")) utmParams.append("utm_source", parsed.utm_source);
      if (parsed.utm_medium && !utmParams.has("utm_medium")) utmParams.append("utm_medium", parsed.utm_medium);
      if (parsed.utm_campaign && !utmParams.has("utm_campaign")) utmParams.append("utm_campaign", parsed.utm_campaign);
    }
  } catch (e) {}
  return utmParams.toString();
}

const CHECKOUT_URLS = {
  basico: "https://www.ggcheckout.com/checkout/v4/6Ed9FJE8HXebnxREUKCQ",
  avancado: "https://ggcheckout.app/checkout/v5/7BjTvFU3irTLaoud6UIO",
  vitalicio: "https://ggcheckout.app/checkout/v5/pdDOCAlm20ZQxjUiglc3",
};

type Plan = {
  id: "basico" | "avancado" | "vitalicio";
  name: string;
  badge?: string;
  badgeTone?: "red" | "green";
  from: string;
  price: string;
  cents: string;
  installmentsPrefix?: string;
  cashNote?: string;
  tagline: string;
  features: string[];
  cta: string;
  tone: "blue" | "red" | "green";
  value: number;
};

const PLANS: Plan[] = [
  {
    id: "basico",
    name: "PLANO BÁSICO",
    from: "R$ 29,97",
    price: "19",
    cents: ",97",
    tagline: "Pacote com 1000 Jogos",
    features: [
      "1000 jogos inclusos",
      "Download via Steam",
      "Modo história liberado",
      "Acesso na hora",
    ],
    cta: "ESCOLHER BÁSICO",
    tone: "blue",
    value: 19.97,
  },
  {
    id: "avancado",
    name: "PLANO AVANÇADO",
    badge: "MAIS VENDIDO",
    badgeTone: "red",
    from: "R$ 97,00",
    price: "6",
    cents: ",25",
    installmentsPrefix: "10x R$",
    cashNote: "No cartão ou R$ 49,97 à vista",
    tagline: "Pacote com 20.000 Jogos",
    features: [
      "20.000 jogos inclusos",
      "Jogos novos e lançamentos",
      "Online nos compatíveis",
      "Suporte prioritário no WhatsApp",
      "Suporte prioritário no Discord",
    ],
    cta: "QUERO ESSE",
    tone: "red",
    value: 49.97,
  },
  {
    id: "vitalicio",
    name: "PLANO VITALÍCIO",
    badge: "MELHOR CUSTO-BENEFÍCIO",
    badgeTone: "green",
    from: "R$ 1.499,00",
    price: "12",
    cents: ",50",
    installmentsPrefix: "10x R$",
    cashNote: "No cartão ou R$ 125,00 à vista",
    tagline: "Liberar a Lista Toda",
    features: [
      "40.000 jogos liberados",
      "Recebe jogos novos pra sempre",
      "Multiplayer funcionando",
      "Pede qualquer jogo que a gente adiciona",
      "Suporte prioritário no WhatsApp",
      "Suporte prioritário no Discord",
      "Seu pra sempre",
    ],
    cta: "DESBLOQUEAR TUDO",
    tone: "green",
    value: 125.00,
  },
];

function handleCheckout(plan: Plan) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "InitiateCheckout", {
      content_name: plan.name,
      value: plan.value,
      currency: "BRL",
    });
  }
  const checkoutUrl = CHECKOUT_URLS[plan.id];
  const utmString = getUTMParams();
  const separator = checkoutUrl.includes("?") ? "&" : "?";
  const finalUrl = utmString ? `${checkoutUrl}${separator}${utmString}` : checkoutUrl;
  window.open(finalUrl, "_blank", "noopener,noreferrer");
}

export function PricingSection() {
  return (
    <section id="planos" className="pricing-section">
      <div className="container-main">
        <motion.div
          className="pricing-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="pricing-label">
            <Zap size={14} />
            Investimento
          </span>
          <h2>Escolha seu plano</h2>
          <p>Acesso imediato após o pagamento. Escolha o que melhor se encaixa para você.</p>
        </motion.div>

        <div className="pricing-grid">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              className={`plan-card plan-${plan.tone} ${plan.id === "avancado" ? "plan-featured" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {plan.badge && (
                <span className={`plan-badge plan-badge-${plan.badgeTone}`}>{plan.badge}</span>
              )}

              <h3 className="plan-name">{plan.name}</h3>

              <div className="plan-promo">
                <span>DE <s>{plan.from}</s> POR APENAS</span>
              </div>

              {plan.installmentsPrefix && (
                <span className={`plan-installments plan-price-${plan.tone}`}>{plan.installmentsPrefix.replace(" R$", "")}</span>
              )}
              <div className={`plan-price plan-price-${plan.tone}`}>
                <span className="plan-currency">R$</span>
                <span className="plan-value">{plan.price}</span>
                <span className="plan-cents">{plan.cents}</span>
              </div>

              <span className="plan-tax">{plan.cashNote ?? "PAGAMENTO ÚNICO"}</span>

              <p className="plan-tagline">{plan.tagline}</p>

              <div className="plan-divider" />

              <ul className="plan-features">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className={`plan-feat plan-feat-${plan.tone}`}>
                    <span className="plan-check">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`plan-cta plan-cta-${plan.tone}`}
                onClick={() => handleCheckout(plan)}
              >
                {plan.cta} →
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .pricing-section {
          padding: 100px 0 80px;
          overflow: hidden;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .pricing-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(0,255,65,.08);
          border: 1px solid rgba(0,255,65,.25);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          color: var(--neon);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 18px;
        }
        .pricing-header h2 {
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 950;
          color: #fff;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin: 0 0 12px;
        }
        .pricing-header p {
          color: rgba(255,255,255,.7);
          font-size: 15px;
          font-weight: 500;
          margin: 0;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
          align-items: stretch;
        }

        .plan-card {
          position: relative;
          border-radius: 24px;
          border: 1.5px solid rgba(255,255,255,.08);
          background: linear-gradient(180deg, rgba(15,15,15,.97), rgba(5,5,5,1));
          padding: 36px 28px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform .25s ease, border-color .25s ease;
        }
        .plan-card:hover { transform: translateY(-4px); }
        .plan-featured {
          border-color: rgba(255,255,255,.12);
        }
        .plan-green {
          border-color: rgba(57,255,20,.35);
          box-shadow: 0 0 60px rgba(57,255,20,.08), inset 0 1px 0 rgba(57,255,20,.12);
        }

        .plan-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .plan-badge-red {
          background: #ff3838;
          color: #fff;
          box-shadow: 0 6px 20px rgba(255,56,56,.4);
        }
        .plan-badge-green {
          background: #39ff14;
          color: #000;
          box-shadow: 0 6px 20px rgba(57,255,20,.4);
        }

        .plan-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px;
          font-weight: 900;
          color: #fff;
          letter-spacing: 1px;
          margin: 0 0 14px;
          text-transform: uppercase;
        }
        .plan-promo {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: rgba(255,255,255,.85);
          text-transform: uppercase;
          margin-bottom: 8px;
          text-align: center;
        }
        .plan-promo s {
          color: #ff4d4d;
          text-decoration: line-through;
          text-decoration-color: #ff4d4d;
          text-decoration-thickness: 2px;
          margin: 0 4px;
        }

        .plan-price {
          display: flex;
          align-items: flex-start;
          line-height: 1;
          margin-top: 2px;
        }
        .plan-currency {
          font-size: 22px;
          font-weight: 800;
          margin-top: 14px;
          margin-right: 4px;
        }
        .plan-value {
          font-size: 72px;
          font-weight: 900;
          letter-spacing: -3px;
        }
        .plan-cents {
          font-size: 26px;
          font-weight: 800;
          margin-top: 16px;
        }
        .plan-price-blue { color: #4f7cff; filter: drop-shadow(0 0 30px rgba(79,124,255,.25)); }
        .plan-price-red  { color: #ff4d4d; filter: drop-shadow(0 0 30px rgba(255,77,77,.25)); }
        .plan-price-green{ color: #39ff14; filter: drop-shadow(0 0 30px rgba(57,255,20,.3)); }

        .plan-tax {
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,.75);
          letter-spacing: .5px;
          margin-top: 6px;
          margin-bottom: 18px;
          text-align: center;
        }

        .plan-tagline {
          font-size: 14px;
          color: rgba(255,255,255,.8);
          font-weight: 600;
          margin: 0 0 4px;
        }

        .plan-divider {
          width: 80%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
          margin: 20px auto;
        }

        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .plan-feat {
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,.85);
        }
        .plan-check {
          font-weight: 900;
          font-size: 14px;
        }
        .plan-feat-blue .plan-check  { color: #4f7cff; }
        .plan-feat-red .plan-check   { color: #ff4d4d; }
        .plan-feat-green .plan-check { color: #39ff14; }

        .plan-cta {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
          margin-top: auto;
        }
        .plan-cta:hover { transform: translateY(-2px); filter: brightness(1.08); }
        .plan-cta-blue {
          background: linear-gradient(135deg, #4f7cff, #3a5fd6);
          color: #fff;
          box-shadow: 0 8px 24px rgba(79,124,255,.35);
        }
        .plan-cta-red {
          background: linear-gradient(135deg, #ff4d4d, #d93636);
          color: #fff;
          box-shadow: 0 8px 24px rgba(255,77,77,.35);
        }
        .plan-cta-green {
          background: linear-gradient(135deg, #39ff14, #2ad900);
          color: #000;
          box-shadow: 0 8px 24px rgba(57,255,20,.35);
        }

        @media (max-width: 960px) {
          .pricing-grid {
            grid-template-columns: 1fr;
            max-width: 420px;
            gap: 32px;
          }
        }
        @media (max-width: 640px) {
          .pricing-section { padding: 56px 0 48px; }
          .pricing-header { margin-bottom: 36px; }
          .plan-card { padding: 32px 22px 24px; }
          .plan-value { font-size: 60px; }
          .plan-cents { font-size: 22px; }
        }
      `}</style>
    </section>
  );
}
