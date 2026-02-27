import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import type { Game } from '@/types/game';

const STEAM_PRICES: Record<number, number> = {
  1245620: 249.90, 1174180: 199.90, 1091500: 199.90, 1593500: 249.90,
  814380: 199.90, 1938010: 249.90, 292030: 79.99, 1551360: 249.90,
  374320: 99.99, 367520: 149.90, 1568590: 149.90, 1085660: 179.90,
  271590: 89.99, 2358720: 299.90, 418370: 99.90, 883710: 199.90,
  1196590: 249.90, 1151640: 249.90, 1222670: 99.90,
};

function getPrice(game: Game): number {
  return STEAM_PRICES[game.steam_appid] || 149.90;
}

function fmt(val: number): string {
  return `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

interface SimulatorSectionProps {
  games: Game[];
}

type JourneyTask = 'activated' | 'searched' | 'installed';

const CATEGORIES_LIST = ['Todos', 'AÇÃO', 'RPG', 'AVENTURA', 'TERROR', 'FPS', 'SOBREVIVÊNCIA'];

export function SimulatorSection({ games }: SimulatorSectionProps) {
  const [appOn, setAppOn] = useState(false);
  const [category, setCategory] = useState('Todos');
  const [query, setQuery] = useState('');
  const [installedGames, setInstalledGames] = useState<Set<number>>(new Set());
  const [journeyTasks, setJourneyTasks] = useState<Record<JourneyTask, boolean>>({
    activated: false,
    searched: false,
    installed: false,
  });
  const [installModal, setInstallModal] = useState<Game | null>(null);
  const [installProgress, setInstallProgress] = useState(0);
  const [installing, setInstalling] = useState(false);
  const [installComplete, setInstallComplete] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);
  const installTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const INSTALL_STEPS = ['Verificando acesso...', 'Conectando aos servidores...', 'Baixando arquivos...', 'Descomprimindo dados...', 'Instalando jogo...', 'Finalizando...'];

  const completeTask = useCallback((task: JourneyTask) => {
    setJourneyTasks(prev => {
      if (prev[task]) return prev;
      return { ...prev, [task]: true };
    });
  }, []);

  const journeyPct = useMemo(() => {
    const done = Object.values(journeyTasks).filter(Boolean).length;
    return Math.round((done / 3) * 100);
  }, [journeyTasks]);

  // Show unlock when 100%
  useEffect(() => {
    if (journeyPct === 100 && !showUnlock) {
      const t = setTimeout(() => setShowUnlock(true), 600);
      return () => clearTimeout(t);
    }
  }, [journeyPct, showUnlock]);

  const filteredGames = useMemo(() => {
    let result = games.filter(g => g.cover);
    if (category !== 'Todos') {
      result = result.filter(g => g.categories.some(c => c.toUpperCase() === category.toUpperCase()));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(g => g.name.toLowerCase().includes(q));
    }
    return result.slice(0, 40);
  }, [games, category, query]);

  const catCounts = useMemo(() => {
    const gamesWithCover = games.filter(g => g.cover);
    const counts: Record<string, number> = { Todos: gamesWithCover.length };
    CATEGORIES_LIST.forEach(c => {
      if (c !== 'Todos') {
        counts[c] = gamesWithCover.filter(g => g.categories.some(cat => cat.toUpperCase() === c.toUpperCase())).length;
      }
    });
    return counts;
  }, [games]);

  const handlePower = () => {
    const next = !appOn;
    setAppOn(next);
    if (next) completeTask('activated');
  };

  const handleSearch = (val: string) => {
    setQuery(val);
    if (val.length >= 2 && !journeyTasks.searched) {
      completeTask('searched');
    }
  };

  const openInstall = (game: Game) => {
    if (!appOn) return;
    if (!journeyTasks.searched) completeTask('searched');
    setInstallModal(game);
    setInstallProgress(0);
    setInstalling(false);
    setInstallComplete(false);
  };

  const startInstall = () => {
    if (!installModal) return;
    setInstalling(true);
    let pct = 0;
    installTimerRef.current = setInterval(() => {
      pct += Math.random() * 4 + 2;
      if (pct >= 100) {
        pct = 100;
        if (installTimerRef.current) clearInterval(installTimerRef.current);
        setInstallComplete(true);
        setInstalling(false);
        setInstalledGames(prev => new Set(prev).add(installModal!.steam_appid));
        completeTask('installed');
      }
      setInstallProgress(Math.min(pct, 100));
    }, 80);
  };

  const closeInstall = () => {
    if (installTimerRef.current) clearInterval(installTimerRef.current);
    setInstallModal(null);
  };

  const installStepIdx = Math.min(
    Math.floor((installProgress / 100) * INSTALL_STEPS.length),
    INSTALL_STEPS.length - 1
  );

  return (
    <section id="simulador" className="section-light section">
      <div className="container-main">
        <div className="sim-intro">
          <span className="sim-eyebrow">Experimente antes de desbloquear</span>
          <h2 className="sim-headline">
            Veja como é ter<br /><em>acesso de verdade</em>
          </h2>
          <p className="sim-subline">
            Este é o Overise App. Use ele agora — ative, busque um jogo, instale. Complete a jornada e desbloqueamos uma oferta especial pra você.
          </p>
        </div>

        {/* Journey Progress */}
        <div className="sim-journey">
          <div className="sim-journey-label">Sua jornada</div>
          <div className="sim-journey-mid">
            <div className="sim-journey-track">
              <div className="sim-journey-fill" style={{ width: `${journeyPct}%` }} />
            </div>
            <div className="sim-journey-tasks">
              {(['activated', 'searched', 'installed'] as JourneyTask[]).map((task, i) => (
                <div key={task} className={`sim-jtask ${journeyTasks[task] ? 'sim-jtask-done' : ''}`}>
                  <span className={`sim-jtask-icon ${journeyTasks[task] ? 'sim-jtask-icon-done' : ''}`}>
                    {journeyTasks[task] ? '✓' : i + 1}
                  </span>
                  {task === 'activated' ? 'Ativar o app' : task === 'searched' ? 'Buscar um jogo' : 'Instalar um jogo'}
                </div>
              ))}
            </div>
          </div>
          <div className="sim-journey-pct">{journeyPct}%</div>
        </div>

        {/* App Window */}
        <div className="sim-window">
          {/* Title bar */}
          <div className="sim-titlebar">
            <div className="sim-tb-dots">
              <span style={{ background: '#ff5f57' }} />
              <span style={{ background: '#ffbd2e' }} />
              <span style={{ background: '#28ca41' }} />
            </div>
            <div className="sim-tb-title">Overise App — Biblioteca de Jogos</div>
            <div className={`sim-tb-status ${appOn ? 'sim-tb-on' : 'sim-tb-off'}`}>
              ● {appOn ? 'ONLINE' : 'OFFLINE'}
            </div>
          </div>

          <div className="sim-layout">
            {/* Sidebar */}
            <div className="sim-sidebar">
              <button className={`sim-power ${appOn ? 'sim-power-on' : 'sim-power-off'}`} onClick={handlePower}>
                <span className="sim-power-dot" />
                {appOn ? 'App Ativo' : 'Ativar App'}
              </button>
              <div className="sim-sidebar-label">Categorias</div>
              {CATEGORIES_LIST.map(c => (
                <button
                  key={c}
                  className={`sim-cat-btn ${category === c ? 'sim-cat-active' : ''}`}
                  onClick={() => appOn && setCategory(c)}
                >
                  {c}
                  <span className="sim-cat-count">{catCounts[c] || 0}</span>
                </button>
              ))}
            </div>

            {/* Main area */}
            <div className={`sim-main ${!appOn ? 'sim-main-locked' : ''}`}>
              <div className="sim-topbar">
                <input
                  className="sim-search"
                  type="text"
                  placeholder="🔍  Buscar jogo... ex: Elden Ring, GTA"
                  disabled={!appOn}
                  value={query}
                  onChange={e => handleSearch(e.target.value)}
                />
              </div>
              <div className="sim-games-area">
                <div className="sim-grid">
                  {filteredGames.map(g => (
                    <div
                      key={g.steam_appid}
                      className={`sim-game-card ${installedGames.has(g.steam_appid) ? 'sim-game-installed' : ''}`}
                      onClick={() => openInstall(g)}
                    >
                      <img src={g.cover} alt={g.name} loading="lazy" />
                      <div className="sim-game-info">
                        <div className="sim-game-name">{g.name}</div>
                        {!installedGames.has(g.steam_appid) && (
                          <div className="sim-game-price">{fmt(getPrice(g))}</div>
                        )}
                      </div>
                      {installedGames.has(g.steam_appid) ? (
                        <span className="sim-badge sim-badge-installed">✔ INSTALADO</span>
                      ) : (
                        <span className="sim-badge sim-badge-free">GRÁTIS</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {!appOn && <div className="sim-locked-msg">🔒 Ative o app para continuar</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Install Modal */}
      {installModal && (
        <div className="sim-modal-overlay" onClick={closeInstall}>
          <div className="sim-modal" onClick={e => e.stopPropagation()}>
            <img className="sim-modal-cover" src={installModal.cover} alt={installModal.name} />
            <div className="sim-modal-name">{installModal.name}</div>
            <div className="sim-modal-steam">
              Preço na Steam: <strong style={{ color: '#ff3b3b', textDecoration: 'line-through' }}>{fmt(getPrice(installModal))}</strong>
              {' — com a Overise: '}
              <strong style={{ color: 'var(--neon)' }}>incluso no plano</strong>
            </div>
            <div className="sim-modal-progress-wrap">
              <div className="sim-modal-progress-bar" style={{ width: `${installProgress}%` }} />
            </div>
            <div className="sim-modal-status">
              {installComplete ? '✔ Instalado com sucesso!' : installing ? INSTALL_STEPS[installStepIdx] : 'Pronto para instalar'}
            </div>
            {!installing && !installComplete && (
              <button className="sim-modal-btn" onClick={startInstall}>
                ⬇ Instalar Grátis com Overise
              </button>
            )}
            {installing && (
              <button className="sim-modal-btn" disabled>⏳ Instalando...</button>
            )}
            {installComplete && (
              <button className="sim-modal-btn" onClick={closeInstall}>▶ Jogar Agora</button>
            )}
            {!installing && (
              <button className="sim-modal-cancel" onClick={closeInstall}>
                {installComplete ? 'Fechar' : 'Cancelar'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Unlock Overlay */}
      {showUnlock && (
        <div className="sim-unlock-overlay">
          <div className="sim-unlock-box">
            <span className="sim-unlock-icon">🔓</span>
            <div className="sim-unlock-title">Acesso Desbloqueado!</div>
            <div className="sim-unlock-sub">
              Você completou a jornada. Com a Overise, pague <strong style={{ color: 'var(--neon)' }}>R$ 9,97/mês</strong> e acesse todos os jogos.
            </div>
            <a href="#planos" className="sim-unlock-cta" onClick={() => setShowUnlock(false)}>
              Ver Minha Oferta Especial →
            </a>
          </div>
        </div>
      )}

      <style>{`
        .sim-intro { text-align: center; margin-bottom: 52px; }
        .sim-eyebrow { font-family:'Sora',sans-serif; font-size:11px; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:var(--neon); margin-bottom:14px; display:block; }
        .sim-headline { font-size:clamp(28px,5vw,52px); font-weight:900; line-height:.95; color:#fff; text-transform:uppercase; margin:0 0 16px; }
        .sim-headline em { color:var(--neon); font-style:normal; }
        .sim-subline { font-size:15px; color:var(--muted2); max-width:520px; line-height:1.75; margin:0 auto; }

        /* Journey */
        .sim-journey { background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.06); border-radius:14px; padding:20px 28px; margin-bottom:32px; display:flex; align-items:center; gap:24px; }
        .sim-journey-label { font-family:'Sora',sans-serif; font-size:12px; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:var(--muted2); white-space:nowrap; }
        .sim-journey-mid { flex:1; }
        .sim-journey-track { background:rgba(255,255,255,.06); border-radius:99px; height:8px; overflow:hidden; }
        .sim-journey-fill { height:100%; background:linear-gradient(90deg,#2bcc0f,var(--neon)); border-radius:99px; transition:width .6s cubic-bezier(.23,1,.32,1); box-shadow:0 0 12px rgba(0,255,65,.35); }
        .sim-journey-pct { font-family:'Sora',sans-serif; font-size:22px; font-weight:900; color:var(--neon); min-width:48px; text-align:right; }
        .sim-journey-tasks { display:flex; gap:20px; margin-top:10px; }
        .sim-jtask { display:flex; align-items:center; gap:8px; font-size:12px; color:var(--muted2); transition:color .3s; }
        .sim-jtask-done { color:var(--neon); }
        .sim-jtask-icon { width:20px; height:20px; border-radius:50%; border:1.5px solid var(--muted2); display:flex; align-items:center; justify-content:center; font-size:10px; transition:all .3s; flex-shrink:0; }
        .sim-jtask-icon-done { background:var(--neon); border-color:var(--neon); color:#000; }

        /* Window */
        .sim-window { background:rgba(255,255,255,.03); border:1px solid rgba(0,255,65,.12); border-radius:16px; overflow:hidden; box-shadow:0 0 60px rgba(0,255,65,.07),0 40px 80px rgba(0,0,0,.5); }
        .sim-titlebar { background:#0a0a0a; padding:10px 16px; display:flex; align-items:center; gap:12px; border-bottom:1px solid rgba(255,255,255,.06); }
        .sim-tb-dots { display:flex; gap:6px; }
        .sim-tb-dots span { width:10px; height:10px; border-radius:50%; display:block; }
        .sim-tb-title { flex:1; text-align:center; font-family:'Sora',sans-serif; font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted2); }
        .sim-tb-status { font-size:11px; font-weight:700; font-family:'Sora',sans-serif; letter-spacing:.08em; }
        .sim-tb-off { color:#ff3b3b; }
        .sim-tb-on { color:var(--neon); }

        /* Layout */
        .sim-layout { display:grid; grid-template-columns:180px 1fr; height:480px; }
        @media (max-width:768px) { .sim-layout { grid-template-columns:1fr; height:auto; } .sim-sidebar { display:none; } }
        .sim-sidebar { background:var(--bg); border-right:1px solid rgba(255,255,255,.06); display:flex; flex-direction:column; padding:16px 0; overflow-y:auto; }
        .sim-power { margin:0 14px 20px; padding:10px; border-radius:8px; font-family:'Sora',sans-serif; font-size:13px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; cursor:pointer; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:8px; }
        .sim-power-off { background:rgba(255,59,59,.08); border:1.5px solid rgba(255,59,59,.3); color:#ff3b3b; }
        .sim-power-off:hover { background:rgba(255,59,59,.15); }
        .sim-power-on { background:rgba(0,255,65,.1); border:1.5px solid rgba(0,255,65,.12); color:var(--neon); box-shadow:0 0 20px rgba(0,255,65,.2); }
        .sim-power-dot { width:8px; height:8px; border-radius:50%; background:currentColor; }
        .sim-sidebar-label { font-family:'Sora',sans-serif; font-size:10px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--muted2); padding:0 16px; margin-bottom:6px; margin-top:4px; }
        .sim-cat-btn { padding:8px 16px; font-size:12px; font-weight:500; color:var(--muted2); cursor:pointer; transition:all .15s; display:flex; align-items:center; gap:8px; border-left:2px solid transparent; background:none; border-top:none; border-right:none; border-bottom:none; text-align:left; font-family:inherit; width:100%; }
        .sim-cat-btn:hover { color:#fff; background:rgba(255,255,255,.03); }
        .sim-cat-active { color:var(--neon) !important; background:rgba(0,255,65,.06) !important; border-left-color:var(--neon) !important; }
        .sim-cat-count { margin-left:auto; font-size:10px; background:rgba(255,255,255,.04); padding:1px 7px; border-radius:99px; color:var(--muted2); }

        /* Main */
        .sim-main { display:flex; flex-direction:column; overflow:hidden; position:relative; }
        .sim-main-locked { pointer-events:none; opacity:.45; filter:grayscale(.4); }
        .sim-locked-msg { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:var(--bg); border:1px solid rgba(0,255,65,.12); border-radius:10px; padding:12px 20px; font-size:13px; font-weight:600; color:var(--neon); font-family:'Sora',sans-serif; letter-spacing:.06em; text-transform:uppercase; white-space:nowrap; z-index:10; pointer-events:none; }
        .sim-topbar { padding:12px 16px; border-bottom:1px solid rgba(255,255,255,.06); }
        .sim-search { width:100%; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.06); border-radius:7px; padding:8px 12px; font-size:12px; color:#fff; font-family:inherit; transition:border-color .2s; }
        .sim-search:focus { outline:none; border-color:var(--neon); }
        .sim-search:disabled { opacity:.5; }
        .sim-games-area { flex:1; overflow-y:auto; padding:12px; }
        .sim-games-area::-webkit-scrollbar { width:3px; }
        .sim-games-area::-webkit-scrollbar-thumb { background:var(--neon); border-radius:2px; }
        .sim-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
        @media (max-width:768px) { .sim-grid { grid-template-columns:repeat(2,1fr); } }
        .sim-game-card { border-radius:8px; overflow:hidden; position:relative; cursor:pointer; border:1.5px solid transparent; transition:all .2s; aspect-ratio:16/9; }
        .sim-game-card:hover { border-color:rgba(0,255,65,.4); transform:translateY(-2px); }
        .sim-game-installed { border-color:var(--neon); }
        .sim-game-card img { width:100%; height:100%; object-fit:cover; display:block; }
        .sim-game-info { position:absolute; bottom:0; left:0; right:0; background:linear-gradient(to top,rgba(0,0,0,.95),transparent); padding:18px 7px 6px; }
        .sim-game-name { font-size:9px; font-weight:600; color:#fff; line-height:1.2; }
        .sim-game-price { font-family:'Sora',sans-serif; font-size:11px; color:#ff3b3b; text-decoration:line-through; opacity:.8; }
        .sim-badge { position:absolute; top:5px; right:5px; font-size:8px; font-weight:700; font-family:'Sora',sans-serif; padding:2px 7px; border-radius:4px; letter-spacing:.06em; }
        .sim-badge-free { background:var(--neon); color:#000; }
        .sim-badge-installed { background:rgba(0,255,65,.15); color:var(--neon); border:1px solid var(--neon); }

        /* Modal */
        .sim-modal-overlay { position:fixed; inset:0; z-index:500; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.85); backdrop-filter:blur(8px); }
        .sim-modal { background:#0e0e0e; border:1.5px solid rgba(0,255,65,.12); border-radius:20px; padding:36px; width:360px; max-width:90vw; text-align:center; box-shadow:0 0 60px rgba(0,255,65,.15),0 40px 80px rgba(0,0,0,.6); animation:simModalIn .3s ease; }
        @keyframes simModalIn { from { transform:translateY(20px); opacity:0; } to { transform:translateY(0); opacity:1; } }
        .sim-modal-cover { width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:10px; margin-bottom:16px; }
        .sim-modal-name { font-family:'Sora',sans-serif; font-size:22px; font-weight:900; text-transform:uppercase; color:#fff; margin-bottom:4px; }
        .sim-modal-steam { font-size:13px; color:var(--muted2); margin-bottom:20px; }
        .sim-modal-progress-wrap { background:rgba(255,255,255,.06); border-radius:99px; height:6px; overflow:hidden; margin-bottom:8px; }
        .sim-modal-progress-bar { height:100%; background:linear-gradient(90deg,#2bcc0f,var(--neon)); border-radius:99px; transition:width .15s linear; box-shadow:0 0 8px rgba(0,255,65,.35); }
        .sim-modal-status { font-size:11px; color:var(--muted2); margin-bottom:20px; min-height:16px; }
        .sim-modal-btn { width:100%; padding:14px; font-size:15px; border-radius:8px; background:var(--neon); color:#000; font-weight:800; text-transform:uppercase; letter-spacing:.5px; cursor:pointer; border:none; transition:.2s ease; font-family:inherit; }
        .sim-modal-btn:hover:not(:disabled) { transform:translateY(-2px); opacity:.9; }
        .sim-modal-btn:disabled { opacity:.7; cursor:default; }
        .sim-modal-cancel { margin-top:10px; font-size:12px; color:var(--muted2); cursor:pointer; transition:color .2s; background:none; border:none; font-family:inherit; }
        .sim-modal-cancel:hover { color:#fff; }

        /* Unlock */
        .sim-unlock-overlay { position:fixed; inset:0; z-index:1000; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.92); animation:fadeIn .4s ease; }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .sim-unlock-box { text-align:center; animation:unlockPop .5s cubic-bezier(.23,1,.32,1); }
        @keyframes unlockPop { from { transform:scale(.8); opacity:0; } to { transform:scale(1); opacity:1; } }
        .sim-unlock-icon { font-size:80px; margin-bottom:16px; display:block; }
        .sim-unlock-title { font-family:'Sora',sans-serif; font-size:clamp(36px,6vw,56px); font-weight:900; color:var(--neon); text-transform:uppercase; line-height:1; margin-bottom:8px; text-shadow:0 0 40px rgba(0,255,65,.35); }
        .sim-unlock-sub { font-size:16px; color:#fff; margin-bottom:28px; max-width:400px; }
        .sim-unlock-cta { display:inline-flex; padding:18px 44px; font-size:18px; border-radius:8px; background:var(--neon); color:#000; font-weight:800; text-transform:uppercase; letter-spacing:.5px; transition:.2s ease; }
        .sim-unlock-cta:hover { transform:translateY(-2px); opacity:.9; }
      `}</style>
    </section>
  );
}
