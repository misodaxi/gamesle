import { describe, it, expect } from 'vitest';
import { isAdAllowedOnRoute, EXCLUDED_AD_ROUTES } from '../components/AdBanners';

describe('Gamesle AdSense Policy Compliance & Exclusion Rules', () => {
  it('strictly excludes advertising from sensitive and functional routes', () => {
    const sensitiveRoutes = [
      '/login',
      '/settings',
      '/404',
      '/privacy',
      '/terms',
      '/accessibility',
      '/contact'
    ];

    sensitiveRoutes.forEach((route) => {
      expect(isAdAllowedOnRoute(route)).toBe(false);
    });
  });

  it('allows advertising on public content routes', () => {
    const allowedRoutes = [
      '/',
      '/about',
      '/how-it-works'
    ];

    allowedRoutes.forEach((route) => {
      expect(isAdAllowedOnRoute(route)).toBe(true);
    });
  });

  it('matches all declared EXCLUDED_AD_ROUTES entries', () => {
    EXCLUDED_AD_ROUTES.forEach((route) => {
      expect(isAdAllowedOnRoute(route)).toBe(false);
      expect(isAdAllowedOnRoute(`${route}/sub`)).toBe(false);
    });
  });
});
