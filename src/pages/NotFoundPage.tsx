import React from 'react';
import { Gamepad2, Home } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <article
      className="content-section"
      style={{
        width: '100%',
        maxWidth: 600,
        textAlign: 'center',
        padding: '48px 24px',
        margin: '40px auto'
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          backgroundColor: 'var(--brand-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto'
        }}
      >
        <Gamepad2 size={32} color="var(--brand-primary)" />
      </div>

      <span
        style={{
          fontSize: '0.82rem',
          fontWeight: 800,
          color: 'var(--brand-primary)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase'
        }}
      >
        Error 404
      </span>

      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '8px 0 12px 0' }}>
        Página No Encontrada
      </h1>

      <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.5 }}>
        La ruta que has solicitado no existe o ha sido trasladada. Puedes volver al catálogo principal de juegos para continuar jugando.
      </p>

      <button
        type="button"
        className="btn-primary"
        onClick={() => onNavigate('/')}
        style={{ margin: '0 auto' }}
      >
        <Home size={18} /> Volver al Catálogo de Gamesle
      </button>
    </article>
  );
};
