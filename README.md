# 🌍 Namele — El Desafío Diario de Deducción de Nombres

**Namele** es un juego web diario de deducción en el que el jugador descubre de qué país procede con mayor probabilidad un nombre (nombre de pila, apellido o combinación completa) utilizando hasta 5 intentos y un sistema de pistas progresivas basadas en **estadísticas demográficas reales agregadas de censos oficiales**.

---

## 🎯 Características Principales

- 📅 **Desafío Diario Determinista**: Mismo desafío cada día para todos los jugadores a nivel global (basado en UTC / zona horaria de referencia).
- 🧩 **Mecánica de Deducción en 5 Intentos**: 4 países candidatos por ronda, con descarte visual y feedback probabilístico inmediato.
- 💡 **Sistema de Pistas Demográficas**:
  - *Pistas de Popularidad*: Posición en los censos oficiales de población.
  - *Pistas Geográficas*: Continente y subregión del país correcto.
  - *Pistas Lingüísticas & Etimológicas*: Familias de lenguas y raíces culturales.
  - *Pistas de Distribución & Comparativas*: Frecuencia relativa entre países candidatos.
- 🔐 **Autenticación con Google & Modo Invitado**:
  - Juega inmediatamente como invitado sin barreras.
  - Sincroniza e inicia sesión con **Google Identity Services (GIS)**.
  - Migración automática del progreso y racha local al perfil verificado.
- 🏆 **Sistema de Puntuación & Racha**:
  - Puntuación ponderada por intento, pistas voluntarias, dificultad y tiempo.
  - Racha diaria protegida contra desfases horarios y registro de estadísticas completas.
- 🎨 **Estética Premium & Diseño Adaptable**:
  - Paleta minimalista moderna (`#F7F7F5` claro, `#111315` oscuro, `#5B5CE2` marca, `#22A06B` acierto).
  - Efectos de sonido sintetizados mediante **Web Audio API** (sin dependencias pesadas de audio externas).
  - Compatible con lectores de pantalla, modo de alto contraste y `prefers-reduced-motion`.
  - Navegación completa por teclado (teclas `1`, `2`, `3`, `4`, `Enter`, `Escape`).
- 📤 **Compartir sin Spoilers**: Generador de cuadrícula emoji para compartir en redes sociales y portapapeles.

---

## 🏛️ Arquitectura del Proyecto

```
namele/
├── public/
│   ├── favicon.svg          # Favicon vectorial con degradado de marca
│   ├── manifest.json        # Web App Manifest para PWA / instalación
│   └── robots.txt           # Indexación de motores de búsqueda
├── src/
│   ├── __tests__/           # Tests unitarios exhaustivos (Vitest)
│   │   ├── challenge.test.ts
│   │   ├── clues.test.ts
│   │   ├── scoring.test.ts
│   │   ├── streak.test.ts
│   │   └── storage.test.ts
│   ├── auth/                # Proveedor de autenticación (Google GIS + Invitado)
│   │   └── AuthContext.tsx
│   ├── components/          # Componentes reutilizables de UI
│   │   ├── AdBanners.tsx    # Espacios reservados para banners desktop
│   │   ├── AttemptDots.tsx  # Indicador animado de 5 intentos
│   │   ├── CluePanel.tsx    # Acordeón de pistas progresivas
│   │   ├── ConfirmModal.tsx # Diálogo de confirmación accesible
│   │   ├── CountryCard.tsx  # Tarjeta de país candidato con atajos
│   │   ├── Footer.tsx       # Pie de página y enlaces secundarios
│   │   ├── Header.tsx       # Barra superior, racha y conmutadores
│   │   └── ResultModal.tsx  # Modal de fin de partida y tarjeta para compartir
│   ├── data/                # Capa de datos desacoplada (NameDataProvider)
│   │   ├── countries.ts     # Catálogo ISO y metadatos de países
│   │   ├── demographics.ts  # Conjunto de datos demográficos reales verificados
│   │   ├── NameDataProvider.ts # Interfaz y proveedor de desafíos
│   │   └── types.ts         # Tipos TypeScript
│   ├── game/                # Lógica del motor de juego
│   │   ├── clueEngine.ts    # Generador modular de pistas y comparativas
│   │   ├── scoring.ts       # Fórmulas de puntuación y percentiles
│   │   ├── seed.ts          # PRNG determinista y hashing de fechas
│   │   └── streak.ts        # Control de rachas y logros
│   ├── hooks/
│   │   └── useGameState.ts  # Hook principal del estado de juego
│   ├── pages/               # Páginas de la aplicación
│   │   ├── AccessibilityPage.tsx # /accessibility
│   │   ├── GamePage.tsx          # / (Juego Principal & Práctica)
│   │   ├── HowToPlayPage.tsx     # /how-to-play
│   │   ├── LoginPage.tsx         # /login
│   │   ├── NotFoundPage.tsx      # /404
│   │   ├── PrivacyPage.tsx       # /privacy
│   │   ├── ProfilePage.tsx       # /profile
│   │   ├── SettingsPage.tsx      # /settings
│   │   ├── StatisticsPage.tsx    # /statistics
│   │   └── TermsPage.tsx         # /terms
│   ├── services/
│   │   ├── sound.ts         # Sintetizador Web Audio API
│   │   └── storage.ts       # Persistencia segura con checksum anti-tamper
│   ├── styles/
│   │   └── index.css        # Sistema de tokens CSS, temas claro/oscuro
│   ├── App.tsx              # Shell y enrutador SPA del cliente
│   └── main.tsx             # Punto de entrada con Google OAuth Provider
├── DATA_SOURCES.md          # Documentación detallada de fuentes oficiales
├── render.yaml              # Configuración de despliegue en Render
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
- Node.js 18+ o 20+ LTS
- npm 9+ o 10+

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/tu-usuario/namele.git
cd namele
npm install
```

### 2. Iniciar con un solo clic (Windows)
Haz doble clic en el archivo **`iniciar_juego.bat`**.

O desde la terminal:
```bash
npm run dev
```
Abre en tu navegador: `http://localhost:3000`

---

## 🧪 Ejecución de Tests

```bash
npm test
```

---

## ☁️ Despliegue en Render (Render Static Sites)

1. Sube tu código a un repositorio en **GitHub**.
2. Entra en tu panel de control de **Render** ([dashboard.render.com](https://dashboard.render.com/)).
3. Haz clic en **New +** y selecciona **Static Site**.
4. Configura:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Haz clic en **Create Static Site**.
