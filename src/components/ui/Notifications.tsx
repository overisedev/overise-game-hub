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
          bottom: 16px;
          left: 16px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 6px;
          pointer-events: none;
        }
        @media (max-width: 640px) {
          .notifications-container {
            left: 8px;
            right: auto;
            bottom: 8px;
          }
        }
        
        .notification {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(12, 12, 12, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          backdrop-filter: blur(10px);
          pointer-events: auto;
          max-width: 240px;
        }
        @media (max-width: 640px) {
          .notification {
            max-width: 200px;
            padding: 6px 10px;
            gap: 6px;
            border-radius: 6px;
          }
        }
        
        .notif-icon {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          background: rgba(0, 255, 65, 0.12);
          color: var(--neon);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .notif-icon {
            width: 22px;
            height: 22px;
            border-radius: 5px;
          }
          .notif-icon svg {
            width: 12px;
            height: 12px;
          }
        }
        
        .notif-content {
          display: flex;
          flex-direction: column;
          gap: 0;
          min-width: 0;
        }
        
        .notif-text {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 640px) {
          .notif-text {
            font-size: 10px;
          }
        }
        .notif-text strong {
          color: #fff;
          font-weight: 600;
        }
        
        .notif-time {
          font-size: 9px;
          color: var(--neon);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2px;
          opacity: 0.9;
        }
        @media (max-width: 640px) {
          .notif-time {
            font-size: 8px;
          }
        }
      `}</style>
    </div>
  );
}
