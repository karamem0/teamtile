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
import { Action, State } from '../types/reducer';
// Reducers
import { reducer } from '../reducers/reducer';

interface ReducerContextValue {
  state: State | null,
  dispatch: React.Dispatch<Action> | null
}

const ReducerContext = React.createContext<ReducerContextValue>({
  state: null,
  dispatch: null
});

interface ReducerContextProviderProps {
  children: React.ReactNode
}

const initialState = {
  loading: false,
  items: []
};

export const ReducerContextProvider = ({ children }: ReducerContextProviderProps): React.ReactElement | null => {

  const [ state, dispatch ] = React.useReducer(reducer, initialState);

  return (
    <ReducerContext.Provider
      value={{
        state: state,
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
