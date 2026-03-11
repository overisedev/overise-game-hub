import { useState, useEffect } from 'react';

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`floating-cta ${visible ? 'visible' : ''}`}>
        <a href="#pricing" className="floating-cta-btn">Garantir acesso a partir de R$9,97 →</a>
      </div>
      <style>{`
        .floating-cta { display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 200; padding: 12px 16px; background: rgba(11,14,17,.96); backdrop-filter: blur(16px); border-top: 1px solid var(--border); }
        .floating-cta-btn { display: block; width: 100%; padding: 14px; font-family: var(--fh); font-size: 16px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; background: var(--accent); color: #0b0e11; border-radius: 6px; text-align: center; text-decoration: none; box-shadow: 0 0 20px var(--accent-glow); }
        @media (max-width: 768px) { .floating-cta.visible { display: block; } }
      `}</style>
    </>
  );
}
