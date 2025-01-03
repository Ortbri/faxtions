// AuthContext.tsx - Handles Firebase authentication state and caching with MMKV
import type { Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { supabase } from '../../lib/supabase';

interface AuthProps {
  session: Session | null;
}

/* -------------------------------------------------------------------------- */
/*                                   context                                    */
/* -------------------------------------------------------------------------- */
export const AuthContext = createContext<AuthProps>({
  session: null, // TODO: each time on mount this is null???
});

/* -------------------------------------------------------------------------- */
/*                                    hook                                      */
/* -------------------------------------------------------------------------- */
export function useAuth() {
  const auth = useContext(AuthContext);
  if (auth === undefined) {
    throw new Error('AuthContext needs a provider');
  }
  return auth;
}

/* -------------------------------------------------------------------------- */
/*                                  provider                                    */
/* -------------------------------------------------------------------------- */
export function AuthProvider({ children }: PropsWithChildren) {
  /* ---------------------------------- hooks --------------------------------- */
  const router = useRouter();
  /* ---------------------------------- state --------------------------------- */
  const [session, setSession] = useState<Session | null>(null);
  /* ----------------------------- auth listener ------------------------------ */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        //** FIXME: in case this is incorrect */
        router.navigate('/(auth)/login');
      }
    });
  }, []);
  /* ---------------------------------- memo ---------------------------------- */
  // Memoize context value to prevent unnecessary rerenders
  const value = useMemo(
    () => ({
      session,
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
