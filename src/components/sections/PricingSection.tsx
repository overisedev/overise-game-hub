function fireIC(value: number) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'InitiateCheckout', { value, currency: 'BRL' });
  }
}

function getUtms(): string {
  const params = new URLSearchParams(window.location.search);
  const utmParams = new URLSearchParams();
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','src','sck','xcod','fbclid','gclid'].forEach(k => {
    const v = params.get(k);
    if (v) utmParams.append(k, v);
  });
  try {
    const stored = localStorage.getItem('__utmify_session_data');
    if (stored) {
      const p = JSON.parse(stored);
      if (p.utm_source && !utmParams.has('utm_source')) utmParams.append('utm_source', p.utm_source);
    }
  } catch {}
  if (utmParams.toString()) return utmParams.toString();
  const match = document.cookie.match(/overise_utms=([^;]+)/);
  if (match) return decodeURIComponent(match[1]);
  try { return sessionStorage.getItem('overise_utms') || ''; } catch { return ''; }
}

function checkout(url: string, value: number) {
  fireIC(value);
  const utms = getUtms();
  const sep = url.includes('?') ? '&' : '?';
  const finalUrl = utms ? `${url}${sep}${utms}` : url;
  setTimeout(() => { window.location.href = finalUrl; }, 800);
}

const PLANS = [
  {
    name: 'Básico',
    forText: 'Para experimentar',
    oldPrice: 'R$29,97',
    price: '9',
    cents: ',97',
    freq: 'pagamento único',
    url: 'https://www.ggcheckout.com/checkout/v4/6Ed9FJE8HXebnxREUKCQ',
    value: 9.97,
    featured: false,
    vitalicio: false,
    features: [
      { text: '+1000 jogos desbloqueados', yes: true, bold: true },
      { text: 'Entrega instantânea', yes: true },
      { text: 'Atualizações por 6 meses', yes: true },
      { text: 'Anti-ban e seguro', yes: true },
      { text: 'Suporte por email', yes: true },
      { text: 'Garantia de 7 dias', yes: true },
      { text: 'Online desbloqueado', yes: false },
      { text: 'Jogos Rockstar / Ubisoft', yes: true },
    ],
    btnText: 'Assinar Básico',
    btnClass: '',
    tag: null,
  },
  {
    name: 'Avançado',
    forText: 'O favorito dos jogadores',
    oldPrice: 'R$59,97',
    price: '19',
    cents: ',97',
    freq: 'pagamento único',
    url: 'https://www.ggcheckout.com/checkout/v4/BvIb4ex53LM73mU3DJsX',
    value: 19.97,
    featured: true,
    vitalicio: false,
    features: [
      { text: '+1000 jogos desbloqueados', yes: true, bold: true },
      { text: 'Entrega instantânea', yes: true },
      { text: 'Atualizações por 1 ano', yes: true },
      { text: 'Anti-ban e seguro', yes: true },
      { text: 'Online desbloqueado', yes: true },
      { text: 'Jogos Rockstar / Ubisoft', yes: true },
      { text: 'Suporte WhatsApp', yes: true },
      { text: 'Garantia de 7 dias', yes: true },
    ],
    btnText: 'Assinar Avançado',
    btnClass: 'pln-btn--dest',
    tag: 'MAIS ESCOLHIDO',
  },
  {
    name: 'Vitalício',
    forText: 'Acesso total, pra sempre',
    oldPrice: 'R$149,97',
    price: '49',
    cents: ',97',
    freq: 'pagamento único',
    url: 'https://www.ggcheckout.com/checkout/v4/pdDOCAlm20ZQxjUiglc3',
    value: 49.97,
    featured: false,
    vitalicio: true,
    features: [
      { text: '+1000 jogos desbloqueados', yes: true, bold: true },
      { text: 'Entrega instantânea', yes: true },
      { text: 'Atualizações vitalícias', yes: true, bold: true },
      { text: 'Anti-ban e seguro', yes: true },
      { text: 'Online desbloqueado', yes: true },
      { text: 'Jogos Rockstar / Ubisoft', yes: true },
      { text: 'Suporte WhatsApp prioritário', yes: true, bold: true },
      { text: 'Acesso a lançamentos', yes: true },
    ],
    btnText: 'Assinar Vitalício',
    btnClass: 'pln-btn--vit',
    tag: 'MELHOR CUSTO-BENEFÍCIO',
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="sec-dark">
      <div className="container text-center">
        <div className="reveal">
          <div className="tag g">Planos e preços</div>
          <h2 className="h2 on-dark">Escolha seu<br /><em>plano de acesso</em></h2>
          <p className="sub on-dark center">Pague uma vez, jogue pra sempre. Sem mensalidade, sem surpresas.</p>
        </div>
        <div className="plans-row reveal rd1">
          {PLANS.map((plan, i) => (
            <div key={i} className={`pln ${plan.featured ? 'pln--dest' : ''} ${plan.vitalicio ? 'pln--vit' : ''}`}>
              {plan.tag && <div className={`pln-tag ${plan.vitalicio ? 'pln-tag--vit' : ''}`}>{plan.tag}</div>}
              <div className="pln-head">
                <div className="pln-name">{plan.name}</div>
                <div className="pln-for">{plan.forText}</div>
              </div>
              <div className="pln-price-wrap">
                <div className="pln-old">de <s>{plan.oldPrice}</s></div>
                <div className="pln-price">R$<span>{plan.price}</span>{plan.cents}</div>
                <div className="pln-freq">{plan.freq}</div>
              </div>
              <ul className="pln-feats">
                {plan.features.map((f, j) => (
                  <li key={j} className={f.yes ? 'yes' : 'no'}>
                    {f.bold ? <strong>{f.text}</strong> : f.text}
                  </li>
                ))}
              </ul>
              <button className={`pln-btn ${plan.btnClass}`} onClick={() => checkout(plan.url, plan.value)}>
                {plan.btnText}
              </button>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '28px' }} className="reveal rd2">
          <div style={{ fontFamily: 'var(--fh)', fontSize: '11px', fontWeight: 700, color: 'var(--dim)', letterSpacing: '.08em' }}>PIX · CARTÃO · BOLETO · PAGAMENTO ÚNICO</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.7 }}><span style={{ color: 'var(--text)' }}>Acesso imediato</span> · <span style={{ color: 'var(--text)' }}>Garantia de 7 dias</span></div>
        </div>
      </div>
      <style>{`
        .plans-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 48px; align-items: start; }
        .pln { background: var(--card); border: 1px solid var(--border2); border-radius: 16px; padding: 32px 28px; text-align: center; position: relative; display: flex; flex-direction: column; transition: border-color .3s, transform .3s, box-shadow .3s; }
        .pln:hover { border-color: rgba(255,255,255,.12); transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,.4); }
        .pln--dest { border: 2px solid var(--accent); box-shadow: 0 0 60px rgba(57,255,20,.07),0 24px 64px rgba(0,0,0,.5); padding: 40px 28px 32px; animation: glowPulse 4s ease-in-out infinite; }
        .pln--vit { border: 1px solid rgba(255,107,53,.2); }
        .pln--vit:hover { border-color: rgba(255,107,53,.4); }
        .pln-tag { position: absolute; top: 0; left: 50%; transform: translate(-50%,-50%); font-family: var(--fh); font-size: 10px; font-weight: 800; letter-spacing: .16em; padding: 6px 22px; background: var(--accent); color: #0b0e11; border-radius: 50px; white-space: nowrap; }
        .pln-tag--vit { background: #ff6b35; color: #fff; }
        .pln-head { margin-bottom: 20px; }
        .pln-name { font-family: var(--fh); font-size: 28px; font-weight: 900; text-transform: uppercase; color: var(--white); letter-spacing: .02em; line-height: 1; }
        .pln--dest .pln-name { font-size: 32px; }
        .pln-for { font-size: 14px; color: var(--dim); margin-top: 4px; }
        .pln-price-wrap { margin-bottom: 24px; }
        .pln-old { font-size: 13px; color: var(--dim); }
        .pln-old s { color: var(--red); opacity: .5; }
        .pln-price { font-family: var(--fh); font-weight: 900; font-size: 22px; color: var(--accent); line-height: 1; margin: 6px 0 4px; }
        .pln-price span { font-size: 56px; }
        .pln--dest .pln-price span { font-size: 64px; }
        .pln-freq { font-family: var(--fh); font-size: 11px; color: var(--dim); letter-spacing: .1em; text-transform: uppercase; }
        .pln-feats { list-style: none; padding: 0; margin: 0 auto; display: flex; flex-direction: column; gap: 12px; flex-grow: 1; max-width: 280px; text-align: left; }
        .pln-feats li { font-size: 14px; font-weight: 500; display: flex; align-items: flex-start; gap: 10px; line-height: 1.4; }
        .pln-feats li strong { font-weight: 700; color: var(--white); }
        .pln-feats li.yes { color: var(--text); }
        .pln-feats li.yes::before { content: ""; width: 20px; height: 20px; flex-shrink: 0; background: var(--accent); border-radius: 6px; display: inline-block; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%230b0e11' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: center; background-size: 11px; }
        .pln-feats li.no { color: var(--dim); opacity: .3; }
        .pln-feats li.no::before { content: ""; width: 20px; height: 20px; flex-shrink: 0; background: rgba(255,255,255,.06); border-radius: 6px; display: inline-block; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23727a85' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: center; background-size: 10px; }
        .pln-btn { display: block; width: 100%; padding: 16px; font-family: var(--fh); font-size: 16px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; border-radius: 10px; text-align: center; cursor: pointer; transition: all .25s; margin-top: 24px; border: none; background: var(--accent); color: #0b0e11; box-shadow: 0 0 16px rgba(57,255,20,.12); }
        .pln-btn:hover { background: #4dff33; transform: translateY(-2px); box-shadow: 0 4px 24px rgba(57,255,20,.2); }
        .pln-btn--dest { font-size: 18px; padding: 18px; box-shadow: 0 0 32px var(--accent-glow); }
        .pln-btn--vit { background: #ff6b35; color: #fff; box-shadow: 0 0 16px rgba(255,107,53,.15); }
        .pln-btn--vit:hover { background: #ff8050; box-shadow: 0 4px 24px rgba(255,107,53,.25); }
        @media (max-width: 900px) {
          .plans-row { grid-template-columns: 1fr; max-width: 420px; margin-left: auto; margin-right: auto; gap: 20px; }
          .pln--dest { order: 0; }
          .pln-price span { font-size: 48px !important; }
        }
      `}</style>
    </section>
  );
}
