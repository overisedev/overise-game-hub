import { useState } from 'react';

const FAQS = [
  { q: 'É seguro? Posso confiar?', a: 'Sim. Instalação 100% limpa. Sem crack, sem arquivo suspeito, sem vírus. Mais de 5.000 clientes ativos comprovam.' },
  { q: 'Como funciona o acesso?', a: 'Você recebe o Launcher por e-mail após o pagamento. Instala no PC, insere sua licença, e a biblioteca completa é liberada em minutos.' },
  { q: 'Precisa de conta na Steam?', a: 'Sim. Você usa sua conta normal da Steam. Os jogos aparecem disponíveis na sua biblioteca.' },
  { q: 'Posso cancelar a qualquer momento?', a: 'Não há o que cancelar — a licença é vitalícia e o pagamento é único. Se nos primeiros 7 dias você não gostar, devolvemos 100% do valor.' },
  { q: 'Funciona online?', a: 'Sim. Os títulos compatíveis com modo online funcionam normalmente.' },
  { q: 'A licença expira?', a: 'A licença é vitalícia. Uma vez pago, o acesso é seu pra sempre. Inclui atualizações e suporte.' },
  { q: 'Aceita PIX, cartão e boleto?', a: 'Sim, todos. PIX libera o acesso em segundos. É taxa única — sem cobrança recorrente.' },
  { q: 'Tem suporte?', a: 'Sim. WhatsApp com gente real. Não é bot — é uma pessoa que te responde rápido.' },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="sec-dark">
      <div className="container">
        <div className="reveal text-center">
          <div className="tag g">Dúvidas frequentes</div>
          <h2 className="h2 on-dark">FAQ</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item reveal">
              <button className={`faq-q ${openIdx === i ? 'open' : ''}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                {f.q}
                <span className="faq-chev">▼</span>
              </button>
              <div className={`faq-a ${openIdx === i ? 'open' : ''}`}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .faq-list { max-width: 680px; margin: 44px auto 0; text-align: left; }
        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-q { width: 100%; background: none; color: var(--white); font-family: var(--fh); font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: .03em; padding: 18px 0; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: color .2s; border: none; }
        .faq-q:hover { color: var(--accent); }
        .faq-chev { width: 24px; height: 24px; border-radius: 4px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 11px; color: var(--accent); transition: all .25s; flex-shrink: 0; }
        .faq-q.open .faq-chev { background: var(--accent); color: #0b0e11; border-color: var(--accent); transform: rotate(180deg); }
        .faq-a { font-size: 14px; color: var(--muted); line-height: 1.8; max-height: 0; overflow: hidden; transition: max-height .35s ease, padding .35s ease; padding: 0; }
        .faq-a.open { max-height: 300px; padding-bottom: 18px; }
      `}</style>
    </section>
  );
}
