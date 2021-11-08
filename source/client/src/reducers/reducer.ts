//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Reducers
import { putChannels } from './put-channels/reducer';
import { putDrives } from './put-drives/reducer';
import { putFilter } from './put-filter/reducer';
import { putKeys } from './put-keys/reducer';
import { putLoading } from './put-loading/reducer';
import { putMemberIcons } from './put-member-icons/reducer';
import { putMembers } from './put-members/reducer';
import { putTeamIcons } from './put-team-icons/reducer';
import { putTeams } from './put-teams/reducer';
// Types
import {
  Action,
  ActionType,
  KeyValue,
  State
} from '../types/reducer';
import {
  Channel,
  Drive,
  Member,
  Team
} from '../types/entity';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.PutLoading:
      return putLoading(state, action.payload as boolean);
    case ActionType.PutFilter:
      return putFilter(state, action.payload as string);
    case ActionType.PutKeys:
      return putKeys(state, action.payload as string[]);
    case ActionType.PutTeams:
      return putTeams(state, action.payload as Map<string, Team>);
    case ActionType.PutTeamIcons:
      return putTeamIcons(state, action.payload as Map<string, string>);
    case ActionType.PutChannels:
      return putChannels(state, action.payload as Map<string, Channel[]>);
    case ActionType.PutMembers:
      return putMembers(state, action.payload as Map<string, Member[]>);
    case ActionType.PutMemberIcons:
      return putMemberIcons(state, action.payload as KeyValue<string, Map<string, string>>);
    case ActionType.PutDrives:
      return putDrives(state, action.payload as Map<string, Drive>);
    default:
      return state;
  }
};
