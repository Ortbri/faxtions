// UserProfileContext.tsx

import React, { createContext, useContext, type PropsWithChildren, useMemo } from 'react';

interface BaseProviderProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

/* -------------------------------------------------------------------------- */
/*                                   context                                  */
/* -------------------------------------------------------------------------- */
export const BaseProviderContext = createContext<BaseProviderProps>({
  state: '',
  setState: () => {},
});
/* ---------------------------------------------------------------------u----- */
/*                                    hook                                    */
/* -------------------------------------------------------------------------- */
export function useBaseContext() {
  const BaseProvider = useContext(BaseProviderContext);
  if (BaseProvider === null) {
    throw new Error('BaseProvider Context is not using user context provider');
  }
  return BaseProvider;
}
/* -------------------------------------------------------------------------- */
/*                                  provider                                  */
/* -------------------------------------------------------------------------- */
export function BaseContextProvider({ children }: PropsWithChildren) {
  const [state, setState] = React.useState<string>('state');
  /* ---------------------------------- memo ---------------------------------- */
  const value = useMemo(
    () => ({
      state,
      setState,
    }),
    [state, setState],
  );

  return <BaseProviderContext.Provider value={value}>{children}</BaseProviderContext.Provider>;
}
