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
import { LocalService } from '../services/local-service';
import { ServerService } from '../services/server-service';

interface ServiceLocator {
  local: LocalService,
  server: ServerService
}

interface ServiceContextValue {
  service?: ServiceLocator,
  error?: string
}

const ServiceContext = React.createContext<ServiceContextValue>({});

interface ServiceContextProviderProps {
  children?: React.ReactNode
}

export const ServiceContextProvider = ({ children }: ServiceContextProviderProps): React.ReactElement | null => {

  const [ client, error ] = useClient();
  const [ service, setService ] = React.useState<ServiceLocator>();

  React.useEffect(() => {
    if (!client) {
      return;
    }
    setService({
      local: new LocalService(),
      server: new ServerService(client)
    });
  }, [ client ]);

  return (
    <ServiceContext.Provider
      value={{
        service: service,
        error: error
      }}>
      {children}
    </ServiceContext.Provider>
  );

};

interface ServiceContextConsumerProps {
  children: (value: ServiceContextValue) => React.ReactNode
}

export const ServiceContextConsumer = ({ children }: ServiceContextConsumerProps): React.ReactElement | null => {

  return (
    <ServiceContext.Consumer>
      {children}
    </ServiceContext.Consumer>
  );

};

export const useServiceContext = (): ServiceContextValue => React.useContext(ServiceContext);
