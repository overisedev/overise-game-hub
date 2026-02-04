import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer } from 'lucide-react';

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
          {/* Gradient glow effect */}
          <div className="urgency-glow" />
          
          <div className="urgency-content">
            <div className="urgency-left">
              <div className="urgency-badge">
                <Timer size={14} />
                <span>OFERTA LIMITADA</span>
              </div>
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
              background: linear-gradient(90deg, 
                rgba(0, 30, 10, 0.98) 0%,
                rgba(5, 5, 5, 0.98) 50%,
                rgba(0, 30, 10, 0.98) 100%
              );
              border-bottom: 1px solid rgba(0, 255, 65, 0.25);
              padding: 10px 20px;
              backdrop-filter: blur(12px);
              overflow: hidden;
            }
            
            .urgency-glow {
              position: absolute;
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 600px;
              height: 100%;
              background: radial-gradient(ellipse at center, rgba(0, 255, 65, 0.08) 0%, transparent 70%);
              pointer-events: none;
            }
            
            .urgency-content {
              max-width: 1200px;
              margin: 0 auto;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 20px;
              position: relative;
              z-index: 1;
            }
            
            .urgency-left {
              display: flex;
              align-items: center;
              gap: 14px;
            }
            
            .urgency-badge {
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 6px 12px;
              border-radius: 8px;
              background: linear-gradient(135deg, rgba(0, 255, 65, 0.2), rgba(0, 255, 65, 0.05));
              border: 1px solid rgba(0, 255, 65, 0.35);
              color: var(--neon);
              font-size: 11px;
              font-weight: 900;
              letter-spacing: 0.5px;
              box-shadow: 0 0 20px rgba(0, 255, 65, 0.15);
            }
            
            .urgency-text {
              font-size: 13px;
              font-weight: 600;
              color: rgba(255, 255, 255, 0.75);
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
              background: rgba(0, 0, 0, 0.5);
              padding: 8px 16px;
              border-radius: 8px;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .urgency-timer span {
              font-size: 16px;
              font-weight: 900;
              color: #fff;
              font-family: monospace;
              letter-spacing: 2px;
            }
            
            .urgency-cta {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              padding: 10px 20px;
              border-radius: 10px;
              background: var(--neon);
              color: #000;
              font-weight: 900;
              font-size: 12px;
              text-transform: uppercase;
              text-decoration: none;
              letter-spacing: 0.5px;
              transition: all 0.2s ease;
              box-shadow: 0 0 25px rgba(0, 255, 65, 0.3);
            }
            
            .urgency-cta:hover {
              box-shadow: 0 0 35px rgba(0, 255, 65, 0.5);
              transform: translateY(-1px);
            }
            
            @media (max-width: 768px) {
              .urgency-text {
                display: none;
              }
              
              .urgency-badge span {
                display: none;
              }
              
              .urgency-badge {
                padding: 6px 8px;
              }
            }
            
            @media (max-width: 540px) {
              .urgency-bar {
                padding: 8px 12px;
              }
              
              .urgency-timer {
                padding: 6px 12px;
              }
              
              .urgency-timer span {
                font-size: 14px;
              }
              
              .urgency-cta {
                padding: 8px 14px;
                font-size: 11px;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
