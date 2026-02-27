const beforeItems = [
  { icon: '😶', title: 'Você conhece o jogo mas não pode jogar', desc: 'Todo mundo fala. Todo mundo recomenda. Você assiste gameplay no YouTube porque R$249 não é brincadeira.' },
  { icon: '⏳', title: 'Sua wishlist da Steam só cresce', desc: 'São 12, 15, 20 jogos lá parados. Você adiciona mas nunca compra. Fica esperando uma promoção que nunca é boa o suficiente.' },
  { icon: '🦠', title: 'Pirataria: a única saída — e arriscada', desc: 'Site suspeito, crack duvidoso, antivírus gritando. Às vezes funciona. Às vezes você formata o PC e perde tudo.' },
  { icon: '😞', title: 'A sensação de estar de fora', desc: 'Seus amigos já zeraram Elden Ring. Já estão no próximo. E você ainda tá no começo — ou nem começou.' },
];

const afterItems = [
  { icon: '✅', title: 'O jogo que você queria? É seu. Agora.', desc: 'Sem esperar promoção. Sem pesquisar preço. Você abriu a Overise, escolheu, instalou. Em 5 minutos está jogando.' },
  { icon: '♾️', title: 'Sua wishlist virou sua biblioteca', desc: 'Aqueles 15 jogos parados na wishlist? Todos acessíveis agora. Você decide a ordem. Você decide o ritmo.' },
  { icon: '🛡️', title: 'Seguro, limpo, sem risco', desc: 'Sem crack, sem site suspeito, sem vírus. Você instala com a tranquilidade de quem tem acesso legítimo.' },
  { icon: '🏆', title: 'Você está na conversa de novo', desc: 'Quando o próximo lançamento chegar, você não vai assistir de longe. Você vai instalar e jogar junto.' },
];

export function BeforeAfterSection() {
  return (
    <section id="comparacao" className="section container-main">
      <div className="ba-intro">
        <span className="ba-eyebrow">A virada</span>
        <h2 className="ba-headline">Sem acesso.<br /><em>Com acesso.</em></h2>
      </div>

      <div className="ba-grid">
        <div className="ba-col ba-before">
          <div className="ba-hdr">
            <span className="ba-hdr-icon">🚫</span>
            <div className="ba-hdr-title ba-red">Sem acesso</div>
          </div>
          <div className="ba-items">
            {beforeItems.map((item, i) => (
              <div key={i} className="ba-item">
                <div className="ba-icon">{item.icon}</div>
                <div>
                  <div className="ba-text-title">{item.title}</div>
                  <div className="ba-text-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ba-col ba-after">
          <div className="ba-hdr">
            <span className="ba-hdr-icon">🔓</span>
            <div className="ba-hdr-title ba-green">Com acesso</div>
          </div>
          <div className="ba-items">
            {afterItems.map((item, i) => (
              <div key={i} className="ba-item">
                <div className="ba-icon">{item.icon}</div>
                <div>
                  <div className="ba-text-title">{item.title}</div>
                  <div className="ba-text-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ba-intro {
          text-align: center;
          margin-bottom: 56px;
        }
        .ba-eyebrow {
          font-family: 'Sora', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--neon);
          margin-bottom: 14px;
          display: block;
        }
        .ba-headline {
          font-size: clamp(32px, 6vw, 64px);
          font-weight: 900;
          line-height: .95;
          color: #fff;
          text-transform: uppercase;
          margin: 0;
        }
        .ba-headline em {
          color: var(--neon);
          font-style: normal;
        }
        .ba-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          border-radius: var(--r2);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.06);
        }
        @media (max-width: 768px) {
          .ba-grid { grid-template-columns: 1fr; }
        }
        .ba-col {
          padding: 36px 28px;
        }
        .ba-before {
          background: rgba(255,59,59,.03);
        }
        .ba-after {
          background: rgba(0,255,65,.03);
        }
        .ba-hdr {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .ba-hdr-icon {
          font-size: 26px;
        }
        .ba-hdr-title {
          font-family: 'Sora', sans-serif;
          font-size: 20px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .04em;
        }
        .ba-red { color: #ff3b3b; }
        .ba-green { color: var(--neon); }
        .ba-items {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .ba-item {
          display: flex;
          gap: 12px;
        }
        .ba-icon {
          font-size: 18px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .ba-text-title {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 3px;
        }
        .ba-text-desc {
          font-size: 13px;
          color: var(--muted2);
          line-height: 1.65;
        }
      `}</style>
    </section>
  );
}
