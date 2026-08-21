import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserProfile } from '../auth/AuthContext';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://pknmaicbojuaucsxfqqj.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
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
