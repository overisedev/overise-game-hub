export function GuaranteeSection() {
  return (
    <section id="guarantee" className="sec-dark">
      <div className="container">
        <div className="guarantee-inner reveal text-center">
          <div className="guarantee-ico">
            <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" /></svg>
          </div>
          <h3>Garantia incondicional<br />de <em>7 dias.</em></h3>
          <p>Licencie o desbloqueador, teste com acesso completo por 7 dias. Se a experiência não for como esperava, devolvemos 100% do valor. Simples, sem enrolação.</p>
          <a href="#pricing" className="btn btn-accent btn-lg" style={{ marginBottom: '18px' }}>Começar com Garantia Total →</a>
          <div className="g-tags">
            <div className="g-tag"><span className="chk">✔</span> Suporte ativo</div>
            <div className="g-tag"><span className="chk">✔</span> Devolução em 24h</div>
            <div className="g-tag"><span className="chk">✔</span> Licença vitalícia</div>
          </div>
        </div>
      </div>
      <style>{`
        .guarantee-inner { max-width: 700px; margin: 0 auto; }
        .guarantee-ico { width: 56px; height: 56px; background: rgba(57,255,20,.08); border: 1px solid rgba(57,255,20,.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; }
        .guarantee-ico svg { width: 28px; height: 28px; fill: var(--accent); }
        .guarantee-inner h3 { font-family: var(--fh); font-size: clamp(30px,4.5vw,52px); font-weight: 900; text-transform: uppercase; color: #fff; margin-bottom: 12px; line-height: .95; }
        .guarantee-inner h3 em { color: var(--accent); font-style: normal; }
        .guarantee-inner p { font-size: 15px; color: var(--muted); max-width: 480px; margin: 0 auto 24px; line-height: 1.75; }
        .g-tags { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .g-tag { font-family: var(--fh); font-size: 12px; font-weight: 700; color: var(--dim); display: flex; align-items: center; gap: 6px; letter-spacing: .04em; }
        .g-tag .chk { color: var(--accent); font-weight: 900; }
      `}</style>
    </section>
  );
}
