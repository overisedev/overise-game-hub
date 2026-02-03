import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

export function UrgencyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  // Show bar after scrolling past hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.8;
      setIsVisible(scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          // Reset timer when it reaches 0
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
                <Clock size={18} />
              </div>
              <span className="urgency-label">OFERTA EXCLUSIVA</span>
              <span className="urgency-text">PREÇO PROMOCIONAL TERMINA EM:</span>
            </div>
            
            <div className="urgency-right">
              <div className="urgency-timer">
                <Clock size={14} />
                <span>{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</span>
              </div>
              
              <a href="#planos" className="urgency-cta">
                Aproveitar Agora
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
              background: linear-gradient(90deg, #1a0a2e 0%, #2d1b4e 30%, #4a2c7a 50%, #2d1b4e 70%, #1a0a2e 100%);
              border-bottom: 1px solid rgba(138, 43, 226, 0.3);
              padding: 10px 20px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
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
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: rgba(138, 43, 226, 0.3);
              border: 1px solid rgba(138, 43, 226, 0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              color: #c4a7e7;
            }
            
            .urgency-label {
              font-size: 11px;
              font-weight: 800;
              color: #fff;
              background: rgba(255, 255, 255, 0.1);
              padding: 4px 10px;
              border-radius: 4px;
              letter-spacing: 0.5px;
            }
            
            .urgency-text {
              font-size: 13px;
              font-weight: 700;
              color: #ff6b9d;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .urgency-right {
              display: flex;
              align-items: center;
              gap: 16px;
            }
            
            .urgency-timer {
              display: flex;
              align-items: center;
              gap: 6px;
              background: rgba(0, 0, 0, 0.4);
              padding: 8px 14px;
              border-radius: 8px;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .urgency-timer svg {
              color: var(--neon);
            }
            
            .urgency-timer span {
              font-size: 16px;
              font-weight: 900;
              color: #fff;
              font-family: monospace;
              letter-spacing: 1px;
            }
            
            .urgency-cta {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              padding: 10px 20px;
              border-radius: 8px;
              background: #fff;
              color: #000;
              font-weight: 800;
              font-size: 12px;
              text-transform: uppercase;
              text-decoration: none;
              letter-spacing: 0.3px;
              transition: all 0.2s ease;
            }
            
            .urgency-cta:hover {
              background: var(--neon);
              transform: scale(1.02);
            }
            
            .urgency-cta svg {
              color: currentColor;
            }
            
            @media (max-width: 900px) {
              .urgency-label,
              .urgency-text {
                display: none;
              }
              
              .urgency-left {
                gap: 8px;
              }
              
              .urgency-icon {
                width: 28px;
                height: 28px;
              }
              
              .urgency-left::after {
                content: 'OFERTA TERMINA EM:';
                font-size: 11px;
                font-weight: 700;
                color: #ff6b9d;
              }
            }
            
            @media (max-width: 640px) {
              .urgency-bar {
                padding: 8px 12px;
              }
              
              .urgency-content {
                gap: 10px;
              }
              
              .urgency-icon {
                display: none;
              }
              
              .urgency-left::after {
                content: 'TERMINA EM:';
                font-size: 10px;
              }
              
              .urgency-timer {
                padding: 6px 10px;
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
