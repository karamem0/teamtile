//
// Copyright (c) 2022 karamem0
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

interface SnackbarProviderProps {
  children?: React.ReactNode
}

function SnackbarProvider(props: SnackbarProviderProps) {

  const { children } = props;

  const [ snackbar, setSnackbar ] = React.useState<SnackbarProps>();

  return (
    <SnackbarContext.Provider
      value={{
        snackbar,
        setSnackbar
      }}>
      {children}
    </SnackbarContext.Provider>
  );

}

export default SnackbarProvider;

export const useSnackbar = (): SnackbarContextProps => {
  const props = React.useContext(SnackbarContext);
  if (!props) {
    throw new Error('The context is not initialzed: SnackbarContext');
  }
  return props;
};
