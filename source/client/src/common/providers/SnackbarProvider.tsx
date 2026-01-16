//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { MessageBarIntent } from '@fluentui/react-components';

interface SnackbarState {
  intent?: MessageBarIntent,
  text?: string
}

interface SnackbarContextState {
  snackbar?: SnackbarState,
  setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState | undefined>>
}

const SnackbarContext = React.createContext<SnackbarContextState | undefined>(undefined);

export const useSnackbar = (): SnackbarContextState => {
  const props = React.useContext(SnackbarContext);
  if (props == null) {
    throw new Error('The context is not initialzed: SnackbarContext');
  }
  return props;
};

function SnackbarProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const [ state, setState ] = React.useState<SnackbarState>();
  const value = React.useMemo(() => ({
    snackbar: state,
    setSnackbar: setState
  }), [
    state
  ]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );

}

export default SnackbarProvider;
