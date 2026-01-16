export function AboutSection() {
  return (
    <section id="sobre" className="section container-main">
      <h2 style={{ fontSize: '28px', fontWeight: 950, letterSpacing: '-1px', color: '#fff', textTransform: 'uppercase', margin: '0 0 10px' }}>Sobre nós</h2>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7, maxWidth: '70ch' }}>
        A Overise nasceu para entregar uma experiência premium: organizada, rápida e elegante — do jeito que uma biblioteca de jogos deveria ser. Nosso foco é simplicidade, performance e uma vitrine que valoriza títulos AAA.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginTop: '18px' }}>
        <div className="card-box"><h3>Missão</h3><p>Deixar o acesso ao catálogo claro e fluido, com visual moderno e navegação em poucos cliques.</p></div>
        <div className="card-box"><h3>Padrão Overise</h3><p>Interface com acabamento premium, vitrine rotativa suave e busca inteligente (incluindo abreviações).</p></div>
      </div>
      <style>{`.card-box{border-radius:var(--r2);border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);box-shadow:var(--shadowSoft);padding:22px;transition:.25s ease}.card-box:hover{transform:translateY(-3px);border-color:rgba(0,255,65,.22)}.card-box h3{margin:0 0 8px;font-size:18px;font-weight:950;color:#fff;text-transform:uppercase}.card-box p{margin:0;color:var(--muted);font-size:14px;line-height:1.6}`}</style>
    </section>
  );
}
