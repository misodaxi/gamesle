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
