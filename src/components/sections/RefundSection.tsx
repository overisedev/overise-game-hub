export function RefundSection() {
  return (
    <section className="section-tight container-main">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        <div className="refund-box">
          <span className="refund-badge">✓ Reembolso em até 30 dias</span>
          <h3>Compra sem risco</h3>
          <p>Se por qualquer motivo você não curtir a experiência, você pode solicitar reembolso em até 30 dias. Transparente, simples e direto — padrão Overise.</p>
        </div>
        <div className="refund-box">
          <span className="refund-badge">⚡ Acesso rápido</span>
          <h3>Ativação imediata</h3>
          <p>Escolha o plano, conclua a etapa e siga para o desbloqueio. Tudo pensado para manter o fluxo curto e premium.</p>
        </div>
      </div>
      <style>{`.refund-badge{display:inline-flex;align-items:center;gap:10px;padding:10px 12px;border-radius:999px;border:1px solid rgba(0,255,65,.30);background:rgba(0,255,65,.10);color:var(--neon);font-weight:950;text-transform:uppercase;letter-spacing:.6px;font-size:12px}.refund-box{border-radius:var(--r2);border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);box-shadow:var(--shadowSoft);padding:22px}.refund-box h3{margin:10px 0 8px;font-size:20px;font-weight:950;letter-spacing:-.6px;text-transform:uppercase;color:#fff}.refund-box p{margin:0;color:var(--muted);line-height:1.7;font-size:14px}`}</style>
    </section>
  );
}
