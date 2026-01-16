import { motion } from 'framer-motion';

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel"
    >
      <div className="container flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-neon" />
          <span className="text-xl font-bold tracking-wider">OVERISE</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('catalog')}
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Catálogo
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Como Funciona
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Planos
          </button>
        </nav>

        <a
          href="#pricing"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:shadow-neon transition-all duration-300"
        >
          Começar Agora
        </a>
      </div>
    </motion.header>
  );
}
