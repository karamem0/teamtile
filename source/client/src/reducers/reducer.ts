//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { KeyValue } from '../types/common';
import {
  Channel,
  Drive,
  Icon,
  Member,
  Team
} from '../types/entity';
import {
  Action,
  ActionType
} from '../types/reducer';
import {
  ItemKey,
  State
} from '../types/state';

import { setChannels } from './set-channels/reducer';
import { setDrives } from './set-drives/reducer';
import { setItemFilter } from './set-item-filter/reducer';
import { setKeys } from './set-keys/reducer';
import { setLoadingKeys } from './set-loading-keys/reducer';
import { setLoadingValues } from './set-loading-values/reducer';
import { setMemberIcons } from './set-member-icons/reducer';
import { setMembers } from './set-members/reducer';
import { setTeamIcons } from './set-team-icons/reducer';
import { setTeams } from './set-teams/reducer';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.setChannels:
      return setChannels(state, action.payload as Map<ItemKey, Channel[]>);
    case ActionType.setDrives:
      return setDrives(state, action.payload as Map<ItemKey, Drive>);
    case ActionType.setItemFilter:
      return setItemFilter(state, action.payload as string | null);
    case ActionType.setKeys:
      return setKeys(state, action.payload as string[]);
    case ActionType.setLoadingKeys:
      return setLoadingKeys(state, action.payload as boolean);
    case ActionType.setLoadingValues:
      return setLoadingValues(state, action.payload as Map<ItemKey, boolean>);
    case ActionType.setMemberIcons:
      return setMemberIcons(state, action.payload as KeyValue<ItemKey, Map<string, Icon | null>>);
    case ActionType.setMembers:
      return setMembers(state, action.payload as Map<ItemKey, Member[]>);
    case ActionType.setTeamIcons:
      return setTeamIcons(state, action.payload as Map<ItemKey, Icon | null>);
    case ActionType.setTeams:
      return setTeams(state, action.payload as Map<ItemKey, Team>);
    default:
      return state;
  }
};
