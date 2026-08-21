import { describe, it, expect, beforeEach } from 'vitest';
import { ConsentManager } from '../services/consent';

describe('Gamesle ConsentManager (GDPR & ePrivacy)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to not serving ads when no consent has been given', () => {
    expect(ConsentManager.getConsent()).toBeNull();
    expect(ConsentManager.canServeAds()).toBe(false);
  });

  it('allows ad serving when advertising consent is granted', () => {
    ConsentManager.setConsent({ analytics: true, advertising: true });
    const saved = ConsentManager.getConsent();

    expect(saved).not.toBeNull();
    expect(saved?.advertising).toBe(true);
    expect(saved?.necessary).toBe(true);
    expect(ConsentManager.canServeAds()).toBe(true);
  });

  it('blocks ad serving when advertising consent is rejected', () => {
    ConsentManager.setConsent({ analytics: true, advertising: false });
    expect(ConsentManager.canServeAds()).toBe(false);
  });

  it('clears stored consent when reset', () => {
    ConsentManager.setConsent({ analytics: true, advertising: true });
    expect(ConsentManager.canServeAds()).toBe(true);

    ConsentManager.resetConsent();
    expect(ConsentManager.getConsent()).toBeNull();
    expect(ConsentManager.canServeAds()).toBe(false);
  });
});
