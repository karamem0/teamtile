//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';

interface ErrorContextValue {
  error: string | null,
  setError: React.Dispatch<React.SetStateAction<string | null>> | null
}

const ErrorContext = React.createContext<ErrorContextValue>({
  error: null,
  setError: null
});

interface ErrorContextProviderProps {
  children: React.ReactNode
}

export const ErrorContextProvider = ({ children }: ErrorContextProviderProps): React.ReactElement | null => {

  const [ error, setError ] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!error) {
      return;
    }
    console.error(error);
  }, [ error ]);

  return (
    <ErrorContext.Provider
      value={{
        error,
        setError
      }}>
      {children}
    </ErrorContext.Provider>
  );

};

interface ErrorContextConsumerProps {
  children: (value: ErrorContextValue) => React.ReactNode
}

export const ErrorContextConsumer = ({ children }: ErrorContextConsumerProps): React.ReactElement | null => {

  return (
    <ErrorContext.Consumer>
      {children}
    </ErrorContext.Consumer>
  );

};

export const useErrorContext = (): ErrorContextValue => React.useContext(ErrorContext);
