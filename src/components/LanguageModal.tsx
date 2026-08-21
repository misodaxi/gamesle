import React, { useState } from 'react';
import { X, Search, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, I18nService, LanguageOption } from '../services/i18n';
import { TranslateIcon } from './TranslateIcon';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState<string>('');
  const [currentLang, setCurrentLang] = useState<string>(() => I18nService.getLanguage());

  if (!isOpen) return null;

  const filtered = SUPPORTED_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (lang: LanguageOption) => {
    setCurrentLang(lang.code);
    I18nService.setLanguage(lang.code);
    setTimeout(() => {
      onClose();
    }, 150);
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lang-modal-title"
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{ maxWidth: 540, textAlign: 'left', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--brand-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-primary)'
              }}
            >
              <TranslateIcon size={22} />
            </div>
            <div>
              <h2 id="lang-modal-title" style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                Seleccionar Idioma
              </h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Select Language • 24 idiomas disponibles
              </span>
            </div>
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Filter */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <Search
            size={16}
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            placeholder="Buscar idioma / Search language..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Language Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 8,
            overflowY: 'auto',
            paddingRight: 4,
            maxHeight: 380
          }}
        >
          {filtered.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected ? '1.5px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: isSelected ? 'var(--brand-soft)' : 'var(--bg-card)',
                  color: isSelected ? 'var(--brand-primary)' : 'var(--text-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  fontFamily: 'inherit'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{lang.flag}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{lang.nativeName}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{lang.name}</div>
                  </div>
                </div>

                {isSelected && <Check size={16} color="var(--brand-primary)" style={{ flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
