import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { SupabaseService, getSupabaseClient } from '../services/supabase';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture: string;
  isGuest: boolean;
  createdAt: string;
}

interface GoogleJwtPayload {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthContextType {
  user: UserProfile;
  loginWithGoogleCredential: (credential: string) => void;
  loginWithSupabaseOAuth: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  getGameLaunchUrl: (targetUrl: string) => string;
}

const AUTH_STORAGE_KEY = 'gamesle_user_profile_v1';

const defaultGuestUser: UserProfile = {
  id: 'guest',
  name: 'Invitado',
  email: '',
  picture: '',
  isGuest: true,
  createdAt: new Date().toISOString()
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    // 1. Check URL parameters for cross-domain SSO handshake (?auth_sync=...)
    try {
      if (typeof window !== 'undefined' && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        const syncPayload = params.get('auth_sync');
        if (syncPayload) {
          const parsed = JSON.parse(decodeURIComponent(syncPayload));
          if (parsed && parsed.id && !parsed.isGuest) {
            const syncedUser: UserProfile = {
              id: parsed.id,
              name: parsed.name || 'Jugador Gamesle',
              email: parsed.email || '',
              picture: parsed.picture || '',
              isGuest: false,
              createdAt: parsed.createdAt || new Date().toISOString()
            };
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(syncedUser));
            params.delete('auth_sync');
            const newSearch = params.toString() ? `?${params.toString()}` : '';
            window.history.replaceState({}, '', `${window.location.pathname}${newSearch}`);
            return syncedUser;
          }
        }
      }
    } catch (e) {
      console.warn('Error reading SSO sync payload:', e);
    }

    // 2. Fallback to localStorage
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Unable to load user profile from storage:', e);
    }
    return defaultGuestUser;
  });

  // Listen to Supabase OAuth callback session changes
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    // Check if session exists in Supabase (e.g. after returning from OAuth callback)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const profile = SupabaseService.mapSupabaseUserToProfile(session.user);
        setUser(profile);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const profile = SupabaseService.mapSupabaseUserToProfile(session.user);
        setUser(profile);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user.isGuest) {
      SupabaseService.syncUserProfile(user);
    }
  }, [user]);

  const loginWithGoogleCredential = (credential: string) => {
    try {
      const decoded = jwtDecode<GoogleJwtPayload>(credential);
      const newUser: UserProfile = {
        id: decoded.sub,
        name: decoded.name || 'Jugador Gamesle',
        email: decoded.email || '',
        picture: decoded.picture || '',
        isGuest: false,
        createdAt: user.isGuest ? new Date().toISOString() : user.createdAt
      };

      setUser(newUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      SupabaseService.syncUserProfile(newUser);
    } catch (err) {
      console.error('Error decoding Google credential:', err);
    }
  };

  const loginWithSupabaseOAuth = async () => {
    await SupabaseService.signInWithGoogle(window.location.origin);
  };

  const logout = () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    setUser(defaultGuestUser);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const getGameLaunchUrl = (targetUrl: string): string => {
    if (user.isGuest) return targetUrl;
    try {
      const url = new URL(targetUrl);
      const syncData = {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        isGuest: false,
        createdAt: user.createdAt
      };
      url.searchParams.set('auth_sync', encodeURIComponent(JSON.stringify(syncData)));
      return url.toString();
    } catch {
      return `${targetUrl}?auth_sync=${encodeURIComponent(JSON.stringify(user))}`;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogleCredential,
        loginWithSupabaseOAuth,
        logout,
        isAuthenticated: !user.isGuest,
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
