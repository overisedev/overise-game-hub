import { motion } from "framer-motion";
import { Zap, Download, Shield, Headphones, Gamepad2, RefreshCw, MessageCircle } from 'lucide-react';

// Import testimonial avatars for social proof
import jzAvatar from '@/assets/testimonials/jz.jpg';
import adriellyAvatar from '@/assets/testimonials/adrielly.jpg';
import maiconAvatar from '@/assets/testimonials/maicon.jpg';
import wlAvatar from '@/assets/testimonials/wl.jpeg';

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

const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v4/6Ed9FJE8HXebnxREUKCQ";

const BONUSES = [
  { icon: Zap, title: 'Ativação Instantânea', desc: 'Acesso liberado em menos de 2 minutos após o pagamento.' },
  { icon: Download, title: 'Download pela Steam', desc: 'Baixe direto dos servidores oficiais na velocidade máxima.' },
  { icon: RefreshCw, title: 'Atualizações Automáticas', desc: 'Seus jogos sempre na versão mais recente, sem fazer nada.' },
  { icon: MessageCircle, title: 'Suporte via WhatsApp', desc: 'Equipe real pronta para te ajudar a qualquer momento.' },
  { icon: Gamepad2, title: 'Pedidos de Novos Jogos', desc: 'Solicite jogos e nossa equipe adiciona ao catálogo.' },
  { icon: Shield, title: 'Garantia de 7 Dias', desc: 'Não curtiu? Devolvemos seu dinheiro sem burocracia.' },
];

function handleCheckout() {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "InitiateCheckout", {
      content_name: "Acesso Completo",
      value: 9.97,
      currency: "BRL",
    });
  }
  const utmString = getUTMParams();
  const separator = CHECKOUT_URL.includes("?") ? "&" : "?";
  const finalUrl = utmString ? `${CHECKOUT_URL}${separator}${utmString}` : CHECKOUT_URL;
  window.open(finalUrl, "_blank", "noopener,noreferrer");
}

