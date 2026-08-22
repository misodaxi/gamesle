import React, { useEffect, useState } from 'react';
import { ConsentManager } from '../services/consent';

export const EXCLUDED_AD_ROUTES = [
  '/login',
  '/profile',
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
  minHeight = 100,
  className = ''
}) => {
  const [canServe, setCanServe] = useState(() => ConsentManager.canServeAnyAds());

  useEffect(() => {
    setCanServe(ConsentManager.canServeAnyAds());
    return ConsentManager.subscribe(() => {
      setCanServe(ConsentManager.canServeAnyAds());
    });
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

// In Gamesle portal, side wings are kept empty/clean to prioritize platform content over ads
export const DesktopSideAd: React.FC<{ side: 'left' | 'right'; currentPath?: string }> = () => {
  return null;
};

export const TopAd: React.FC<{ currentPath?: string }> = () => {
  return null;
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
        margin: '32px auto 0 auto',
        maxWidth: 728
      }}
    >
      <AdSingleBox
        label="Publicidad"
        sizeLabel="Banner Inferior (728x90 / 320x50 Móvil)"
        minHeight={90}
      />
    </aside>
  );
};
