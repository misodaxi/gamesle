import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService } from '../services/storage';

describe('Gamesle StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default user settings if none are saved', () => {
    const settings = StorageService.getSettings();
    expect(settings.theme).toBe('dark');
    expect(settings.soundEnabled).toBe(true);
  });

  it('persists and retrieves updated user settings', () => {
    StorageService.saveSettings({
      theme: 'light',
      soundEnabled: false,
      reducedMotion: true
    });

    const settings = StorageService.getSettings();
    expect(settings.theme).toBe('light');
    expect(settings.soundEnabled).toBe(false);
    expect(settings.reducedMotion).toBe(true);
  });

  it('persists and retrieves user statistics', () => {
    StorageService.saveStats({
      gamesPlayed: 5,
      currentStreak: 3,
      maxStreak: 4,
      lastPlayedDate: '2026-08-21'
    });

    const stats = StorageService.getStats();
    expect(stats.gamesPlayed).toBe(5);
    expect(stats.currentStreak).toBe(3);
    expect(stats.maxStreak).toBe(4);
  });
});
