//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Hooks
import { useClient } from '../hooks/use-client';
// Services
import { CacheService } from '../services/cache-service';
import { GraphService } from '../services/graph-service';

interface ServiceLocator {
  cache: CacheService,
  graph: GraphService
}

interface ServiceContextValue {
  services: ServiceLocator
}

const ServiceContext = React.createContext<ServiceContextValue | null>(null);

interface ServiceContextProviderProps {
  children: React.ReactNode
}

export const ServiceContextProvider = ({ children }: ServiceContextProviderProps): React.ReactElement | null => {

  const [ client ] = useClient();
  const [ services, setServices ] = React.useState<ServiceLocator | null>(null);

  React.useEffect(() => {
    if (!client) {
      return;
    }
    setServices({
      cache: new CacheService(),
      graph: new GraphService(client)
    });
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
