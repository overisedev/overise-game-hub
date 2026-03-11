export function Footer() {
  return (
    <footer style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      padding: '36px 0 18px',
    }}>
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">OVER<span>ISE</span></div>
            <p className="footer-desc">O desbloqueador de Steam que libera +1000 jogos. R$9,97 taxa única.</p>
          </div>
          <div className="footer-col">
            <h5>Produto</h5>
            <a href="#how">Como Funciona</a>
            <a href="#verify">Verificar Jogo</a>
            <a href="#games">Catálogo</a>
            <a href="#pricing">Planos</a>
          </div>
          <div className="footer-col">
            <h5>Suporte</h5>
            <a href="#">WhatsApp</a>
            <a href="#">Reembolso</a>
            <a href="#">Termos de Uso</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2025 Overise. Todos os direitos reservados.</p>
          <div className="footer-pay">
            <div className="pay-chip">PIX</div>
            <div className="pay-chip">CARTÃO</div>
            <div className="pay-chip">BOLETO</div>
          </div>
        </div>
      </div>
      <style>{`
        .footer-inner { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 28px; margin-bottom: 24px; }
        .footer-logo { font-family: var(--fh); font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 6px; letter-spacing: .12em; }
        .footer-logo span { color: var(--accent); }
        .footer-desc { font-size: 13px; color: var(--dim); max-width: 220px; line-height: 1.7; }
        .footer-col h5 { font-family: var(--fh); font-size: 10px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--dim); margin-bottom: 10px; }
        .footer-col a { display: block; font-size: 13px; color: var(--dim); margin-bottom: 6px; transition: color .2s; }
        .footer-col a:hover { color: var(--accent); }
        .footer-bottom { border-top: 1px solid var(--border); padding-top: 14px; display: flex; justify-content: space-between; align-items: center; }
        .footer-copy { font-size: 12px; color: var(--dim); }
        .footer-pay { display: flex; gap: 6px; }
        .pay-chip { background: var(--card); border: 1px solid var(--border); border-radius: 3px; padding: 3px 10px; font-family: var(--fh); font-size: 9px; font-weight: 700; color: var(--dim); letter-spacing: .08em; }
        @media (max-width: 768px) {
          .footer-inner { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
