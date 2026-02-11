import { motion } from "framer-motion";

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

const GAME_COVERS = [
  { name: 'Elden Ring', appid: 1245620 },
  { name: 'God of War', appid: 1593500 },
  { name: 'Hogwarts Legacy', appid: 990080 },
  { name: 'Cyberpunk 2077', appid: 1091500 },
  { name: 'Spider-Man', appid: 1817070 },
  { name: 'RDR2', appid: 1174180 },
  { name: 'Witcher 3', appid: 292030 },
  { name: 'Sekiro', appid: 814380 },
];

const TIMELINE_STEPS = [
  {
    icon: '💳',
    title: 'Pague R$ 9,97',
    desc: 'Taxa única. Sem mensalidade, sem surpresas. Pagou uma vez, é seu pra sempre.',
  },
  {
    icon: '⚡',
    title: 'Receba o Acesso Instantâneo',
    desc: 'Em menos de 2 minutos você recebe o acesso ao launcher exclusivo Overise.',
  },
  {
    icon: '🎮',
    title: '+1000 Jogos na Sua Steam',
    desc: 'Escolha qualquer jogo do catálogo e baixe direto pela Steam oficial, na velocidade máxima.',
  },
  {
    icon: '♾️',
    title: 'Seus Pra Sempre',
    desc: 'Acesso vitalício. Atualizações automáticas, suporte dedicado e pedidos de novos jogos.',
  },
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
    <section id="planos" className="pricing-premium section-light">
      <div className="container-main">
        {/* Header */}
        <motion.div
          className="pricing-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="pricing-pill">
            <span className="pricing-pill-dot" />
            Oferta por Tempo Limitado
          </span>
          <h2 className="pricing-title">
            Tudo isso por apenas<br />
            <span className="pricing-price-inline">R$ 9,97</span>
          </h2>
          <p className="pricing-subtitle">
            Acesso vitalício. Pagou uma vez, é seu pra sempre. Para PC.
          </p>
        </motion.div>

        {/* Game Covers Marquee */}
        <motion.div
          className="pricing-games-strip"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="pricing-games-track">
            {[...GAME_COVERS, ...GAME_COVERS].map((game, i) => (
              <div key={`${game.appid}-${i}`} className="pricing-game-card">
                <img
                  src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/library_600x900.jpg`}
                  alt={game.name}
                  loading="lazy"
                />
                <div className="pricing-game-label">
                  <span className="pricing-game-tag">Liberado</span>
                </div>
              </div>
            ))}
          </div>
          <div className="pricing-games-fade-left" />
          <div className="pricing-games-fade-right" />
        </motion.div>

        {/* Main Pricing Card + Timeline */}
        <div className="pricing-main-grid">
          {/* Left: Timeline */}
          <motion.div
            className="pricing-timeline"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="timeline-title">Como funciona</h3>
            {TIMELINE_STEPS.map((step, i) => (
              <div key={i} className="timeline-step">
                <div className="timeline-line-wrap">
                  <div className="timeline-dot">{step.icon}</div>
                  {i < TIMELINE_STEPS.length - 1 && <div className="timeline-connector" />}
                </div>
                <div className="timeline-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: Price Card */}
          <motion.div
            className="pricing-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="pricing-card-badge">Oferta Especial 🔥</div>

            <div className="pricing-card-price-block">
              <span className="pricing-card-from">de <s>R$ 29,90</s></span>
              <div className="pricing-card-price">
                <span className="pricing-card-currency">R$</span>
                <span className="pricing-card-value">9</span>
                <span className="pricing-card-cents">,97</span>
              </div>
              <span className="pricing-card-label">Taxa Única • Pagou, é Seu</span>
            </div>

            <div className="pricing-card-divider" />

            <ul className="pricing-card-features">
              {[
                '+1000 Jogos Famosos',
                'Acesso Vitalício',
                'Launcher Exclusivo',
                'Download pela Steam',
                'Atualizações Automáticas',
                'Suporte via WhatsApp',
                'Pedidos de Novos Jogos',
              ].map((feat, i) => (
                <li key={i}>
                  <span className="pricing-check">✓</span>
                  {feat}
                </li>
              ))}
            </ul>

            <button className="pricing-card-cta" onClick={handleCheckout}>
              Garantir Meu Acesso
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Social Proof */}
            <div className="pricing-social">
              <div className="pricing-avatars">
                <img src={jzAvatar} alt="" />
                <img src={adriellyAvatar} alt="" />
                <img src={maiconAvatar} alt="" />
                <img src={wlAvatar} alt="" />
              </div>
              <div className="pricing-social-text">
                <span className="pricing-stars">★★★★★</span>
                <span>+5K clientes satisfeitos</span>
              </div>
            </div>

            <div className="pricing-card-glow" />
          </motion.div>
        </div>
      </div>

      <style>{`
        .pricing-premium {
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .pricing-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          border-radius: 999px;
          background: rgba(0,255,65,.08);
          border: 1px solid rgba(0,255,65,.3);
          font-size: 12px;
          font-weight: 800;
          color: var(--neon);
          text-transform: uppercase;
          letter-spacing: .8px;
          margin-bottom: 20px;
        }
        .pricing-pill-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--neon);
          box-shadow: 0 0 12px rgba(0,255,65,.6);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .6; transform: scale(.8); }
        }

        .pricing-title {
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 950;
          color: #fff;
          letter-spacing: -2px;
          line-height: 1.1;
          margin: 0;
        }
        .pricing-price-inline {
          color: var(--neon);
          text-shadow: 0 0 40px rgba(0,255,65,.4);
        }

        .pricing-subtitle {
          color: rgba(255,255,255,.6);
          font-size: 16px;
          margin-top: 12px;
          font-weight: 500;
        }

        /* Game Covers Strip */
        .pricing-games-strip {
          position: relative;
          margin: 0 -20px 50px;
          overflow: hidden;
          padding: 10px 0;
        }
        .pricing-games-track {
          display: flex;
          gap: 12px;
          animation: scroll-games 30s linear infinite;
          width: max-content;
        }
        @keyframes scroll-games {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .pricing-game-card {
          width: 100px;
          height: 150px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
          position: relative;
          border: 1px solid rgba(255,255,255,.1);
        }
        .pricing-game-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .pricing-game-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 6px;
          background: linear-gradient(to top, rgba(0,0,0,.9), transparent);
        }
        .pricing-game-tag {
          font-size: 9px;
          font-weight: 800;
          color: var(--neon);
          text-transform: uppercase;
          letter-spacing: .5px;
        }
        .pricing-games-fade-left,
        .pricing-games-fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .pricing-games-fade-left {
          left: 0;
          background: linear-gradient(to right, rgba(255,255,255,.035), transparent);
        }
        .pricing-games-fade-right {
          right: 0;
          background: linear-gradient(to left, rgba(255,255,255,.035), transparent);
        }

        /* Main Grid */
        .pricing-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 880px) {
          .pricing-main-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        /* Timeline */
        .pricing-timeline {
          padding-top: 10px;
        }
        .timeline-title {
          font-size: 22px;
          font-weight: 950;
          color: #fff;
          margin: 0 0 28px;
          letter-spacing: -0.5px;
          text-transform: uppercase;
        }
        .timeline-step {
          display: flex;
          gap: 16px;
          position: relative;
        }
        .timeline-line-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 48px;
        }
        .timeline-dot {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(0,255,65,.1);
          border: 1px solid rgba(0,255,65,.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .timeline-connector {
          width: 2px;
          flex: 1;
          min-height: 30px;
          background: linear-gradient(to bottom, rgba(0,255,65,.3), rgba(0,255,65,.05));
          margin: 4px 0;
        }
        .timeline-content {
          padding-bottom: 28px;
        }
        .timeline-content h4 {
          margin: 0 0 6px;
          font-size: 16px;
          font-weight: 800;
          color: #fff;
        }
        .timeline-content p {
          margin: 0;
          font-size: 14px;
          color: rgba(255,255,255,.65);
          line-height: 1.6;
        }

        /* Price Card */
        .pricing-card {
          position: relative;
          border-radius: 24px;
          border: 1px solid rgba(0,255,65,.3);
          background: radial-gradient(ellipse at 50% 0%, rgba(0,255,65,.08), rgba(3,3,3,1) 70%);
          padding: 36px 28px;
          overflow: hidden;
          box-shadow: 0 0 80px rgba(0,255,65,.08);
        }
        .pricing-card-glow {
          position: absolute;
          top: -60%;
          left: 50%;
          transform: translateX(-50%);
          width: 400px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(0,255,65,.12), transparent 70%);
          pointer-events: none;
        }
        .pricing-card-badge {
          display: inline-block;
          padding: 8px 16px;
          background: var(--neon);
          color: #000;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .8px;
          border-radius: 999px;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
          box-shadow: 0 4px 20px rgba(0,255,65,.35);
        }
        .pricing-card-price-block {
          text-align: center;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }
        .pricing-card-from {
          font-size: 13px;
          color: rgba(255,255,255,.4);
          font-weight: 600;
        }
        .pricing-card-from s {
          text-decoration: line-through;
        }
        .pricing-card-price {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          line-height: 1;
          margin-top: 4px;
        }
        .pricing-card-currency {
          font-size: 22px;
          font-weight: 800;
          color: var(--neon);
          margin-top: 16px;
          margin-right: 4px;
        }
        .pricing-card-value {
          font-size: 90px;
          font-weight: 900;
          color: #fff;
          letter-spacing: -4px;
          filter: drop-shadow(0 0 25px rgba(0,255,65,.3));
        }
        .pricing-card-cents {
          font-size: 32px;
          font-weight: 800;
          color: #fff;
          margin-top: 18px;
        }
        .pricing-card-label {
          display: block;
          font-size: 11px;
          font-weight: 800;
          color: var(--neon);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-top: 4px;
        }
        .pricing-card-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,65,.2), transparent);
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }
        .pricing-card-features {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          z-index: 1;
        }
        .pricing-card-features li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: rgba(255,255,255,.85);
          font-weight: 600;
        }
        .pricing-check {
          color: var(--neon);
          font-weight: 900;
          font-size: 14px;
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: rgba(0,255,65,.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .pricing-card-cta {
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
          position: relative;
          z-index: 1;
          box-shadow: 0 8px 30px rgba(0,255,65,.3);
        }
        .pricing-card-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0,255,65,.45);
        }

        /* Social Proof */
        .pricing-social {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
          position: relative;
          z-index: 1;
        }
        .pricing-avatars {
          display: flex;
        }
        .pricing-avatars img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 2px solid rgba(3,3,3,1);
          object-fit: cover;
          margin-left: -8px;
        }
        .pricing-avatars img:first-child {
          margin-left: 0;
        }
        .pricing-social-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .pricing-stars {
          color: var(--neon);
          font-size: 11px;
          letter-spacing: 1px;
        }
        .pricing-social-text span:last-child {
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,.6);
        }

        @media (max-width: 640px) {
          .pricing-premium {
            padding: 64px 0;
          }
          .pricing-title {
            font-size: 28px;
            letter-spacing: -1px;
          }
          .pricing-game-card {
            width: 80px;
            height: 120px;
            border-radius: 10px;
          }
          .pricing-card {
            padding: 28px 20px;
          }
          .pricing-card-value {
            font-size: 72px;
          }
          .timeline-content {
            padding-bottom: 20px;
          }
        }
      `}</style>
    </section>
  );
}
