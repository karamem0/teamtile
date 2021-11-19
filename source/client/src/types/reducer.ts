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

export type ItemKey = string;

export type ItemValue = (
  Team &
  Icon &
  {
    channels: Channel[] | undefined,
    members: (Member & Icon)[] | undefined,
    drive: Drive | undefined
  }
);

export type Item = (
  KeyValue<ItemKey, ItemValue | null> &
  {
    visible: boolean | undefined
  }
);

export interface State {
  loading: boolean,
  items: Item[]
}

export interface Action {
  type: ActionType,
  payload: unknown
}

export enum ActionType {
  PutLoading = 'PutLoading',
  PutFilter = 'PutFilter',
  PutKeys = 'PutKeys',
  PutTeams = 'PutTeams',
  PutTeamIcons = 'PutTeamIcons',
  PutChannels = 'PutChannels',
  PutMembers = 'PutMembers',
  PutMemberIcons = 'PutMemberIcons',
  PutDrives = 'PutDrives',
}
