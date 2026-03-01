import { useState, useEffect, useCallback } from 'react';

const LOADING_MESSAGES = [
  'Verificando compatibilidade do sistema...',
  'Conectando aos servidores Steam...',
  'Preparando arquivos de instalação...',
  'Validando requisitos mínimos...',
  'Configurando ambiente de download...',
  'Finalizando preparação...',
];

function getUTMParams(): string {
  const params = new URLSearchParams(window.location.search);
  const utmParams = new URLSearchParams();
  const utmKeys = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term',
    'utm_content', 'utm_id', 'fbclid', 'gclid', 'ttclid', 'sck', 'src',
  ];
  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) utmParams.append(key, value);
  });
  try {
    const storedUtms = localStorage.getItem('__utmify_session_data');
    if (storedUtms) {
      const parsed = JSON.parse(storedUtms);
      if (parsed.utm_source && !utmParams.has('utm_source')) utmParams.append('utm_source', parsed.utm_source);
      if (parsed.utm_medium && !utmParams.has('utm_medium')) utmParams.append('utm_medium', parsed.utm_medium);
      if (parsed.utm_campaign && !utmParams.has('utm_campaign')) utmParams.append('utm_campaign', parsed.utm_campaign);
    }
  } catch (e) {}
  return utmParams.toString();
}

