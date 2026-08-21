import React, { useState } from 'react';
import { Gamepad2, Moon, Sun, Volume2, VolumeX, User } from 'lucide-react';
import { UserSettings, ThemeMode } from '../types';
import { useAuth } from '../auth/AuthContext';
import { TranslateIcon } from './TranslateIcon';
import { LanguageModal } from './LanguageModal';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  settings,
  onUpdateSettings
}) => {
  const { profile } = useAuth();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = settings.theme === 'dark' ? 'light' : 'dark';
    onUpdateSettings({ ...settings, theme: nextTheme });
  };

  const toggleSound = () => {
    onUpdateSettings({ ...settings, soundEnabled: !settings.soundEnabled });
  };

  return (
    <>
      <header className="site-header" role="banner">
        <div className="header-content">
          <button
            type="button"
            className="logo-group"
            onClick={() => onNavigate('/')}
            aria-label="Ir a la portada de Gamesle"
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)'
              }}
            >
              <Gamepad2 size={20} color="#FFFFFF" />
            </div>
            <span translate="no" className="notranslate" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Gamesle
            </span>
          </button>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 16 }} aria-label="Navegación principal">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              style={{
                background: 'none',
                border: 'none',
                color: currentPath === '/' ? 'var(--brand-primary)' : 'var(--text-secondary)',
                fontWeight: currentPath === '/' ? 700 : 500,
                fontSize: '0.92rem',
                cursor: 'pointer',
                padding: '6px 8px'
              }}
            >
              Juegos
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/how-it-works')}
              style={{
                background: 'none',
                border: 'none',
                color: currentPath === '/how-it-works' ? 'var(--brand-primary)' : 'var(--text-secondary)',
                fontWeight: currentPath === '/how-it-works' ? 700 : 500,
                fontSize: '0.92rem',
                cursor: 'pointer',
                padding: '6px 8px'
              }}
            >
              Cómo Funciona
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/about')}
              style={{
                background: 'none',
                border: 'none',
                color: currentPath === '/about' ? 'var(--brand-primary)' : 'var(--text-secondary)',
                fontWeight: currentPath === '/about' ? 700 : 500,
                fontSize: '0.92rem',
                cursor: 'pointer',
                padding: '6px 8px'
              }}
            >
              Sobre Nosotros
            </button>
          </nav>

          <div className="header-actions">
            {/* Sound Toggle */}
            <button
              type="button"
              className="icon-btn"
              onClick={toggleSound}
              title={settings.soundEnabled ? 'Silenciar efectos' : 'Activar efectos'}
              aria-label={settings.soundEnabled ? 'Silenciar efectos de sonido' : 'Activar efectos de sonido'}
            >
              {settings.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              title={`Cambiar a modo ${settings.theme === 'dark' ? 'claro' : 'oscuro'}`}
              aria-label={`Cambiar a modo ${settings.theme === 'dark' ? 'claro' : 'oscuro'}`}
            >
              {settings.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language / Translation Button */}
            <button
              type="button"
              className="icon-btn"
              onClick={() => setIsLangModalOpen(true)}
              title="Cambiar idioma / Select language"
              aria-label="Cambiar idioma / Select language"
            >
              <TranslateIcon size={18} />
            </button>

            {/* User Profile Button */}
            <button
              type="button"
              className="icon-btn"
              onClick={() => onNavigate('/profile')}
              title={`Perfil de ${profile.name}`}
              aria-label={`Perfil de ${profile.name}`}
            >
              {profile.picture ? (
                <img
                  src={profile.picture}
                  alt={profile.name}
                  style={{ width: 24, height: 24, borderRadius: '50%' }}
                />
              ) : (
                <User size={18} color="var(--brand-primary)" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Language Modal */}
      <LanguageModal isOpen={isLangModalOpen} onClose={() => setIsLangModalOpen(false)} />
    </>
  );
};
