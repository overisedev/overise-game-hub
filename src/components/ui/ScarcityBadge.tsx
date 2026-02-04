import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export function ScarcityBadge() {
  const [users, setUsers] = useState(47);

  // Occasionally change active users for live effect
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = prev + change;
        return Math.max(32, Math.min(58, newValue));
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="scarcity-badge"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <div className="scarcity-dot" />
      <span className="scarcity-text">
        <strong>{users} pessoas</strong> estão acessando agora
      </span>

      <style>{`
        .scarcity-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
        }
        
        .scarcity-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--neon);
          box-shadow: 0 0 12px rgba(0, 255, 65, 0.6);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        .scarcity-text {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .scarcity-text strong {
          color: #fff;
          font-weight: 700;
        }
        
        @media (max-width: 640px) {
          .scarcity-badge {
            padding: 8px 12px;
            gap: 8px;
          }
          
          .scarcity-dot {
            width: 6px;
            height: 6px;
          }
          
          .scarcity-text {
            font-size: 11px;
          }
        }
      `}</style>
    </motion.div>
  );
}
