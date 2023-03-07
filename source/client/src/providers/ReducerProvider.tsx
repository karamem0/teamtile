//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  setFilter,
  setItems,
  setLoading
} from '../stores/Action';
import { reducer } from '../stores/Reducer';
import { DispatchAction, Item, State } from '../types/Store';

interface ReducerContextProps {
  dispatchers: {
    setFilter: DispatchAction<string | undefined>,
    setItems: DispatchAction<Item[] | undefined>,
    setLoading: DispatchAction<boolean | undefined>
  },
  state: State
}

const ReducerContext = React.createContext<ReducerContextProps | undefined>(undefined);

interface ReducerProviderProps {
  children?: React.ReactNode
}

const initialState = {
  filter: undefined,
  items: undefined,
  loading: undefined
};

function ReducerProvider(props: ReducerProviderProps) {

  const { children } = props;

  const [ state, dispatch ] = React.useReducer(reducer, initialState);

  const dispatchers = React.useMemo(() => ({
    setFilter: (payload?: string) => dispatch(setFilter(payload)),
    setItems: (payload?: Item[]) => dispatch(setItems(payload)),
    setLoading: (payload?: boolean) => dispatch(setLoading(payload))
  }), []);

  return (
    <ReducerContext.Provider
      value={{
        dispatchers,
        state
      }}>
      {children}
    </ReducerContext.Provider>
  );

}

export default ReducerProvider;

export const useReducer = (): ReducerContextProps => {
  const value = React.useContext(ReducerContext);
  if (!value) {
    throw new Error('The context is not initialzed: ReducerContext');
  }
  return value;
};
