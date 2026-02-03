import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function ScarcityBadge() {
  const [units, setUnits] = useState(12);

  // Occasionally decrease units for urgency effect
  useEffect(() => {
    const interval = setInterval(() => {
      setUnits(prev => {
        if (prev > 3) {
          if (Math.random() > 0.7) {
            return prev - 1;
          }
        }
        return prev;
      });
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="scarcity-badge"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <div className="scarcity-icon">
        <Zap size={14} />
      </div>
      <span className="scarcity-text">
        APENAS <strong>{units} UNIDADES</strong> RESTANDO HOJE!
      </span>

      <style>{`
        .scarcity-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          background: rgba(0, 255, 65, 0.06);
          border: 1px solid rgba(0, 255, 65, 0.2);
          border-radius: 10px;
        }
        
        .scarcity-icon {
          width: 26px;
          height: 26px;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--neon), #00cc52);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
          flex-shrink: 0;
        }
        
        .scarcity-text {
          font-size: 12px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .scarcity-text strong {
          color: var(--neon);
          font-weight: 900;
        }
        
        @media (max-width: 640px) {
          .scarcity-badge {
            padding: 8px 14px;
            gap: 8px;
          }
          
          .scarcity-icon {
            width: 22px;
            height: 22px;
          }
          
          .scarcity-icon svg {
            width: 12px;
            height: 12px;
          }
          
          .scarcity-text {
            font-size: 10px;
          }
        }
      `}</style>
    </motion.div>
  );
}
