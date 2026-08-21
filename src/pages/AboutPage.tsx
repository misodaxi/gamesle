import React from 'react';
import { Gamepad2, ShieldCheck, Sparkles, Mail } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <article className="content-section" style={{ width: '100%', maxWidth: 780 }}>
      <header style={{ marginBottom: 24, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--brand-primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: 6 }}>
          <Gamepad2 size={16} /> Sobre Gamesle
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          La Plataforma de Juegos Web Diarios de Deducción y Cultura
        </h1>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={18} color="var(--brand-primary)" /> 1. Nuestra Misión
          </h2>
          <p>
            <strong>Gamesle</strong> nació con el objetivo de reunir en un único portal accesible y gratuito una colección de juegos web diarios diseñados para estimular la curiosidad, el aprendizaje cultural, la geografía y el pensamiento deductivo.
          </p>
          <p style={{ marginTop: 8 }}>
            Inspirados por los formatos de desafíos diarios como <em>Wordle</em> o <em>GeoGuessr</em>, en Gamesle creamos experiencias donde el rigor de los datos públicos y el entretenimiento van de la mano.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Gamepad2 size={18} color="var(--brand-primary)" /> 2. El Ecosistema de Juegos Gamesle
          </h2>
          <p>
            El primer juego insignia de la plataforma es <strong>Namele</strong>, un reto diario en el que debes deducir la procedencia geográfica de 10 nombres en un mapa interactivo mundial, compitiendo en un ranking global diario.
          </p>
          <p style={{ marginTop: 8 }}>
            Estamos desarrollando continuamente nuevos títulos para el catálogo, incluyendo juegos de banderas (<em>Flaggle</em>), comparativas demográficas (<em>Popule</em>) y líneas temporales históricas (<em>Chronole</em>).
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldCheck size={18} color="var(--brand-primary)" /> 3. Sostenibilidad y Transparencia
          </h2>
          <p>
            Gamesle es 100% gratuito para todos los usuarios. Para mantener los servidores, dominios y el desarrollo de nuevos títulos, integramos publicidad contextual responsable a través de Google AdSense, garantizando siempre que los anuncios no interfieran con la jugabilidad ni comprometan la privacidad del usuario.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Mail size={18} color="var(--brand-primary)" /> 4. Contacto y Comunidad
          </h2>
          <p>
            Si tienes sugerencias sobre nuevos juegos, mejoras de accesibilidad o deseas reportar cualquier incidencia, puedes contactarnos directamente en nuestro correo oficial: <code>gameslesupport@gmail.com</code> o a través de nuestra página de{' '}
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              style={{ color: 'var(--brand-primary)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', fontWeight: 700 }}
            >
              Contacto
            </button>.
          </p>
        </section>
      </div>
    </article>
  );
};
