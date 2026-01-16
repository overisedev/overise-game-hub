export interface Game {
  name: string;
  categories: string[];
  steam_appid: number;
  cover: string;
}

export interface GameCategory {
  id: string;
  label: string;
  icon?: string;
}