export function PricingSection() {
  return (
    <section id="planos" className="pricing-section section-light">
      <div className="container-main">

        {/* Label */}
        <motion.div
          className="pricing-top"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="pricing-label">
            <Zap size={14} />
            Investimento
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          className="pricing-headline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <h2>
            Quanto custa ter acesso a<br />
            <span className="pricing-hl-accent">+1000 jogos famosos?</span>
          </h2>
          <p className="pricing-hl-sub">
            Menos do que um lanche. Pagou uma vez, é seu pra sempre.
          </p>
        </motion.div>

        {/* Price Card */}
        <motion.div
          className="pricing-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="pc-inner">
            {/* Plan Name */}
            <h3 className="pc-plan-name">OVERISE</h3>
            <span className="pc-plan-sub">ACESSO COMPLETO</span>

            <span className="pc-from">De <s>R$ 15.000</s> em jogos</span>

            <div className="pc-price-row">
              <span className="pc-currency">R$</span>
              <span className="pc-value">9</span>
              <span className="pc-cents">,97</span>
            </div>

            <span className="pc-label">Taxa Única</span>

            <div className="pc-divider" />

            <div className="pc-benefits">
              <div className="pc-benefit">
                <svg className="pc-check-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neon)" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
                <span className="pc-benefit-title pc-bold">+1000 Jogos (+Lançamentos)</span>
              </div>
              <div className="pc-benefit">
                <svg className="pc-check-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neon)" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
                <span className="pc-benefit-title">Seus pra Sempre (Vitalício)</span>
              </div>
              <div className="pc-benefit">
                <svg className="pc-check-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neon)" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
                <span className="pc-benefit-title pc-bold">Modo Online (Selecionados)</span>
              </div>
              <div className="pc-benefit">
                <svg className="pc-check-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neon)" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
                <span className="pc-benefit-title">Download pela Steam</span>
              </div>
              <div className="pc-benefit">
                <svg className="pc-check-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neon)" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
                <span className="pc-benefit-title">Atualizações Automáticas</span>
              </div>
              <div className="pc-benefit">
                <svg className="pc-check-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neon)" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
                <span className="pc-benefit-title">Suporte WhatsApp</span>
              </div>
              <div className="pc-benefit">
                <svg className="pc-check-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neon)" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
                <span className="pc-benefit-title">Pedidos de Jogos</span>
              </div>
              <div className="pc-benefit">
                <svg className="pc-check-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neon)" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
                <span className="pc-benefit-title">Garantia de 7 dias</span>
              </div>
            </div>

            <button className="pc-cta" onClick={handleCheckout}>
              Quero Meu Acesso
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Social Proof */}
            <div className="pc-social">
              <div className="pc-avatars">
                <img src={jzAvatar} alt="" />
                <img src={adriellyAvatar} alt="" />
                <img src={maiconAvatar} alt="" />
                <img src={wlAvatar} alt="" />
              </div>
              <div className="pc-social-text">
                <span className="pc-stars">★★★★★</span>
                <span>+5K clientes satisfeitos</span>
              </div>
            </div>

            <p className="pc-secure">
              Compra 100% segura. Acesso liberado imediatamente após a confirmação.
            </p>
          </div>

          <div className="pc-glow" />
        </motion.div>

        {/* Bonuses Section */}
        <motion.div
          className="bonuses-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <span className="pricing-label">
            <Shield size={14} />
            Inclusos no Acesso
          </span>
          <h3 className="bonuses-title">
            Tudo isso por apenas<br />
            <span className="pricing-hl-accent">R$ 9,97</span>
          </h3>
        </motion.div>

        <motion.div
          className="bonuses-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          {BONUSES.map((bonus, i) => (
            <motion.div
              key={i}
              className="bonus-row"
              variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
            >
              <div className="bonus-row-icon">
                <bonus.icon size={22} />
              </div>
              <div className="bonus-row-content">
                <h4>{bonus.title}</h4>
                <p>{bonus.desc}</p>
              </div>
              <div className="bonus-row-check">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="pricing-final-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button className="pc-cta pc-cta-final" onClick={handleCheckout}>
            Garantir Meu Acesso por R$ 9,97
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

      </div>

      <style>{`
        .pricing-section {
          padding: 100px 0 80px;
          overflow: hidden;
        }

        /* Top Label */
        .pricing-top {
          text-align: center;
          margin-bottom: 16px;
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
        }

        /* Headline */
        .pricing-headline {
          text-align: center;
          margin-bottom: 40px;
        }
        .pricing-headline h2 {
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 950;
          color: #fff;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin: 0;
        }
        .pricing-hl-accent {
          color: var(--neon);
          font-style: italic;
        }
        .pricing-hl-sub {
          color: rgba(255,255,255,.75);
          font-size: 16px;
          margin-top: 12px;
          font-weight: 600;
        }

        /* Price Card */
        .pricing-card {
          max-width: 420px;
          margin: 0 auto;
          position: relative;
          border-radius: 28px;
          border: 1.5px solid rgba(0,255,65,.3);
          background: linear-gradient(180deg, rgba(10,10,10,.97) 0%, rgba(3,3,3,1) 100%);
          overflow: hidden;
          box-shadow: 
            0 40px 80px rgba(0,0,0,.5),
            0 0 80px rgba(0,255,65,.08),
            inset 0 1px 0 rgba(0,255,65,.1);
        }
        .pc-inner {
          position: relative;
          z-index: 1;
          padding: 48px 36px 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .pc-glow {
          position: absolute;
          top: -50%;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(0,255,65,.1), transparent 70%);
          pointer-events: none;
        }

        /* Badge */
        .pc-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 20px;
          background: var(--neon);
          color: #000;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-radius: 999px;
          margin-bottom: 28px;
          box-shadow: 0 4px 20px rgba(0,255,65,.3);
        }

        /* Plan Name */
        .pc-plan-name {
          font-family: 'Sora', sans-serif;
          font-size: 32px;
          font-weight: 950;
          color: #fff;
          letter-spacing: -1px;
          margin: 0 0 4px;
          text-transform: uppercase;
        }
        .pc-plan-sub {
          font-size: 13px;
          font-weight: 800;
          color: var(--neon);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 20px;
        }

        .pc-from {
          font-size: 14px;
          color: rgba(255,255,255,.7);
          font-weight: 600;
          margin-bottom: 4px;
        }
        .pc-from s { text-decoration: line-through; color: rgba(255,255,255,.5); }

        .pc-price-row {
          display: flex;
          align-items: flex-start;
          line-height: 1;
        }
        .pc-currency {
          font-size: 24px;
          font-weight: 800;
          color: var(--neon);
          margin-top: 20px;
          margin-right: 4px;
        }
        .pc-value {
          font-size: 110px;
          font-weight: 900;
          color: #fff;
          letter-spacing: -5px;
          filter: drop-shadow(0 0 40px rgba(0,255,65,.2));
        }
        .pc-cents {
          font-size: 34px;
          font-weight: 800;
          color: #fff;
          margin-top: 22px;
        }
        .pc-label {
          font-size: 11px;
          font-weight: 800;
          color: var(--neon);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 2px;
          margin-bottom: 24px;
        }

        .pc-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
          margin-bottom: 24px;
        }

        .pc-benefits {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 28px;
        }
        .pc-benefit {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 0;
          border-bottom: 1px solid rgba(255,255,255,.08);
        }
        .pc-benefit:last-child {
          border-bottom: none;
        }
        .pc-check-svg {
          flex-shrink: 0;
        }
        .pc-benefit-title {
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,.85);
          letter-spacing: -.2px;
          text-align: left;
        }
        .pc-benefit-title.pc-bold {
          font-weight: 800;
          color: #fff;
          font-size: 16px;
        }

        .pc-cta {
          width: 100%;
          padding: 18px;
          background: var(--neon);
          color: #000;
          font-size: 14px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .5px;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all .25s ease;
          box-shadow: 0 8px 30px rgba(0,255,65,.25);
        }
        .pc-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0,255,65,.4);
        }

        .pc-social {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
        }
        .pc-avatars {
          display: flex;
        }
        .pc-avatars img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid #0a0a0a;
          object-fit: cover;
          margin-left: -8px;
        }
        .pc-avatars img:first-child { margin-left: 0; }
        .pc-social-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .pc-stars {
          color: var(--neon);
          font-size: 11px;
          letter-spacing: 1px;
        }
        .pc-social-text span:last-child {
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,.75);
        }

        .pc-secure {
          font-size: 12px;
          color: rgba(255,255,255,.6);
          margin-top: 16px;
          font-weight: 600;
          line-height: 1.5;
        }

        /* Bonuses */
        .bonuses-header {
          text-align: center;
          margin-top: 80px;
          margin-bottom: 12px;
        }
        .bonuses-title {
          text-align: center;
          font-size: clamp(24px, 4vw, 34px);
          font-weight: 950;
          color: #fff;
          letter-spacing: -1px;
          line-height: 1.15;
          margin: 16px 0 40px;
        }

        .bonuses-list {
          max-width: 560px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .bonus-row {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 22px 24px;
          border-bottom: 1px solid rgba(255,255,255,.06);
          position: relative;
          transition: background .2s ease;
        }
        .bonus-row:first-child {
          border-top: 1px solid rgba(255,255,255,.06);
        }
        .bonus-row:hover {
          background: rgba(0,255,65,.03);
        }
        .bonus-row::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 0;
          background: var(--neon);
          transition: height .25s ease;
          border-radius: 2px;
        }
        .bonus-row:hover::before {
          height: 60%;
        }

        .bonus-row-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(0,255,65,.08);
          border: 1px solid rgba(0,255,65,.15);
          color: var(--neon);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bonus-row-content {
          flex: 1;
          min-width: 0;
        }
        .bonus-row-content h4 {
          font-size: 16px;
          font-weight: 800;
          color: #fff;
          margin: 0 0 3px;
          letter-spacing: -.3px;
        }
        .bonus-row-content p {
          font-size: 13px;
          color: rgba(255,255,255,.7);
          line-height: 1.45;
          margin: 0;
          font-weight: 500;
        }

        .bonus-row-check {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(0,255,65,.1);
          border: 1px solid rgba(0,255,65,.2);
          color: var(--neon);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Final CTA */
        .pricing-final-cta {
          text-align: center;
          margin-top: 40px;
        }
        .pc-cta-final {
          max-width: 420px;
          margin: 0 auto;
        }

        @media (max-width: 640px) {
          .pricing-section {
            padding: 56px 0 48px;
          }
          .pricing-headline {
            margin-bottom: 28px;
          }
          .pc-inner {
            padding: 40px 20px 24px;
          }
          .pc-badge {
            margin-bottom: 20px;
            font-size: 10px;
            padding: 6px 16px;
          }
          .pc-plan-name {
            font-size: 26px;
          }
          .pc-plan-sub {
            font-size: 11px;
            margin-bottom: 14px;
          }
          .pc-value {
            font-size: 80px;
          }
          .pc-cents {
            font-size: 28px;
          }
          .pc-benefit {
            padding: 11px 0;
          }
          .pc-benefit-title {
            font-size: 14px;
          }
          .pc-benefit-title.pc-bold {
            font-size: 14px;
          }
          .bonuses-header {
            margin-top: 56px;
          }
          .bonuses-title {
            margin-bottom: 24px;
          }
          .bonus-row {
            padding: 16px 12px;
            gap: 14px;
          }
          .bonus-row-icon {
            width: 40px;
            height: 40px;
            border-radius: 12px;
          }
          .bonus-row-content h4 {
            font-size: 14px;
          }
          .bonus-row-content p {
            font-size: 12px;
          }
          .bonus-row-check {
            width: 28px;
            height: 28px;
          }
          .pricing-final-cta {
            margin-top: 28px;
          }
        }
      `}</style>
    </section>
  );
}
