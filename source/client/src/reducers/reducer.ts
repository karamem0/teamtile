//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Reducers
import { setChannels } from './set-channels/reducer';
import { setDrives } from './set-drives/reducer';
import { setFilter } from './set-filter/reducer';
import { setKeys } from './set-keys/reducer';
import { setLoading } from './set-loading/reducer';
import { setMemberIcons } from './set-member-icons/reducer';
import { setMembers } from './set-members/reducer';
import { setTeamIcons } from './set-team-icons/reducer';
import { setTeams } from './set-teams/reducer';
// Types
import {
  Action,
  ActionType
} from '../types/reducer';
import {
  Channel,
  Drive,
  Member,
  Team
} from '../types/entity';
import {
  ItemKey,
  State
} from '../types/state';
import { KeyValue } from '../types/common';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.setLoading:
      return setLoading(state, action.payload as boolean);
    case ActionType.setFilter:
      return setFilter(state, action.payload as string | null);
    case ActionType.setKeys:
      return setKeys(state, action.payload as string[]);
    case ActionType.setTeams:
      return setTeams(state, action.payload as Map<ItemKey, Team>);
    case ActionType.setTeamIcons:
      return setTeamIcons(state, action.payload as Map<ItemKey, string>);
    case ActionType.setChannels:
      return setChannels(state, action.payload as Map<ItemKey, Channel[]>);
    case ActionType.setMembers:
      return setMembers(state, action.payload as Map<ItemKey, Member[]>);
    case ActionType.setMemberIcons:
      return setMemberIcons(state, action.payload as KeyValue<ItemKey, Map<string, string>>);
    case ActionType.setDrives:
      return setDrives(state, action.payload as Map<ItemKey, Drive>);
    default:
      return state;
  }
};
