import React from 'react';
import { Eye, CheckCircle2 } from 'lucide-react';

export const AccessibilityPage: React.FC = () => {
  return (
    <article className="content-section" style={{ width: '100%', maxWidth: 780 }}>
      <header style={{ marginBottom: 24, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--brand-primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: 6 }}>
          <Eye size={16} /> Estándares WCAG 2.1 AA
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Declaración de Accesibilidad Universal
        </h1>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
        <p>
          En <strong>Gamesle</strong> nos comprometemos a garantizar que la plataforma y todos los juegos asociados sean plenamente accesibles e inclusivos para cualquier persona, independientemente de sus capacidades técnicas, visuales o motoras.
        </p>

        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            1. Medidas de Accesibilidad Implementadas
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={16} color="var(--success-primary)" />
              <span><strong>Contraste visual de alto nivel:</strong> Cumplimiento de ratios de contraste cromático WCAG AA en modos claro y oscuro.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={16} color="var(--success-primary)" />
              <span><strong>Navegación completa por teclado:</strong> Indicadores de foco visuales (`:focus-visible`) en todos los botones y enlaces.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={16} color="var(--success-primary)" />
              <span><strong>Áreas táctiles mínimas de 44x44 px:</strong> Optimización ergonómica en pantallas táctiles y dispositivos móviles.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={16} color="var(--success-primary)" />
              <span><strong>Semántica HTML5 y roles ARIA:</strong> Estructura accesible para lectores de pantalla.</span>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            2. Contacto sobre Accesibilidad
          </h2>
          <p>
            Si detectas alguna barrera de accesibilidad o tienes propuestas de mejora, puedes escribirnos a <code>gameslesupport@gmail.com</code>.
          </p>
        </section>
      </div>
    </article>
  );
};
