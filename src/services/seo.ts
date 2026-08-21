/**
 * Gamesle SEO and Meta Tags Manager
 */

export interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
}

const ROUTE_METADATA: Record<string, PageMeta> = {
  '/': {
    title: 'Gamesle — Portal de Juegos Diarios de Deducción y Cultura',
    description: 'Juega a los mejores retos diarios web: Namele y nuevos juegos de geografía, banderas y lógica renovados a las 00:00 de España.'
  },
  '/about': {
    title: 'Sobre Gamesle — Plataforma de Juegos Web Diarios',
    description: 'Conoce la misión de Gamesle: crear juegos diarios educativos, accesibles y gratuitos con rigor y transparencia.'
  },
  '/how-it-works': {
    title: 'Cómo Funciona Gamesle — Retos Diarios y Rachas',
    description: 'Aprende cómo funcionan los retos diarios de Gamesle, las rachas continuas y la renovación a medianoche.'
  },
  '/privacy': {
    title: 'Política de Privacidad — Gamesle',
    description: 'Información transparente sobre el tratamiento de datos y cookies conforme al RGPD en Gamesle.'
  },
  '/terms': {
    title: 'Términos y Condiciones de Uso — Gamesle',
    description: 'Condiciones de servicio y uso responsable de la plataforma de juegos Gamesle.'
  },
  '/accessibility': {
    title: 'Declaración de Accesibilidad — Gamesle',
    description: 'Compromiso de Gamesle con la inclusión digital y los estándares WCAG 2.1 AA.'
  },
  '/contact': {
    title: 'Contacto y Soporte — Gamesle',
    description: 'Ponte en contacto con el equipo de Gamesle para dudas, soporte o sugerencias de juegos.'
  },
  '/404': {
    title: 'Página No Encontrada (404) — Gamesle',
    description: 'La página solicitada no existe o ha cambiado de ubicación en Gamesle.',
    noindex: true
  }
};

export class SeoService {
  public static updateMetaForRoute(path: string): void {
    const meta = ROUTE_METADATA[path] || {
      title: 'Gamesle — Portal de Juegos Diarios',
      description: 'Descubre y juega a los mejores juegos de deducción y entretenimiento cultural diario en Gamesle.'
    };

    document.title = meta.title;

    let descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', meta.description);
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);

    let robots = document.querySelector('meta[name="robots"]');
    if (robots) {
      robots.setAttribute('content', meta.noindex ? 'noindex, nofollow' : 'index, follow');
    }
  }
}
