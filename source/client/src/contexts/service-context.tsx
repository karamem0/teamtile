//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useClient } from '../hooks/use-client';
import { ServiceProvider } from '../services/service-provider';

interface ServiceContextValue {
  services: ServiceProvider
}

const ServiceContext = React.createContext<ServiceContextValue | null>(null);

interface ServiceContextProviderProps {
  children: React.ReactNode
}

export const ServiceContextProvider = ({ children }: ServiceContextProviderProps): React.ReactElement | null => {

  const [ client ] = useClient();
  const [ services, setServices ] = React.useState<ServiceProvider | null>(null);

  React.useEffect(() => {
    if (!client) {
      return;
    }
    setServices(new ServiceProvider(client));
  }, [ client ]);

  if (!services) {
    return null;
  }

  return (
    <ServiceContext.Provider
      value={{ services }}>
      {children}
    </ServiceContext.Provider>
  );

};

export const useServiceContext = (): ServiceContextValue => {
  const value = React.useContext(ServiceContext);
  if (!value) {
    throw new Error('The context is not initialzed: ServiceContext');
  }
  return value;
};
