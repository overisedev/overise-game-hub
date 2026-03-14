export function HowItWorksSection() {
  return (
    <section id="how" className="sec-dark">
      <div className="container text-center">
        <div className="reveal">
          <div className="tag g">Simples assim</div>
          <h2 className="h2 on-dark">3 passos. 5 minutos.<br /><em>Jogando hoje.</em></h2>
        </div>
        <div className="steps reveal rd1">
          <div className="step">
            <div className="step-num">01</div>
            <div className="step-title">Garanta sua licença</div>
            <div className="step-desc">Pague R$9,97 uma vez. Receba o desbloqueador por e-mail em minutos.</div>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <div className="step-title">Ative no seu PC</div>
            <div className="step-desc">Instale, insira a chave. O sistema é 100% seguro, anti-ban e invisível.</div>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <div className="step-title">Escolha e jogue</div>
            <div className="step-desc">+1000 jogos desbloqueados. Baixe pela Steam, em velocidade máxima.</div>
          </div>
        </div>
        <div className="step-result reveal rd2">
          <div className="step-result-left">
            <div className="step-result-ico">
              <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 3c1.66 0 3 1.34 3 3v2H9V6c0-1.66 1.34-3 3-3zm0 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>
            </div>
            <div>
              <div className="step-result-txt">Biblioteca pronta em 5 minutos</div>
              <div className="step-result-sub">Licença vitalícia · +1000 jogos · R$9,97 taxa única</div>
            </div>
          </div>
          <a href="#pricing" className="btn btn-accent btn-lg" style={{ background: '#fff', color: 'var(--accent2)', boxShadow: 'none' }}>Desbloquear →</a>
        </div>
      </div>
      <style>{`
        .steps { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 48px; max-width: 900px; margin-left: auto; margin-right: auto; }
        .step { background: var(--light); border: 1px solid var(--light-border); border-radius: 10px; padding: 32px 22px; text-align: center; position: relative; transition: border-color .3s, transform .3s; }
        .step:hover { border-color: rgba(45,212,14,.2); transform: translateY(-4px); }
        .step-num { font-family: var(--fh); font-size: 48px; font-weight: 900; color: var(--accent2); opacity: .12; position: absolute; top: 12px; right: 16px; line-height: 1; }
        .step-title { font-family: var(--fh); font-size: 20px; font-weight: 800; color: var(--on-light); text-transform: uppercase; margin-bottom: 8px; letter-spacing: .02em; }
        .step-desc { font-size: 14px; color: var(--on-light-muted); line-height: 1.7; }
        .step-result { background: var(--accent2); border-radius: 10px; padding: 24px 32px; display: flex; align-items: center; justify-content: space-between; gap: 20px; max-width: 900px; margin: 24px auto 0; }
        .step-result-left { display: flex; align-items: center; gap: 14px; }
        .step-result-ico { width: 40px; height: 40px; background: rgba(0,0,0,.15); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .step-result-ico svg { width: 20px; height: 20px; fill: #fff; }
        .step-result-txt { font-family: var(--fh); font-size: 22px; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: .02em; text-shadow: 0 1px 2px rgba(0,0,0,.15); }
        .step-result-sub { font-size: 14px; color: rgba(255,255,255,.85); margin-top: 2px; font-weight: 500; }
        @media (max-width: 768px) {
          .steps { grid-template-columns: 1fr; }
          .step-result { flex-direction: column; text-align: center; padding: 20px; }
        }
      `}</style>
    </section>
  );
}
