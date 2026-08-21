import React, { useState, useEffect } from 'react';
import { ShieldCheck, Settings, X, Check } from 'lucide-react';
import { ConsentManager, ConsentPreferences } from '../services/consent';

interface ConsentBannerProps {
  onNavigate: (path: string) => void;
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState<boolean>(() => !ConsentManager.hasAnswered());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [consentState, setConsentState] = useState<ConsentPreferences>(() => ConsentManager.getConsent());

  useEffect(() => {
    return ConsentManager.subscribe((newConsent) => {
      setConsentState(newConsent);
      setIsVisible(newConsent.status === 'undecided');
    });
  }, []);

  const handleAcceptAll = () => {
    ConsentManager.acceptAll();
    setIsVisible(false);
    setShowModal(false);
  };

  const handleRejectNonEssential = () => {
    ConsentManager.rejectNonEssential();
    setIsVisible(false);
    setShowModal(false);
  };

  const handleSaveCustom = (analytics: boolean, personalizedAds: boolean) => {
    ConsentManager.setConsent({
      status: 'custom',
      essential: true,
      analytics,
      personalizedAds,
      nonPersonalizedAds: true,
      updatedAt: new Date().toISOString()
    });
    setIsVisible(false);
    setShowModal(false);
  };

  if (!isVisible && !showModal) return null;

  return (
    <>
      {/* Banner inferior horizontal fijo (Exact matching design) */}
      {isVisible && !showModal && (
        <aside
          role="region"
          aria-label="Aviso de privacidad y cookies"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(13, 15, 20, 0.96)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(91, 92, 226, 0.35)',
            boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.45)',
            padding: '14px 24px',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
              flexWrap: 'wrap'
            }}
          >
            <div style={{ flex: '1 1 340px', minWidth: 280 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '0.92rem', marginBottom: 4, color: 'var(--text-primary)' }}>
                <ShieldCheck size={18} color="var(--brand-primary)" />
                Tu Privacidad en Gamesle
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                Utilizamos almacenamiento local y cookies técnicas para guardar tu sesión y preferencias. Si lo autorizas, también empleamos cookies para métricas y publicidad personalizada de Google AdSense acorde al RGPD. Consulta nuestra{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('/privacy')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--brand-primary)',
                    textDecoration: 'underline',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: '0.82rem',
                    fontFamily: 'inherit'
                  }}
                >
                  Política de Privacidad
                </button>
                .
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowModal(true)}
                style={{
                  width: 'auto',
                  padding: '9px 18px',
                  fontSize: '0.84rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  borderRadius: 'var(--radius-full)',
                  minHeight: 38
                }}
              >
                <Settings size={14} /> Configurar
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleRejectNonEssential}
                style={{
                  width: 'auto',
                  padding: '9px 18px',
                  fontSize: '0.84rem',
                  borderRadius: 'var(--radius-full)',
                  minHeight: 38
                }}
              >
                Solo Necesarias
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={handleAcceptAll}
                style={{
                  width: 'auto',
                  padding: '9px 22px',
                  fontSize: '0.84rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  borderRadius: 'var(--radius-full)',
                  minHeight: 38
                }}
              >
                <Check size={15} /> Aceptar Todas
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Modal de Configuración Detallada */}
      {showModal && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-content"
            style={{ maxWidth: 520, textAlign: 'left' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ShieldCheck size={24} color="var(--brand-primary)" />
                <h2 id="modal-title" style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                  Preferencias de Privacidad
                </h2>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setShowModal(false)}
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 20 }}>
              Puedes activar o desactivar las distintas categorías de cookies según tus preferencias. Las cookies esenciales no se pueden desactivar ya que son necesarias para el funcionamiento del juego.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              {/* Esenciales */}
              <div style={{ padding: 12, backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Cookies Técnicas y Esenciales</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--success-primary)', fontWeight: 700 }}>Siempre Activas</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Almacenan la racha diaria, progreso de la partida en curso, configuración de audio y tema visual.
                </p>
              </div>

              {/* Analíticas */}
              <label style={{ display: 'block', padding: 12, backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Métricas y Rendimiento</span>
                  <input
                    type="checkbox"
                    id="consent-analytics"
                    defaultChecked={consentState.analytics}
                    style={{ width: 18, height: 18, accentColor: 'var(--brand-primary)' }}
                  />
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Nos permiten evaluar agregadamente la estabilidad técnica y el rendimiento de los tiempos de carga.
                </p>
              </label>

              {/* Publicidad Personalizada */}
              <label style={{ display: 'block', padding: 12, backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Publicidad Personalizada (Google AdSense)</span>
                  <input
                    type="checkbox"
                    id="consent-marketing"
                    defaultChecked={consentState.personalizedAds}
                    style={{ width: 18, height: 18, accentColor: 'var(--brand-primary)' }}
                  />
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Permite a Google y sus socios mostrar anuncios relevantes según tus intereses. Si se desactiva, solo se mostrarán anuncios contextuales no personalizados.
                </p>
              </label>
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleRejectNonEssential}
              >
                Rechazar Opcionales
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  const analytics = (document.getElementById('consent-analytics') as HTMLInputElement)?.checked ?? false;
                  const marketing = (document.getElementById('consent-marketing') as HTMLInputElement)?.checked ?? false;
                  handleSaveCustom(analytics, marketing);
                }}
              >
                Guardar Configuración
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
