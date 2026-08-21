import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, UserCheck, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export const LoginPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { loginWithGoogleCredential, isAuthenticated, profile } = useAuth();
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '584144894892-c88ge009ojt19cq52ucka1jjbcda099l.apps.googleusercontent.com';

  useEffect(() => {
    // Initialize Google Identity Services if available on window
    const windowGoogle = (window as unknown as { google?: { accounts: { id: { initialize: Function; renderButton: Function } } } }).google;

    if (windowGoogle && googleClientId && googleBtnRef.current) {
      try {
        windowGoogle.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response: { credential?: string }) => {
            if (response.credential) {
              const success = await loginWithGoogleCredential(response.credential);
              if (success) {
                onNavigate('/profile');
              } else {
                setAuthError('No se pudo verificar la credencial de Google. Inténtalo de nuevo.');
              }
            }
          }
        });

        windowGoogle.accounts.id.renderButton(googleBtnRef.current, {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'pill',
          width: 280
        });
      } catch (err) {
        console.warn('Google Identity Services init error:', err);
      }
    }
  }, [googleClientId, loginWithGoogleCredential, onNavigate]);

  return (
    <div className="center-column" style={{ maxWidth: 540 }}>
      <button
        type="button"
        className="btn-secondary"
        onClick={() => onNavigate('/')}
        style={{ width: 'auto', alignSelf: 'flex-start', marginBottom: 20, padding: '6px 14px' }}
      >
        <ArrowLeft size={16} /> Volver a Gamesle
      </button>

      <div
        style={{
          width: '100%',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: 32,
          boxShadow: 'var(--shadow-md)',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: 'var(--brand-soft)',
            color: 'var(--brand-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}
        >
          <Lock size={26} />
        </div>

        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 8 }}>
          {isAuthenticated ? 'Sesión Iniciada' : 'Acceso & Sincronización'}
        </h1>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
          {isAuthenticated
            ? `Has iniciado sesión como ${profile.name}. Tu racha y estadísticas se sincronizan de forma segura.`
            : 'Inicia sesión con Google para conservar tu racha y logros en todos los juegos de la red Gamesle.'}
        </p>

        {authError && (
          <div
            className="feedback-banner error"
            style={{ marginBottom: 16, fontSize: '0.85rem' }}
          >
            {authError}
          </div>
        )}

        {!isAuthenticated ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            {/* Google Rendered Button Slot */}
            <div ref={googleBtnRef} style={{ minHeight: 44 }} />

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Al iniciar sesión, tus partidas y rachas se sincronizarán en todos los juegos asociados.
            </div>

            <div style={{ width: '100%', height: 1, backgroundColor: 'var(--border-subtle)', margin: '8px 0' }} />

            <button
              type="button"
              className="btn-secondary"
              onClick={() => onNavigate('/')}
            >
              <UserCheck size={16} /> Continuar como Invitado (Sin cuenta)
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn-primary"
            onClick={() => onNavigate('/profile')}
          >
            Ir a mi Perfil
          </button>
        )}

        {/* Security and Privacy Assurances */}
        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: '1px solid var(--border-subtle)',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            fontSize: '0.8rem',
            color: 'var(--text-secondary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <CheckCircle2 size={14} color="var(--success-primary)" />
            <span>Sin contraseñas: Autenticación directa y segura con Google Identity Services.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={14} color="var(--brand-primary)" />
            <span>Cero rastreo invasivo ni venta de información personal.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
