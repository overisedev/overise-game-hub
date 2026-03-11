export function PiracySection() {
  return (
    <section id="piracy" className="sec-dark">
      <div className="container text-center">
        <div className="reveal">
          <div className="tag g">A verdade que ninguém fala</div>
          <h2 className="h2 on-dark">Pirataria é "de graça"<br /><em>até te custar o PC.</em></h2>
          <p className="sub on-dark center">Você não paga em dinheiro. Paga em horas configurando, em vírus, em jogar sozinho enquanto seus amigos estão online.</p>
        </div>
        <div className="vs-grid reveal rd1">
          <div className="vs-col bad">
            <div className="vs-col-title"><span>✘</span> Pirataria</div>
            <div className="vs-items">
              <div className="vs-item"><div className="vs-ico">✘</div>Baixa um .exe que nem sabe quem fez — e torce pra funcionar</div>
              <div className="vs-item"><div className="vs-ico">✘</div>Quando dá errado, formata o PC. Já te aconteceu?</div>
              <div className="vs-item"><div className="vs-ico">✘</div>3 horas pra fazer crack funcionar. Tutorial de 40 min. DLL faltando.</div>
              <div className="vs-item"><div className="vs-ico">✘</div>Sem online. Amigos jogam juntos, você fica de fora.</div>
              <div className="vs-item"><div className="vs-ico">✘</div>Cada atualização quebra tudo. Volta pra estaca zero.</div>
            </div>
          </div>
          <div className="vs-col good">
            <div className="vs-col-title"><span>✔</span> Overise</div>
            <div className="vs-items">
              <div className="vs-item"><div className="vs-ico">✔</div>Instalação limpa. Sem arquivo suspeito. Antivírus em silêncio.</div>
              <div className="vs-item"><div className="vs-ico">✔</div>Dorme tranquilo. PC limpo, dados seguros.</div>
              <div className="vs-item"><div className="vs-ico">✔</div>1 clique → instala → joga. Sem tutorial, sem configuração.</div>
              <div className="vs-item"><div className="vs-ico">✔</div>Online liberado nos títulos compatíveis.</div>
              <div className="vs-item"><div className="vs-ico">✔</div>Atualiza sozinho. Sempre na versão mais recente.</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .vs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 48px; }
        .vs-col { border-radius: 10px; padding: 28px 24px; text-align: left; }
        .vs-col.bad { background: rgba(255,68,68,.04); border: 1px solid rgba(255,68,68,.1); }
        .vs-col.good { background: rgba(57,255,20,.04); border: 1px solid rgba(57,255,20,.1); }
        .vs-col-title { font-family: var(--fh); font-size: 18px; font-weight: 900; text-transform: uppercase; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
        .vs-col.bad .vs-col-title { color: var(--red); }
        .vs-col.good .vs-col-title { color: var(--accent); }
        .vs-items { display: flex; flex-direction: column; gap: 14px; }
        .vs-item { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: var(--muted); line-height: 1.6; }
        .vs-ico { font-family: var(--fh); font-weight: 900; flex-shrink: 0; width: 22px; text-align: center; }
        .vs-col.bad .vs-ico { color: var(--red); }
        .vs-col.good .vs-ico { color: var(--accent); }
        @media (max-width: 768px) { .vs-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
