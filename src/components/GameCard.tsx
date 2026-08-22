import React from 'react';
import { Play, Globe2, Newspaper, AudioWaveform, Sparkles, ArrowRight } from 'lucide-react';
import { GameItem } from '../types';
import { useAuth } from '../auth/AuthContext';

interface GameCardProps {
  game: GameItem;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { getGameLaunchUrl } = useAuth();
  const launchUrl = getGameLaunchUrl(game.url);

  const isNewsle = game.id === 'newsle' || game.iconName === 'newspaper';
  const isBackwardle = game.id === 'backwardle' || game.iconName === 'audio';

  return (
    <article className="game-card" aria-label={`Ficha del juego ${game.title}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--brand-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isBackwardle ? (
              <AudioWaveform size={22} color="var(--brand-primary)" />
            ) : isNewsle ? (
              <Newspaper size={22} color="var(--brand-primary)" />
            ) : (
              <Globe2 size={22} color="var(--brand-primary)" />
            )}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{game.title}</h3>
              <span
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  backgroundColor: 'var(--bg-primary)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {game.category}
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 2 }}>
              {game.tagline}
            </p>
          </div>
        </div>

        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            color: 'var(--success-primary)',
            backgroundColor: 'var(--success-soft)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <Sparkles size={12} /> EN VIVO
        </span>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
        {game.description}
      </p>

      {game.features && (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4, margin: '4px 0' }}>
          {game.features.map((feat, idx) => (
            <li key={idx} style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--brand-primary)' }} />
              {feat}
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
        <a
          href={launchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ padding: '8px 18px', fontSize: '0.85rem', minHeight: 38 }}
        >
          <Play size={15} fill="currentColor" /> Jugar <ArrowRight size={14} />
        </a>
      </div>
    </article>
  );
};
