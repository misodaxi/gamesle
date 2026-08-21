import { UserSettings, UserStats } from '../types';

const SETTINGS_KEY = 'gamesle_user_settings_v1';
const STATS_KEY = 'gamesle_user_stats_v1';

export class StorageService {
  public static getSettings(): UserSettings {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Unable to read user settings from storage:', e);
    }
    return {
      theme: 'dark',
      soundEnabled: true,
      reducedMotion: false
    };
  }

  public static saveSettings(settings: UserSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Unable to save user settings:', e);
    }
  }

  public static getStats(): UserStats {
    try {
      const raw = localStorage.getItem(STATS_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Unable to read user stats from storage:', e);
    }
    return {
      gamesPlayed: 0,
      currentStreak: 1,
      maxStreak: 1,
      lastPlayedDate: new Date().toISOString()
    };
  }

  public static saveStats(stats: UserStats): void {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (e) {
      console.warn('Unable to save user stats:', e);
    }
  }
}