const CHECKOUT_URL = 'https://www.ggcheckout.com/checkout/v5/6Ed9FJE8HXebnxREUKCQ';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [phase, setPhase] = useState<'loading' | 'paywall'>('loading');
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setPhase('loading');
      setProgress(0);
      setMessageIndex(0);
    }
  }, [isOpen]);

  // Progress animation
  useEffect(() => {
    if (!isOpen || phase !== 'loading') return;

    const duration = 3000;
    const interval = 30;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const newProgress = Math.min(100, Math.round((step / steps) * 100));
      setProgress(newProgress);

      // Update message based on progress
      const msgIdx = Math.min(
        Math.floor((newProgress / 100) * LOADING_MESSAGES.length),
        LOADING_MESSAGES.length - 1
      );
      setMessageIndex(msgIdx);

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => setPhase('paywall'), 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, phase]);

  const handleCheckout = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Licença Overise',
        value: 9.97,
        currency: 'BRL',
      });
    }
    const utmString = getUTMParams();
    const separator = CHECKOUT_URL.includes('?') ? '&' : '?';
    const finalUrl = utmString ? `${CHECKOUT_URL}${separator}${utmString}` : CHECKOUT_URL;
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  }, []);

  if (!isOpen) return null;

  return (
    <div className="dl-backdrop" onClick={onClose}>
      <div className="dl-modal" onClick={(e) => e.stopPropagation()}>
        <button className="dl-close" onClick={onClose} aria-label="Fechar modal">✕</button>

        {phase === 'loading' ? (
          <div className="dl-loading">
            {/* Animated Icon */}
            <div className="dl-icon-wrap">
              <div className="dl-spinner" />
              <svg className="dl-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--neon)" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </div>

            <h3 className="dl-title">Preparando Download</h3>
            <p className="dl-message">{LOADING_MESSAGES[messageIndex]}</p>

            {/* Progress Bar */}
            <div className="dl-progress-track">
              <div
                className="dl-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="dl-percent">{progress}%</span>
          </div>
        ) : (
          <div className="dl-paywall">
            {/* Success Icon */}
            <div className="dl-success-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                <path d="M5 12l5 5L20 7" />
              </svg>
            </div>

            <h3 className="dl-title">Sistema Compatível</h3>
            <p className="dl-compat-info">Windows 10/11 • DirectX 12 • Verificado</p>

            <div className="dl-divider" />

            <p className="dl-paywall-text">
              Para concluir a instalação e baixar os jogos, é necessária uma <strong>Licença de Acesso</strong>.
            </p>

            {/* Price Anchor */}
            <div className="dl-price-box">
              <span className="dl-price-from">De <s>R$ 39,90</s></span>
              <div className="dl-price-main">
                <span className="dl-currency">R$</span>
                <span className="dl-value">9</span>
                <span className="dl-cents">,97</span>
              </div>
              <span className="dl-price-label">Taxa Única • Acesso Vitalício</span>
            </div>

            {/* CTA */}
            <button className="dl-cta" onClick={handleCheckout}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Gerar Licença e Baixar
            </button>

            {/* Trust */}
            <div className="dl-trust">
              <span>🔒 Pagamento seguro</span>
              <span>⚡ Acesso instantâneo</span>
              <span>✓ Garantia 7 dias</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .dl-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.75);
          backdrop-filter: blur(12px);
          display: grid;
          place-items: center;
          z-index: 9999;
          padding: 20px;
          animation: dlFadeIn .2s ease;
        }
        @keyframes dlFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .dl-modal {
          position: relative;
          width: min(440px, 100%);
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,.12);
          background: linear-gradient(180deg, rgba(12,12,12,.98) 0%, rgba(5,5,5,1) 100%);
          box-shadow: 0 40px 100px rgba(0,0,0,.7), 0 0 60px rgba(0,255,65,.06);
          overflow: hidden;
          animation: dlSlideIn .3s cubic-bezier(.22,.9,.22,1);
        }
        @keyframes dlSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .dl-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(0,0,0,.4);
          color: #fff;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: .2s ease;
          z-index: 5;
          font-size: 14px;
        }
        .dl-close:hover {
          border-color: rgba(255,255,255,.25);
        }

        /* Loading Phase */
        .dl-loading {
          padding: 48px 32px 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .dl-icon-wrap {
          position: relative;
          width: 72px;
          height: 72px;
          display: grid;
          place-items: center;
          margin-bottom: 24px;
        }

        .dl-spinner {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(0,255,65,.15);
          border-top-color: var(--neon);
          animation: dlSpin 1s linear infinite;
        }
        @keyframes dlSpin {
          to { transform: rotate(360deg); }
        }

        .dl-icon {
          position: relative;
          z-index: 1;
        }

        .dl-title {
          font-family: 'Sora', sans-serif;
          font-size: 22px;
          font-weight: 950;
          color: #fff;
          margin: 0 0 8px;
          letter-spacing: -.8px;
          text-transform: uppercase;
        }

        .dl-message {
          font-size: 14px;
          color: var(--muted2);
          margin: 0 0 28px;
          font-weight: 600;
          min-height: 20px;
          transition: opacity .15s ease;
        }

        .dl-progress-track {
          width: 100%;
          height: 8px;
          border-radius: 999px;
          background: rgba(255,255,255,.08);
          overflow: hidden;
          margin-bottom: 12px;
        }

        .dl-progress-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--neon), rgba(0,255,65,.7));
          box-shadow: 0 0 16px rgba(0,255,65,.4);
          transition: width .03s linear;
        }

        .dl-percent {
          font-size: 13px;
          font-weight: 800;
          color: var(--neon);
          letter-spacing: 1px;
        }

        /* Paywall Phase */
        .dl-paywall {
          padding: 44px 32px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          animation: dlFadeIn .4s ease;
        }

        .dl-success-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--neon);
          display: grid;
          place-items: center;
          margin-bottom: 16px;
          box-shadow: 0 0 30px rgba(0,255,65,.35);
        }

        .dl-compat-info {
          font-size: 12px;
          font-weight: 700;
          color: var(--neon);
          margin: 0 0 20px;
          letter-spacing: .5px;
          text-transform: uppercase;
        }

        .dl-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
          margin-bottom: 20px;
        }

        .dl-paywall-text {
          font-size: 15px;
          color: rgba(255,255,255,.8);
          line-height: 1.6;
          margin: 0 0 24px;
          font-weight: 500;
        }
        .dl-paywall-text strong {
          color: var(--neon);
          font-weight: 800;
        }

        .dl-price-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin-bottom: 24px;
        }

        .dl-price-from {
          font-size: 14px;
          color: rgba(255,255,255,.5);
          font-weight: 600;
        }
        .dl-price-from s {
          text-decoration: line-through;
          color: rgba(255,255,255,.4);
        }

        .dl-price-main {
          display: flex;
          align-items: flex-start;
          line-height: 1;
        }

        .dl-currency {
          font-size: 20px;
          font-weight: 800;
          color: var(--neon);
          margin-top: 14px;
          margin-right: 4px;
        }

        .dl-value {
          font-family: 'Sora', sans-serif;
          font-size: 72px;
          font-weight: 900;
          color: #fff;
          letter-spacing: -3px;
          filter: drop-shadow(0 0 30px rgba(0,255,65,.15));
        }

        .dl-cents {
          font-size: 28px;
          font-weight: 800;
          color: #fff;
          margin-top: 16px;
        }

        .dl-price-label {
          font-size: 11px;
          font-weight: 800;
          color: var(--neon);
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .dl-cta {
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
          box-shadow: 0 8px 30px rgba(0,255,65,.3);
        }
        .dl-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 45px rgba(0,255,65,.45);
        }

        .dl-trust {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
          margin-top: 16px;
        }
        .dl-trust span {
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,.6);
        }

        @media (max-width: 480px) {
          .dl-loading, .dl-paywall {
            padding: 40px 20px 28px;
          }
          .dl-value {
            font-size: 60px;
          }
          .dl-trust {
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}
