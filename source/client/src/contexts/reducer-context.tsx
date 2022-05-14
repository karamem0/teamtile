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
  setItemFilter,
  setGroups,
  setLoadingKeys,
  setLoadingValues,
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
  Group,
  Icon,
  Member,
  Team
} from '../types/entity';
import { DispatchAction } from '../types/reducer';
import { ItemKey, State } from '../types/state';

interface ReducerContextValue {
  state: State,
  dispatchers: {
    dispatchChannels: DispatchAction<Map<ItemKey, Channel[]>>,
    dispatchDrives: DispatchAction<Map<ItemKey, Drive>>,
    dispatchGroups: DispatchAction<Map<ItemKey, Group>>,
    dispatchItemFilter: DispatchAction<string | null>,
    dispatchLoadingKeys: DispatchAction<boolean>,
    dispatchLoadingValues: DispatchAction<Map<ItemKey, boolean>>,
    dispatchMemberIcons: DispatchAction<KeyValue<ItemKey, Map<string, Icon | null>>>,
    dispatchMembers: DispatchAction<Map<ItemKey, Member[]>>,
    dispatchTeamIcons: DispatchAction<Map<ItemKey, Icon | null>>,
    dispatchTeams: DispatchAction<Map<ItemKey, Team>>
  }
}

const ReducerContext = React.createContext<ReducerContextValue | null>(null);

interface ReducerContextProviderProps {
  children: React.ReactNode
}

const initialState = {
  loading: true,
  itemFilter: null,
  items: []
};

export const ReducerContextProvider = ({ children }: ReducerContextProviderProps): React.ReactElement | null => {

  const [ state, dispatch ] = React.useReducer(reducer, initialState);

  const dispatchers = React.useMemo(() => ({
    dispatchChannels: (payload: Map<ItemKey, Channel[]>) => dispatch(setChannels(payload)),
    dispatchDrives: (payload: Map<ItemKey, Drive>) => dispatch(setDrives(payload)),
    dispatchGroups: (payload: Map<ItemKey, Group>) => dispatch(setGroups(payload)),
    dispatchItemFilter: (payload: string | null) => dispatch(setItemFilter(payload)),
    dispatchLoadingKeys: (payload: boolean) => dispatch(setLoadingKeys(payload)),
    dispatchLoadingValues: (payload: Map<ItemKey, boolean>) => dispatch(setLoadingValues(payload)),
    dispatchMemberIcons: (payload: KeyValue<ItemKey, Map<string, Icon | null>>) => dispatch(setMemberIcons(payload)),
    dispatchMembers: (payload: Map<ItemKey, Member[]>) => dispatch(setMembers(payload)),
    dispatchTeamIcons: (payload: Map<ItemKey, Icon | null>) => dispatch(setTeamIcons(payload)),
    dispatchTeams: (payload: Map<ItemKey, Team>) => dispatch(setTeams(payload))
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
