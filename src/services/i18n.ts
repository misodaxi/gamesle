export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  direction?: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '中文 (简体)', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', direction: 'rtl' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' }
];

const STORAGE_KEY = 'gamesle_language_preference';

export class I18nService {
  private static currentLanguage: string = 'es';
  private static listeners: Array<(lang: string) => void> = [];
  private static observerInitialized: boolean = false;

  public static initialize(): string {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        this.currentLanguage = saved;
      } else {
        const browserLang = navigator.language?.split('-')[0]?.toLowerCase() || 'es';
        const match = SUPPORTED_LANGUAGES.find((l) => l.code === browserLang);
        this.currentLanguage = match ? match.code : 'es';
      }
    } catch {
      this.currentLanguage = 'es';
    }

    this.protectBrandNamesInDOM();
    this.applyLanguageToDocument(this.currentLanguage);
    return this.currentLanguage;
  }

  public static getLanguage(): string {
    return this.currentLanguage;
  }

  public static getLanguageOption(): LanguageOption {
    return SUPPORTED_LANGUAGES.find((l) => l.code === this.currentLanguage) || SUPPORTED_LANGUAGES[0];
  }

  public static setLanguage(code: string): void {
    if (!SUPPORTED_LANGUAGES.some((l) => l.code === code)) return;
    this.currentLanguage = code;
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {}

    this.protectBrandNamesInDOM();
    this.applyLanguageToDocument(code);
    this.listeners.forEach((fn) => fn(code));
  }

  public static subscribe(fn: (lang: string) => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  // Ensures all occurrences of Gamesle, Newsle, and Namele are marked with translate="no" and class="notranslate"
  public static protectBrandNamesInDOM(): void {
    if (typeof window === 'undefined') return;

    const brandRegex = /\b(Gamesle|Newsle|Namele)\b/g;

    const walk = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue && brandRegex.test(node.nodeValue)) {
        const parent = node.parentElement;
        if (
          parent &&
          parent.tagName !== 'SCRIPT' &&
          parent.tagName !== 'STYLE' &&
          !parent.classList.contains('notranslate') &&
          parent.getAttribute('translate') !== 'no'
        ) {
          const frag = document.createDocumentFragment();
          const parts = node.nodeValue.split(brandRegex);

          parts.forEach((part) => {
            if (part === 'Gamesle' || part === 'Newsle' || part === 'Namele') {
              const span = document.createElement('span');
              span.className = 'notranslate';
              span.setAttribute('translate', 'no');
              span.textContent = part;
              frag.appendChild(span);
            } else if (part.length > 0) {
              frag.appendChild(document.createTextNode(part));
            }
          });

          if (parent.contains(node)) {
            parent.replaceChild(frag, node);
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (!el.classList.contains('notranslate') && el.getAttribute('translate') !== 'no') {
          Array.from(node.childNodes).forEach(walk);
        }
      }
    };

    try {
      walk(document.body);
    } catch {}

    if (!this.observerInitialized && typeof MutationObserver !== 'undefined') {
      this.observerInitialized = true;
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach(walk);
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  private static applyLanguageToDocument(code: string): void {
    document.documentElement.lang = code;
    const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === code);
    if (langObj?.direction === 'rtl') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }

    if (code !== 'es') {
      this.triggerGoogleTranslate(code);
    } else {
      this.restoreOriginalLanguage();
    }
  }

  private static triggerGoogleTranslate(targetLang: string): void {
    const domain = window.location.hostname;
    document.cookie = `googtrans=/es/${targetLang}; path=/; domain=${domain}`;
    document.cookie = `googtrans=/es/${targetLang}; path=/`;

    if (!(window as unknown as { googleTranslateElementInit?: () => void }).googleTranslateElementInit) {
      (window as unknown as { googleTranslateElementInit: () => void }).googleTranslateElementInit = () => {
        const win = window as unknown as { google?: { translate?: { TranslateElement: new (opts: object, id: string) => void } } };
        if (win.google?.translate?.TranslateElement) {
          new win.google.translate.TranslateElement(
            {
              pageLanguage: 'es',
              includedLanguages: SUPPORTED_LANGUAGES.map((l) => l.code).join(','),
              autoDisplay: false
            },
            'google_translate_element'
          );
        }
      };

      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);
      }
    }

    setTimeout(() => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = targetLang;
        select.dispatchEvent(new Event('change'));
      }
    }, 300);
  }

  private static restoreOriginalLanguage(): void {
    const domain = window.location.hostname;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = 'es';
      select.dispatchEvent(new Event('change'));
    }
  }
}
