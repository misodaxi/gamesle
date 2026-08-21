import React, { useEffect, useState } from 'react';
import { ConsentManager } from '../services/consent';

export const EXCLUDED_AD_ROUTES = [
  '/login',
  '/settings',
  '/404',
  '/privacy',
  '/terms',
  '/accessibility',
  '/contact'
];

export const isAdAllowedOnRoute = (path: string): boolean => {
  return !EXCLUDED_AD_ROUTES.some((excluded) => path === excluded || path.startsWith(`${excluded}/`));
};

interface AdBoxProps {
  label: string;
  sizeLabel: string;
  minHeight?: number;
  className?: string;
}

const AdSingleBox: React.FC<AdBoxProps> = ({
  label,
  sizeLabel,
  minHeight = 280,
  className = ''
}) => {
  const [canServe, setCanServe] = useState(false);

  useEffect(() => {
    setCanServe(ConsentManager.canServeAds());
  }, []);

  return (
    <div
      className={`ad-single-box ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight,
        backgroundColor: 'var(--bg-card)',
        border: '1px dashed var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 8px',
        boxSizing: 'border-box'
      }}
    >
      <span
        style={{
          fontSize: '0.62rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 4
        }}
      >
        {label}
      </span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.72rem',
          textAlign: 'center'
        }}
      >
        <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Espacio Publicitario</span>
        <span style={{ fontSize: '0.68rem', marginTop: 2 }}>{sizeLabel}</span>
        {!canServe && (
          <span style={{ fontSize: '0.62rem', color: 'var(--brand-primary)', marginTop: 4 }}>
            (Pendiente de Consentimiento)
          </span>
        )}
      </div>
    </div>
  );
};

export const DesktopSideAd: React.FC<{ side: 'left' | 'right'; currentPath?: string }> = ({
  side,
  currentPath = '/'
}) => {
  if (!isAdAllowedOnRoute(currentPath)) {
    return null;
  }

  return (
    <aside
      className={`desktop-side-wing desktop-side-${side}`}
      role="complementary"
      aria-label={`Espacios publicitarios laterales ${side === 'left' ? 'izquierdos' : 'derechos'}`}
    >
      <div className="desktop-side-sticky">
        {/* Bloque Superior Lateral */}
        <AdSingleBox
          label="Publicidad Lateral Superior"
          sizeLabel={side === 'left' ? 'Superior Izquierdo' : 'Superior Derecho'}
          minHeight={360}
          className="desktop-side-ad-box"
        />

        {/* Separador entre bloques verticales */}
        <div style={{ height: 14 }} />

        {/* Bloque Inferior Lateral */}
        <AdSingleBox
          label="Publicidad Lateral Inferior"
          sizeLabel={side === 'left' ? 'Inferior Izquierdo' : 'Inferior Derecho'}
          minHeight={360}
          className="desktop-side-ad-box"
        />
      </div>
    </aside>
  );
};

export const TopAd: React.FC<{ currentPath?: string }> = ({ currentPath = '/' }) => {
  if (!isAdAllowedOnRoute(currentPath)) {
    return null;
  }

  return (
    <aside
      className="top-ad-banner"
      role="complementary"
      aria-label="Espacio publicitario superior"
      style={{
        width: '100%',
        margin: '0 auto 20px auto'
      }}
    >
      <AdSingleBox
        label="Publicidad"
        sizeLabel="Banner Superior Adaptable (728x90 / 320x50 Móvil)"
        minHeight={65}
      />
    </aside>
  );
};

export const BottomAd: React.FC<{ currentPath?: string }> = ({ currentPath = '/' }) => {
  if (!isAdAllowedOnRoute(currentPath)) {
    return null;
  }

  return (
    <aside
      className="bottom-ad-banner"
      role="complementary"
      aria-label="Espacio publicitario inferior"
      style={{
        width: '100%',
        margin: '24px auto 0 auto'
      }}
    >
      <AdSingleBox
        label="Publicidad"
        sizeLabel="Banner Inferior Adaptable (728x90 / 320x50 Móvil)"
        minHeight={65}
      />
    </aside>
  );
};
