import { describe, it, expect, beforeEach } from 'vitest';
import { ConsentManager } from '../services/consent';

describe('ConsentManager (GDPR & ePrivacy Architecture)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with undecided state when no preference stored', () => {
    const consent = ConsentManager.getConsent();
    expect(consent.status).toBe('undecided');
    expect(consent.essential).toBe(true);
    expect(consent.analytics).toBe(false);
    expect(consent.personalizedAds).toBe(false);
    expect(ConsentManager.hasAnswered()).toBe(false);
  });

  it('accepts all categories when acceptAll is called', () => {
    ConsentManager.acceptAll();
    const consent = ConsentManager.getConsent();
    expect(consent.status).toBe('all');
    expect(consent.essential).toBe(true);
    expect(consent.analytics).toBe(true);
    expect(consent.personalizedAds).toBe(true);
    expect(consent.nonPersonalizedAds).toBe(true);
    expect(ConsentManager.hasAnswered()).toBe(true);
    expect(ConsentManager.canServePersonalizedAds()).toBe(true);
    expect(ConsentManager.canServeAnyAds()).toBe(true);
  });

  it('rejects non-essential categories when rejectNonEssential is called', () => {
    ConsentManager.rejectNonEssential();
    const consent = ConsentManager.getConsent();
    expect(consent.status).toBe('essential_only');
    expect(consent.essential).toBe(true);
    expect(consent.analytics).toBe(false);
    expect(consent.personalizedAds).toBe(false);
    expect(consent.nonPersonalizedAds).toBe(true);
    expect(ConsentManager.hasAnswered()).toBe(true);
    expect(ConsentManager.canServePersonalizedAds()).toBe(false);
  });

  it('persists custom preferences properly', () => {
    ConsentManager.setConsent({
      status: 'custom',
      essential: true,
      analytics: true,
      personalizedAds: false,
      nonPersonalizedAds: true,
      updatedAt: new Date().toISOString()
    });

    const consent = ConsentManager.getConsent();
    expect(consent.status).toBe('custom');
    expect(consent.analytics).toBe(true);
    expect(consent.personalizedAds).toBe(false);
    expect(ConsentManager.canServePersonalizedAds()).toBe(false);
    expect(ConsentManager.canServeAnyAds()).toBe(true);
  });
});
