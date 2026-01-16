import { useState, useEffect, useMemo } from 'react';
import type { Game } from '@/types/game';
import { AAA_GAME_NAMES, SEARCH_ALIASES } from '@/types/game';

// Lista de jogos que devem ser excluídos (sequências, remasters, spin-offs)
const EXCLUDED_GAMES = [
  'assassin\'s creed',
  'god of war',
  'call of duty',
  'ghost of tsushima',
  'dark souls ii',
  'dark souls 2',
  'resident evil 4',
  'resident evil 2',
  'resident evil 3',
  'cod:',
  'cod ',
  'modern warfare',
  'warzone',
  'black ops',
  'vanguard',
  'cold war',
];

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

  // Filtrar jogos AAA sem sequências
  const aaaGames = useMemo(() => {
    const filtered = games.filter((game) => {
      const gameName = game.name.toLowerCase();
      
      // Verificar se está na lista de exclusão
      const isExcluded = EXCLUDED_GAMES.some(excluded => 
        gameName.includes(excluded.toLowerCase())
      );
      
      if (isExcluded) return false;
      
      // Verificar se está na lista AAA
      return AAA_GAME_NAMES.some((aaa) => 
        gameName.includes(aaa.toLowerCase()) || 
        aaa.toLowerCase().includes(gameName)
      );
    });
    
    return filtered;
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
