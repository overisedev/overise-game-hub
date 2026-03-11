import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Pagamento único de R$9,97',
    desc: 'PIX, cartão ou boleto. Sem mensalidade, sem surpresas.',
    img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg',
  },
  {
    num: '02',
    title: 'Acesso instantâneo ao software',
    desc: 'Receba o Overise na hora. Instalação em menos de 2 minutos.',
    img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
  },
  {
    num: '03',
    title: '+1000 jogos desbloqueados',
    desc: 'Todos os jogos pagos da Steam liberados na sua biblioteca oficial.',
    img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg',
  },
  {
    num: '04',
    title: 'Download em velocidade máxima',
    desc: 'Direto dos servidores da Steam. Sem lentidão, sem torrent.',
    img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg',
  },
  {
    num: '05',
    title: 'Jogue online com amigos',
    desc: 'Multiplayer funcionando. Atualizações automáticas incluídas.',
    img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg',
  },
  {
    num: '06',
    title: 'Posse vitalícia',
    desc: 'Os jogos ficam na sua conta pra sempre. Pagou uma vez, acabou.',
    img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg',
  },
];

export function BenefitsResumeSection() {
  return (
    <section className="sec-dark" style={{ padding: '80px 0', overflow: 'hidden' }}>
      <div className="container">
        <motion.div className="text-center reveal" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="tag g">Tudo isso por R$9,97 · paga uma vez</div>
          <h2 className="h2 on-dark">O que você<br /><em>desbloqueia</em></h2>
          <p className="sub on-dark center">Do pagamento ao jogo em menos de 5 minutos.</p>
        </motion.div>

        {/* Zigzag Timeline */}
        <div className="tl-wrap">
          <div className="tl-line" />
          {steps.map((s, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                className={`tl-row ${isLeft ? 'tl-left' : 'tl-right'}`}
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="tl-card">
                  <div className="tl-card-img-wrap">
                    <img src={s.img} alt="" className="tl-card-img" loading="lazy" />
                    <div className="tl-card-num">{s.num}</div>
                  </div>
                  <div className="tl-card-body">
                    <h3 className="tl-card-title">{s.title}</h3>
                    <p className="tl-card-desc">{s.desc}</p>
                  </div>
                </div>
                <div className="tl-dot" />
              </motion.div>
            );
          })}
        </div>

        {/* Price comparison */}
        <motion.div className="tl-compare" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="tl-cmp bad">
            <span className="tl-cmp-lbl">1 jogo na Steam</span>
            <span className="tl-cmp-val bad-val">R$299</span>
            <span className="tl-cmp-sub">um jogo · pra sempre</span>
          </div>
          <div className="tl-vs">VS</div>
          <div className="tl-cmp good">
            <span className="tl-cmp-lbl">Overise — tudo</span>
            <span className="tl-cmp-val good-val">R$9,97</span>
            <span className="tl-cmp-sub">+1000 jogos · pra sempre</span>
          </div>
        </motion.div>

        <div className="text-center" style={{ marginTop: 32 }}>
          <a href="#pricing" className="btn btn-accent btn-lg">Garantir Meu Acesso →</a>
        </div>
      </div>

      <style>{`
        .tl-wrap {
          position: relative;
          max-width: 900px;
          margin: 56px auto 64px;
        }
        .tl-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, rgba(57,255,20,.4), rgba(57,255,20,.05));
          transform: translateX(-50%);
        }
        .tl-row {
          display: flex;
          align-items: center;
          position: relative;
          margin-bottom: 32px;
        }
        .tl-row:last-child { margin-bottom: 0; }

        .tl-left { justify-content: flex-start; padding-right: calc(50% + 28px); }
        .tl-right { justify-content: flex-end; padding-left: calc(50% + 28px); }

        .tl-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--accent);
          border: 3px solid #0b0e11;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 16px rgba(57,255,20,.35);
          z-index: 2;
        }

        .tl-card {
          background: var(--card);
          border: 1px solid var(--border2);
          border-radius: 14px;
          overflow: hidden;
          transition: all .3s;
          width: 100%;
        }
        .tl-card:hover {
          border-color: rgba(57,255,20,.2);
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,.5);
        }

        .tl-card-img-wrap {
          position: relative;
          height: 120px;
          overflow: hidden;
        }
        .tl-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(.7);
        }
        .tl-card-num {
          position: absolute;
          top: 10px;
          left: 12px;
          font-family: var(--fh);
          font-size: 11px;
          font-weight: 900;
          color: var(--accent);
          letter-spacing: .14em;
          background: rgba(0,0,0,.7);
          padding: 4px 10px;
          border-radius: 6px;
          backdrop-filter: blur(4px);
        }

        .tl-card-body { padding: 18px 20px; }
        .tl-card-title {
          font-family: var(--fh);
          font-size: 15px;
          font-weight: 800;
          color: var(--white);
          text-transform: uppercase;
          letter-spacing: .02em;
          margin: 0 0 6px;
        }
        .tl-card-desc {
          font-size: 13px;
          color: var(--dim);
          line-height: 1.6;
          margin: 0;
        }

        /* Compare */
        .tl-compare { display: flex; align-items: center; justify-content: center; gap: 20px; max-width: 620px; margin: 0 auto; }
        .tl-cmp { flex: 1; border-radius: 14px; padding: 28px 20px; text-align: center; }
        .tl-cmp.bad { background: rgba(255,68,68,.06); border: 1px solid rgba(255,68,68,.12); }
        .tl-cmp.good { background: rgba(57,255,20,.06); border: 1px solid rgba(57,255,20,.15); }
        .tl-cmp-lbl { display: block; font-family: var(--fh); font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; margin-bottom: 8px; }
        .tl-cmp.bad .tl-cmp-lbl { color: var(--red); }
        .tl-cmp.good .tl-cmp-lbl { color: var(--accent); }
        .tl-cmp-val { display: block; font-family: var(--fh); font-size: 42px; font-weight: 900; line-height: 1; }
        .bad-val { color: var(--red); text-decoration: line-through; opacity: .45; }
        .good-val { color: var(--accent); }
        .tl-cmp-sub { display: block; font-size: 13px; color: var(--dim); margin-top: 6px; }
        .tl-vs { font-family: var(--fh); font-size: 14px; font-weight: 900; color: var(--dim); letter-spacing: .1em; }

        @media (max-width: 768px) {
          .tl-line { left: 20px; }
          .tl-left, .tl-right { padding-left: 52px; padding-right: 0; justify-content: flex-start; }
          .tl-dot { left: 20px; }
          .tl-card-img-wrap { height: 100px; }
          .tl-compare { flex-direction: column; }
          .tl-vs { transform: rotate(90deg); }
          .tl-cmp-val { font-size: 32px; }
        }
      `}</style>
    </section>
  );
}
