import { useState, useEffect, useMemo } from 'react';
import type { Game } from '@/types/game';
import { AAA_GAME_NAMES, SEARCH_ALIASES } from '@/types/game';

// Jogos preferidos por franquia (estes serão priorizados)
const PREFERRED_GAMES: Record<string, string[]> = {
  'Spider-Man': ['remastered', 'spider-man remastered'],
  'The Last of Us': ['part i', 'part 1'],
  'Red Dead': ['redemption 2', 'rdr2'],
  'Dark Souls': ['dark souls iii', 'dark souls 3'],
  'Resident Evil': ['village', 're village'],
  'Monster Hunter': ['world'],
  'Horizon': ['zero dawn'],
  'The Witcher': ['witcher 3', 'wild hunt'],
  'Death Stranding': ["director's cut", 'directors cut'],
  'Elden Ring': ['elden ring'],
  'Cyberpunk': ['2077'],
  'Baldurs Gate': ['gate 3', 'bg3'],
  'GTA': ['enhanced', 'grand theft auto v enhanced'],
};

// Palavras-chave de franquias para agrupar
const FRANCHISE_KEYWORDS = [
  { key: 'spider-man', franchise: 'Spider-Man' },
  { key: 'spiderman', franchise: 'Spider-Man' },
  { key: 'last of us', franchise: 'The Last of Us' },
  { key: 'red dead', franchise: 'Red Dead' },
  { key: 'dark souls', franchise: 'Dark Souls' },
  { key: 'resident evil', franchise: 'Resident Evil' },
  { key: 'monster hunter', franchise: 'Monster Hunter' },
  { key: 'horizon', franchise: 'Horizon' },
  { key: 'witcher', franchise: 'The Witcher' },
  { key: 'death stranding', franchise: 'Death Stranding' },
  { key: 'elden ring', franchise: 'Elden Ring' },
  { key: 'cyberpunk', franchise: 'Cyberpunk' },
  { key: 'baldur', franchise: 'Baldurs Gate' },
  { key: 'gta', franchise: 'GTA' },
  { key: 'grand theft auto', franchise: 'GTA' },
  { key: 'sekiro', franchise: 'Sekiro' },
  { key: 'hogwarts', franchise: 'Hogwarts' },
  { key: 'hollow knight', franchise: 'Hollow Knight' },
];

// Função para identificar a franquia de um jogo
function getFranchise(gameName: string): string | null {
  const lower = gameName.toLowerCase();
  for (const { key, franchise } of FRANCHISE_KEYWORDS) {
    if (lower.includes(key)) {
      return franchise;
    }
  }
  return null;
}

// Verificar se é o jogo preferido da franquia
function isPreferredGame(gameName: string, franchise: string): boolean {
  const preferred = PREFERRED_GAMES[franchise];
  if (!preferred) return true;
  
  const lower = gameName.toLowerCase();
  return preferred.some(pref => lower.includes(pref));
}

// Função para filtrar apenas 1 jogo por franquia (priorizando os preferidos)
function filterOnlyOnePerFranchise(games: Game[]): Game[] {
  const franchiseGames = new Map<string, Game>();
  const noFranchiseGames: Game[] = [];
  
  for (const game of games) {
    // Ignorar jogos sem cover ou steam_appid válido
    if (!game.cover || !game.steam_appid) continue;
    
    const franchise = getFranchise(game.name);
    
    if (franchise) {
      const existing = franchiseGames.get(franchise);
      
      // Se é o jogo preferido E tem cover, sempre usar
      if (isPreferredGame(game.name, franchise)) {
        franchiseGames.set(franchise, game);
      } else if (!existing) {
        // Se não há nenhum ainda, usar este como fallback
        franchiseGames.set(franchise, game);
      }
    } else {
      noFranchiseGames.push(game);
    }
  }
  
  return [...franchiseGames.values(), ...noFranchiseGames];
}

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

  // Filtrar jogos AAA e manter apenas 1 por franquia
  const aaaGames = useMemo(() => {
    // Primeiro, filtrar jogos que correspondem à lista AAA E têm dados válidos
    const matchedGames = games.filter((game) => {
      // Ignorar jogos sem cover ou steam_appid
      if (!game.cover || !game.steam_appid) return false;
      
      return AAA_GAME_NAMES.some((aaa) => 
        game.name.toLowerCase().includes(aaa.toLowerCase()) || 
        aaa.toLowerCase().includes(game.name.toLowerCase())
      );
    });
    
    // Depois, filtrar para manter apenas 1 por franquia
    return filterOnlyOnePerFranchise(matchedGames);
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
