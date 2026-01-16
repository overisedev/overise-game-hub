export function TestimonialsSection() {
  const testimonials = [
    { name: 'Rafael M.', initial: 'R', text: '"Interface bonita, rápida e fácil de usar. Achei os jogos em segundos."' },
    { name: 'Gustavo L.', initial: 'G', text: '"A organização por categorias ficou perfeita. Muito acima do padrão."' },
    { name: 'André S.', initial: 'A', text: '"Visual premium de launcher. Parece produto grande."' },
  ];
  return (
    <section className="section container-main">
      <h2 style={{ fontSize: '28px', fontWeight: 950, color: '#fff', textTransform: 'uppercase', margin: '0 0 8px' }}>Quem usa aprova</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>Depoimentos em estilo premium.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        {testimonials.map((t) => (
          <div key={t.name} className="quote">
            <div className="who"><span className="av">{t.initial}</span><div><b style={{ color: '#fff' }}>{t.name}</b><div className="stars">★★★★★</div></div></div>
            <p className="txt">{t.text}</p>
          </div>
        ))}
      </div>
      <style>{`.quote{border-radius:var(--r2);border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);box-shadow:var(--shadowSoft);padding:18px;transition:.25s ease}.quote:hover{transform:translateY(-3px);border-color:rgba(0,255,65,.20)}.who{display:flex;align-items:center;gap:12px;margin-bottom:12px}.av{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.10);display:grid;place-items:center;font-weight:950;color:#fff}.stars{color:#ffd34d;font-weight:950;letter-spacing:1px;font-size:12px}.txt{color:var(--muted);line-height:1.65;font-size:13px;font-style:italic;margin:0}`}</style>
    </section>
  );
}
