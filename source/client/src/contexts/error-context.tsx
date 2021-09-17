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
  error?: string,
  setError?: React.Dispatch<React.SetStateAction<string | undefined>>
}

const ErrorContext = React.createContext<ErrorContextValue>({});

interface ErrorContextProviderProps {
  children?: React.ReactNode
}

export const ErrorContextProvider = ({ children }: ErrorContextProviderProps): React.ReactElement | null => {

  const [ error, setError ] = React.useState<string>();

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
