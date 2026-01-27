interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-[1000]" style={{
      background: 'rgba(5,5,5,.72)',
      borderBottom: '1px solid rgba(255,255,255,.06)',
      backdropFilter: 'blur(14px)',
    }}>
      <div className="container-main">
        <nav className="flex items-center justify-between py-3.5 gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-0 font-black tracking-tight uppercase text-lg text-white whitespace-nowrap">
            OVER<span style={{ color: 'var(--neon)' }}>ISE</span>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-3.5 font-bold" style={{ color: 'var(--muted2)' }}>
            <a href="#catalogo" className="px-3 py-2.5 rounded-xl transition-all duration-200 hover:text-white hover:bg-white/5 hover:-translate-y-0.5">
              Jogos
            </a>
            <a href="#planos" className="px-3 py-2.5 rounded-xl transition-all duration-200 hover:text-white hover:bg-white/5 hover:-translate-y-0.5">
              Planos
            </a>
            <a href="#faq" className="px-3 py-2.5 rounded-xl transition-all duration-200 hover:text-white hover:bg-white/5 hover:-translate-y-0.5">
              FAQ
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex gap-2.5 items-center">
            <a href="#planos" className="btn-primary">
              Quero meus jogos
            </a>
          </div>
        </nav>
      </div>

      <style>{`
        .btn-ghost {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(0,0,0,.32);
          color: #fff;
          font-weight: 800;
          letter-spacing: .5px;
          text-transform: uppercase;
          font-size: 12px;
          cursor: pointer;
          transition: .22s ease;
          overflow: hidden;
          white-space: nowrap;
        }
        .btn-ghost:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,.18);
          box-shadow: var(--shadowSoft);
        }
        .btn-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 18px;
          border-radius: 12px;
          border: none;
          background: var(--neon);
          color: #000;
          font-weight: 800;
          letter-spacing: .5px;
          text-transform: uppercase;
          font-size: 12px;
          cursor: pointer;
          transition: .22s ease;
          white-space: nowrap;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }
      `}</style>
    </header>
  );
}
