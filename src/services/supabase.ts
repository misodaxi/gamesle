import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { UserProfile } from '../auth/AuthContext';

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://pknmaicbojuaucsxfqqj.supabase.co';
export const SUPABASE_CALLBACK_URL = `${SUPABASE_URL}/auth/v1/callback`;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!SUPABASE_URL) return null;
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          flowType: 'pkce'
        }
      });
    } catch (e) {
      console.warn('Could not initialize Supabase client:', e);
      return null;
    }
  }
  return supabaseInstance;
};

export class SupabaseService {
  /**
   * Signs in using Supabase Google OAuth with the official callback:
   * https://pknmaicbojuaucsxfqqj.supabase.co/auth/v1/callback
   */
  public static async signInWithGoogle(redirectTo: string = window.location.origin): Promise<void> {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo
      }
    });
  }

  /**
   * Formats a Supabase User object into our unified UserProfile
   */
  public static mapSupabaseUserToProfile(sbUser: User): UserProfile {
    return {
      id: sbUser.id,
      name: sbUser.user_metadata?.full_name || sbUser.user_metadata?.name || sbUser.email?.split('@')[0] || 'Jugador Gamesle',
      email: sbUser.email || '',
      picture: sbUser.user_metadata?.avatar_url || sbUser.user_metadata?.picture || '',
      isGuest: false,
      createdAt: sbUser.created_at || new Date().toISOString()
    };
  }

  public static async syncUserProfile(profile: UserProfile): Promise<boolean> {
    if (profile.isGuest) return false;

    const supabase = getSupabaseClient();
    if (!supabase) return false;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          picture: profile.picture,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (error) {
        console.warn('Supabase sync notice:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Unable to sync profile with Supabase:', err);
      return false;
    }
  }
}
