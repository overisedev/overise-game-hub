export function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="hero-badge reveal">Taxa única R$9,97 · licença vitalícia</div>
        <h1 className="hero-h1 reveal rd1">
          Desbloqueie sua Steam.<br />
          <em>+1000 jogos por R$9,97.</em><br />
          <span style={{ fontSize: '.35em', fontWeight: 600, color: 'var(--muted)', letterSpacing: '.02em', textTransform: 'none' }}>
            Taxa única. Licença vitalícia. Sem mensalidade.
          </span>
        </h1>
        <p className="hero-sub reveal rd1">
          Ative o desbloqueador, escolha o jogo e baixe direto pela Steam. <strong>100% seguro, anti-ban e invisível.</strong> Pague uma vez, use pra sempre.
        </p>

        {/* VSL */}
        <div className="vsl-wrap reveal rd2">
          <div className="vsl-bar">
            <div className="vsl-dots"><span></span><span></span><span></span></div>
            <div className="vsl-title">overise.config</div>
          </div>
          <div className="vsl-video">
            <style>{`
              wistia-player[media-id='kjpmn1egr5']:not(:defined) {
                background: center/contain no-repeat url('https://fast.wistia.com/embed/medias/kjpmn1egr5/swatch');
                display: block; filter: blur(5px); padding-top: 56.25%; border-radius: 0;
              }
              wistia-player[media-id='kjpmn1egr5'] { display: block; width: 100%; }
            `}</style>
            {/* @ts-ignore */}
            <wistia-player media-id="kjpmn1egr5" aspect="1.7777777777777777" style={{ borderRadius: 0, overflow: 'hidden' }}></wistia-player>
            <div className="vsl-sound-overlay" id="vsl-sound-overlay" onClick={(e) => {
              const el = e.currentTarget;
              el.classList.add('hidden');
              const wp = document.querySelector('wistia-player') as any;
              if (wp) { wp.currentTime = 0; wp.muted = false; wp.play(); }
            }}>
              <div className="vsl-sound-card">
                <div className="vsl-sound-card-title">Seu vídeo já começou</div>
                <div className="vsl-sound-card-icon">
                  <svg viewBox="0 0 24 24"><path d="M18.36 19.36a1 1 0 0 1-.7-.29 1 1 0 0 1 0-1.41 8 8 0 0 0 0-11.32 1 1 0 1 1 1.41-1.41 10 10 0 0 1 0 14.14 1 1 0 0 1-.71.29zm-2.83-2.83a1 1 0 0 1-.7-.29 1 1 0 0 1 0-1.41 4 4 0 0 0 0-5.66 1 1 0 1 1 1.41-1.41 6 6 0 0 1 0 8.48 1 1 0 0 1-.71.29zM11 4a1 1 0 0 0-1.05.16L5.68 7.5H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h3.68l4.27 3.34A1 1 0 0 0 11 19.5a.84.84 0 0 0 .38-.08A1 1 0 0 0 12 18.5v-13a1 1 0 0 0-.62-.92A.84.84 0 0 0 11 4z" /></svg>
                </div>
                <div className="vsl-sound-card-sub">Clique para ouvir</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-btns reveal rd2">
          <a href="#pricing" className="btn btn-accent btn-xl">Desbloquear minha Steam</a>
          <a href="#how" className="btn btn-ghost btn-xl">Ver como funciona</a>
        </div>
        <div className="hero-trust reveal rd3">
          <div className="trust-pill"><span className="chk">✔</span> 7 dias de garantia</div>
          <div className="trust-pill"><span className="chk">✔</span> Jogando em 5 min</div>
          <div className="trust-pill"><span className="chk">✔</span> +5.000 clientes</div>
        </div>
      </div>

      <style>{`
        .hero-section { background: var(--bg); padding: 72px 0 64px; position: relative; overflow: hidden; text-align: center; }
        .hero-section::before { content: ''; position: absolute; top: -120px; left: 50%; transform: translateX(-50%); width: 900px; height: 500px; background: radial-gradient(ellipse,rgba(57,255,20,.035) 0%,transparent 65%); pointer-events: none; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-dim); border: 1px solid rgba(57,255,20,.15); border-radius: 4px; padding: 6px 14px; font-family: var(--fh); font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--accent); margin-bottom: 22px; animation: floatY 3s ease-in-out infinite, borderGlow 3s ease-in-out infinite; }
        .hero-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 6px var(--accent); animation: livep 1.3s ease-in-out infinite; }
        .hero-h1 { font-family: var(--fh); font-size: clamp(36px,7vw,88px); font-weight: 900; line-height: .9; text-transform: uppercase; color: #fff; margin-bottom: 20px; }
        .hero-h1 em { color: var(--accent); font-style: normal; }
        .hero-sub { font-size: 17px; font-weight: 400; color: var(--muted); max-width: 560px; line-height: 1.75; margin: 0 auto 0; }
        .hero-sub strong { color: var(--white); font-weight: 600; }
        .vsl-wrap { max-width: 900px; margin: 36px auto 0; border-radius: 14px; overflow: hidden; box-shadow: 0 0 80px rgba(57,255,20,.06),0 40px 80px rgba(0,0,0,.55); border: 1px solid rgba(255,255,255,.1); position: relative; background: #0d0f13; }
        .vsl-bar { display: flex; align-items: center; gap: 10px; padding: 10px 16px; background: rgba(255,255,255,.04); border-bottom: 1px solid rgba(255,255,255,.06); }
        .vsl-dots { display: flex; gap: 6px; }
        .vsl-dots span { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,.12); }
        .vsl-dots span:first-child { background: #ff5f57; }
        .vsl-dots span:nth-child(2) { background: #febc2e; }
        .vsl-dots span:last-child { background: #28c840; }
        .vsl-title { font-family: var(--fh); font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--dim); flex: 1; text-align: center; padding-right: 40px; }
        .vsl-video { position: relative; overflow: hidden; }
        .vsl-sound-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.6); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: opacity .5s ease; }
        .vsl-sound-overlay.hidden { opacity: 0; pointer-events: none; }
        .vsl-sound-card { background: rgba(57,255,20,.1); border: 1.5px solid rgba(57,255,20,.35); border-radius: 16px; padding: 28px 40px; display: flex; flex-direction: column; align-items: center; gap: 8px; backdrop-filter: blur(16px); box-shadow: 0 0 40px rgba(57,255,20,.08),0 20px 60px rgba(0,0,0,.4); animation: cardEntry .6s cubic-bezier(.34,1.56,.64,1) both; }
        .vsl-sound-card-title { font-family: var(--fh); font-size: 16px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; color: #fff; }
        .vsl-sound-card-icon { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; margin: 4px 0; }
        .vsl-sound-card-icon svg { width: 32px; height: 32px; fill: var(--accent); animation: iconPulse 1.5s ease-in-out infinite; }
        .vsl-sound-card-sub { font-family: var(--fh); font-size: 13px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); }
        @keyframes cardEntry { 0% { transform: scale(.85) translateY(10px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
        @keyframes iconPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        .hero-btns { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 32px; margin-bottom: 24px; }
        .hero-trust { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
        .trust-pill { display: flex; align-items: center; gap: 6px; font-family: var(--fh); font-size: 11px; font-weight: 700; letter-spacing: .04em; color: var(--dim); transition: all .2s ease; }
        .trust-pill:hover { color: var(--accent); transform: scale(1.05); }
        .trust-pill .chk { color: var(--accent); font-weight: 900; }
        @media (max-width: 768px) {
          .hero-section { padding: 48px 0; }
          .hero-h1 { font-size: clamp(28px,8.5vw,48px); }
          .hero-sub { font-size: 15px; }
          .vsl-wrap { margin: 24px 0 0; max-width: 100%; border-radius: 10px; }
          .hero-btns { flex-direction: column; align-items: stretch; margin-top: 24px; }
          .hero-btns .btn-xl { font-size: 15px; padding: 15px 20px; }
        }
      `}</style>
    </section>
  );
}
