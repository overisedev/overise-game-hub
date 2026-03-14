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
          <h2 className="h2 on-dark" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>O que você<br /><em>desbloqueia</em></h2>
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
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
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

        <div className="text-center" style={{ marginTop: 8 }}>
          <a href="#pricing" className="btn btn-accent btn-lg">Garantir Meu Acesso →</a>
        </div>
      </div>

      <style>{`
        .tl-wrap {
          position: relative;
          max-width: 880px;
          margin: 56px auto 48px;
        }
        .tl-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, rgba(57,255,20,.5), rgba(57,255,20,.08));
          transform: translateX(-50%);
        }
        .tl-row {
          display: flex;
          align-items: center;
          position: relative;
          margin-bottom: 28px;
        }
        .tl-row:last-child { margin-bottom: 0; }

        .tl-left { justify-content: flex-start; padding-right: calc(50% + 32px); }
        .tl-right { justify-content: flex-end; padding-left: calc(50% + 32px); }

        .tl-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--accent);
          border: 3px solid #000;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 12px rgba(57,255,20,.3);
          z-index: 2;
        }

        .tl-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          transition: all .3s;
          width: 100%;
          box-shadow: 0 2px 12px rgba(0,0,0,.3);
        }
        .tl-card:hover {
          border-color: rgba(57,255,20,.25);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,.4);
        }

        .tl-card-img-wrap {
          position: relative;
          overflow: hidden;
          background: #1a1a1a;
        }
        .tl-card-img {
          width: 100%;
          height: auto;
          display: block;
        }
        .tl-card-num {
          position: absolute;
          top: 10px;
          left: 10px;
          font-family: var(--fh);
          font-size: 10px;
          font-weight: 900;
          color: #fff;
          letter-spacing: .12em;
          background: rgba(0,0,0,.65);
          padding: 4px 10px;
          border-radius: 6px;
          backdrop-filter: blur(6px);
        }

        .tl-card-body { padding: 16px 18px; }
        .tl-card-title {
          font-family: var(--fh);
          font-size: 14px;
          font-weight: 800;
          color: var(--white);
          text-transform: uppercase;
          letter-spacing: .02em;
          margin: 0 0 4px;
        }
        .tl-card-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .tl-line { left: 18px; }
          .tl-left, .tl-right { padding-left: 48px; padding-right: 0; justify-content: flex-start; }
          .tl-dot { left: 18px; }
        }
      `}</style>
    </section>
  );
}
