import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

interface Notification {
  id: number;
  name: string;
  game: string;
  time: string;
}

const NAMES = [
  'Lucas M.', 'Ana C.', 'Pedro H.', 'Mariana S.', 'João V.', 
  'Carla F.', 'Rafael B.', 'Julia P.', 'Thiago R.', 'Beatriz L.',
  'Gabriel A.', 'Fernanda O.', 'Matheus D.', 'Larissa N.', 'Bruno G.'
];

const GAMES = [
  'ELDEN RING', 'Cyberpunk 2077', 'Hogwarts Legacy', 'GTA V',
  'Red Dead Redemption 2', 'God of War', 'The Witcher 3',
  'Baldur\'s Gate 3', 'Resident Evil 4', 'Spider-Man'
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
      game: GAMES[Math.floor(Math.random() * GAMES.length)],
      time: TIMES[Math.floor(Math.random() * TIMES.length)],
    };

    setNotifications(prev => [...prev.slice(-1), newNotif]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
    }, 4000);
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
              <Gamepad2 size={18} />
            </div>
            <div className="notif-content">
              <span className="notif-text">
                <strong>{notif.name}</strong> desbloqueou <strong>{notif.game}</strong>
              </span>
              <span className="notif-time">{notif.time}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <style>{`
        .notifications-container {
          position: fixed;
          bottom: 20px;
          left: 20px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 8px;
          pointer-events: none;
        }
        @media (max-width: 640px) {
          .notifications-container {
            left: 10px;
            right: 10px;
            bottom: 10px;
          }
        }
        
        .notification {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: rgba(8, 8, 8, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          backdrop-filter: blur(12px);
          pointer-events: auto;
          max-width: 280px;
        }
        @media (max-width: 640px) {
          .notification {
            max-width: 100%;
            padding: 8px 12px;
            gap: 8px;
          }
        }
        
        .notif-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(0, 255, 65, 0.15);
          color: var(--neon);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .notif-icon {
            width: 28px;
            height: 28px;
          }
          .notif-icon svg {
            width: 14px;
            height: 14px;
          }
        }
        
        .notif-content {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
        }
        
        .notif-text {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 500;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 640px) {
          .notif-text {
            font-size: 11px;
          }
        }
        .notif-text strong {
          color: #fff;
          font-weight: 700;
        }
        
        .notif-time {
          font-size: 10px;
          color: var(--neon);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        @media (max-width: 640px) {
          .notif-time {
            font-size: 9px;
          }
        }
      `}</style>
    </div>
  );
}
