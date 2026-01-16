export interface Game {
  name: string;
  categories: string[];
  steam_appid: number;
  cover: string;
}

export const CATEGORIES = [
  'AÇÃO', 'RPG', 'AVENTURA', 'MUNDO ABERTO', 'TERROR', 
  'SIMULADOR', 'SOBREVIVÊNCIA', 'CORRIDA', 'ESPORTES', 
  'FPS', 'INDIE', 'VR', 'COOP', 'OUTROS'
];

// Jogos principais das franquias (sem sequências)
export const AAA_GAME_NAMES = [
  'Grand Theft Auto V',
  'Red Dead Redemption 2', 
  'Cyberpunk 2077',
  'ELDEN RING',
  'Hogwarts Legacy',
  'The Witcher 3',
  'Resident Evil Village',
  'Death Stranding',
  'Dark Souls III',
  'Monster Hunter',
  'Horizon Zero Dawn',
  'The Last of Us Part II',
  'Baldur\'s Gate 3',
  'Hollow Knight',
  'FIFA 24',
  'Spider-Man',
];

// Atalhos de busca
export const SEARCH_ALIASES: Record<string, string[]> = {
  'gta': ['Grand Theft Auto'],
  'rdr': ['Red Dead Redemption'],
  'rdr2': ['Red Dead Redemption 2'],
  'tlou': ['The Last of Us'],
  'cod': ['Call of Duty'],
  'gow': ['God of War'],
  'mhw': ['Monster Hunter: World'],
  'ds3': ['Dark Souls III'],
  'hzd': ['Horizon Zero Dawn'],
  'got': ['Ghost of Tsushima'],
  'bg3': ['Baldur\'s Gate 3'],
};
