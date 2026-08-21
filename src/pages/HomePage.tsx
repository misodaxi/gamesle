import React from 'react';
import { Play, Sparkles, Globe2, ShieldCheck, Gamepad2, HelpCircle, Trophy, Flame } from 'lucide-react';
import { CountdownBadge } from '../components/CountdownBadge';
import { GameCard } from '../components/GameCard';
import { GameItem } from '../types';
import { useAuth } from '../auth/AuthContext';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

const ASSOCIATED_GAMES: GameItem[] = [
  {
    id: 'namele',
    title: 'Namele',
    slug: 'namele',
    tagline: 'Deducción Geográfica en Mapa Mundial',
    description: 'Adivina de qué país procede cada nombre en el mapa interactivo. 10 nombres diarios, pistas demográficas oficiales y ranking mundial.',
    category: 'Geografía',
    status: 'live',
    url: 'https://namele.onrender.com',
    badge: '⭐ Juego Oficial Activo',
    iconName: 'map',
    features: ['10 Rondas diarias', 'Cálculo Haversine de distancia', 'Top mundial diario de jugadores'],
    gradient: 'linear-gradient(135deg, var(--brand-primary), #8B8CF8)'
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { getGameLaunchUrl } = useAuth();
  const nameleUrl = getGameLaunchUrl('https://namele.onrender.com');

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Spain Midnight Countdown */}
      <CountdownBadge />

      {/* Featured Game: NAMELE */}
      <section className="featured-card" aria-label="Juego Destacado Oficial: Namele">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div className="badge-featured">
            <Sparkles size={13} /> Juego Oficial en Vivo
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--brand-text)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            10 NOMBRES HOY • RESET 00:00 ESPAÑA
          </span>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px var(--brand-glow)'
              }}
            >
              <Globe2 size={24} color="#FFFFFF" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Namele
              </h1>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Deducción Geográfica en Mapa Mundial
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5, margin: '12px 0 16px 0' }}>
            ¿De qué país procede cada nombre? Pon a prueba tu deducción en el mapa interactivo con <strong>10 rondas diarias</strong>, pistas demográficas de censos oficiales y compite en el <strong>Top Mundial</strong>.
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href={nameleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '12px 22px' }}
            >
              <Play size={18} fill="currentColor" /> Jugar a Namele Ahora
            </a>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => onNavigate('/how-it-works')}
              style={{ padding: '10px 18px' }}
            >
              <HelpCircle size={16} /> ¿Cómo funciona?
            </button>
          </div>
        </div>
      </section>

      {/* Associated Games Grid Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Juegos Asociados a Gamesle
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Catálogo oficial de títulos conectados y disponibles para jugar hoy.
          </p>
        </div>
      </div>

      {/* Grid of Associated Games */}
      <div className="games-grid">
        {ASSOCIATED_GAMES.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* Why Gamesle Value Props */}
      <section className="content-section" aria-label="Características de Gamesle">
        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Gamepad2 size={20} color="var(--brand-primary)" /> La Experiencia de Juegos Diarios Gamesle
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          <div style={{ padding: 14, backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontWeight: 700, fontSize: '0.85rem', color: 'var(--brand-text)' }}>
              <Flame size={16} /> Reto Diario Sincronizado
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Cada noche a las 00:00 (hora de España), se desbloquea un nuevo reto simultáneo para todo el mundo.
            </p>
          </div>

          <div style={{ padding: 14, backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontWeight: 700, fontSize: '0.85rem', color: 'var(--success-primary)' }}>
              <ShieldCheck size={16} /> Datos Oficiales y Fiables
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Construido con censos nacionales y bases cartográficas abiertas con total rigor.
            </p>
          </div>

          <div style={{ padding: 14, backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontWeight: 700, fontSize: '0.85rem', color: 'var(--warning-primary)' }}>
              <Trophy size={16} /> 100% Gratuito y Accesible
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Sin descargas obligatorias, optimizado para ordenador y pantallas táctiles móviles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
