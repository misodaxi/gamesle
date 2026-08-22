// Force Tab Icon on initial load
function setGamesleTabIcon() {
  try {
    const dataUri = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20width%3D%2264%22%20height%3D%2264%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22gm-bg%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%220%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%236B72FF%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%235E60F5%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23514EE8%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3C!--%20Squircle%20Background%20--%3E%0A%20%20%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2217%22%20fill%3D%22url(%23gm-bg)%22%2F%3E%0A%20%20%0A%20%20%3C!--%20Gamepad%20Line%20Icon%20matching%20user%20reference%20image%20--%3E%0A%20%20%3Cg%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-width%3D%223.6%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%20%20%3C!--%20Gamepad%20Body%20--%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%2022%20C%2019%2018%2C%2045%2018%2C%2045%2022%20C%2049%2025%2C%2051%2040%2C%2045%2044%20C%2041%2046%2C%2038%2039%2C%2034%2039%20L%2030%2039%20C%2026%2039%2C%2023%2046%2C%2019%2044%20C%2013%2040%2C%2015%2025%2C%2019%2022%20Z%22%2F%3E%0A%20%20%20%20%3C!--%20D-Pad%20Cross%20--%3E%0A%20%20%20%20%3Cline%20x1%3D%2225%22%20y1%3D%2228%22%20x2%3D%2225%22%20y2%3D%2234%22%2F%3E%0A%20%20%20%20%3Cline%20x1%3D%2222%22%20y1%3D%2231%22%20x2%3D%2228%22%20y2%3D%2231%22%2F%3E%0A%20%20%20%20%3C!--%20Action%20Buttons%20--%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2239%22%20cy%3D%2228%22%20r%3D%221.5%22%20fill%3D%22%23FFFFFF%22%20stroke%3D%22none%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2243%22%20cy%3D%2232%22%20r%3D%221.5%22%20fill%3D%22%23FFFFFF%22%20stroke%3D%22none%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E";
    document.querySelectorAll("link[rel*='icon']").forEach((el) => el.remove());
    const link = document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = dataUri;
    document.head.appendChild(link);
  } catch (e) {}
}
setGamesleTabIcon();
import { I18nService } from './services/i18n';
I18nService.initialize();
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './auth/AuthContext';
import { App } from './App';
import './styles/index.css';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '584144894892-c88ge009ojt19cq52ucka1jjbcda099l.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
