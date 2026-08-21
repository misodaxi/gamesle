import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';

export const CountdownBadge: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>('00:00:00');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Target midnight in Europe/Madrid timezone
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Madrid',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      });

      const parts = formatter.formatToParts(now);
      const hours = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
      const minutes = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
      const seconds = parseInt(parts.find((p) => p.type === 'second')?.value || '0', 10);

      const secondsUntilMidnight = 86400 - (hours * 3600 + minutes * 60 + seconds);

      const h = Math.floor(secondsUntilMidnight / 3600);
      const m = Math.floor((secondsUntilMidnight % 3600) / 60);
      const s = secondsUntilMidnight % 60;

      const pad = (n: number) => n.toString().padStart(2, '0');
      setTimeLeft(`${pad(h)}:${pad(m)}:${pad(s)}`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="countdown-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)'
      }}
      aria-live="polite"
      aria-label={`Tiempo restante para el próximo reto diario: ${timeLeft}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Clock size={18} color="var(--brand-primary)" />
        <div>
          <span style={{ fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
            Próximo Reto Diario Gamesle <Sparkles size={13} color="var(--warning-primary)" />
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Se actualiza a las 00:00 de España (medianoche peninsular)
          </span>
        </div>
      </div>

      <div className="countdown-digits" style={{ fontSize: '1.05rem', padding: '4px 12px' }}>
        {timeLeft}
      </div>
    </div>
  );
};
