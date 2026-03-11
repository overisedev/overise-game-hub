export function Header() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(11,14,17,.94)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <a href="#" className="logo" style={{
          fontFamily: 'var(--fh)',
          fontSize: '24px',
          fontWeight: 900,
          letterSpacing: '.12em',
          color: '#fff',
          textTransform: 'uppercase',
        }}>
          OVER<span style={{ color: 'var(--accent)' }}>ISE</span>
        </a>
        <nav style={{ display: 'flex', gap: '24px' }} className="nav-desktop">
          <a href="#how" style={navStyle}>Como Funciona</a>
          <a href="#games" style={navStyle}>Jogos</a>
          <a href="#verify" style={navStyle}>Disponibilidade</a>
          <a href="#pricing" style={navStyle}>Planos</a>
          <a href="#faq" style={navStyle}>FAQ</a>
        </nav>
        <a href="#pricing" className="btn btn-accent btn-sm header-cta">Garantir Acesso</a>
      </div>
      <style>{`
        .nav-desktop a:hover { color: var(--white) !important; }
        @media (max-width: 768px) {
          .nav-desktop, .header-cta { display: none !important; }
        }
      `}</style>
    </header>
  );
}

const navStyle: React.CSSProperties = {
  fontFamily: 'var(--fh)',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '.08em',
  textTransform: 'uppercase',
  color: 'var(--dim)',
  transition: 'color .2s',
};
