import React from 'react';
import { Play, MapPin, Flag, Users, Clock, Compass, CheckCircle2 } from 'lucide-react';
import { GameItem } from '../types';

interface GameCardProps {
  game: GameItem;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const isLive = game.status === 'live';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'map':
        return <MapPin size={24} color="var(--brand-primary)" />;
      case 'flag':
        return <Flag size={24} color="#3B82F6" />;
      case 'users':
        return <Users size={24} color="#10B981" />;
      case 'clock':
        return <Clock size={24} color="#F59E0B" />;
      default:
        return <Compass size={24} color="var(--brand-primary)" />;
    }
  };

  return (
    <div className="game-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--brand-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {getIcon(game.iconName)}
        </div>

        <div>
          {isLive ? (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                backgroundColor: 'var(--success-soft)',
                color: 'var(--success-primary)',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase'
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--success-primary)' }} />
              En Vivo
            </span>
          ) : (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                backgroundColor: 'var(--warning-soft)',
                color: 'var(--warning-primary)',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)'
              }}
            >
              {game.badge || 'Próximamente'}
            </span>
          )}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{game.title}</h3>
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-secondary)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {game.category}
          </span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.45 }}>
          {game.description}
        </p>
      </div>

      {/* Feature Bullets */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '4px 0' }}>
        {game.features.map((feat, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <CheckCircle2 size={13} color="var(--brand-primary)" />
            <span>{feat}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 8 }}>
        {isLive ? (
          <a
            href={game.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ width: '100%' }}
          >
            <Play size={16} fill="currentColor" /> Jugar a {game.title} Ahora
          </a>
        ) : (
          <button
            type="button"
            className="btn-secondary"
            disabled
            style={{ width: '100%', opacity: 0.6, cursor: 'not-allowed' }}
          >
            En Desarrollo Activo
          </button>
        )}
      </div>
    </div>
  );
};
