//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { SnackbarType } from '../types/Snackbar';

interface SnackbarProps {
  text?: string,
  type?: SnackbarType
}

interface SnackbarContextProps {
  snackbar?: SnackbarProps,
  setSnackbar: React.Dispatch<React.SetStateAction<SnackbarProps | undefined>>
}

const SnackbarContext = React.createContext<SnackbarContextProps | undefined>(undefined);

function SnackbarProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const [ snackbar, setSnackbar ] = React.useState<SnackbarProps>();
  const value = React.useMemo(() => ({
    snackbar,
    setSnackbar
  }), [
    snackbar
  ]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );

}

export default SnackbarProvider;

export const useSnackbar = (): SnackbarContextProps => {
  const props = React.useContext(SnackbarContext);
  if (props == null) {
    throw new Error('The context is not initialzed: SnackbarContext');
  }
  return props;
};
