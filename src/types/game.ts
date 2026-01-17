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
  'Baldur\'s Gate 3',
  'Cyberpunk 2077',
  'Dark Souls III',
  'ELDEN RING',
  'Grand Theft Auto V',
  'Hogwarts Legacy',
  'The Last of Us',
  'Resident Evil Village',
  'Hollow Knight: Silksong',
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
