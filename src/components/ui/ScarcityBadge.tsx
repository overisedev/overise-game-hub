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
          // Random chance to decrease
          if (Math.random() > 0.7) {
            return prev - 1;
          }
        }
        return prev;
      });
    }, 45000); // Check every 45 seconds

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
        <Zap size={16} />
      </div>
      <span className="scarcity-text">
        APENAS <strong>{units} UNIDADES</strong> RESTANDO HOJE!
      </span>

      <style>{`
        .scarcity-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 100%);
          border: 1px solid rgba(138, 43, 226, 0.4);
          border-radius: 50px;
          box-shadow: 0 4px 20px rgba(138, 43, 226, 0.2);
        }
        
        .scarcity-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffd700, #ffaa00);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a0a2e;
          flex-shrink: 0;
        }
        
        .scarcity-text {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .scarcity-text strong {
          color: #ffd700;
          font-weight: 900;
        }
        
        @media (max-width: 640px) {
          .scarcity-badge {
            padding: 10px 16px;
            gap: 8px;
          }
          
          .scarcity-icon {
            width: 24px;
            height: 24px;
          }
          
          .scarcity-icon svg {
            width: 14px;
            height: 14px;
          }
          
          .scarcity-text {
            font-size: 11px;
          }
        }
      `}</style>
    </motion.div>
  );
}
