//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  setChannels,
  setDrives,
  setFilter,
  setKeys,
  setLoading,
  setMemberIcons,
  setMembers,
  setTeamIcons,
  setTeams
} from '../reducers/action';
import { reducer } from '../reducers/reducer';
import { KeyValue } from '../types/common';
import {
  Channel,
  Drive,
  Member,
  Team
} from '../types/entity';
import { DispatchAction } from '../types/reducer';
import {
  ItemKey,
  Loading,
  State
} from '../types/state';

interface ReducerContextValue {
  state: State,
  dispatchers: {
    dispatchChannels: DispatchAction<Map<ItemKey, Channel[]>>,
    dispatchDrives: DispatchAction<Map<ItemKey, Drive>>,
    dispatchFilter: DispatchAction<string | null>,
    dispatchKeys: DispatchAction<ItemKey[]>,
    dispatchLoading: DispatchAction<Loading>,
    dispatchMemberIcons: DispatchAction<KeyValue<ItemKey, Map<string, string | null>>>,
    dispatchMembers: DispatchAction<Map<ItemKey, Member[]>>,
    dispatchTeamIcons: DispatchAction<Map<ItemKey, string | null>>,
    dispatchTeams: DispatchAction<Map<ItemKey, Team>>
  }
}

const ReducerContext = React.createContext<ReducerContextValue | null>(null);

interface ReducerContextProviderProps {
  children: React.ReactNode
}

const initialState = {
  loading: Loading.none,
  itemFilter: null,
  items: []
};

export const ReducerContextProvider = ({ children }: ReducerContextProviderProps): React.ReactElement | null => {

  const [ state, dispatch ] = React.useReducer(reducer, initialState);

  const dispatchers = React.useMemo(() => ({
    dispatchChannels: (payload: Map<ItemKey, Channel[]>) => dispatch(setChannels(payload)),
    dispatchDrives: (payload: Map<string, Drive>) => dispatch(setDrives(payload)),
    dispatchFilter: (payload: string | null) => dispatch(setFilter(payload)),
    dispatchKeys: (payload: ItemKey[]) => dispatch(setKeys(payload)),
    dispatchLoading: (payload: Loading) => dispatch(setLoading(payload)),
    dispatchMemberIcons: (payload: KeyValue<ItemKey, Map<string, string | null>>) => dispatch(setMemberIcons(payload)),
    dispatchMembers: (payload: Map<ItemKey, Member[]>) => dispatch(setMembers(payload)),
    dispatchTeamIcons: (payload: Map<string, string | null>) => dispatch(setTeamIcons(payload)),
    dispatchTeams: (payload: Map<string, Team>) => dispatch(setTeams(payload))
  }), []);

  return (
    <ReducerContext.Provider
      value={{
        state,
        dispatchers
      }}>
      {children}
    </ReducerContext.Provider>
  );

};

export const useReducerContext = (): ReducerContextValue => {
  const value = React.useContext(ReducerContext);
  if (!value) {
    throw new Error('The context is not initialzed: ReducerContext');
  }
  return value;
};
