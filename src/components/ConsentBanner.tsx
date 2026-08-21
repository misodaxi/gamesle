import React, { useState, useEffect } from 'react';
import { Shield, Settings, Check, X } from 'lucide-react';
import { ConsentManager, ConsentPreferences } from '../services/consent';

interface ConsentBannerProps {
  onNavigate: (path: string) => void;
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [customPrefs, setCustomPrefs] = useState<ConsentPreferences>(() => ConsentManager.getConsent());

  useEffect(() => {
    setIsVisible(!ConsentManager.hasAnswered());
  }, []);

  const handleAcceptAll = () => {
    ConsentManager.acceptAll();
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    ConsentManager.rejectNonEssential();
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    ConsentManager.setConsent({
      ...customPrefs,
      status: 'custom'
    });
    setShowModal(false);
    setIsVisible(false);
  };

  return (
    <>
      {/* Fixed Bottom Notice Bar */}
      {isVisible && !showModal && (
        <aside
          role="region"
          aria-label="Aviso de privacidad y consentimiento de cookies"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-card)',
            borderTop: '2px solid var(--brand-primary)',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.25)',
            padding: '16px 20px',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap'
            }}
          >
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '0.92rem', marginBottom: 4 }}>
                <Shield size={18} color="var(--brand-primary)" />
                Tu Privacidad en Gamesle
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                Utilizamos almacenamiento local y cookies técnicas para guardar tu sesión y preferencias. Si lo autorizas, también empleamos cookies para métricas y publicidad personalizada de Google AdSense acorde al RGPD. Consulta nuestra{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('/privacy')}
                  style={{ textDecoration: 'underline', color: 'var(--brand-primary)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}
                >
                  Política de Privacidad
                </button>.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowModal(true)}
                style={{ width: 'auto', padding: '8px 14px', fontSize: '0.82rem' }}
              >
                <Settings size={14} /> Configurar
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleRejectNonEssential}
                style={{ width: 'auto', padding: '8px 14px', fontSize: '0.82rem' }}
              >
                Solo Necesarias
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={handleAcceptAll}
                style={{ width: 'auto', padding: '8px 18px', fontSize: '0.82rem' }}
              >
                <Check size={14} /> Aceptar Todas
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Granular Preference Customization Modal */}
      {showModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="consent-modal-title">
          <div className="modal-card" style={{ maxWidth: 520 }}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowModal(false)}
              aria-label="Cerrar modal de preferencias de cookies"
            >
              <X size={18} />
            </button>

            <h2 id="consent-modal-title" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={22} color="var(--brand-primary)" />
              Configurar Preferencias de Privacidad
            </h2>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
              Selecciona qué categorías de cookies y almacenamiento deseas permitir durante tu navegación:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {/* Essential */}
              <div style={{ backgroundColor: 'var(--bg-primary)', padding: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Técnicas y Esenciales (Obligatorias)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Imprescindibles para recordar tu sesión, tema oscuro y preferencias de navegación.
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success-primary)', padding: '2px 8px', backgroundColor: 'var(--success-soft)', borderRadius: 'var(--radius-full)' }}>
                  Siempre Activo
                </span>
              </div>

              {/* Analytics */}
              <div style={{ backgroundColor: 'var(--bg-primary)', padding: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Métricas y Rendimiento</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Nos ayuda a entender el volumen de jugadores y rendimiento de la plataforma de forma agregada.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={customPrefs.analytics}
                  onChange={(e) => setCustomPrefs({ ...customPrefs, analytics: e.target.checked })}
                  aria-label="Permitir métricas y rendimiento"
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
              </div>

              {/* Personalized Ads */}
              <div style={{ backgroundColor: 'var(--bg-primary)', padding: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Publicidad Personalizada (Google AdSense)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Permite a Google mostrar anuncios basados en tus intereses previos. Si se desactiva, solo se mostrarán anuncios contextuales no personalizados.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={customPrefs.personalizedAds}
                  onChange={(e) => setCustomPrefs({ ...customPrefs, personalizedAds: e.target.checked, nonPersonalizedAds: true })}
                  aria-label="Permitir publicidad personalizada"
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowModal(false)}
                style={{ width: 'auto', padding: '8px 16px' }}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleSaveCustom}
                style={{ width: 'auto', padding: '8px 20px' }}
              >
                Guardar Preferencias
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
