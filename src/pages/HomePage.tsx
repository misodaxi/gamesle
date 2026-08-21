import React from 'react';
import { Play, Sparkles, Globe2, Newspaper, Gamepad2 } from 'lucide-react';
import { CountdownBadge } from '../components/CountdownBadge';
import { GameCard } from '../components/GameCard';
import { GameItem } from '../types';
import { useAuth } from '../auth/AuthContext';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

const ASSOCIATED_GAMES: GameItem[] = [
  {
    id: 'newsle',
    title: 'Newsle',
    slug: 'newsle',
    tagline: 'Adivina la Fecha a Partir de las Noticias',
    description: 'Tres titulares históricos reales, una fecha exacta. 10 rondas diarias con pistas progresivas y puntuación continua por cercanía temporal.',
    category: 'Historia',
    status: 'live',
    url: 'https://newsle.onrender.com',
    badge: '⭐ Nuevo Juego Oficial',
    iconName: 'newspaper',
    features: ['3 Noticias por ronda', 'Puntuación continua por días', 'Pistas de orientación y siglo'],
    gradient: 'linear-gradient(135deg, #4F46E5, #06B6D4)'
  },
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

export const HomePage: React.FC<HomePageProps> = () => {
  const { getGameLaunchUrl } = useAuth();
  const nameleLaunchUrl = getGameLaunchUrl('https://namele.onrender.com');
  const newsleLaunchUrl = getGameLaunchUrl('https://newsle.onrender.com');

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Spain Midnight Countdown */}
      <CountdownBadge />

      {/* Featured Game 1: NEWSLE */}
      <section className="featured-card" aria-label="Juego Destacado Oficial: Newsle">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div className="badge-featured">
            <Sparkles size={13} /> ¡Nuevo Juego Oficial en Vivo!
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--brand-text)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            10 FECHAS HOY • RESET 00:00 ESPAÑA
          </span>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#4F46E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)'
              }}
            >
              <Newspaper size={26} color="#FFFFFF" />
            </div>
            <div>
              <h2 translate="no" className="notranslate" style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
                Newsle
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
                Tres titulares verídicos. ¿Puedes descubrir qué día exacto ocurrió?
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5, margin: '8px 0 16px 0' }}>
            Desafío diario cronológico con 10 rondas de noticias de ciencia, cultura, deportes y eventos mundiales. ¡Gana puntos por cercanía temporal sin penalizaciones binarias!
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href={newsleLaunchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <Play size={18} /> Jugar a <span translate="no" className="notranslate">Newsle</span> Diario
            </a>
          </div>
        </div>
      </section>

      {/* Featured Game 2: NAMELE */}
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
              <Globe2 size={26} color="#FFFFFF" />
            </div>
            <div>
              <h2 translate="no" className="notranslate" style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
                Namele
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
                Deducción demográfica y geográfica en mapa interactivo
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5, margin: '8px 0 16px 0' }}>
            Pon a prueba tu conocimiento de la etimología y distribución de nombres propios alrededor del mundo. Conéctate con Google para conservar tu racha diaria sincronizada.
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href={nameleLaunchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <Play size={18} /> Jugar a <span translate="no" className="notranslate">Namele</span> Diario
            </a>
          </div>
        </div>
      </section>

      {/* Catálogo de Juegos */}
      <section style={{ marginTop: 8 }} aria-label="Catálogo Completo de Juegos Gamesle">
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Gamepad2 size={20} color="var(--brand-primary)" />
          Catálogo Oficial de Juegos Diarios
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {ASSOCIATED_GAMES.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
};
