import { motion } from 'framer-motion';
import type { Game } from '@/types/game';

interface InfiniteCarouselProps {
  games: Game[];
}

export function InfiniteCarousel({ games }: InfiniteCarouselProps) {
  // Duplicate for seamless loop
  const displayGames = [...games, ...games];

  if (games.length === 0) return null;

  return (
    <section className="py-16 overflow-hidden bg-secondary/30">
      <div className="container px-6 mb-8">
        <p className="text-center text-sm text-muted-foreground uppercase tracking-widest">
          Jogos AAA Disponíveis
        </p>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {displayGames.map((game, idx) => (
            <div
              key={`${game.steam_appid}-${idx}`}
              className="flex-shrink-0 w-48 aspect-[2/3] rounded-xl overflow-hidden relative group hover-scale"
            >
              <img
                src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.steam_appid}/library_600x900.jpg`}
                alt={game.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = game.cover;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-semibold truncate">{game.name}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
