import React, { useState } from 'react';
import { Sparkles, Globe2, Newspaper, AudioWaveform, Gamepad2, ShieldCheck, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { CountdownBadge } from '../components/CountdownBadge';
import { GameCard } from '../components/GameCard';
import { GameItem } from '../types';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

const ASSOCIATED_GAMES: GameItem[] = [
  {
    id: 'backwardle',
    title: 'Backwardle',
    slug: 'backwardle',
    tagline: 'Adivina los Sonidos Reproducidos al Revés',
    description: '10 grabaciones sonoras reales reproducidas en sentido inverso. Pon a prueba tu agudeza auditiva con osciloscopio interactivo, control de velocidad y 3 pistas progresivas.',
    category: 'Sonido',
    status: 'live',
    url: 'https://backwardle.onrender.com',
    badge: '⭐ Nuevo Juego Oficial',
    iconName: 'audio',
    features: ['10 Sonidos diarios al revés', 'Reproductor con osciloscopio interactivo', 'Pistas de fragmento normal y categoría'],
    gradient: 'linear-gradient(135deg, #5B5CE2, #7C3AED)'
  },
  {
    id: 'newsle',
    title: 'Newsle',
    slug: 'newsle',
    tagline: 'Adivina la Fecha a Partir de las Noticias',
    description: 'Tres titulares históricos reales, una fecha exacta. 10 rondas diarias con selector numérico de 3 ruedas, pistas de orientación y puntuación continua.',
    category: 'Historia',
    status: 'live',
    url: 'https://newsle.onrender.com',
    badge: '⭐ Nuevo Juego Oficial',
    iconName: 'newspaper',
    features: ['3 Noticias reales por ronda', 'Selector de fecha tipo candado', 'Pistas de contexto y lustro'],
    gradient: 'linear-gradient(135deg, #4F46E5, #06B6D4)'
  },
  {
    id: 'namele',
    title: 'Namele',
    slug: 'namele',
    tagline: 'Deducción Geográfica en Mapa Mundial',
    description: 'Adivina de qué país procede cada nombre o apellido en el mapa interactivo. 10 rondas diarias, cálculo de distancia geodésica y tabla de clasificación.',
    category: 'Geografía',
    status: 'live',
    url: 'https://namele.onrender.com',
    badge: '⭐ Juego Oficial',
    iconName: 'globe',
    features: ['Mapa mundial interactivo', 'Cálculo de distancia Haversine', 'Pistas demográficas y censales'],
    gradient: 'linear-gradient(135deg, #2563EB, #10B981)'
  }
];

export const HomePage: React.FC<HomePageProps> = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const platformFaqs = [
    {
      q: '¿Qué es Gamesle y cuál es su objetivo?',
      a: 'Gamesle es la plataforma oficial de juegos diarios de deducción, lógica, historia y conocimiento cultural. Diseñamos experiencias diarias sincronizadas donde todos los jugadores del mundo se enfrentan a los mismos retos cada 24 horas.'
    },
    {
      q: '¿A qué hora se actualizan los desafíos diarios?',
      a: 'Todos los juegos oficiales de Gamesle (como Namele y Newsle) se actualizan diariamente a las 00:00 hora peninsular de España (CET / UTC+1 en invierno, UTC+2 en verano).'
    },
    {
      q: '¿Es obligatorio crear una cuenta para jugar?',
      a: 'No. Puedes jugar libremente como invitado. Tus estadísticas y rachas se guardarán automáticamente en tu navegador. Si deseas compartir tus puntuaciones en el ranking global o sincronizar tus datos entre dispositivos, puedes iniciar sesión con Google con un solo clic.'
    },
    {
      q: '¿Qué diferencia a los juegos de Gamesle de otros juegos de palabras?',
      a: 'Nuestros juegos no se basan en palabras al azar, sino en datos reales, fuentes estadísticas verificadas y hemerotecas históricas. Combinan diversión interactiva con aprendizaje cultural y geográfico.'
    },
    {
      q: '¿Cómo se protegen los datos y la privacidad?',
      a: 'Gamesle cumple estrictamente con el RGPD y las normativas europeas de privacidad. No vendemos datos de usuarios y solo almacenamos el perfil básico de juego para las tablas de clasificación públicas.'
    }
  ];

  return (
    <div className="home-container" style={{ width: '100%', maxWidth: 880, margin: '0 auto' }}>
      {/* Hero Principal */}
      <section className="hero-banner" style={{ textAlign: 'center', padding: '32px 20px 24px 20px' }} aria-label="Bienvenida a Gamesle">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 14px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--brand-soft)', color: 'var(--brand-primary)', fontSize: '0.82rem', fontWeight: 700, marginBottom: 12 }}>
          <Sparkles size={14} /> Plataforma de Juegos Diarios
        </div>

        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '4px 0 10px 0', color: 'var(--text-primary)' }}>
          Desafíos Diarios de Conocimiento y Deducción
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto 16px auto', lineHeight: 1.6 }}>
          Pon a prueba tu intuición geográfica, histórica y cultural cada día. Nuevos retos sincronizados a medianoche.
        </p>

        <CountdownBadge />
      </section>

      {/* Catálogo Oficial de Juegos en Vivo */}
      <section style={{ marginTop: 24 }} aria-label="Catálogo de juegos oficiales">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            🎮 Juegos Oficiales en Vivo
          </h2>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>3 Juegos Disponibles</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
          {ASSOCIATED_GAMES.map((game) => (
            <GameCard
              key={game.id}
              game={game}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN EDITORIAL DE PRESENTACIÓN DE LA PLATAFORMA (CONFORME ADSENSE) */}
      {/* ========================================================================= */}
      <section style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 20, textAlign: 'left' }} aria-label="Detalles de la plataforma Gamesle">
        
        {/* Bloque 1: Filosofía del Ecosistema */}
        <div className="featured-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Gamepad2 size={24} color="var(--brand-primary)" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
              El Ecosistema Gamesle: Juegos Diarios con Propósito Educativo
            </h2>
          </div>
          <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--text-secondary)', margin: '0 0 10px 0' }}>
            <strong>Gamesle</strong> es un centro de entretenimiento digital enfocado en la creación de pasatiempos diarios inteligentes. A diferencia de los juegos tradicionales, cada título dentro de Gamesle está diseñado alrededor de datos reales verificables: desde la lingüística demográfica mundial en <strong>Namele</strong>, la hemeroteca histórica en <strong>Newsle</strong> y la percepción acústica inversa en <strong>Backwardle</strong>.
          </p>
          <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0 }}>
            Todos los juegos comparten un sistema de puntuación continua, desafíos diarios sincronizados a las 00:00 (España) y un modo práctica infinito para entrenar habilidades analíticas y de deducción.
          </p>
        </div>

        {/* Bloque 2: Análisis Detallado de los Juegos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {/* Card Namele */}
          <div className="featured-card" style={{ borderLeft: '4px solid #2563EB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Globe2 size={20} color="#2563EB" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                Namele: Deducción Onomástica
              </h3>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: '0 0 8px 0' }}>
              Enfrenta a los jugadores a 10 nombres o apellidos de todo el mundo. Utilizando pistas lingüísticas, rangos de población y un mapa interactivo, deberás deducir la procedencia demográfica con puntuaciones calculadas según la distancia geodésica.
            </p>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
              Metodología: Registros censales (INE, US Census, ONS, INSEE).
            </div>
          </div>

                    {/* Card Backwardle */}
          <div className="featured-card" style={{ borderLeft: '4px solid #7C3AED' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <AudioWaveform size={20} color="#7C3AED" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                Backwardle: Percepción Acústica
              </h3>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: '0 0 8px 0' }}>
              Desafía a los jugadores a identificar grabaciones sonoras reales reproducidas en sentido inverso. Con osciloscopio interactivo en tiempo real, control de velocidad de reproducción y pistas progresivas, deberás entrenar tu oído para descifrar sonidos de la vida real.
            </p>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
              Metodología: Grabaciones acústicas reales y fonoteca internacional de efectos sonoros.
            </div>
          </div>

          {/* Card Newsle */}
          <div className="featured-card" style={{ borderLeft: '4px solid #4F46E5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Newspaper size={20} color="#4F46E5" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                Newsle: Cronología Histórica
              </h3>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: '0 0 8px 0' }}>
              Presenta tres titulares reales de prensa acontecidos exactamente el mismo día. Con un selector numérico cilíndrico de 3 ruedas (día, mes, año), el jugador ajusta la fecha y recibe validación independiente de Día, Mes y Año con código Verde, Ámbar (≤7 días, ≤3 meses, misma década) o Rojo.
            </p>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
              Metodología: Archivos de prensa histórica y hemerotecas internacionales.
            </div>
          </div>
        </div>

        {/* Bloque 3: Sincronización y Privacidad */}
        <div className="featured-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <ShieldCheck size={22} color="var(--brand-primary)" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
              Cuentas Unificadas, Privacidad y Clasificaciones
            </h2>
          </div>
          <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--text-secondary)', margin: '0 0 8px 0' }}>
            La plataforma Gamesle permite disfrutar de todos los juegos de manera inmediata sin necesidad de registrarse. Para los jugadores competitivos, la autenticación mediante Google Identity permite:
          </p>
          <ul style={{ paddingLeft: 20, margin: '0 0 10px 0', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <li>Sincronización de rachas y puntuaciones en la nube a través de bases de datos seguras de Supabase.</li>
            <li>Aparición en las tablas de clasificación mundiales por puntuación total, mejor partida y racha de días consecutivos.</li>
            <li>Sistema de logros multiplataforma accesible desde el perfil de usuario.</li>
          </ul>
        </div>

        {/* Bloque 4: Preguntas Frecuentes (FAQ) */}
        <div className="featured-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <HelpCircle size={22} color="var(--brand-primary)" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
              Preguntas Frecuentes sobre Gamesle (FAQ)
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {platformFaqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-primary)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} color="var(--brand-primary)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 16px 14px 16px', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
