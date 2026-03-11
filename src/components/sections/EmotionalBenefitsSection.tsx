const EMO_DATA = [
  { title: 'Acaba a ansiedade da lista de desejos', desc: 'Sabe aquele jogo que você adiciona, olha o preço, e fecha a aba frustrado? Nunca mais. Ele já é seu.', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg' },
  { title: 'Joga com seus amigos de novo', desc: 'Chega de ficar de fora porque não tem o jogo. Agora quando o grupo combina, você entra junto.', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg' },
  { title: 'Sexta à noite = jogo novo', desc: 'Em vez de assistir gameplay no YouTube, você instala e joga. Qualquer jogo. Na hora.', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg' },
  { title: 'Dorme sem medo de vírus', desc: 'Sem torrent, sem .exe suspeito. Instala limpo, joga tranquilo, PC inteiro.', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg' },
  { title: 'Para de se sentir excluído', desc: 'R$250 num jogo não cabe no orçamento. R$9,97 taxa única cabe. E vem com +1000 jogos pra sempre.', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg' },
  { title: 'Experimenta sem culpa', desc: 'Quer testar um jogo? Instala. Não curtiu, troca. Sua licença dá acesso a todos.', img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg' },
];

export function EmotionalBenefitsSection() {
  return (
    <section className="sec-dark">
      <div className="container text-center">
        <div className="reveal">
          <div className="tag g">Além das features</div>
          <h2 className="h2 on-dark">O que muda na<br /><em>sua vida de gamer</em></h2>
          <p className="sub on-dark center">Qualquer um lista features. O que importa é o que muda quando a biblioteca não tem mais cadeado.</p>
        </div>
        <div className="emo-grid reveal rd1">
          {EMO_DATA.map((e, i) => (
            <div key={i} className="emo-card">
              <img className="emo-card-img" src={e.img} alt="" loading="lazy" />
              <div className="emo-title">{e.title}</div>
              <div className="emo-desc">{e.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .emo-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-top: 48px; }
        .emo-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 28px 22px; transition: all .25s; position: relative; overflow: hidden; text-align: left; }
        .emo-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--accent); opacity: 0; transition: opacity .25s; }
        .emo-card:hover { border-color: rgba(57,255,20,.12); transform: translateY(-6px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,.3); }
        .emo-card:hover::before { opacity: 1; }
        .emo-card-img { width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 6px; margin-bottom: 16px; opacity: .7; }
        .emo-title { font-family: var(--fh); font-size: 16px; font-weight: 800; color: var(--white); text-transform: uppercase; letter-spacing: .02em; margin-bottom: 8px; line-height: 1.15; }
        .emo-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }
        @media (max-width: 768px) { .emo-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
