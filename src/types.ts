export type ThemeMode = 'dark' | 'light';

export interface GameItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: 'Geografía' | 'Cultura' | 'Lógica' | 'Historia' | 'Palabras';
  status: 'live' | 'upcoming' | 'beta';
  url: string;
  badge?: string;
  iconName: string;
  features: string[];
  gradient: string;
  playersCount?: string;
  rating?: number;
}

export interface UserSettings {
  theme: ThemeMode;
  soundEnabled: boolean;
  reducedMotion: boolean;
}

export interface UserStats {
  gamesPlayed: number;
  currentStreak: number;
  maxStreak: number;
  lastPlayedDate: string | null;
}
