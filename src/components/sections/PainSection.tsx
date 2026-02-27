export function PainSection() {
  return (
    <section id="problema" className="section container-main">
      <div className="pain-copy">
        <span className="pain-eyebrow">A realidade que ninguém fala</span>
        <h2 className="pain-headline">
          Os jogos mais<br />famosos do mundo<br />existem. Você só<br />não tem <em>acesso.</em>
        </h2>
        <p className="pain-subline">
          Elden Ring. GTA V. God of War. Cyberpunk 2077. Esses títulos existem há anos. O mundo inteiro joga. Mas a Steam cobra R$250 por jogo — e isso te mantém de fora.
        </p>
      </div>

      <div className="pain-facts">
        <div className="pf-card">
          <div className="pf-num">R$249</div>
          <div className="pf-label">
            É o que a Steam cobra por Elden Ring. Só esse. Um jogo. Que seus amigos já jogaram e já estão no próximo.
          </div>
        </div>
        <div className="pf-card">
          <div className="pf-num">R$4.200+</div>
          <div className="pf-label">
            É o que custaria ter acesso aos jogos mais famosos do mundo comprando um por um na Steam.
          </div>
        </div>
        <div className="pf-card">
          <div className="pf-num green">R$9,97</div>
          <div className="pf-label">
            É o que você paga na Overise pra desbloquear esses mesmos jogos. Por mês. Sem ter que escolher um só.
          </div>
        </div>
      </div>

      <style>{`
        .pain-copy {
          text-align: center;
          max-width: 660px;
          margin: 0 auto 56px;
        }
        .pain-eyebrow {
          font-family: 'Sora', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--neon);
          margin-bottom: 14px;
          display: block;
        }
        .pain-headline {
          font-size: clamp(32px, 6vw, 64px);
          font-weight: 900;
          line-height: .95;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: -0.5px;
          margin: 0 0 18px;
        }
        .pain-headline em {
          color: var(--neon);
          font-style: normal;
        }
        .pain-subline {
          font-size: 15px;
          color: var(--muted2);
          max-width: 520px;
          line-height: 1.75;
          margin: 0 auto;
        }
        .pain-facts {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 768px) {
          .pain-facts {
            grid-template-columns: 1fr;
          }
        }
        .pf-card {
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.06);
          border-radius: var(--r);
          padding: 28px;
          position: relative;
          overflow: hidden;
          transition: border-color .3s, transform .3s;
        }
        .pf-card:hover {
          border-color: rgba(0,255,65,.2);
          transform: translateY(-4px);
        }
        .pf-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ff3b3b, transparent);
          opacity: 0;
          transition: opacity .3s;
        }
        .pf-card:hover::before {
          opacity: 1;
        }
        .pf-card:last-child::before {
          background: linear-gradient(90deg, transparent, var(--neon), transparent);
        }
        .pf-num {
          font-family: 'Sora', sans-serif;
          font-size: clamp(36px, 5vw, 54px);
          font-weight: 900;
          line-height: 1;
          color: #ff3b3b;
          margin-bottom: 8px;
        }
        .pf-num.green {
          color: var(--neon);
        }
        .pf-label {
          font-size: 13px;
          color: var(--muted2);
          line-height: 1.65;
        }
      `}</style>
    </section>
  );
}
