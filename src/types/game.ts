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

export const AAA_GAME_NAMES = [
  'Grand Theft Auto V',
  'Red Dead Redemption 2', 
  'Cyberpunk 2077',
  'God of War',
  'ELDEN RING',
  'Hogwarts Legacy',
  'The Witcher 3',
  'Resident Evil Village',
  'Death Stranding',
  'Sekiro',
  'Dark Souls III',
  'Monster Hunter',
  'Horizon Zero Dawn',
  'Ghost of Tsushima',
  'Days Gone',
  'Spider-Man',
  'The Last of Us',
  'Assassin\'s Creed',
  'Call of Duty',
  'FIFA',
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
};
