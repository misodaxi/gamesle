export type ConsentChoice = 'all' | 'essential_only' | 'custom' | 'undecided';

export interface ConsentPreferences {
  status: ConsentChoice;
  essential: boolean;
  analytics: boolean;
  personalizedAds: boolean;
  nonPersonalizedAds: boolean;
  updatedAt: string | null;
}

const CONSENT_STORAGE_KEY = 'gamesle_consent_preferences_v1';

export const DEFAULT_CONSENT: ConsentPreferences = {
  status: 'undecided',
  essential: true,
  analytics: false,
  personalizedAds: false,
  nonPersonalizedAds: false,
  updatedAt: null
};

type ConsentListener = (prefs: ConsentPreferences) => void;

export class ConsentManager {
  private static listeners: ConsentListener[] = [];

  public static getConsent(): ConsentPreferences {
    try {
      const data = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (data) {
        return { ...DEFAULT_CONSENT, ...JSON.parse(data) };
      }
    } catch {
      // Ignore
    }
    return DEFAULT_CONSENT;
  }

  public static setConsent(prefs: ConsentPreferences): void {
    const updated: ConsentPreferences = {
      ...prefs,
      essential: true,
      updatedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save consent:', e);
    }

    ConsentManager.notifyListeners(updated);
  }

  public static acceptAll(): void {
    ConsentManager.setConsent({
      status: 'all',
      essential: true,
      analytics: true,
      personalizedAds: true,
      nonPersonalizedAds: true,
      updatedAt: new Date().toISOString()
    });
  }

  public static rejectNonEssential(): void {
    ConsentManager.setConsent({
      status: 'essential_only',
      essential: true,
      analytics: false,
      personalizedAds: false,
      nonPersonalizedAds: true,
      updatedAt: new Date().toISOString()
    });
  }

  public static hasAnswered(): boolean {
    const consent = ConsentManager.getConsent();
    return consent.status !== 'undecided';
  }

  public static canServePersonalizedAds(): boolean {
    const consent = ConsentManager.getConsent();
    return consent.personalizedAds && consent.status === 'all';
  }

  public static canServeAnyAds(): boolean {
    const consent = ConsentManager.getConsent();
    return consent.status !== 'undecided';
  }

  public static resetConsent(): void {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to reset consent:', e);
    }
  }

  public static subscribe(listener: ConsentListener): () => void {
    ConsentManager.listeners.push(listener);
    return () => {
      ConsentManager.listeners = ConsentManager.listeners.filter((l) => l !== listener);
    };
  }

  private static notifyListeners(prefs: ConsentPreferences): void {
    ConsentManager.listeners.forEach((listener) => {
      try {
        listener(prefs);
      } catch (e) {
        console.error('Error in consent listener:', e);
      }
    });
  }
}
