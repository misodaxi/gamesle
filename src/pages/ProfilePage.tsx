import React from 'react';
import { User, LogOut, ShieldCheck, Gamepad2, ArrowRight } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

interface ProfilePageProps {
  onNavigate: (path: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
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
          <User size={26} color="var(--brand-primary)" />
        </div>

        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 8 }}>
          Perfil de Jugador
        </h1>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
          Actualmente estás navegando en modo invitado. Inicia sesión con tu cuenta de Google para guardar tu progreso unificado.
        </p>

        <button
          type="button"
          className="btn-primary"
          onClick={() => onNavigate('/login')}
          style={{ margin: '0 auto' }}
        >
          Iniciar Sesión con Google
        </button>
      </article>
    );
  }

  return (
    <article
      className="content-section"
      style={{
        width: '100%',
        maxWidth: 620,
        margin: '20px auto',
        padding: '32px 24px'
      }}
    >
      <header style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 20 }}>
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid var(--brand-primary)' }}
          />
        ) : (
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: 'var(--brand-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <User size={30} color="var(--brand-primary)" />
          </div>
        )}

        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{user.name}</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{user.email}</p>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--success-primary)',
              backgroundColor: 'var(--success-soft)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              marginTop: 4
            }}
          >
            <ShieldCheck size={12} /> Cuenta Google Conectada
          </span>
        </div>
      </header>

      {/* Associated Games Section */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Gamepad2 size={18} color="var(--brand-primary)" /> Juegos Asociados a tu Cuenta
        </h2>

        <div
          style={{
            padding: 16,
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12
          }}
        >
          <div>
            <strong style={{ fontSize: '0.95rem' }}>Namele</strong>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Deducción Geográfica en Mapa Mundial • Reto Diario Activo
            </p>
          </div>

          <a
            href="https://namele.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem', minHeight: 36 }}
          >
            Jugar <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* Logout Action */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            logout();
            onNavigate('/');
          }}
          style={{ color: 'var(--danger-primary)' }}
        >
          <LogOut size={16} /> Cerrar Sesión
        </button>
      </div>
    </article>
  );
};
