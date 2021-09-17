//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import {
  Channel,
  Drive,
  Icon,
  Member,
  Team
} from './entity';

export interface KeyValue<K, V> {
  key: K,
  value: V
}

export type StateKey = string;

export type StateValue = (
  Team &
  Icon &
  {
    channels?: Channel[],
    members?: (Member & Icon)[],
    drive?: Drive
  }
);

export interface State {
  loading?: boolean,
  keys?: StateKey[],
  values?: StateValue[]
}

export interface Action {
  type: ActionType,
  payload?: unknown
}

export enum ActionType {
  SetLoading = 'SetLoading',
  SetKeys = 'SetKeys',
  SetTeams = 'SetTeams',
  SetTeamIcons = 'SetTeamIcons',
  SetChannels = 'SetChannels',
  SetMembers = 'SetMembers',
  SetMemberIcons = 'SetMemberIcons',
  SetDrives = 'SetDrives',
}
