import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';

export const CountdownBadge: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeUntilMidnightSpain = (): string => {
      const now = new Date();
      // España Peninsular (Europe/Madrid)
      const madridNowStr = now.toLocaleString('en-US', { timeZone: 'Europe/Madrid' });
      const madridNow = new Date(madridNowStr);

      const madridMidnight = new Date(madridNow);
      madridMidnight.setHours(24, 0, 0, 0);

      const diffMs = madridMidnight.getTime() - madridNow.getTime();
      if (diffMs <= 0) return '00:00:00';

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    setTimeLeft(calculateTimeUntilMidnightSpain());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeUntilMidnightSpain());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-card" role="region" aria-label="Cuenta atrás para el nuevo reto diario">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--brand-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Clock size={22} color="var(--brand-primary)" />
        </div>
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            Próximo Reto Diario en Gamesle <Sparkles size={16} color="#F59E0B" />
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Todos los juegos se actualizan simultáneamente a las 00:00 de España (medianoche peninsular).
          </p>
        </div>
      </div>

      <div className="countdown-digits" aria-live="polite">
        {timeLeft || '00:00:00'}
      </div>
    </div>
  );
};
