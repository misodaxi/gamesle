import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('suggestion');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
  };

  return (
    <article className="content-section" style={{ width: '100%', maxWidth: 780 }}>
      <header style={{ marginBottom: 24, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--brand-primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: 6 }}>
          <MessageSquare size={16} /> Atención y Soporte
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Contacto con el Equipo de Gamesle
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: 4 }}>
          ¿Tienes sugerencias para nuevos juegos, dudas o propuestas? Estamos a tu disposición.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {/* Canales Oficiales */}
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 12 }}>Canal Oficial Directo</h2>
          <div
            style={{
              padding: 18,
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: 16
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <Mail size={20} color="var(--brand-primary)" />
              <strong style={{ fontSize: '0.95rem' }}>Correo Electrónico Oficial</strong>
            </div>
            <a
              href="mailto:gameslesupport@gmail.com"
              style={{
                color: 'var(--brand-primary)',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none'
              }}
            >
              gameslesupport@gmail.com
            </a>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 6 }}>
              Tiempo habitual de respuesta: menos de 24-48 horas laborables.
            </p>
          </div>

          <div
            style={{
              padding: 16,
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5
            }}
          >
            <strong>💡 ¿Quieres sugerir un juego?</strong>
            <p style={{ marginTop: 4 }}>
              Si tienes una idea para un nuevo juego de deducción, palabras, geografía o cultura para Gamesle, envíanos tu propuesta detallada.
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 12 }}>Formulario de Mensaje</h2>
          {sent ? (
            <div
              style={{
                padding: 24,
                backgroundColor: 'var(--success-soft)',
                border: '1px solid var(--success-primary)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10
              }}
            >
              <CheckCircle2 size={36} color="var(--success-primary)" />
              <strong style={{ color: 'var(--success-primary)', fontSize: '1.05rem' }}>¡Mensaje Enviado con Éxito!</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Gracias por comunicarte con Gamesle. Hemos recibido tu consulta y te responderemos en <code>{email}</code>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Tu Nombre</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Alex"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    font: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    font: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Tipo de Consulta</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    font: 'inherit'
                  }}
                >
                  <option value="suggestion">Sugerencia de Nuevo Juego</option>
                  <option value="namele">Consulta sobre Namele</option>
                  <option value="bug">Reporte de Error Técnico</option>
                  <option value="legal">Privacidad / Legal / Accesibilidad</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Mensaje</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntanos en detalle..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    font: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                <Send size={16} /> Enviar Mensaje a Gamesle
              </button>
            </form>
          )}
        </div>
      </div>
    </article>
  );
};
