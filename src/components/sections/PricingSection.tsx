export function PricingSection() {
  const plans = [
    { name: 'Acesso Básico', badge: 'Entrada', price: 'R$ 9,97', sub: 'acesso inicial', features: [['Vitrine por categoria', 'Incluído'], ['Detalhes do título', 'Incluído'], ['Atualizações', 'Essenciais'], ['Suporte', 'Base']] },
    { name: 'Acesso Avançado', badge: 'Recomendado', price: 'R$ 19,97', sub: 'experiência completa', was: 'R$ 39,90', featured: true, features: [['Vitrine por categoria', 'Completa'], ['Otimizações', 'Prioritárias'], ['Atualizações', 'Automáticas'], ['Suporte', 'Guia + comunidade']] },
    { name: 'Acesso Permanente', badge: 'Vitalício', price: 'R$ 29,97', sub: 'acesso vitalício', was: 'R$ 79,90', features: [['Ecossistema Overise', 'Vitalício'], ['Atualizações', 'Sempre incluídas'], ['Suporte', 'Prioritário'], ['Experiência', 'Premium+']] },
  ];
  return (
    <section id="planos" className="section container-main">
      <h2 style={{ fontSize: '28px', fontWeight: 950, color: '#fff', textTransform: 'uppercase', margin: '0 0 8px' }}>Planos</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>Escolha o nível de acesso ideal. Todos os planos ativam o ecossistema Overise com interface premium.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {plans.map((p) => (
          <div key={p.name} className={`plan ${p.featured ? 'featured' : ''}`}>
            <div className="plan-top"><span className="plan-name">{p.name}</span><span className="plan-badge">{p.badge}</span></div>
            <div className="price-row"><span className="price-now">{p.price}</span><span className="price-small">{p.sub}</span>{p.was && <span className="price-was">{p.was}</span>}</div>
            <table className="table"><tbody>{p.features.map(([k, v]) => (<tr key={k}><td>{k}</td><td className="good">{v}</td></tr>))}</tbody></table>
            <div className="buy-row"><button className="btn btn-primary-full">Selecionar</button></div>
            <p className="secure">🔒 Pagamento seguro • Ativação imediata</p>
          </div>
        ))}
      </div>
      <style>{`.plan{border-radius:var(--r2);border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);box-shadow:var(--shadowSoft);padding:22px;transition:.25s ease}.plan:hover{transform:translateY(-4px);border-color:rgba(0,255,65,.22)}.plan.featured{border-color:rgba(0,255,65,.45);box-shadow:0 18px 60px rgba(0,255,65,.10)}.plan-top{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:12px}.plan-name{font-weight:950;font-size:18px;letter-spacing:-.6px;color:#fff;text-transform:uppercase}.plan-badge{font-size:11px;font-weight:950;text-transform:uppercase;padding:8px 10px;border-radius:999px;background:rgba(0,255,65,.14);border:1px solid rgba(0,255,65,.35);color:var(--neon)}.price-row{display:flex;align-items:baseline;gap:10px;margin:8px 0 12px;flex-wrap:wrap}.price-now{font-weight:950;font-size:40px;letter-spacing:-2px;color:var(--neon)}.price-small{color:var(--muted2);font-weight:800}.price-was{color:rgba(255,255,255,.35);font-weight:900;text-decoration:line-through;font-size:12px}.table{width:100%;border-collapse:collapse;margin-top:10px;border-radius:16px;border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.18);overflow:hidden}.table td{padding:14px 12px;border-bottom:1px solid rgba(255,255,255,.06);color:#d9d9d9;font-weight:800;font-size:13px}.table tr:last-child td{border-bottom:0}.table td:last-child{text-align:right;color:#fff}.table .good{color:var(--neon)}.buy-row{margin-top:14px}.btn-primary-full{width:100%;background:linear-gradient(180deg,rgba(0,255,65,.95),rgba(0,200,55,.85));color:#000;border-color:rgba(0,255,65,.55);padding:12px 18px;border-radius:14px;font-weight:950;text-transform:uppercase;cursor:pointer;transition:.22s ease}.btn-primary-full:hover{box-shadow:0 18px 60px rgba(0,255,65,.15)}.secure{margin-top:10px;color:var(--muted2);font-size:12px}`}</style>
    </section>
  );
}
