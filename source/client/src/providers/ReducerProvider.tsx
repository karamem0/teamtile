//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  DispatchAction,
  Item,
  State
} from '../types/Store';
import {
  setFilter,
  setItem,
  setItems,
  setLoading
} from '../stores/Action';
import { reducer } from '../stores/Reducer';

interface ReducerContextState {
  dispatchers: {
    setFilter: DispatchAction<string | undefined>,
    setItem: DispatchAction<Item | undefined>,
    setItems: DispatchAction<Item[] | undefined>,
    setLoading: DispatchAction<boolean | undefined>
  },
  state: State
}

const ReducerContext = React.createContext<ReducerContextState | undefined>(undefined);

export const useReducer = (): ReducerContextState => {
  const value = React.useContext(ReducerContext);
  if (value == null) {
    throw new Error('The context is not initialzed: ReducerContext');
  }
  return value;
};

function ReducerProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const [ state, dispatch ] = React.useReducer(reducer, {});
  const dispatchers = React.useMemo(
    () => ({
      setFilter: (payload?: string) => dispatch(setFilter(payload)),
      setItem: (payload?: Item) => dispatch(setItem(payload)),
      setItems: (payload?: Item[]) => dispatch(setItems(payload)),
      setLoading: (payload?: boolean) => dispatch(setLoading(payload))
    }), []);
  const value = React.useMemo(() => ({
    dispatchers,
    state
  }), [
    dispatchers,
    state
  ]);

  return (
    <ReducerContext.Provider value={value}>
      {children}
    </ReducerContext.Provider>
  );

}

export default ReducerProvider;
