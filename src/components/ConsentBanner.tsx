import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, Check, X } from 'lucide-react';
import { ConsentManager } from '../services/consent';

interface ConsentBannerProps {
  onNavigate?: (path: string) => void;
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [advertising, setAdvertising] = useState(true);

  useEffect(() => {
    const existing = ConsentManager.getConsent();
    if (!existing) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    ConsentManager.setConsent({ analytics: true, advertising: true });
    setIsVisible(false);
    setShowModal(false);
    window.location.reload();
  };

  const handleRejectNonEssential = () => {
    ConsentManager.setConsent({ analytics: false, advertising: false });
    setIsVisible(false);
    setShowModal(false);
    window.location.reload();
  };

  const handleSaveCustom = () => {
    ConsentManager.setConsent({ analytics, advertising });
    setIsVisible(false);
    setShowModal(false);
    window.location.reload();
  };

  if (!isVisible && !showModal) {
    return null;
  }

  return (
    <>
      {/* Banner Principal */}
      {isVisible && !showModal && (
        <aside
          role="region"
          aria-label="Consentimiento de Cookies y Privacidad"
          style={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 40px)',
            maxWidth: 820,
            backgroundColor: 'var(--bg-card)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--border-active)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--brand-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Cookie size={22} color="var(--brand-primary)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>
                Tu privacidad y experiencia en Gamesle
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                En Gamesle utilizamos cookies técnicas necesarias para el funcionamiento del portal y el guardado de tus preferencias, y con tu consentimiento, cookies de análisis y publicidad contextual a través de Google AdSense.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: 14
            }}
          >
            {onNavigate ? (
              <button
                type="button"
                onClick={() => onNavigate('/privacy')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--brand-primary)',
                  fontSize: '0.82rem',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Leer Política de Privacidad y Cookies
              </button>
            ) : (
              <a
                href="/privacy"
                style={{
                  color: 'var(--brand-primary)',
                  fontSize: '0.82rem',
                  textDecoration: 'underline',
                  fontWeight: 600
                }}
              >
                Leer Política de Privacidad
              </a>
            )}

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowModal(true)}
                style={{ fontSize: '0.82rem', padding: '8px 14px', minHeight: 38 }}
              >
                <Settings size={14} /> Personalizar
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleRejectNonEssential}
                style={{ fontSize: '0.82rem', padding: '8px 14px', minHeight: 38 }}
              >
                Solo Necesarias
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleAcceptAll}
                style={{ fontSize: '0.82rem', padding: '8px 16px', minHeight: 38 }}
              >
                <Check size={14} /> Aceptar Todas
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Modal de Personalización */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Panel de Configuración de Consentimiento"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: 16
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 580,
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: 28,
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ShieldCheck size={24} color="var(--brand-primary)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Preferencias de Privacidad</h3>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setShowModal(false)}
                aria-label="Cerrar modal de privacidad"
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Cookies Necesarias */}
              <div
                style={{
                  padding: 14,
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>Cookies Técnicas Necesarias</strong>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Imprescindibles para el inicio de sesión, racha y preferencias de tema.
                  </p>
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--success-primary)' }}>
                  Siempre Activas
                </span>
              </div>

              {/* Cookies de Publicidad */}
              <div
                style={{
                  padding: 14,
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>Publicidad y Medición (Google AdSense)</strong>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Permiten financiar el mantenimiento y creación de nuevos juegos gratuitos.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={advertising}
                  onChange={(e) => setAdvertising(e.target.checked)}
                  style={{ width: 20, height: 20, accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
                  aria-label="Permitir cookies de publicidad"
                />
              </div>

              {/* Cookies de Análisis */}
              <div
                style={{
                  padding: 14,
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>Métricas y Rendimiento</strong>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Estadísticas agregadas anónimas sobre el rendimiento de los juegos.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  style={{ width: 20, height: 20, accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
                  aria-label="Permitir cookies de análisis"
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 6 }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleRejectNonEssential}
              >
                Rechazar Todo
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleSaveCustom}
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
