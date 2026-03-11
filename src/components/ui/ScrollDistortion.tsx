import { useState, useEffect } from 'react';

export function ScrollDistortion() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  // Only show after scrolling past hero
  if (scrollY < 300 || !isScrolling) return null;

  const intensity = Math.min(scrollY / 3000, 0.12);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
        background: `linear-gradient(180deg, transparent 0%, rgba(57,255,20,${intensity}) 50%, transparent 100%)`,
        opacity: 0.4,
        mixBlendMode: 'overlay',
        transition: 'opacity 0.15s ease-out',
      }}
    />
  );
}
