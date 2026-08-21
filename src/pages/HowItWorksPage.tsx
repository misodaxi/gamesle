import React from 'react';
import { HelpCircle, Play } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <article className="content-section" style={{ width: '100%', maxWidth: 780 }}>
      <header style={{ marginBottom: 24, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--brand-primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: 6 }}>
          <HelpCircle size={16} /> Guía Oficial
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Cómo Funciona el Ecosistema Gamesle
        </h1>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
        {/* Paso 1: El Reto Diario */}
        <section style={{ display: 'flex', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--brand-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontWeight: 800,
              color: 'var(--brand-primary)',
              fontSize: '1.2rem'
            }}
          >
            1
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
              Un Desafío Nuevo Cada Día a Medianoche
            </h2>
            <p>
              Todos los juegos de Gamesle comparten una sincronización global: cada día a las <strong>00:00 (medianoche peninsular española, CET/CEST)</strong> se publica una partida diaria única y compartida para toda la comunidad mundial.
            </p>
          </div>
        </section>

        {/* Paso 2: Deducción e Igualdad */}
        <section style={{ display: 'flex', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--brand-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontWeight: 800,
              color: 'var(--brand-primary)',
              fontSize: '1.2rem'
            }}
          >
            2
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
              Mismo Reto, Mismas Pistas, Máxima Justicia
            </h2>
            <p>
              En juegos como <strong>Namele</strong>, todos los jugadores se enfrentan a los mismos 10 nombres del día con las mismas pistas demográficas y opciones geográficas. La puntuación premia la cercanía geográfica y la rapidez deductiva.
            </p>
          </div>
        </section>

        {/* Paso 3: Rachas y Top Mundial */}
        <section style={{ display: 'flex', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--brand-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontWeight: 800,
              color: 'var(--brand-primary)',
              fontSize: '1.2rem'
            }}
          >
            3
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
              Mantén tu Racha de Fuego y Compite en el Top Mundial
            </h2>
            <p>
              Completa el reto antes de las 00:00 para sumar un día más a tu racha consecutiva (🔥). Los jugadores registrados con su cuenta de Google compiten en el Top Mundial diario oficial.
            </p>
          </div>
        </section>

        <div style={{ marginTop: 12, padding: 20, backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>
            ¿Listo para el desafío de hoy?
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
            Empieza ahora con Namele y adivina el origen de los 10 nombres en el mapa mundial.
          </p>
          <a
            href="https://namele.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Play size={18} fill="currentColor" /> Jugar a Namele Ahora
          </a>
        </div>
      </div>
    </article>
  );
};
