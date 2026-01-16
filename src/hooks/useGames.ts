import { useState, useEffect, useMemo } from 'react';
import type { Game } from '@/types/game';
import { AAA_GAME_NAMES, SEARCH_ALIASES } from '@/types/game';

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/games.json')
      .then((res) => res.json())
      .then((data: Game[]) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading games:', err);
        setLoading(false);
      });
  }, []);

  const aaaGames = useMemo(() => {
    return games.filter((game) =>
      AAA_GAME_NAMES.some((aaa) => 
        game.name.toLowerCase().includes(aaa.toLowerCase()) || 
        aaa.toLowerCase().includes(game.name.toLowerCase())
      )
    );
  }, [games]);

  const searchGames = (query: string): Game[] => {
    if (!query.trim()) return games;
    
    const q = query.toLowerCase().trim();
    
    // Check aliases
    for (const [alias, names] of Object.entries(SEARCH_ALIASES)) {
      if (q.includes(alias)) {
        return games.filter(g => 
          names.some(name => g.name.toLowerCase().includes(name.toLowerCase()))
        );
      }
    }
    
    return games.filter(g => g.name.toLowerCase().includes(q));
  };

  const getGamesByCategory = (category: string): Game[] => {
    if (!category || category === 'ALL') return games;
    return games.filter(g => 
      g.categories.some(c => c.toUpperCase() === category.toUpperCase())
    );
  };

  return {
    games,
    aaaGames,
    loading,
    totalGames: games.length,
    searchGames,
    getGamesByCategory,
  };
}
