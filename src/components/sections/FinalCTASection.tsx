export function FinalCTASection() {
  return (
    <section style={{ padding: '88px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
      <div style={{ position: 'absolute', top: '-150px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse,rgba(57,255,20,.03) 0%,transparent 65%)', pointerEvents: 'none' }} />
      <div className="reveal" style={{ position: 'relative', zIndex: 2, maxWidth: '600px', margin: '0 auto' }}>
        <div className="tag g">Pronto pra jogar?</div>
        <h2 className="h2 on-dark" style={{ fontSize: 'clamp(34px,6vw,72px)', marginBottom: '16px' }}>
          Sua lista de desejos pode<br /><em>acabar hoje.</em>
        </h2>
        <p className="sub on-dark center" style={{ marginBottom: '32px' }}>
          Elden Ring, GTA, God of War, Cyberpunk — desbloqueados em 5 minutos. R$9,97, taxa única, licença vitalícia.
        </p>
        <a href="#pricing" className="btn btn-accent btn-xl">Ver planos a partir de R$9,97</a>
        <div style={{ fontFamily: 'var(--fh)', fontSize: '11px', fontWeight: 700, color: 'var(--dim)', marginTop: '16px', letterSpacing: '.08em' }}>
          7 DIAS DE GARANTIA · LICENÇA VITALÍCIA · ACESSO IMEDIATO
        </div>
      </div>
    </section>
  );
}
