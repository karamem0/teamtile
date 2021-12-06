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
import { ItemKey, State } from '../types/state';
import { DispatchAction } from '../types/reducer';
import { KeyValue } from '../types/common';
// Reducers
import { reducer } from '../reducers/reducer';
// Reducers
import {
  Channel,
  Drive,
  Member,
  Team
} from '../types/entity';
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

interface ReducerContextValue {
  state: State,
  dispatchChannels: DispatchAction<Map<ItemKey, Channel[]>>,
  dispatchDrives: DispatchAction<Map<ItemKey, Drive>>,
  dispatchFilter: DispatchAction<string | null>,
  dispatchKeys: DispatchAction<ItemKey[]>,
  dispatchLoading: DispatchAction<boolean>,
  dispatchMemberIcons: DispatchAction<KeyValue<ItemKey, Map<string, string | null>>>,
  dispatchMembers: DispatchAction<Map<ItemKey, Member[]>>,
  dispatchTeamIcons: DispatchAction<Map<ItemKey, string | null>>,
  dispatchTeams: DispatchAction<Map<ItemKey, Team>>
}

const ReducerContext = React.createContext<ReducerContextValue | null>(null);

interface ReducerContextProviderProps {
  children: React.ReactNode
}

const initialState = {
  loading: false,
  items: []
};

export const ReducerContextProvider = ({ children }: ReducerContextProviderProps): React.ReactElement | null => {

  const [ state, dispatch ] = React.useReducer(reducer, initialState);

  const dispatchChannels = React.useCallback((payload: Map<ItemKey, Channel[]>) => {
    dispatch(setChannels(payload));
  }, []);

  const dispatchDrives = React.useCallback((payload: Map<string, Drive>) => {
    dispatch(setDrives(payload));
  }, []);

  const dispatchFilter = React.useCallback((payload: string | null) => {
    dispatch(setFilter(payload));
  }, []);

  const dispatchKeys = React.useCallback((payload: ItemKey[]) => {
    dispatch(setKeys(payload));
  }, []);

  const dispatchLoading = React.useCallback((payload: boolean) => {
    dispatch(setLoading(payload));
  }, []);

  const dispatchMemberIcons = React.useCallback((payload: KeyValue<ItemKey, Map<string, string | null>>) => {
    dispatch(setMemberIcons(payload));
  }, []);

  const dispatchMembers = React.useCallback((payload: Map<ItemKey, Member[]>) => {
    dispatch(setMembers(payload));
  }, []);

  const dispatchTeamIcons = React.useCallback((payload: Map<string, string | null>) => {
    dispatch(setTeamIcons(payload));
  }, []);

  const dispatchTeams = React.useCallback((payload: Map<string, Team>) => {
    dispatch(setTeams(payload));
  }, []);

  return (
    <ReducerContext.Provider
      value={{
        state,
        dispatchChannels,
        dispatchDrives,
        dispatchFilter,
        dispatchKeys,
        dispatchLoading,
        dispatchMemberIcons,
        dispatchMembers,
        dispatchTeamIcons,
        dispatchTeams
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
