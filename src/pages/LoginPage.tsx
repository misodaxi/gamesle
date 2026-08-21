import React, { useEffect, useRef } from 'react';
import { LogIn, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { loginWithGoogleCredential, isAuthenticated } = useAuth();
  const googleBtnRef = useRef<HTMLDivElement>(null);

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '584144894892-c88ge009ojt19cq52ucka1jjbcda099l.apps.googleusercontent.com';

  useEffect(() => {
    if (isAuthenticated) {
      onNavigate('/profile');
      return;
    }

    if (window.google?.accounts?.id && googleBtnRef.current) {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: (response: { credential: string }) => {
          if (response.credential) {
            loginWithGoogleCredential(response.credential);
            onNavigate('/profile');
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true
      });

      window.google.accounts.id.renderButton(googleBtnRef.current, {
        type: 'standard',
        shape: 'pill',
        theme: 'filled_blue',
        text: 'signin_with',
        size: 'large',
        logo_alignment: 'left',
        width: 280
      });
    }
  }, [isAuthenticated, googleClientId, loginWithGoogleCredential, onNavigate]);

  return (
    <article
      className="content-section"
      style={{
        width: '100%',
        maxWidth: 520,
        margin: '20px auto',
        textAlign: 'center',
        padding: '36px 24px'
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          backgroundColor: 'var(--brand-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto'
        }}
      >
        <LogIn size={26} color="var(--brand-primary)" />
      </div>

      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 8 }}>
        Iniciar Sesión en Gamesle
      </h1>

      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 24 }}>
        Conecta tu cuenta de Google para guardar tus rachas unificadas, estadísticas y acceder a los juegos asociados del ecosistema Gamesle.
      </p>

      {/* Google Sign In Button Container */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <div ref={googleBtnRef} style={{ minHeight: 44 }} />
      </div>

      <div
        style={{
          padding: 14,
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          marginTop: 16
        }}
      >
        <ShieldCheck size={16} color="var(--success-primary)" />
        <span>Autenticación 100% segura y privada mediante Google OAuth oficial</span>
      </div>

      <button
        type="button"
        className="btn-secondary"
        onClick={() => onNavigate('/')}
        style={{ marginTop: 24 }}
      >
        <ArrowLeft size={16} /> Volver a la portada
      </button>
    </article>
  );
};
