import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { SupabaseService } from '../services/supabase';

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
  logout: () => void;
  isAuthenticated: boolean;
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

  const logout = () => {
    setUser(defaultGuestUser);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogleCredential,
        logout,
        isAuthenticated: !user.isGuest
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
