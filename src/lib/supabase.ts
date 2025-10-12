import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const initializeAdmin = async () => {
  const email = '7c@magazine.com';
  const password = '7cmagazine';
  const passwordHash = await hashPassword(password);

  const { error } = await supabase
    .from('admins')
    .update({ password_hash: passwordHash })
    .eq('email', email);

  if (error) {
    console.error('Error initializing admin:', error);
  }
};