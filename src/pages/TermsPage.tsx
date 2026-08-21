import React from 'react';
import { FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <article className="content-section" style={{ width: '100%', maxWidth: 780 }}>
      <header style={{ marginBottom: 24, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--brand-primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: 6 }}>
          <FileText size={16} /> Términos Legales
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Términos y Condiciones de Uso de Gamesle
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
          Última actualización: 21 de agosto de 2026
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            1. Aceptación de las Condiciones
          </h2>
          <p>
            El acceso y uso del portal web <strong>Gamesle</strong> implica la aceptación plena de los presentes Términos de Uso. Si no estás de acuerdo con alguna de las cláusulas, te recomendamos no utilizar la plataforma.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            2. Uso Aceptable y Juego Limpio
          </h2>
          <p>
            Gamesle está diseñado con fines de entretenimiento cultural y educativo. Queda expresamente prohibido el uso de bots automatizados, scripts de manipulación de clasificaciones, intentos de denegación de servicio o cualquier práctica que atente contra el juego limpio de la comunidad.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            3. Propiedad Intelectual
          </h2>
          <p>
            El código, diseño gráfico, logotipos y textos originales de Gamesle y sus juegos asociados (como Namele) son propiedad intelectual del equipo de Gamesle. Las fuentes estadísticas y cartográficas abiertas pertenecen a sus respectivos organismos públicos bajo sus licencias abiertas oficiales.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            4. Contacto Legal
          </h2>
          <p>
            Para cualquier notificación o consulta relacionada con estos términos, puedes escribirnos a <code>gameslesupport@gmail.com</code>.
          </p>
        </section>
      </div>
    </article>
  );
};
