import React from 'react';
import { Play, Sparkles, Globe2, ShieldCheck, Gamepad2, HelpCircle, Trophy, Flame } from 'lucide-react';
import { CountdownBadge } from '../components/CountdownBadge';
import { GameCard } from '../components/GameCard';
import { GameItem } from '../types';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

const ASSOCIATED_GAMES: GameItem[] = [
  {
    id: 'namele',
    title: 'Namele',
    slug: 'namele',
    tagline: 'Deducción Geográfica en Mapa Mundial',
    description: 'Adivina de qué país procede cada nombre en el mapa mundial interactivo. 10 nombres diarios, pistas demográficas oficiales y ranking mundial.',
    category: 'Geografía',
    status: 'live',
    url: 'https://namele.onrender.com',
    badge: '⭐ Juego Oficial Activo',
    iconName: 'map',
    features: ['10 Rondas diarias', 'Cálculo Haversine de distancia', 'Top mundial oficial de jugadores'],
    gradient: 'linear-gradient(135deg, #5B5CE2, #8B8CF8)'
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div style={{ width: '100%' }}>
      {/* Spain Midnight Countdown */}
      <CountdownBadge />

      {/* Featured Game of the Day: NAMELE */}
      <section className="featured-card" aria-label="Juego Destacado del Día">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div className="badge-featured">
            <Sparkles size={14} /> Juego Oficial en Vivo
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--brand-text)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            10 NOMBRES HOY • RESET 00:00 ESPAÑA
          </span>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px var(--brand-glow)'
              }}
            >
              <Globe2 size={28} color="#FFFFFF" />
            </div>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Namele
              </h1>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Deducción Geográfica en Mapa Mundial
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.55, maxWidth: 700, margin: '14px 0 20px 0' }}>
            ¿De qué país procede cada nombre? Pon a prueba tu conocimiento y deducción en el mapa interactivo con <strong>10 rondas diarias</strong>, pistas demográficas basadas en censos nacionales oficiales y compite en el <strong>Top Mundial</strong> diario.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a
              href="https://namele.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: '1.05rem', padding: '14px 28px' }}
            >
              <Play size={20} fill="currentColor" /> Jugar a Namele Ahora
            </a>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => onNavigate('/how-it-works')}
            >
              <HelpCircle size={18} /> ¿Cómo funciona?
            </button>
          </div>
        </div>
      </section>

      {/* Associated Games Grid Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Juegos Asociados a Gamesle
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Catálogo oficial de títulos conectados y disponibles para jugar hoy.
          </p>
        </div>
      </div>

      {/* Grid of Associated Games */}
      <div className="games-grid" style={{ gridTemplateColumns: '1fr' }}>
        {ASSOCIATED_GAMES.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* Why Gamesle Value Props */}
      <section className="content-section" aria-label="Características de Gamesle">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Gamepad2 size={22} color="var(--brand-primary)" /> La Experiencia de Juegos Diarios Gamesle
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <div style={{ padding: 16, backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontWeight: 700, color: 'var(--brand-primary)' }}>
              <Flame size={18} /> Reto Diario Sincronizado
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              Cada noche a las 00:00 (hora de España), el juego se actualiza con un reto nuevo idéntico para todos los jugadores del mundo.
            </p>
          </div>

          <div style={{ padding: 16, backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontWeight: 700, color: 'var(--success-primary)' }}>
              <ShieldCheck size={18} /> Datos Oficiales y Fiables
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              Construido con bases de datos públicas oficiales (INE, censos mundiales, cartografía abierta) con total rigor y transparencia.
            </p>
          </div>

          <div style={{ padding: 16, backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontWeight: 700, color: '#3B82F6' }}>
              <Trophy size={18} /> 100% Gratuito y Accesible
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              Sin descargas obligatorias, sin micropagos y optimizado para ordenadores y móviles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
