import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        {/* Navigation Grid */}
        <nav className="footer-nav" aria-label="Navegación del pie de página">
          <button type="button" onClick={() => onNavigate('/')}>
            Catálogo de Juegos
          </button>
          <button type="button" onClick={() => onNavigate('/how-it-works')}>
            Cómo Funciona
          </button>
          <button type="button" onClick={() => onNavigate('/about')}>
            Sobre Gamesle
          </button>
          <button type="button" onClick={() => onNavigate('/accessibility')}>
            Accesibilidad
          </button>
          <button type="button" onClick={() => onNavigate('/privacy')}>
            Privacidad
          </button>
          <button type="button" onClick={() => onNavigate('/terms')}>
            Términos
          </button>
          <button type="button" onClick={() => onNavigate('/contact')}>
            Contacto
          </button>
        </nav>

        {/* Informative Note */}
        <div
          style={{
            maxWidth: 680,
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            lineHeight: 1.5
          }}
        >
          Gamesle es una plataforma independiente de juegos diarios de agilidad mental, geografía y deducción cultural. Todos nuestros retos se renuevan diariamente a las 00:00 (hora peninsular española) y son 100% gratuitos.
        </div>

        {/* Copyright */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            fontSize: '0.78rem',
            color: 'var(--text-muted)'
          }}
        >
          <ShieldCheck size={14} color="var(--success-primary)" />
          <span>© {new Date().getFullYear()} Gamesle. Todos los derechos reservados • Soporte: <code>gameslesupport@gmail.com</code></span>
        </div>
      </div>
    </footer>
  );
};
