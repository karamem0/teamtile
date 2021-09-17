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
import { setKeys } from './set-keys/reducer';
import { setLoading } from './set-loading/reducer';
import { setMemberIcons } from './set-member-icons/reducer';
import { setMembers } from './set-members/reducer';
import { setTeamIcons } from './set-team-icons/reducer';
import { setTeams } from './set-teams/reducer';
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
    case ActionType.SetLoading:
      return setLoading(state, action.payload as boolean);
    case ActionType.SetKeys:
      return setKeys(state, action.payload as string[]);
    case ActionType.SetTeams:
      return setTeams(state, action.payload as Map<string, Team>);
    case ActionType.SetTeamIcons:
      return setTeamIcons(state, action.payload as Map<string, string>);
    case ActionType.SetChannels:
      return setChannels(state, action.payload as Map<string, Channel[]>);
    case ActionType.SetMembers:
      return setMembers(state, action.payload as Map<string, Member[]>);
    case ActionType.SetMemberIcons:
      return setMemberIcons(state, action.payload as KeyValue<string, Map<string, string>>);
    case ActionType.SetDrives:
      return setDrives(state, action.payload as Map<string, Drive>);
    default:
      return state;
  }
};
