import React from 'react';
import { ShieldCheck, Lock, Eye, Cookie, Mail } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <article className="content-section" style={{ width: '100%', maxWidth: 780 }}>
      <header style={{ marginBottom: 24, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--brand-primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: 6 }}>
          <ShieldCheck size={16} /> Marco Legal RGPD / LOPDGDD
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Política de Privacidad y Gestión de Cookies
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
          Última actualización: 21 de agosto de 2026 • Responsable: Gamesle Platform (<code>gameslesupport@gmail.com</code>)
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Lock size={18} color="var(--brand-primary)" /> 1. Responsable del Tratamiento
          </h2>
          <p>
            El portal web <strong>Gamesle</strong> (accesible en <code>https://gamesle.onrender.com</code>) es gestionado por el equipo de Gamesle. Puedes ponerte en contacto con el responsable de privacidad y ejercicio de derechos en: <code>gameslesupport@gmail.com</code>.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Eye size={18} color="var(--brand-primary)" /> 2. Datos Tratados y Finalidad
          </h2>
          <p>
            Gamesle no exige registro previo obligatorio para jugar o consultar el catálogo. Para los usuarios que interactúen con la plataforma, se tratan los siguientes datos:
          </p>
          <ul style={{ paddingLeft: 20, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <li><strong>Preferencias locales (almacenamiento local del navegador):</strong> Tema claro/oscuro, estado del sonido y racha de días jugados.</li>
            <li><strong>Métricas de uso anónimas:</strong> Estadísticas de navegación técnica para garantizar la estabilidad del servidor.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Cookie size={18} color="var(--brand-primary)" /> 3. Publicidad y Google AdSense
          </h2>
          <p>
            Gamesle utiliza los servicios de <strong>Google AdSense</strong> (Google Ireland Limited) para mostrar anuncios que permiten mantener la plataforma gratuita.
          </p>
          <p style={{ marginTop: 8 }}>
            Google y sus socios certificados pueden utilizar cookies e identificadores de dispositivos para personalizar y medir anuncios si otorgas tu consentimiento explícito en nuestro banner de privacidad. Puedes revocar o personalizar tu consentimiento en cualquier momento.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Mail size={18} color="var(--brand-primary)" /> 4. Derechos del Usuario (ARCO / RGPD)
          </h2>
          <p>
            De conformidad con el Reglamento General de Protección de Datos (RGPD) de la UE, tienes derecho al acceso, rectificación, supresión, limitación y oposición de cualquier dato tuyo. Puedes ejercerlos escribiendo a <code>gameslesupport@gmail.com</code>.
          </p>
        </section>
      </div>
    </article>
  );
};
