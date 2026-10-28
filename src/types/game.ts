export interface Game {
  name: string;
  categories: string[];
  steam_appid: number;
  cover: string;
  hero?: string;
}

export const CATEGORIES = [
  'AÇÃO', 'RPG', 'AVENTURA', 'MUNDO ABERTO', 'TERROR', 
  'SIMULADOR', 'SOBREVIVÊNCIA', 'CORRIDA', 'ESPORTES', 
  'FPS', 'INDIE', 'VR', 'COOP', 'OUTROS'
];

// Jogos principais das franquias (sem sequências)
export const AAA_GAME_NAMES = [
  "EA SPORTS FC™ 27",
  "Forza Horizon 6",
  "Resident Evil Requiem",
  "Crimson Desert",
  "SILENT HILL f",
  "007 First Light",
  "Ghost of Tsushima DIRECTOR'S CUT",
  "Black Myth: Wukong",
  "Monster Hunter Wilds",
  "Red Dead Redemption 2",
  "Cyberpunk 2077",
  "Hollow Knight: Silksong",
  "Avatar: Frontiers of Pandora",
  "Beast of Reincarnation",
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

// Acha o jogo pelo nome: primeiro o nome exato, depois o que comeca com ele, por ultimo o que contem.
// Evita "Red Dead Redemption 2" cair no Red Dead 1 ou "Resident Evil Requiem" no RE1.
const normName = (s: string) =>
  (s || '').toLowerCase().replace(/[®™©]/g, '').replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();

export function findGameByName<T extends { name: string; cover?: string | null }>(games: T[], name: string): T | undefined {
  const n = normName(name);
  const ok = games.filter((g) => g.cover);
  return (
    ok.find((g) => normName(g.name) === n) ||
    ok.find((g) => normName(g.name).startsWith(n)) ||
    ok.find((g) => normName(g.name).includes(n))
  );
}
