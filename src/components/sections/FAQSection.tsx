import { useState, forwardRef } from 'react';

export const FAQSection = forwardRef<HTMLElement>(function FAQSection(_, ref) {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: 'Isso é pirataria?', a: 'Não. Você usa os arquivos originais da Steam e não precisa instalar programas suspeitos que estragam o computador.' },
    { q: 'Funciona online mesmo?', a: 'Sim. A maioria dos jogos de história você joga sozinho, mas jogos como Futebol, Tiro e Luta funcionam online para você jogar contra outras pessoas.' },
    { q: 'Preciso formatar o PC?', a: 'De jeito nenhum. Nosso aplicativo é leve e se o seu computador roda o jogo, ele roda nosso sistema sem problemas.' },
    { q: 'E se eu não souber instalar?', a: 'Temos uma equipe de suporte real no Discord e WhatsApp. Se você tiver qualquer dificuldade, a gente entra e te ajuda a instalar.' },
  ];
  return (
    <section ref={ref} id="faq" className="section container-main">
      <h2 style={{ fontSize: '28px', fontWeight: 950, color: '#fff', textTransform: 'uppercase', margin: '0 0 8px' }}>FAQ</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '18px' }}>Respostas rápidas para as dúvidas mais comuns.</p>
      <div className="faq-box">
        {faqs.map((f, i) => (
          <div key={i} className={`qa ${open === i ? 'open' : ''}`}>
            <button className="q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} style={{ minHeight: 44 }}>{f.q}<span className="chev" aria-hidden="true">+</span></button>
            <div className="a" role="region">{f.a}</div>
          </div>
        ))}
      </div>
      <style>{`.faq-box{border-radius:var(--r2);border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);box-shadow:var(--shadowSoft);overflow:hidden}.qa{border-top:1px solid rgba(255,255,255,.06)}.qa:first-child{border-top:0}.q{width:100%;background:transparent;border:0;padding:16px 18px;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:10px;font-weight:950;letter-spacing:.4px;text-transform:uppercase;text-align:left}.chev{width:26px;height:26px;border-radius:8px;border:1px solid rgba(255,255,255,.10);display:grid;place-items:center;color:var(--neon);transition:.25s ease;background:rgba(0,0,0,.20)}.a{max-height:0;overflow:hidden;transition:max-height .35s ease;padding:0 18px;color:var(--muted);line-height:1.65;font-size:14px}.qa.open .a{max-height:240px;padding-bottom:16px}.qa.open .chev{transform:rotate(45deg)}`}</style>
    </section>
  );
});
