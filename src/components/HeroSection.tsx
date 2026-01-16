import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import type { Game } from '@/types/game';

interface HeroSectionProps {
  featuredGames: Game[];
}

export function HeroSection({ featuredGames }: HeroSectionProps) {
  const [currentGame, setCurrentGame] = useState(0);

  useEffect(() => {
    if (featuredGames.length === 0) return;
    const interval = setInterval(() => {
      setCurrentGame((prev) => (prev + 1) % featuredGames.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredGames.length]);

  const game = featuredGames[currentGame];

  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden pt-16">
      {/* Background Game Image */}
      {game && (
        <motion.div
          key={game.steam_appid}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.steam_appid}/library_hero.jpg`}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = game.cover;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/60" />
        </motion.div>
      )}

      <div className="container relative z-10 px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/50 border border-border backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
              <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                Software Premium
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              SUA BIBLIOTECA,
              <br />
              <span className="neon-text">SEM COMPLICAÇÃO.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Gerencie sua biblioteca de jogos com uma interface premium.
              Pesquisa rápida, organização por categorias e acesso simplificado.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <a href="#pricing">Quero Começar</a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="#catalog">Ver Catálogo</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="space-y-1">
                <div className="text-2xl font-bold neon-text">741+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Jogos</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Seguro</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">∞</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Vitalício</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Featured Game Card */}
          {game && (
            <motion.div
              key={`card-${game.steam_appid}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-card hover-lift">
                <img
                  src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.steam_appid}/library_600x900.jpg`}
                  alt={game.name}
                  className="w-full aspect-[3/4] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = game.cover;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    Em Destaque
                  </div>
                  <h3 className="text-xl font-bold mb-2">{game.name}</h3>
                  <div className="flex gap-2">
                    {game.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="px-2 py-1 text-xs rounded-md bg-secondary/80 text-muted-foreground"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Game Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {featuredGames.slice(0, 6).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentGame(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentGame ? 'bg-primary w-6' : 'bg-muted hover:bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
