//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import {
  Action,
  ActionType,
  ItemKey
} from '../../types/reducer';
import { Team } from '../../types/entity';

export const putTeams = (payload: Map<ItemKey, Team>): Action => ({
  type: ActionType.PutTeams,
  payload: payload
});
