import type { Game } from '@/types/game';

interface GameModalProps {
  game: Game;
  onClose: () => void;
}

export function GameModal({ game, onClose }: GameModalProps) {
  return (
    <div className="backdrop show" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top">
          <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.steam_appid}/library_hero.jpg`} alt={game.name} onError={(e) => { e.currentTarget.src = game.cover; }} />
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div>
            <h2 className="modal-title">{game.name}</h2>
            <p className="modal-desc">Este jogo está disponível na nossa biblioteca oficial. Ao ativar, seu computador irá baixar os arquivos originais diretamente dos servidores da Steam. Isso garante que você tenha a versão mais atualizada, livre de vírus e com desempenho máximo. É o jogo oficial pronto para rodar.</p>
          </div>
          <div className="modal-side">
            <div className="row"><span>Origem</span><b>Servidor Oficial Steam</b></div>
            <div className="row"><span>Segurança</span><b style={{ color: 'var(--neon)' }}>100% Verificado</b></div>
            <div className="modal-btns">
              <a href="#planos" className="btn btn-primary-full" onClick={onClose}>Baixar Versão Original</a>
            </div>
          </div>
        </div>
      </div>
      <style>{`.backdrop{position:fixed;inset:0;background:rgba(0,0,0,.68);backdrop-filter:blur(10px);display:grid;place-items:center;z-index:2000;padding:18px}.modal{width:min(980px,100%);border-radius:26px;border:1px solid rgba(255,255,255,.12);background:rgba(10,10,10,.92);box-shadow:var(--shadow);overflow:hidden;animation:floatIn .25s ease both}.modal-top{position:relative;height:clamp(240px,32vw,360px);background:#000;overflow:hidden}.modal-top img{width:100%;height:100%;object-fit:cover;transform:scale(1.03);filter:saturate(1.18) contrast(1.14)}.modal-top::after{content:"";position:absolute;inset:0;background:radial-gradient(900px 380px at 18% 28%,rgba(0,255,65,.10),transparent 58%),linear-gradient(to top,rgba(0,0,0,.82),rgba(0,0,0,.10))}.modal-close{position:absolute;top:14px;right:14px;width:42px;height:42px;border-radius:14px;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.35);color:#fff;cursor:pointer;display:grid;place-items:center;transition:.2s ease;z-index:5}.modal-close:hover{border-color:rgba(255,255,255,.22)}.modal-body{padding:24px;display:grid;grid-template-columns:1.2fr .8fr;gap:20px;align-items:start}@media(max-width:980px){.modal-body{grid-template-columns:1fr}}.modal-title{font-weight:950;font-size:22px;letter-spacing:-.8px;text-transform:uppercase;color:#fff;margin:0 0 10px}.modal-desc{color:var(--muted);line-height:1.75;font-size:14px;margin:0}.modal-side{border-radius:18px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);padding:16px}.row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.06);color:#d9d9d9;font-weight:850;font-size:13px}.row:last-of-type{border-bottom:0}.row span{color:var(--muted2);font-weight:800}.modal-btns{display:flex;gap:10px;margin-top:12px}.btn-primary-full{width:100%;background:linear-gradient(180deg,rgba(0,255,65,.95),rgba(0,200,55,.85));color:#000;border-color:rgba(0,255,65,.55);padding:12px 18px;border-radius:14px;font-weight:950;text-transform:uppercase;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;transition:.22s ease}.btn-primary-full:hover{box-shadow:0 18px 60px rgba(0,255,65,.15)}`}</style>
    </div>
  );
}