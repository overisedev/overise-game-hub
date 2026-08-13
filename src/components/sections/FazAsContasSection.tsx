const WISHLIST = [
  { name: 'EA FC 25 (o Fifa)', price: 'R$ 349' },
  { name: 'Call of Duty', price: 'R$ 349' },
  { name: 'Forza Horizon 6', price: 'R$ 299' },
  { name: 'Red Dead Redemption 2', price: 'R$ 199' },
  { name: 'GTA V', price: 'R$ 99' },
  { name: 'Beast of Reincarnation', price: 'R$ 199' },
];

export function FazAsContasSection() {
  return (
    <section className="section-tight container-main">
      <div className="fc-grid">
        {/* Left: pitch */}
        <div className="fc-left">
          <div className="fc-tag">Faz as contas comigo</div>
          <h2 className="fc-title">Quanto custa jogar <span className="neon">tudo que você quer?</span></h2>
          <p className="fc-sub">
            Essa aí do lado é só a lista de desejos de um ano. E todo ano sai Fifa novo,
            F1 novo, Call of Duty novo... a conta nunca fecha.
          </p>

          <div className="fc-punch">
            <div className="fc-punch-glow" />
            <p className="fc-punch-big">
              A lista inteira, e mais de 40.000 jogos, por <span className="neon">R$ 49,97</span>.
            </p>
            <p className="fc-punch-sub">Uma vez. Pra sempre. Sem mensalidade. Sem pagar de novo no próximo lançamento.</p>
            <a href="#planos" className="fc-cta">Liberar minha Steam</a>
          </div>
        </div>

        {/* Right: receipt */}
        <div className="fc-receipt">
          <div className="fc-r-title">Lista de desejos na Steam</div>
          <div className="fc-r-div" />
          {WISHLIST.map((g) => (
            <div className="fc-r-row" key={g.name}>
              <span className="fc-r-name">{g.name}</span>
              <span className="fc-r-dots" />
              <span className="fc-r-price">{g.price}</span>
            </div>
          ))}
          <div className="fc-r-div" />
          <div className="fc-r-row fc-r-total">
            <span className="fc-r-name">TOTAL</span>
            <span className="fc-r-dots" />
            <span className="fc-r-price fc-r-red">R$ 1.494</span>
          </div>
          <div className="fc-r-note">* isso se não sair mais nenhum lançamento até dezembro</div>
        </div>
      </div>

      <style>{`
        .fc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 34px; align-items: center; max-width: 1000px; margin: 0 auto; }
        @media (max-width: 860px) { .fc-grid { grid-template-columns: 1fr; gap: 26px; } }

        /* LEFT */
        .fc-tag {
          display: inline-block; padding: 8px 16px; border-radius: 999px;
          background: rgba(0,255,65,.12); border: 1px solid rgba(0,255,65,.35);
          color: var(--neon); font-weight: 900; font-size: 11px; text-transform: uppercase;
          letter-spacing: 1.5px; margin-bottom: 16px;
        }
        .fc-title { font-size: clamp(28px, 4vw, 42px); font-weight: 950; color: #fff; letter-spacing: -1px; margin: 0; line-height: 1.06; }
        .fc-title .neon { color: var(--neon); }
        .fc-sub { color: var(--muted); font-size: 16px; line-height: 1.6; margin: 14px 0 0; max-width: 440px; }

        .fc-punch {
          position: relative; overflow: hidden; margin-top: 26px;
          border: 1px solid rgba(0,255,65,.4); border-radius: var(--r2);
          background: linear-gradient(150deg, rgba(0,255,65,.06), rgba(0,0,0,.35));
          padding: 24px 26px; box-shadow: 0 20px 60px rgba(0,255,65,.07);
        }
        .fc-punch-glow { position: absolute; top: -50%; left: 30%; width: 320px; height: 200px; background: radial-gradient(ellipse, rgba(0,255,65,.14), transparent 70%); pointer-events: none; }
        .fc-punch-big { position: relative; font-family: 'Sora', sans-serif; font-weight: 900; font-size: 22px; line-height: 1.25; color: #fff; margin: 0; }
        .fc-punch-big .neon { color: var(--neon); }
        .fc-punch-sub { position: relative; color: var(--muted); font-size: 14px; line-height: 1.55; margin: 10px 0 0; }
        .fc-cta {
          position: relative; display: inline-block; margin-top: 18px; background: var(--neon); color: #000;
          font-family: 'Sora', sans-serif; font-weight: 900; border-radius: 12px; padding: 13px 22px;
          font-size: 15px; text-decoration: none; transition: all .18s ease; box-shadow: 0 0 25px rgba(0,255,65,.3);
        }
        .fc-cta:hover { filter: brightness(1.08); transform: translateY(-1px); box-shadow: 0 0 35px rgba(0,255,65,.5); }

        /* RIGHT: receipt */
        .fc-receipt {
          background: #f3efe4; color: #2b2b2b; border-radius: var(--r2);
          padding: 30px 34px; font-family: ui-monospace, 'Consolas', 'Courier New', monospace;
          box-shadow: 0 26px 70px rgba(0,0,0,.55); border: 1px solid rgba(0,0,0,.06);
        }
        .fc-r-title { text-align: center; font-weight: 700; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; }
        .fc-r-div { border-top: 2px dashed #c9c1ad; margin: 16px 0; }
        .fc-r-row { display: flex; align-items: flex-end; font-size: 14px; padding: 7px 0; }
        .fc-r-name { white-space: nowrap; }
        .fc-r-dots { flex: 1; border-bottom: 2px dotted #b8b0a0; margin: 0 8px 5px; height: 0; }
        .fc-r-price { white-space: nowrap; font-weight: 700; }
        .fc-r-total .fc-r-name { font-weight: 700; letter-spacing: 1px; }
        .fc-r-total .fc-r-price { font-size: 17px; }
        .fc-r-red { color: #c0392b; }
        .fc-r-note { text-align: center; font-size: 11px; color: #8a8272; margin-top: 14px; line-height: 1.5; }

        @media (max-width: 860px) { .fc-receipt { padding: 24px 22px; } .fc-r-row { font-size: 13px; } }
      `}</style>
    </section>
  );
}
