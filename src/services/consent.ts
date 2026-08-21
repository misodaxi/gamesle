/**
 * Gamesle Consent Manager (GDPR & ePrivacy Compliant)
 */

export interface ConsentSettings {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: string;
  version: string;
}

const CONSENT_STORAGE_KEY = 'gamesle_user_consent_v1';
const CURRENT_VERSION = '1.0';

export class ConsentManager {
  public static getConsent(): ConsentSettings | null {
    try {
      const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as ConsentSettings;
      if (parsed.version !== CURRENT_VERSION) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  public static setConsent(settings: { analytics: boolean; advertising: boolean }): void {
    const fullSettings: ConsentSettings = {
      necessary: true,
      analytics: settings.analytics,
      advertising: settings.advertising,
      timestamp: new Date().toISOString(),
      version: CURRENT_VERSION
    };

    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(fullSettings));
    } catch (e) {
      console.warn('Unable to persist consent settings:', e);
    }
  }

  public static canServeAds(): boolean {
    const consent = this.getConsent();
    if (!consent) return false;
    return consent.advertising === true;
  }

  public static resetConsent(): void {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY);
    } catch (e) {
      console.warn('Unable to reset consent:', e);
    }
  }
}
