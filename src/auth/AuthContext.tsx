import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

export interface UserStats {
  gamesPlayed: number;
  currentStreak: number;
  maxStreak: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  picture?: string;
  isGuest: boolean;
  createdAt: string;
  stats: UserStats;
}

interface GoogleJwtPayload {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthContextType {
  profile: UserProfile;
  isAuthenticated: boolean;
  isGuest: boolean;
  loginWithGoogleCredential: (credential: string) => Promise<boolean>;
  logout: () => void;
  deleteAccount: () => void;
  updateProfileName: (name: string) => void;
  getGameLaunchUrl: (targetUrl?: string) => string;
}

const AUTH_STORAGE_KEY = 'gamesle_user_profile_v1';

export const INITIAL_USER_STATS: UserStats = {
  gamesPlayed: 0,
  currentStreak: 0,
  maxStreak: 0
};

const defaultGuestProfile: UserProfile = {
  id: 'guest_' + Math.random().toString(36).substring(2, 9),
  name: 'Jugador Invitado',
  isGuest: true,
  createdAt: new Date().toISOString(),
  stats: { ...INITIAL_USER_STATS }
};

export const resolveTargetUrl = (targetUrl: string = 'https://namele.onrender.com'): string => {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    if (targetUrl.includes('namele.onrender.com')) {
      return 'http://localhost:3001';
    }
    if (targetUrl.includes('gamesle.onrender.com')) {
      return 'http://localhost:3000';
    }
  }
  return targetUrl;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    // 1. Check URL parameters for cross-domain SSO handshake from Namele (?auth_sync=...)
    try {
      if (typeof window !== 'undefined' && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        const syncPayload = params.get('auth_sync');
        if (syncPayload) {
          const parsed = JSON.parse(decodeURIComponent(syncPayload));
          if (parsed && parsed.id && !parsed.isGuest) {
            const synced: UserProfile = {
              id: parsed.id.startsWith('google_') ? parsed.id : `google_${parsed.id}`,
              isGuest: false,
              name: parsed.name || 'Jugador Google',
              email: parsed.email || '',
              picture: parsed.picture || '',
              createdAt: parsed.createdAt || new Date().toISOString(),
              stats: parsed.stats || { ...INITIAL_USER_STATS }
            };
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(synced));
            params.delete('auth_sync');
            const newSearch = params.toString() ? `?${params.toString()}` : '';
            window.history.replaceState({}, '', `${window.location.pathname}${newSearch}`);
            return synced;
          }
        }
      }
    } catch (e) {
      console.warn('Error syncing profile from URL handshake in Gamesle:', e);
    }

    // 2. Load from localStorage
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Unable to load user profile from storage:', e);
    }
    return defaultGuestProfile;
  });

  useEffect(() => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile:', e);
    }
  }, [profile]);

  const loginWithGoogleCredential = async (credential: string): Promise<boolean> => {
    try {
      const decoded: GoogleJwtPayload = jwtDecode(credential);
      if (!decoded.sub) return false;

      setProfile((prev) => {
        const updatedProfile: UserProfile = {
          id: `google_${decoded.sub}`,
          isGuest: false,
          name: decoded.name || 'Jugador Google',
          email: decoded.email,
          picture: decoded.picture,
          createdAt: prev.createdAt,
          stats: prev.stats
        };

        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedProfile));
        return updatedProfile;
      });

      return true;
    } catch (err) {
      console.error('Error logging in with Google credential:', err);
      return false;
    }
  };

  const logout = () => {
    const newGuest: UserProfile = {
      id: 'guest_' + Math.random().toString(36).substring(2, 9),
      isGuest: true,
      name: 'Jugador Invitado',
      createdAt: new Date().toISOString(),
      stats: { ...INITIAL_USER_STATS }
    };
    setProfile(newGuest);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newGuest));
  };

  const deleteAccount = () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear data:', e);
    }
    const cleanGuest: UserProfile = {
      id: 'guest_' + Math.random().toString(36).substring(2, 9),
      isGuest: true,
      name: 'Jugador Invitado',
      createdAt: new Date().toISOString(),
      stats: { ...INITIAL_USER_STATS }
    };
    setProfile(cleanGuest);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(cleanGuest));
  };

  const updateProfileName = (name: string) => {
    if (!name.trim()) return;
    setProfile((prev) => {
      const updated = { ...prev, name: name.trim() };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const getGameLaunchUrl = (targetUrl: string = 'https://namele.onrender.com'): string => {
    const resolvedUrl = resolveTargetUrl(targetUrl);
    if (profile.isGuest) return resolvedUrl;
    try {
      const url = new URL(resolvedUrl);
      const syncData = {
        id: profile.id.replace('google_', ''),
        name: profile.name,
        email: profile.email,
        picture: profile.picture,
        isGuest: false,
        createdAt: profile.createdAt,
        stats: profile.stats
      };
      url.searchParams.set('auth_sync', encodeURIComponent(JSON.stringify(syncData)));
      return url.toString();
    } catch {
      return `${resolvedUrl}?auth_sync=${encodeURIComponent(JSON.stringify(profile))}`;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        profile,
        isAuthenticated: !profile.isGuest,
        isGuest: profile.isGuest,
        loginWithGoogleCredential,
        logout,
        deleteAccount,
        updateProfileName,
        getGameLaunchUrl
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
