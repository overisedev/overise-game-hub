import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Game, GameCategory } from '@/types/game';
import { GameModal } from './GameModal';

interface CatalogSectionProps {
  games: Game[];
  categories: GameCategory[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export function CatalogSection({
  games,
  categories,
  selectedCategory,
  onSelectCategory,
}: CatalogSectionProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter games by category
  const filteredGames = useMemo(() => {
    if (selectedCategory === 'ALL') return games;
    return games.filter((g) =>
      g.categories.some((c) => c.toUpperCase() === selectedCategory.toUpperCase())
    );
  }, [games, selectedCategory]);

  // Show only 3 games at a time, auto-rotate
  const visibleGames = useMemo(() => {
    if (filteredGames.length === 0) return [];
    const start = currentIndex % filteredGames.length;
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(filteredGames[(start + i) % filteredGames.length]);
    }
    return result;
  }, [filteredGames, currentIndex]);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (filteredGames.length <= 3) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [filteredGames.length]);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  return (
    <section id="catalog" className="py-24 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">
            Biblioteca Completa
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Catálogo de Jogos</h2>
        </motion.div>

        <div className="grid lg:grid-cols-[240px,1fr] gap-8">
          {/* Sidebar Categories */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-neon'
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.aside>

          {/* Games Grid */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${currentIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visibleGames.map((game) => (
                  <motion.div
                    key={game.steam_appid}
                    whileHover={{ y: -4 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedGame(game)}
                  >
                    <div className="relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300 shadow-soft hover:shadow-card">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={game.cover}
                          alt={game.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                          {game.name}
                        </h3>
                        <div className="flex gap-2 mt-2">
                          {game.categories.slice(0, 2).map((cat) => (
                            <span
                              key={cat}
                              className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-xl transition-colors duration-300 pointer-events-none" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination indicators */}
            {filteredGames.length > 3 && (
              <div className="flex justify-center gap-2">
                {Array.from({ length: Math.min(Math.ceil(filteredGames.length / 3), 10) }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx * 3)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      Math.floor(currentIndex / 3) % Math.ceil(filteredGames.length / 3) === idx
                        ? 'bg-primary w-6'
                        : 'bg-muted hover:bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Game Modal */}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </section>
  );
}
