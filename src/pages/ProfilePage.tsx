import React, { useState } from 'react';
import { User, LogOut, Trash2, Edit2, Check, ArrowLeft, Gamepad2, ArrowRight, Globe2, Newspaper, AudioWaveform } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export const ProfilePage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { profile, isAuthenticated, isGuest, logout, deleteAccount, updateProfileName, getGameLaunchUrl } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState(profile.name);

  const handleSaveName = () => {
    if (editNameValue.trim()) {
      updateProfileName(editNameValue.trim());
      setIsEditingName(false);
    }
  };

  const games = [
    {
      id: 'backwardle',
      title: 'Backwardle',
      description: 'Adivina los Sonidos Reproducidos al Revés • Reto Diario Sincronizado',
      url: 'https://backwardle.onrender.com',
      icon: AudioWaveform
    },
    {
      id: 'newsle',
      title: 'Newsle',
      description: 'Adivina la Fecha a Partir de las Noticias • Reto Diario Sincronizado',
      url: 'https://newsle.onrender.com',
      icon: Newspaper
    },
    {
      id: 'namele',
      title: 'Namele',
      description: 'Deducción Geográfica en Mapa Mundial • Reto Diario Sincronizado',
      url: 'https://namele.onrender.com',
      icon: Globe2
    }
  ];

  return (
    <div className="center-column" style={{ maxWidth: 640 }}>
      {/* Top Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 20 }}>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => onNavigate('/')}
          style={{ width: 'auto', padding: '6px 14px' }}
        >
          <ArrowLeft size={16} /> Volver a Portada
        </button>

        <div style={{ display: 'flex', gap: 8 }}>
          {isAuthenticated ? (
            <button
              type="button"
              className="btn-secondary"
              onClick={logout}
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85rem' }}
            >
              <LogOut size={14} /> Cerrar Sesión
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={() => onNavigate('/login')}
              style={{ width: 'auto', padding: '6px 14px', fontSize: '0.85rem' }}
            >
              Iniciar Sesión con Google
            </button>
          )}

          <button
            type="button"
            className="icon-btn"
            onClick={() => {
              if (confirm('¿Estás seguro de borrar todos tus datos locales de Gamesle?')) {
                deleteAccount();
                onNavigate('/');
              }
            }}
            title="Borrar datos locales"
            aria-label="Borrar datos locales"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* User Header Profile Card */}
      <div
        style={{
          width: '100%',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: 24
        }}
      >
        {profile.picture ? (
          <img
            src={profile.picture}
            alt={profile.name}
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              border: '3px solid var(--brand-primary)',
              marginBottom: 12
            }}
          />
        ) : (
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              backgroundColor: 'var(--brand-soft)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12
            }}
          >
            <User size={36} />
          </div>
        )}

        {isEditingName ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <input
              type="text"
              value={editNameValue}
              onChange={(e) => setEditNameValue(e.target.value)}
              style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                textAlign: 'center',
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--brand-primary)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)'
              }}
              autoFocus
            />
            <button
              type="button"
              className="icon-btn"
              onClick={handleSaveName}
              title="Guardar nombre"
            >
              <Check size={16} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{profile.name}</h1>
            <button
              type="button"
              onClick={() => setIsEditingName(true)}
              style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              title="Editar nombre"
            >
              <Edit2 size={14} />
            </button>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isGuest ? 'var(--bg-primary)' : 'var(--success-soft)',
              color: isGuest ? 'var(--text-secondary)' : 'var(--success-text)'
            }}
          >
            {isGuest ? 'Cuenta de Invitado' : 'Cuenta Verificada Google'}
          </span>
          {profile.email && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {profile.email}
            </span>
          )}
        </div>

        {/* Guest Migration CTA */}
        {isGuest && (
          <div
            style={{
              marginTop: 16,
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--brand-soft)',
              color: 'var(--brand-text)',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8
            }}
          >
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              ¿Quieres registrar tu cuenta oficial y sincronizar tus rachas?
            </span>
            <button
              type="button"
              className="btn-primary"
              onClick={() => onNavigate('/login')}
              style={{ maxWidth: 240, padding: '8px 16px', fontSize: '0.88rem' }}
            >
              Iniciar sesión con Google
            </button>
          </div>
        )}
      </div>

      {/* Associated Games Hub */}
      <h2 style={{ fontSize: '1.15rem', marginBottom: 14, alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Gamepad2 size={18} color="var(--brand-primary)" /> Juegos Asociados y Disponibles
      </h2>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {games.map((g) => {
          const IconComp = g.icon;
          return (
            <div
              key={g.id}
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    backgroundColor: 'var(--brand-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <IconComp size={20} color="var(--brand-primary)" />
                </div>
                <div>
                  <strong style={{ fontSize: '0.95rem' }}>{g.title}</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {g.description}
                  </p>
                </div>
              </div>

              <a
                href={getGameLaunchUrl(g.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.85rem', minHeight: 36, whiteSpace: 'nowrap' }}
              >
                Jugar <ArrowRight size={14} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
