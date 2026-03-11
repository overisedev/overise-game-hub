import { useState, useEffect } from 'react';

const NAMES = ['Lucas M.','Maicon R.','Gabriel S.','Thiago L.','Pedro H.','Rafael C.','Diego F.','Bruno A.','Matheus P.','Caio V.'];
const CITIES = ['São Paulo','Curitiba','Belo Horizonte','Porto Alegre','Recife','Fortaleza','Salvador','Rio de Janeiro'];
const MSGS = ['desbloqueou a biblioteca completa','ativou a licença vitalícia','já está baixando jogos','garantiu o acesso agora'];

export function BuyNotification() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setName(NAMES[Math.floor(Math.random() * NAMES.length)] + ' — ' + CITIES[Math.floor(Math.random() * CITIES.length)]);
      setMsg(MSGS[Math.floor(Math.random() * MSGS.length)]);
      setShow(true);
      setTimeout(() => setShow(false), 5000);
    }, 8000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className={`buy-notif ${show ? 'show' : ''}`}>
        <div className="bn-icon">✔</div>
        <div className="bn-body">
          <div className="bn-header"><span className="bn-app">Overise</span><span className="bn-time">agora</span></div>
          <strong className="bn-name">{name}</strong>
          <div className="bn-msg">{msg}</div>
        </div>
      </div>
      <style>{`
        .buy-notif { position: fixed; bottom: 18px; left: 18px; z-index: 299; background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 12px 16px; box-shadow: 0 8px 32px rgba(0,0,0,.6); transform: translateX(-130%); transition: transform .4s cubic-bezier(.23,1,.32,1); max-width: 280px; pointer-events: none; display: flex; align-items: flex-start; gap: 10px; backdrop-filter: blur(16px); }
        .buy-notif.show { transform: translateX(0); }
        .bn-icon { width: 32px; height: 32px; border-radius: 8px; background: var(--accent-dim); border: 1px solid rgba(57,255,20,.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 16px; }
        .bn-body { flex: 1; min-width: 0; }
        .bn-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px; }
        .bn-app { font-family: var(--fh); font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--accent); }
        .bn-time { font-size: 10px; color: var(--dim); }
        .bn-name { font-family: var(--fh); font-size: 12px; font-weight: 700; color: #fff; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .bn-msg { font-size: 11px; color: var(--muted); margin-top: 1px; line-height: 1.35; }
      `}</style>
    </>
  );
}
