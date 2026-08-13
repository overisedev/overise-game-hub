import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

// TODO: gerar checkouts novos no GGCheckout com os precos R$ 39,97 e R$ 99,97 e trocar as URLs
const CHECKOUT_URLS = {
  avancado: "https://ggcheckout.app/checkout/v5/bmezDBCf0cNYoslpt7PE",
  vitalicio: "https://ggcheckout.app/checkout/v5/pdDOCAlm20ZQxjUiglc3",
};

type Plan = {
  id: "avancado" | "vitalicio";
  name: string;
  badge?: string;
  badgeStyle?: "solid" | "outline";
  from: string;
  price: string;
  cents: string;
  parcela: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
  value: number;
};

const PLANS: Plan[] = [
  {
    id: "avancado",
    name: "Avançado",
    from: "R$ 97",
    price: "39",
    cents: ",97",
    parcela: "ou 12x de R$ 3,99",
    tagline: "Pacote com 20.000 jogos",
    features: [
      "20.000 jogos, incluindo lançamentos",
      "Jogos novos toda semana, sem pagar mais",
      "Online nos jogos compatíveis",
      "Suporte prioritário no WhatsApp e Discord",
    ],
    cta: "Quero esse",
    value: 39.97,
  },
  {
    id: "vitalicio",
    name: "Vitalício",
    badge: "Mais vendido",
    badgeStyle: "solid",
    from: "R$ 297",
    price: "99",
    cents: ",97",
    parcela: "ou 12x de R$ 9,99",
    tagline: "A biblioteca inteira, pra sempre",
    features: [
      "Mais de 40.000 jogos liberados",
      "Inclui ativação de jogos com Denuvo",
      "Recebe todo lançamento novo, pra sempre",
      "Multiplayer funcionando",
      "Pede qualquer jogo que a gente adiciona",
      "Seu pra sempre, nunca mais paga nada",
      "Suporte prioritário no WhatsApp e Discord",
    ],
    cta: "Desbloquear tudo",
    featured: true,
    value: 99.97,
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
  const [t, setT] = useState({ m: 9, s: 59 });
  useEffect(() => {
    const id = setInterval(() => {
      setT((p) => (p.s > 0 ? { ...p, s: p.s - 1 } : p.m > 0 ? { m: p.m - 1, s: 59 } : { m: 9, s: 59 }));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");

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
          <span className="pricing-label">Escolha e pague uma vez</span>
          <h2>Menos que o preço de um jogo. <span className="neon">Todos os jogos.</span></h2>
          <p>Acesso liberado na hora do pagamento. Todos os planos com garantia de 7 dias.</p>
          <div className="pricing-timer">
            O preço promocional sai do ar em <span className="pt-clock">{pad(t.m)}:{pad(t.s)}</span>
          </div>
        </motion.div>

        <div className="pricing-grid pricing-grid-2">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              className={`plan-card ${plan.featured ? "plan-featured" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {plan.badge && (
                <span className={`plan-badge plan-badge-${plan.badgeStyle}`}>{plan.badge}</span>
              )}

              <h3 className="plan-name">{plan.name}</h3>
              <span className="plan-from">de <s>{plan.from}</s> por</span>

              <div className="plan-price">
                <span className="plan-currency">R$</span>
                <span className="plan-value">{plan.price}</span>
                <span className="plan-cents">{plan.cents}</span>
              </div>
              <span className="plan-parcela">{plan.parcela}</span>

              <span className="plan-tax">pagamento único</span>
              <span className="plan-nomonthly">sem mensalidade · sem renovação</span>

              <p className="plan-tagline">{plan.tagline}</p>

              <div className="plan-divider" />

              <ul className="plan-features">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className={`plan-feat ${feat.includes("Denuvo") ? "plan-feat-hot" : ""}`}>
                    <span className="plan-check">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button className="plan-cta" onClick={() => handleCheckout(plan)}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .pricing-section { padding: 100px 0 80px; overflow: hidden; }

        .pricing-header { text-align: center; margin-bottom: 22px; }
        .pricing-label {
          display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px;
          background: rgba(0,255,65,.10); border: 1px solid rgba(0,255,65,.3); border-radius: 999px;
          font-size: 12px; font-weight: 900; color: var(--neon); text-transform: uppercase;
          letter-spacing: 1.5px; margin-bottom: 18px;
        }
        .pricing-header h2 { font-size: clamp(28px, 5vw, 46px); font-weight: 950; color: #fff; letter-spacing: -1.5px; line-height: 1.08; margin: 0 0 12px; }
        .pricing-header h2 .neon { color: var(--neon); }
        .pricing-header p { color: rgba(255,255,255,.7); font-size: 15px; font-weight: 500; margin: 0 auto; max-width: 520px; }
        .pricing-timer { display: inline-flex; align-items: center; gap: 9px; margin-top: 20px; font-size: 14px; color: rgba(255,255,255,.7); font-weight: 600; }
        .pricing-timer .pt-clock { font-family: 'Sora', monospace; font-weight: 900; color: #fff; letter-spacing: 2px; background: rgba(0,0,0,.6); border: 1px solid rgba(0,255,65,.3); padding: 4px 12px; border-radius: 8px; }

        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1140px; margin: 40px auto 0; align-items: stretch; }
        .pricing-grid-2 { grid-template-columns: repeat(2, 1fr); max-width: 820px; }

        .plan-card {
          position: relative; border-radius: 24px; border: 1.5px solid rgba(255,255,255,.09);
          background: linear-gradient(180deg, rgba(15,15,15,.97), rgba(5,5,5,1));
          padding: 38px 30px 30px; display: flex; flex-direction: column; align-items: center;
          text-align: center; transition: transform .25s ease, border-color .25s ease;
        }
        .plan-card:hover { transform: translateY(-4px); border-color: rgba(0,255,65,.3); }
        .plan-featured { border-color: rgba(0,255,65,.5); box-shadow: 0 0 70px rgba(0,255,65,.10), inset 0 1px 0 rgba(0,255,65,.14); }
        @media (min-width: 861px) { .plan-featured { transform: scale(1.04); } .plan-featured:hover { transform: scale(1.04) translateY(-4px); } }

        .plan-badge { position: absolute; top: -13px; left: 50%; transform: translateX(-50%); padding: 6px 16px; border-radius: 999px; font-size: 10px; font-weight: 900; letter-spacing: 1.2px; text-transform: uppercase; white-space: nowrap; }
        .plan-badge-solid { background: var(--neon); color: #000; box-shadow: 0 6px 20px rgba(0,255,65,.4); }
        .plan-badge-outline { background: rgba(0,255,65,.12); color: var(--neon); border: 1px solid rgba(0,255,65,.5); }

        .plan-name { font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 800; color: #fff; letter-spacing: .5px; margin: 0 0 12px; text-transform: uppercase; }
        .plan-from { font-size: 13px; color: rgba(255,255,255,.45); font-weight: 500; margin-bottom: 4px; }
        .plan-from s { text-decoration: line-through; }

        .plan-price { display: flex; align-items: flex-start; line-height: 1; margin-top: 2px; color: #fff; }
        .plan-currency { font-size: 22px; font-weight: 800; margin-top: 14px; margin-right: 4px; }
        .plan-value { font-size: 72px; font-weight: 900; letter-spacing: -3px; }
        .plan-cents { font-size: 26px; font-weight: 800; margin-top: 16px; color: rgba(255,255,255,.75); }
        .plan-featured .plan-price { color: var(--neon); filter: drop-shadow(0 0 30px rgba(0,255,65,.3)); }
        .plan-featured .plan-cents { color: rgba(0,255,65,.8); }
        .plan-parcela { font-size: 13px; color: rgba(255,255,255,.6); font-weight: 600; margin-top: 6px; }

        .plan-tax { font-size: 11px; font-weight: 900; color: var(--neon); letter-spacing: 2px; text-transform: uppercase; margin-top: 10px; margin-bottom: 5px; }
        .plan-nomonthly { display: block; font-size: 11px; color: rgba(255,255,255,.5); font-weight: 600; margin-bottom: 16px; }

        .plan-tagline { font-size: 14px; color: rgba(255,255,255,.8); font-weight: 600; margin: 0 0 4px; }
        .plan-divider { width: 80%; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent); margin: 20px auto; }

        .plan-features { list-style: none; padding: 0; margin: 0 0 28px; width: 100%; display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .plan-feat { display: flex; align-items: flex-start; gap: 10px; justify-content: flex-start; text-align: left; font-size: 14px; font-weight: 500; color: rgba(255,255,255,.85); }
        .plan-feat-hot { color: #fff; font-weight: 800; }
        .plan-feat-hot span:last-child::after { content: 'PREMIUM'; font-size: 9px; font-weight: 900; color: #000; background: var(--neon); border-radius: 5px; padding: 2px 6px; margin-left: 8px; letter-spacing: .5px; vertical-align: middle; }
        .plan-check { font-weight: 900; font-size: 14px; color: var(--neon); flex: none; margin-top: 1px; }

        .plan-cta {
          width: 100%; padding: 16px; border: none; border-radius: 14px; font-family: 'Sora', sans-serif;
          font-size: 15px; font-weight: 900; cursor: pointer; margin-top: auto;
          background: var(--neon); color: #000; box-shadow: 0 8px 24px rgba(0,255,65,.28);
          transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
        }
        .plan-cta:hover { transform: translateY(-2px); filter: brightness(1.08); box-shadow: 0 10px 32px rgba(0,255,65,.45); }
        .plan-card:not(.plan-featured) .plan-cta { background: transparent; color: var(--neon); border: 1.5px solid rgba(0,255,65,.5); box-shadow: none; }
        .plan-card:not(.plan-featured) .plan-cta:hover { background: rgba(0,255,65,.1); }

        @media (max-width: 860px) {
          .pricing-grid-2 { grid-template-columns: 1fr; max-width: 420px; gap: 32px; }
        }
        @media (max-width: 640px) {
          .pricing-section { padding: 56px 0 48px; }
          .plan-card { padding: 34px 22px 26px; }
          .plan-value { font-size: 60px; }
          .plan-cents { font-size: 22px; }
        }
      `}</style>
    </section>
  );
}
