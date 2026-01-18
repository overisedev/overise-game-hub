import { forwardRef } from 'react';

export const Footer = forwardRef<HTMLElement>(function Footer(_, ref) {
  return (
    <footer ref={ref} className="py-11 border-t" style={{ borderColor: 'rgba(255,255,255,.06)', color: '#606060', fontSize: '12px' }}>
      <div className="container-main text-center">
        <p>© 2024 Overise Software. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
});
