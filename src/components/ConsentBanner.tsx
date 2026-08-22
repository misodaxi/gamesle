import React, { useState, useEffect } from 'react';
import { ShieldCheck, Settings, Check, X } from 'lucide-react';
import { ConsentManager, ConsentPreferences } from '../services/consent';

interface ConsentBannerProps {
  onNavigate: (path: string) => void;
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({ onNavigate }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [consentState, setConsentState] = useState<ConsentPreferences>(ConsentManager.getConsent());

  useEffect(() => {
    if (!ConsentManager.hasAnswered()) {
      setShowBanner(true);
    }

    const unsubscribe = ConsentManager.subscribe((newConsent) => {
      setConsentState(newConsent);
      if (newConsent.status !== 'undecided') {
        setShowBanner(false);
      }
    });

    return unsubscribe;
  }, []);

  const handleAcceptAll = () => {
    ConsentManager.acceptAll();
    setShowBanner(false);
    setShowModal(false);
  };

  const handleRejectNonEssential = () => {
    ConsentManager.rejectNonEssential();
    setShowBanner(false);
    setShowModal(false);
  };

  const handleSaveCustom = (analytics: boolean, marketing: boolean) => {
    ConsentManager.setConsent({
      status: 'custom',
      essential: true,
      analytics,
      personalizedAds: marketing,
      nonPersonalizedAds: true,
      updatedAt: new Date().toISOString()
    });
    setShowBanner(false);
    setShowModal(false);
  };

  if (!showBanner && !showModal) {
    return null;
  }

  return (
    <>
      {/* Banner Flotante Inferior RGPD / ePrivacy (Diseño Exacto Homologado) */}
      {showBanner && !showModal && (
        <aside
          role="region"
          aria-label="Aviso de privacidad y consentimiento de cookies"
          style={{
            position: 'fixed',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 24px)',
            maxWidth: 720,
            zIndex: 9999,
            backgroundColor: 'rgba(20, 24, 38, 0.96)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 20,
            padding: '18px 22px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Top row: Icon + Text */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 2
                }}
              >
                <ShieldCheck size={22} color="#6366F1" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.92rem', marginBottom: 3 }}>
                  Respetamos tu Privacidad y Preferencias de Cookies
                </div>
                <p style={{ fontSize: '0.8rem', lineHeight: 1.45, color: '#94A3B8', margin: 0 }}>
                  Utilizamos cookies técnicas necesarias para el juego diario y servicios publicitarios de Google AdSense para sostener la plataforma de forma 100% gratuita. Consulta nuestra{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('/privacy')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#6366F1',
                      textDecoration: 'underline',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: '0.8rem',
                      fontFamily: 'inherit'
                    }}
                  >
                    Política de Privacidad
                  </button>
                  .
                </p>
              </div>
            </div>

            {/* Bottom row: Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-start', paddingLeft: 54 }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowModal(true)}
                style={{
                  borderRadius: 9999,
                  padding: '7px 16px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  minHeight: 36,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#F1F5F9'
                }}
              >
                <Settings size={13} /> Configurar
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleRejectNonEssential}
                style={{
                  borderRadius: 9999,
                  padding: '7px 16px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  minHeight: 36,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#F1F5F9'
                }}
              >
                Solo Necesarias
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={handleAcceptAll}
                style={{
                  borderRadius: 9999,
                  padding: '7px 20px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  minHeight: 36,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'linear-gradient(135deg, #5B5CE2, #7C3AED)',
                  border: 'none',
                  color: '#FFFFFF'
                }}
              >
                <Check size={14} /> Aceptar Todas
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
            style={{ maxWidth: 520, textAlign: 'left', width: '100%' }}
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
