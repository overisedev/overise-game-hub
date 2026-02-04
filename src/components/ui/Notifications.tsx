import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface Notification {
  id: number;
  name: string;
  plan: string;
  time: string;
}

const NAMES = [
  'Lucas M.', 'Ana C.', 'Pedro H.', 'Mariana S.', 'João V.', 
  'Carla F.', 'Rafael B.', 'Julia P.', 'Thiago R.', 'Beatriz L.',
  'Gabriel A.', 'Fernanda O.', 'Matheus D.', 'Larissa N.', 'Bruno G.'
];

const PLANS = [
  'Plano Básico',
  'Plano Avançado', 
  'Plano Vitalício'
];

const TIMES = ['agora', 'há 1 min', 'há 2 min', 'há 3 min'];

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      addNotification();
    }, 5000);

    const interval = setInterval(() => {
      addNotification();
    }, 18000 + Math.random() * 12000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const addNotification = () => {
    const newNotif: Notification = {
      id: Date.now(),
      name: NAMES[Math.floor(Math.random() * NAMES.length)],
      plan: PLANS[Math.floor(Math.random() * PLANS.length)],
      time: TIMES[Math.floor(Math.random() * TIMES.length)],
    };

    setNotifications(prev => [...prev.slice(-1), newNotif]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
    }, 4500);
  };

  return (
    <div className="notifications-container">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            className="notification"
            initial={{ opacity: 0, x: -100, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="notif-icon">
              <ShoppingBag size={18} />
            </div>
            <div className="notif-content">
              <span className="notif-text">
                <strong>{notif.name}</strong> adquiriu o <strong>{notif.plan}</strong>
              </span>
              <span className="notif-time">{notif.time}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <style>{`
        .notifications-container {
          position: fixed;
          bottom: 100px;
          left: 20px;
          z-index: 800;
          display: flex;
          flex-direction: column;
          gap: 8px;
          pointer-events: none;
        }
        @media (max-width: 640px) {
          .notifications-container {
            left: 12px;
            right: 90px;
            bottom: 100px;
          }
        }
        
        .notification {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          background: rgba(8, 8, 8, 0.98);
          border: 1px solid rgba(0, 255, 65, 0.2);
          border-radius: 14px;
          backdrop-filter: blur(12px);
          pointer-events: auto;
          max-width: 320px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
        }
        @media (max-width: 640px) {
          .notification {
            max-width: 100%;
            padding: 12px 14px;
            gap: 10px;
            border-radius: 12px;
          }
        }
        
        .notif-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(0, 255, 65, 0.2), rgba(0, 255, 65, 0.08));
          color: var(--neon);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.15);
        }
        @media (max-width: 640px) {
          .notif-icon {
            width: 34px;
            height: 34px;
            border-radius: 8px;
          }
          .notif-icon svg {
            width: 18px;
            height: 18px;
          }
        }
        
        .notif-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        
        .notif-text {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          line-height: 1.3;
        }
        @media (max-width: 640px) {
          .notif-text {
            font-size: 13px;
          }
        }
        .notif-text strong {
          color: #fff;
          font-weight: 700;
        }
        
        .notif-time {
          font-size: 11px;
          color: var(--neon);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          opacity: 0.9;
        }
        @media (max-width: 640px) {
          .notif-time {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}
