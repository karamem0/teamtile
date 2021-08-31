//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import { Client } from '@microsoft/microsoft-graph-client';

interface AppContextValue {
  client?: Client,
  setClient?: React.Dispatch<React.SetStateAction<Client | undefined>>,
  error?: string,
  setError?: React.Dispatch<React.SetStateAction<string | undefined>>
}

const AppContext = React.createContext<AppContextValue>({});

interface AppContextProviderProps {
  value: AppContextValue,
  children: React.ReactNode | undefined
}

const AppContextProvider = ({ children, value }: AppContextProviderProps): React.ReactElement => {

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );

};

interface AppContextConsumerProps {
  children: (value: AppContextValue) => React.ReactNode
}

const AppContextConsumer = ({ children }: AppContextConsumerProps): React.ReactElement => {

  return (
    <AppContext.Consumer>
      {children}
    </AppContext.Consumer>
  );

};

const useAppContext = (): AppContextValue => React.useContext(AppContext);

export {
  AppContextProvider,
  AppContextConsumer,
  useAppContext
};
