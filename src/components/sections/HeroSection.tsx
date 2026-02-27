import { useState } from 'react';

// Import testimonial avatars for social proof
import jzAvatar from "@/assets/testimonials/jz.jpg";
import adriellyAvatar from "@/assets/testimonials/adrielly.jpg";
import maiconAvatar from "@/assets/testimonials/maicon.jpg";
import wlAvatar from "@/assets/testimonials/wl.jpeg";

const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v5/6Ed9FJE8HXebnxREUKCQ";

function getUTMParams(): string {
  const params = new URLSearchParams(window.location.search);
  const utmParams = new URLSearchParams();
  const utmKeys = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","utm_id","fbclid","gclid","ttclid","sck","src"];
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

type SimStep = 0 | 1 | 2 | 3;

export function HeroSection() {
  const [step, setStep] = useState<SimStep>(0);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const progress = step === 0 ? 0 : step === 1 ? 33 : step === 2 ? 66 : 100;
  const isComplete = step === 3;

  const statusConnection = step >= 1;
  const statusSecurity = step >= 2;
  const statusBypass = step >= 3;

  const handleStep = (targetStep: 1 | 2 | 3) => {
    if (loading) return;
    const loaders = {
      1: 'Sincronizando servidor...',
      2: 'Ativando escudo de proteção...',
      3: 'Aplicando bypass na loja...',
    };
    setLoading(true);
    setLoadingText(loaders[targetStep]);
    setTimeout(() => {
      setStep(targetStep);
      setLoading(false);
      setLoadingText('');
    }, 1200);
  };

  return (
    <section className="hero-root">
      <div className="container-main">
        <div className="hero-split">
          {/* LEFT - Copy */}
          <div className="hero-left">
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              Sistema Overise V7.2 • Status: Indetectável
            </span>

            <h1 className="hero-h1">
              O Fim da Era de Pagar R$ 300 por um Único Jogo.
            </h1>

            <p className="hero-sub">
              Desbloqueie o acesso VIP à sua Steam. O software que as grandes lojas não querem que você descubra.
            </p>

            <div className="hero-checks">
              <div className="hero-check"><span className="hc-icon">✓</span> Jogue lançamentos no dia 1</div>
              <div className="hero-check"><span className="hc-icon">✓</span> Download direto do servidor oficial</div>
              <div className="hero-check"><span className="hc-icon">✓</span> Escudo Anti-Ban integrado</div>
            </div>

            <p className="hero-arrow-text">
              Faça o teste de compatibilidade ao lado e libere sua licença ➔
            </p>

            {/* Social Proof */}
            <div className="hero-social">
              <div className="hero-avatars">
                <img src={jzAvatar} alt="" />
                <img src={adriellyAvatar} alt="" />
                <img src={maiconAvatar} alt="" />
                <img src={wlAvatar} alt="" />
              </div>
              <div className="hero-social-text">
                <span className="hero-stars">★★★★★</span>
                <span className="hero-count">+5K licenças ativadas</span>
              </div>
            </div>
          </div>

          {/* RIGHT - Simulator */}
          <div className="hero-right">
            <div className={`sim-card ${isComplete ? 'sim-complete' : ''}`}>
              {/* Progress Bar */}
              <div className="sim-progress-wrap">
                <div className="sim-progress-label">
                  <span>Progresso do Sistema</span>
                  <span className="sim-progress-pct">{progress}%</span>
                </div>
                <div className="sim-progress-bar">
                  <div className="sim-progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Status Indicators */}
              <div className="sim-statuses">
                <div className="sim-status-row">
                  <span className="sim-status-label">Conexão</span>
                  <span className={`sim-status-value ${statusConnection ? 'active' : 'inactive'}`}>
                    {statusConnection ? '12ms (Oficial)' : 'Desconectado'}
                  </span>
                </div>
                <div className="sim-status-row">
                  <span className="sim-status-label">Segurança</span>
                  <span className={`sim-status-value ${statusSecurity ? 'active' : 'inactive'}`}>
                    {statusSecurity ? 'Escudo Ativo 🛡️' : 'Vulnerável'}
                  </span>
                </div>
                <div className="sim-status-row">
                  <span className="sim-status-label">Travas da Loja</span>
                  <span className={`sim-status-value ${statusBypass ? 'active' : 'inactive'}`}>
                    {statusBypass ? 'Bypass Concluído' : 'Ativas'}
                  </span>
                </div>
              </div>

              {/* Loading indicator */}
              {loading && (
                <div className="sim-loader">
                  <div className="sim-loader-bar"><div className="sim-loader-fill" /></div>
                  <span className="sim-loader-text">{loadingText}</span>
                </div>
              )}

              {/* Buttons */}
              {!isComplete && !loading && (
                <div className="sim-buttons">
                  <button
                    className={`sim-btn ${step >= 1 ? 'done' : step === 0 ? 'current' : ''}`}
                    disabled={step >= 1}
                    onClick={() => handleStep(1)}
                  >
                    {step >= 1 ? '✓ ' : ''}1. SINCRONIZAR SERVIDOR
                  </button>
                  <button
                    className={`sim-btn ${step >= 2 ? 'done' : step === 1 ? 'current' : ''}`}
                    disabled={step < 1 || step >= 2}
                    onClick={() => handleStep(2)}
                  >
                    {step >= 2 ? '✓ ' : ''}2. ATIVAR PROTEÇÃO
                  </button>
                  <button
                    className={`sim-btn ${step >= 3 ? 'done' : step === 2 ? 'current' : ''}`}
                    disabled={step < 2 || step >= 3}
                    onClick={() => handleStep(3)}
                  >
                    {step >= 3 ? '✓ ' : ''}3. DESBLOQUEAR STEAM
                  </button>
                </div>
              )}

              {/* Success State */}
              {isComplete && !loading && (
                <div className="sim-success">
                  <p className="sim-success-text">✅ SISTEMA CONFIGURADO. Falta apenas a taxa de ativação.</p>
                  <button className="sim-cta" onClick={handleCheckout}>
                    GERAR MINHA CHAVE VITALÍCIA (R$ 9,97)
                  </button>
                  <span className="sim-footer">🔒 Acesso Vitalício • Liberação Imediata no E-mail</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-root {
          padding: clamp(100px, 14vw, 160px) 0 clamp(60px, 8vw, 100px);
          position: relative;
          overflow: hidden;
        }
        .hero-root::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(0,255,65,.06), transparent 70%);
          pointer-events: none;
        }

        .hero-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 980px) {
          .hero-split { grid-template-columns: 1fr; gap: 36px; }
        }

        /* LEFT */
        .hero-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        @media (max-width: 980px) {
          .hero-left { align-items: center; text-align: center; }
          .hero-checks { align-items: center; }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(0,255,65,.06);
          border: 1px solid rgba(0,255,65,.2);
          font-size: 12px;
          font-weight: 800;
          color: var(--neon);
          letter-spacing: .5px;
          margin-bottom: 20px;
        }
        .hero-badge-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--neon);
          box-shadow: 0 0 12px rgba(0,255,65,.6);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 4px rgba(0,255,65,.4); }
          50% { box-shadow: 0 0 16px rgba(0,255,65,.8); }
        }

        .hero-h1 {
          font-size: clamp(30px, 4.5vw, 50px);
          font-weight: 950;
          color: #fff;
          line-height: 1.08;
          letter-spacing: -2px;
          margin: 0 0 18px;
        }

        .hero-sub {
          font-size: 17px;
          color: rgba(255,255,255,.75);
          line-height: 1.65;
          margin: 0 0 24px;
          max-width: 480px;
          font-weight: 500;
        }
        @media (max-width: 640px) {
          .hero-sub { font-size: 15px; }
        }

        .hero-checks {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }
        .hero-check {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 700;
          color: rgba(255,255,255,.9);
        }
        .hc-icon {
          width: 22px; height: 22px; border-radius: 6px;
          background: rgba(0,255,65,.15);
          border: 1px solid rgba(0,255,65,.3);
          color: var(--neon);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 900;
        }

        .hero-arrow-text {
          font-size: 14px;
          font-weight: 800;
          color: var(--neon);
          margin: 0 0 24px;
          letter-spacing: .3px;
        }
        @media (max-width: 980px) {
          .hero-arrow-text { display: none; }
        }

        .hero-social {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hero-avatars { display: flex; }
        .hero-avatars img {
          width: 32px; height: 32px; border-radius: 50%;
          border: 2px solid var(--bg, #030303);
          object-fit: cover; margin-left: -10px;
        }
        .hero-avatars img:first-child { margin-left: 0; }
        .hero-social-text { display: flex; flex-direction: column; gap: 1px; }
        .hero-stars { color: var(--neon); font-size: 12px; letter-spacing: 1px; }
        .hero-count { font-size: 12px; font-weight: 700; color: rgba(255,255,255,.7); }

        /* RIGHT - Simulator */
        .hero-right { display: flex; justify-content: center; }

        .sim-card {
          width: 100%;
          max-width: 440px;
          background: #121212;
          border: 1px solid #222;
          border-radius: 20px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: box-shadow .5s ease, border-color .5s ease;
        }
        .sim-card.sim-complete {
          border-color: rgba(0,255,65,.5);
          box-shadow: 0 0 30px rgba(0,255,65,.2), 0 0 60px rgba(0,255,65,.08);
        }

        /* Progress */
        .sim-progress-wrap { display: flex; flex-direction: column; gap: 8px; }
        .sim-progress-label {
          display: flex; justify-content: space-between;
          font-size: 12px; font-weight: 700; color: rgba(255,255,255,.6);
          text-transform: uppercase; letter-spacing: .5px;
        }
        .sim-progress-pct { color: var(--neon); font-weight: 900; }
        .sim-progress-bar {
          height: 6px; background: rgba(255,255,255,.08);
          border-radius: 3px; overflow: hidden;
        }
        .sim-progress-fill {
          height: 100%; background: var(--neon);
          border-radius: 3px;
          transition: width .6s cubic-bezier(.4,0,.2,1);
          box-shadow: 0 0 12px rgba(0,255,65,.4);
        }

        /* Status Rows */
        .sim-statuses { display: flex; flex-direction: column; gap: 0; }
        .sim-status-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .sim-status-row:last-child { border-bottom: none; }
        .sim-status-label {
          font-size: 13px; font-weight: 700; color: rgba(255,255,255,.5);
        }
        .sim-status-value {
          font-size: 13px; font-weight: 800;
          transition: color .3s ease;
        }
        .sim-status-value.inactive { color: #ff4444; }
        .sim-status-value.active { color: var(--neon); }

        /* Loader */
        .sim-loader {
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          padding: 8px 0;
        }
        .sim-loader-bar {
          width: 100%; height: 4px; background: rgba(255,255,255,.08);
          border-radius: 2px; overflow: hidden;
        }
        .sim-loader-fill {
          height: 100%; width: 30%; background: var(--neon);
          border-radius: 2px;
          animation: sim-loading 1s ease-in-out infinite;
        }
        @keyframes sim-loading {
          0% { transform: translateX(-100%); width: 30%; }
          50% { width: 60%; }
          100% { transform: translateX(400%); width: 30%; }
        }
        .sim-loader-text {
          font-size: 12px; color: var(--neon); font-weight: 700;
          font-family: 'Consolas', 'Monaco', monospace;
        }

        /* Buttons */
        .sim-buttons { display: flex; flex-direction: column; gap: 10px; }
        .sim-btn {
          width: 100%; padding: 14px 18px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 12px;
          color: rgba(255,255,255,.4);
          font-size: 13px; font-weight: 800;
          text-transform: uppercase; letter-spacing: .3px;
          cursor: not-allowed;
          transition: all .25s ease;
          font-family: 'Sora', system-ui, sans-serif;
        }
        .sim-btn.current {
          background: var(--neon); color: #000;
          border-color: var(--neon);
          cursor: pointer;
          animation: sim-pulse 2s ease-in-out infinite;
        }
        .sim-btn.current:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,255,65,.4);
        }
        .sim-btn.done {
          background: rgba(0,255,65,.08);
          border-color: rgba(0,255,65,.25);
          color: var(--neon);
          cursor: default;
        }
        @keyframes sim-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,65,.4); }
          50% { box-shadow: 0 0 0 8px rgba(0,255,65,0); }
        }

        /* Success */
        .sim-success {
          display: flex; flex-direction: column; align-items: center;
          gap: 14px; text-align: center;
        }
        .sim-success-text {
          font-size: 15px; font-weight: 800; color: #fff;
          margin: 0; line-height: 1.5;
        }
        .sim-cta {
          width: 100%; padding: 16px 20px;
          background: var(--neon); color: #000;
          border: none; border-radius: 14px;
          font-size: 14px; font-weight: 900;
          text-transform: uppercase; letter-spacing: .3px;
          cursor: pointer;
          transition: all .25s ease;
          animation: sim-pulse 2s ease-in-out infinite;
          font-family: 'Sora', system-ui, sans-serif;
        }
        .sim-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0,255,65,.4);
        }
        .sim-footer {
          font-size: 11px; color: rgba(255,255,255,.45); font-weight: 500;
        }

        @media (max-width: 640px) {
          .hero-h1 { font-size: 28px; letter-spacing: -1.5px; }
          .sim-card { padding: 22px 18px; }
          .sim-btn { padding: 12px 14px; font-size: 12px; }
        }
      `}</style>
    </section>
  );
}
