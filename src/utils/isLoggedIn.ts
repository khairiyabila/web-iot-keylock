import { createServerClient } from './supabase';

export const isLoggedIn = async () => {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  return session !== null;
}