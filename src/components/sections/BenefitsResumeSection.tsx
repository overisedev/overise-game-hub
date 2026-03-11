export function BenefitsResumeSection() {
  const benefits = [
    { title: 'Do pagamento ao jogo: 5 minutos', desc: 'Sem tutorial de 40 min. Paga, instala, joga.', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg' },
    { title: 'Nunca mais "crack quebrou"', desc: 'Atualiza sozinho. Sempre na versão mais recente.', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg' },
    { title: 'Alguém real te responde', desc: 'Suporte WhatsApp com gente de verdade.', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg' },
    { title: 'Seu PC continua saudável', desc: 'Zero vírus. Zero arquivo suspeito. Instala limpo.', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg' },
  ];

  return (
    <section className="sec-white">
      <div className="container">
        <div className="benefits-wrap reveal">
          <div>
            <div className="tag dark">Tudo isso por R$9,97 · paga uma vez</div>
            <h2 className="h2 on-light" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>O que você<br /><em>desbloqueia</em></h2>
            <div className="benefits-list">
              {benefits.map((b, i) => (
                <div key={i} className="benefit">
                  <img className="benefit-img" src={b.img} alt="" loading="lazy" />
                  <div>
                    <div className="benefit-title">{b.title}</div>
                    <div className="benefit-desc">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal rd2">
            <div className="cmp-cards">
              <div className="cmp-card bad">
                <div className="cmp-lbl">1 jogo na Steam</div>
                <div className="cmp-val">R$299</div>
                <div className="cmp-sub">um jogo · pra sempre</div>
              </div>
              <div className="cmp-card good">
                <div className="cmp-lbl">Overise — tudo</div>
                <div className="cmp-val">R$9,97</div>
                <div className="cmp-sub">+1000 jogos · pra sempre</div>
              </div>
              <a href="#pricing" className="btn btn-accent-dark btn-full btn-lg">Garantir Meu Acesso →</a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .benefits-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .benefits-list { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
        .benefit { display: flex; gap: 14px; padding: 18px; background: var(--light); border: 1px solid var(--light-border); border-radius: 8px; transition: all .25s; }
        .benefit:hover { border-color: rgba(45,212,14,.2); transform: translateX(3px); }
        .benefit-img { width: 40px; height: 40px; border-radius: 6px; object-fit: cover; flex-shrink: 0; border: 1px solid var(--light-border); }
        .benefit-title { font-family: var(--fh); font-size: 14px; font-weight: 700; color: var(--on-light); margin-bottom: 3px; letter-spacing: .03em; text-transform: uppercase; }
        .benefit-desc { font-size: 13px; color: var(--on-light-muted); line-height: 1.65; }
        .cmp-cards { display: flex; flex-direction: column; gap: 12px; }
        .cmp-card { border-radius: 10px; padding: 24px; text-align: center; border: 1px solid transparent; }
        .cmp-card.bad { background: rgba(255,68,68,.04); border-color: rgba(255,68,68,.08); }
        .cmp-card.good { background: rgba(45,212,14,.04); border-color: rgba(45,212,14,.1); }
        .cmp-lbl { font-family: var(--fh); font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; margin-bottom: 8px; }
        .cmp-card.bad .cmp-lbl { color: var(--red); }
        .cmp-card.good .cmp-lbl { color: var(--accent2); }
        .cmp-val { font-family: var(--fh); font-size: 48px; font-weight: 900; line-height: 1; }
        .cmp-card.bad .cmp-val { color: var(--red); text-decoration: line-through; opacity: .4; }
        .cmp-card.good .cmp-val { color: var(--accent2); }
        .cmp-sub { font-size: 13px; color: var(--on-light-muted); margin-top: 4px; }
        @media (max-width: 768px) { .benefits-wrap { grid-template-columns: 1fr; } .cmp-val { font-size: 36px; } }
      `}</style>
    </section>
  );
}
