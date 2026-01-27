import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [notifId, setNotifId] = useState(0);

  useEffect(() => {
    // Primeira notificação após 5s
    const initialTimeout = setTimeout(() => {
      addNotification();
    }, 5000);

    // Notificações a cada 15-25s
    const interval = setInterval(() => {
      addNotification();
    }, 15000 + Math.random() * 10000);

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

    setNotifications(prev => [...prev.slice(-2), newNotif]);
    setNotifId(prev => prev + 1);

    // Remove após 4s
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
            <div className="notif-icon">🎮</div>
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
          bottom: 24px;
          left: 24px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
        }
        @media (max-width: 640px) {
          .notifications-container {
            left: 12px;
            right: 12px;
            bottom: 12px;
          }
        }
        
        .notification {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          background: rgba(10, 10, 10, 0.95);
          border: 1px solid rgba(0, 255, 65, 0.25);
          border-radius: 14px;
          backdrop-filter: blur(20px);
          pointer-events: auto;
          max-width: 340px;
        }
        @media (max-width: 640px) {
          .notification {
            max-width: 100%;
            padding: 12px 14px;
          }
        }
        
        .notif-icon {
          font-size: 20px;
          flex-shrink: 0;
        }
        
        .notif-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .notif-text {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          line-height: 1.4;
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
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  );
}
