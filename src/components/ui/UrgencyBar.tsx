import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

interface UrgencyBarProps {
  isVisible: boolean;
}

export function UrgencyBar({ isVisible }: UrgencyBarProps) {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 14, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="urgency-bar"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <div className="urgency-content">
            <div className="urgency-left">
              <div className="urgency-icon">
                <Clock size={16} />
              </div>
              <span className="urgency-label">OFERTA LIMITADA</span>
              <span className="urgency-text">Preço promocional termina em:</span>
            </div>
            
            <div className="urgency-right">
              <div className="urgency-timer">
                <span>{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</span>
              </div>
              
              <a href="#planos" className="urgency-cta">
                Aproveitar
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

          <style>{`
            .urgency-bar {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              z-index: 1001;
              background: rgba(8, 8, 8, 0.95);
              border-bottom: 1px solid rgba(0, 255, 65, 0.15);
              padding: 10px 20px;
              backdrop-filter: blur(12px);
            }
            
            .urgency-content {
              max-width: 1200px;
              margin: 0 auto;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 20px;
            }
            
            .urgency-left {
              display: flex;
              align-items: center;
              gap: 12px;
            }
            
            .urgency-icon {
              width: 28px;
              height: 28px;
              border-radius: 8px;
              background: rgba(0, 255, 65, 0.1);
              border: 1px solid rgba(0, 255, 65, 0.25);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--neon);
            }
            
            .urgency-label {
              font-size: 11px;
              font-weight: 800;
              color: var(--neon);
              letter-spacing: 0.5px;
            }
            
            .urgency-text {
              font-size: 13px;
              font-weight: 600;
              color: rgba(255, 255, 255, 0.7);
            }
            
            .urgency-right {
              display: flex;
              align-items: center;
              gap: 12px;
            }
            
            .urgency-timer {
              display: flex;
              align-items: center;
              gap: 6px;
              background: rgba(0, 255, 65, 0.08);
              padding: 8px 14px;
              border-radius: 8px;
              border: 1px solid rgba(0, 255, 65, 0.2);
            }
            
            .urgency-timer span {
              font-size: 15px;
              font-weight: 900;
              color: var(--neon);
              font-family: monospace;
              letter-spacing: 1px;
            }
            
            .urgency-cta {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              padding: 8px 16px;
              border-radius: 8px;
              background: var(--neon);
              color: #000;
              font-weight: 800;
              font-size: 12px;
              text-transform: uppercase;
              text-decoration: none;
              letter-spacing: 0.3px;
              transition: all 0.2s ease;
            }
            
            .urgency-cta:hover {
              box-shadow: 0 8px 25px rgba(0, 255, 65, 0.3);
              transform: translateY(-1px);
            }
            
            @media (max-width: 768px) {
              .urgency-label {
                display: none;
              }
              
              .urgency-text {
                font-size: 11px;
              }
              
              .urgency-icon {
                width: 24px;
                height: 24px;
              }
            }
            
            @media (max-width: 540px) {
              .urgency-bar {
                padding: 8px 12px;
              }
              
              .urgency-text {
                display: none;
              }
              
              .urgency-left::after {
                content: 'Termina em:';
                font-size: 11px;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.7);
              }
              
              .urgency-timer {
                padding: 6px 10px;
              }
              
              .urgency-timer span {
                font-size: 13px;
              }
              
              .urgency-cta {
                padding: 6px 12px;
                font-size: 11px;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
