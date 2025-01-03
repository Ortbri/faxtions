// UserProfileContext.tsx

import React, { createContext, useContext, type PropsWithChildren, useMemo } from 'react';

/**
 * this provider will provder base ai context for the app,
 * and your way of storing ai data for easier consumption
 */

interface AIBaseProviderProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

/* -------------------------------------------------------------------------- */
/*                                   context                                  */
/* -------------------------------------------------------------------------- */
export const AIBaseProviderContext = createContext<AIBaseProviderProps>({
  state: '',
  setState: () => {},
});
/* ---------------------------------------------------------------------u----- */
/*                                    hook                                    */
/* -------------------------------------------------------------------------- */
export function useAIBaseProvider() {
  const AIBaseProvider = useContext(AIBaseProviderContext);
  if (AIBaseProvider === null) {
    throw new Error('AIBaseProvider Context is not using user context provider');
  }
  return AIBaseProvider;
}
/* -------------------------------------------------------------------------- */
/*                                  provider                                  */
/* -------------------------------------------------------------------------- */
export function AIBaseContextProvider({ children }: PropsWithChildren) {
  const [state, setState] = React.useState<string>('state');
  /* ---------------------------------- memo ---------------------------------- */
  const value = useMemo(
    () => ({
      state,
      setState,
    }),
    [state, setState],
  );

  return <AIBaseProviderContext.Provider value={value}>{children}</AIBaseProviderContext.Provider>;
}
