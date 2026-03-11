import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Pagamento único de R$9,97', desc: 'PIX, cartão ou boleto. Sem mensalidade, sem surpresas.', icon: '💳' },
  { num: '02', title: 'Acesso instantâneo ao Overise', desc: 'Receba o software na hora. Instalação em menos de 2 minutos.', icon: '⚡' },
  { num: '03', title: '+1000 jogos desbloqueados', desc: 'Todos os jogos pagos da Steam liberados na sua biblioteca oficial.', icon: '🎮' },
  { num: '04', title: 'Download em velocidade máxima', desc: 'Direto dos servidores da Steam. Sem lentidão, sem torrent.', icon: '🚀' },
  { num: '05', title: 'Jogue online com amigos', desc: 'Multiplayer funcionando sem ban. Atualizações automáticas.', icon: '🌐' },
  { num: '06', title: 'Posse vitalícia', desc: 'Os jogos ficam na sua conta pra sempre. Pagou uma vez, acabou.', icon: '♾️' },
];

const benefits = [
  { title: 'Do pagamento ao jogo: 5 minutos', desc: 'Sem tutorial de 40 min. Paga, instala, joga.', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg' },
  { title: 'Nunca mais "crack quebrou"', desc: 'Atualiza sozinho. Sempre na versão mais recente.', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg' },
  { title: 'Alguém real te responde', desc: 'Suporte WhatsApp com gente de verdade.', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg' },
  { title: 'Seu PC continua saudável', desc: 'Zero vírus. Zero arquivo suspeito. Instala limpo.', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg' },
];

export function BenefitsResumeSection() {
  return (
    <section className="sec-dark" style={{ padding: '80px 0' }}>
      <div className="container">
        <motion.div className="text-center reveal" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="tag g">Tudo isso por R$9,97 · paga uma vez</div>
          <h2 className="h2 on-dark">O que você<br /><em>desbloqueia</em></h2>
          <p className="sub on-dark center">Do pagamento ao jogo em menos de 5 minutos.</p>
        </motion.div>

        {/* Timeline */}
        <div className="unlock-timeline">
          {steps.map((s, i) => (
            <motion.div key={i} className="unlock-step"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <div className="unlock-line-wrap">
                <div className="unlock-dot">{s.icon}</div>
                {i < steps.length - 1 && <div className="unlock-connector" />}
              </div>
              <div className="unlock-content">
                <span className="unlock-num">{s.num}</span>
                <h3 className="unlock-title">{s.title}</h3>
                <p className="unlock-desc">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits cards */}
        <div className="unlock-benefits">
          {benefits.map((b, i) => (
            <motion.div key={i} className="unlock-benefit"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }}>
              <img className="unlock-benefit-img" src={b.img} alt="" loading="lazy" />
              <div>
                <div className="unlock-benefit-title">{b.title}</div>
                <div className="unlock-benefit-desc">{b.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Price comparison */}
        <motion.div className="unlock-compare" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="unlock-cmp bad">
            <span className="unlock-cmp-lbl">1 jogo na Steam</span>
            <span className="unlock-cmp-val bad-val">R$299</span>
            <span className="unlock-cmp-sub">um jogo · pra sempre</span>
          </div>
          <div className="unlock-vs">VS</div>
          <div className="unlock-cmp good">
            <span className="unlock-cmp-lbl">Overise — tudo</span>
            <span className="unlock-cmp-val good-val">R$9,97</span>
            <span className="unlock-cmp-sub">+1000 jogos · pra sempre</span>
          </div>
        </motion.div>

        <div className="text-center" style={{ marginTop: 32 }}>
          <a href="#pricing" className="btn btn-accent btn-lg">Garantir Meu Acesso →</a>
        </div>
      </div>

      <style>{`
        .unlock-timeline { position: relative; max-width: 600px; margin: 48px auto 56px; }
        .unlock-step { display: flex; gap: 20px; margin-bottom: 0; }
        .unlock-line-wrap { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; width: 48px; }
        .unlock-dot { width: 48px; height: 48px; border-radius: 14px; background: rgba(57,255,20,.1); border: 2px solid rgba(57,255,20,.25); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .unlock-connector { width: 2px; flex: 1; min-height: 24px; background: linear-gradient(180deg, rgba(57,255,20,.3), rgba(57,255,20,.05)); }
        .unlock-content { padding: 8px 0 32px; }
        .unlock-num { font-family: var(--fh); font-size: 10px; font-weight: 800; color: var(--accent); letter-spacing: .16em; text-transform: uppercase; }
        .unlock-title { font-family: var(--fh); font-size: 18px; font-weight: 800; color: var(--white); margin: 4px 0 6px; text-transform: uppercase; letter-spacing: .02em; }
        .unlock-desc { font-size: 14px; color: var(--dim); line-height: 1.65; }

        .unlock-benefits { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 48px; }
        .unlock-benefit { display: flex; gap: 14px; padding: 20px; background: var(--card); border: 1px solid var(--border2); border-radius: 12px; transition: all .25s; }
        .unlock-benefit:hover { border-color: rgba(57,255,20,.2); transform: translateY(-2px); }
        .unlock-benefit-img { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; flex-shrink: 0; border: 1px solid var(--border2); }
        .unlock-benefit-title { font-family: var(--fh); font-size: 13px; font-weight: 700; color: var(--white); margin-bottom: 4px; letter-spacing: .03em; text-transform: uppercase; }
        .unlock-benefit-desc { font-size: 13px; color: var(--dim); line-height: 1.6; }

        .unlock-compare { display: flex; align-items: center; justify-content: center; gap: 16px; max-width: 600px; margin: 0 auto; }
        .unlock-cmp { flex: 1; border-radius: 14px; padding: 28px 20px; text-align: center; }
        .unlock-cmp.bad { background: rgba(255,68,68,.06); border: 1px solid rgba(255,68,68,.12); }
        .unlock-cmp.good { background: rgba(57,255,20,.06); border: 1px solid rgba(57,255,20,.15); }
        .unlock-cmp-lbl { display: block; font-family: var(--fh); font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; margin-bottom: 8px; }
        .unlock-cmp.bad .unlock-cmp-lbl { color: var(--red); }
        .unlock-cmp.good .unlock-cmp-lbl { color: var(--accent); }
        .unlock-cmp-val { display: block; font-family: var(--fh); font-size: 40px; font-weight: 900; line-height: 1; }
        .bad-val { color: var(--red); text-decoration: line-through; opacity: .45; }
        .good-val { color: var(--accent); }
        .unlock-cmp-sub { display: block; font-size: 13px; color: var(--dim); margin-top: 6px; }
        .unlock-vs { font-family: var(--fh); font-size: 14px; font-weight: 900; color: var(--dim); letter-spacing: .1em; }

        @media (max-width: 768px) {
          .unlock-benefits { grid-template-columns: 1fr; }
          .unlock-compare { flex-direction: column; }
          .unlock-vs { transform: rotate(90deg); }
          .unlock-cmp-val { font-size: 32px; }
        }
      `}</style>
    </section>
  );
}
