//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Action, State } from '../types/Store';
import { reducer } from '../stores/Reducer';

interface StoreContextState {
  dispatch: React.Dispatch<Action>,
  state: State
}

const StoreContext = React.createContext<StoreContextState | undefined>(undefined);

export const useStore = (): StoreContextState => {
  const value = React.useContext(StoreContext);
  if (value == null) {
    throw new Error('The context is not initialzed: ReducerContext');
  }
  return value;
};

function StoreProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const [ state, dispatch ] = React.useReducer(reducer, {});

  const value = React.useMemo<StoreContextState>(() => ({
    dispatch,
    state
  }), [
    state,
    dispatch
  ]);

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );

}

export default StoreProvider;
