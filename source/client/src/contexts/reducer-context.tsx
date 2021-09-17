//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Types
import {
  Action,
  StateKey,
  StateValue
} from '../types/reducer';
// Reducers
import { reducer } from '../reducers/reducer';

interface ReducerContextValue {
  loading?: boolean,
  keys?: StateKey[],
  values?: StateValue[],
  dispatch?: React.Dispatch<Action>
}

const ReducerContext = React.createContext<ReducerContextValue>({});

interface ReducerContextProviderProps {
  children?: React.ReactNode
}

export const ReducerContextProvider = ({ children }: ReducerContextProviderProps): React.ReactElement | null => {

  const [ state, dispatch ] = React.useReducer(reducer, {});

  return (
    <ReducerContext.Provider
      value={{
        loading: state.loading,
        keys: state.keys,
        values: state.values,
        dispatch: dispatch
      }}>
      {children}
    </ReducerContext.Provider>
  );

};

interface ReducerContextConsumerProps {
  children: (value: ReducerContextValue) => React.ReactNode
}

export const ReducerContextConsumer = ({ children }: ReducerContextConsumerProps): React.ReactElement | null => {

  return (
    <ReducerContext.Consumer>
      {children}
    </ReducerContext.Consumer>
  );

};

export const useReducerContext = (): ReducerContextValue => React.useContext(ReducerContext);
