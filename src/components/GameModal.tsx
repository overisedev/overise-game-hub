import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Game } from '@/types/game';

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
}

export function GameModal({ game, onClose }: GameModalProps) {
  if (!game) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-card rounded-2xl overflow-hidden shadow-card border border-border"
        >
          {/* Hero Image */}
          <div className="relative h-64 md:h-80">
            <img
              src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.steam_appid}/library_hero.jpg`}
              alt={game.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = game.cover;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 -mt-16 relative">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex gap-2 mb-3">
                  {game.categories.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">{game.name}</h2>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-secondary/50">
                  <div className="text-xs text-muted-foreground mb-1">Disponibilidade</div>
                  <div className="font-semibold text-primary">Disponível</div>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <div className="text-xs text-muted-foreground mb-1">Origem</div>
                  <div className="font-semibold">Steam</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/50">
                <div className="text-xs text-muted-foreground mb-1">Steam App ID</div>
                <div className="font-mono text-sm">{game.steam_appid}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="hero" size="lg" className="flex-1" asChild>
                <a href="#pricing">Adquirir Acesso</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href={`https://store.steampowered.com/app/${game.steam_appid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver na Steam
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
