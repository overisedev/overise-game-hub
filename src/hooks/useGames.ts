import { useState, useEffect, useMemo } from 'react';
import type { Game, GameCategory } from '@/types/game';

const CATEGORIES: GameCategory[] = [
  { id: 'ALL', label: 'Todos' },
  { id: 'AÇÃO', label: 'Ação' },
  { id: 'RPG', label: 'RPG' },
  { id: 'AVENTURA', label: 'Aventura' },
  { id: 'MUNDO ABERTO', label: 'Mundo Aberto' },
  { id: 'TERROR', label: 'Terror' },
  { id: 'SIMULADOR', label: 'Simulador' },
  { id: 'SOBREVIVÊNCIA', label: 'Sobrevivência' },
  { id: 'CORRIDA', label: 'Corrida' },
  { id: 'ESPORTES', label: 'Esportes' },
  { id: 'FPS', label: 'FPS' },
  { id: 'INDIE', label: 'Indie' },
  { id: 'VR', label: 'VR' },
  { id: 'COOP', label: 'Cooperativo' },
  { id: 'OUTROS', label: 'Outros' },
];

const AAA_GAMES = [
  'Grand Theft Auto V',
  'Red Dead Redemption 2',
  'Cyberpunk 2077',
  'God of War',
  'The Last of Us Part I',
  'ELDEN RING',
  "Marvel's Spider-Man Remastered",
  'Hogwarts Legacy',
  'Assassin\'s Creed Valhalla',
  'Call of Duty®: Modern Warfare® II',
  'FIFA 24',
  'Resident Evil Village',
  'Horizon Zero Dawn',
  'Death Stranding',
  'Ghost of Tsushima',
  'Days Gone',
  'Monster Hunter: World',
  'The Witcher 3: Wild Hunt',
  'Sekiro™: Shadows Die Twice',
  'Dark Souls III',
];

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

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

  const filteredGames = useMemo(() => {
    if (selectedCategory === 'ALL') return games;
    return games.filter((game) =>
      game.categories.some((cat) => cat.toUpperCase() === selectedCategory.toUpperCase())
    );
  }, [games, selectedCategory]);

  const aaaGames = useMemo(() => {
    return games.filter((game) =>
      AAA_GAMES.some((aaa) => game.name.toLowerCase().includes(aaa.toLowerCase()) || aaa.toLowerCase().includes(game.name.toLowerCase()))
    );
  }, [games]);

  const featuredGames = useMemo(() => {
    const featured = AAA_GAMES.slice(0, 6);
    return games.filter((game) =>
      featured.some((f) => game.name.toLowerCase().includes(f.toLowerCase()) || f.toLowerCase().includes(game.name.toLowerCase()))
    );
  }, [games]);

  return {
    games,
    filteredGames,
    aaaGames,
    featuredGames,
    categories: CATEGORIES,
    selectedCategory,
    setSelectedCategory,
    loading,
    totalGames: games.length,
  };
}
