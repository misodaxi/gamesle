import React, { useState, useEffect } from 'react';
import { UserSettings } from './types';
import { StorageService } from './services/storage';
import { SeoService } from './services/seo';
import { AuthProvider } from './auth/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DesktopSideAd, TopAd, BottomAd } from './components/AdBanners';
import { ConsentBanner } from './components/ConsentBanner';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    return StorageService.getSettings();
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  // Sync route and SEO
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    SeoService.updateMetaForRoute(currentPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  const handleNavigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  };

  const handleUpdateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    StorageService.saveSettings(newSettings);
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={handleNavigate} />;
      case '/about':
        return <AboutPage onNavigate={handleNavigate} />;
      case '/how-it-works':
        return <HowItWorksPage />;
      case '/login':
        return <LoginPage onNavigate={handleNavigate} />;
      case '/profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case '/privacy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      case '/accessibility':
        return <AccessibilityPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <NotFoundPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app-shell">
      {/* Top Header */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      {/* Main Layout with Lateral Wings */}
      <div className="main-layout">
        {/* Left Side Wing (Dual vertical ads on PC, hidden on mobile) */}
        <DesktopSideAd side="left" currentPath={currentPath} />

        {/* Central Content Column */}
        <main className="center-column" id="main-content">
          {/* Top Banner */}
          <TopAd currentPath={currentPath} />

          {/* Dynamic Page Content */}
          {renderCurrentPage()}

          {/* Bottom Banner */}
          <BottomAd currentPath={currentPath} />
        </main>

        {/* Right Side Wing (Dual vertical ads on PC, hidden on mobile) */}
        <DesktopSideAd side="right" currentPath={currentPath} />
      </div>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* GDPR Consent Banner */}
      <ConsentBanner onNavigate={handleNavigate} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
