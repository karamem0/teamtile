//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Team } from '../../types/entity';
import {
  Action,
  ActionType
} from '../../types/reducer';
import { ItemKey } from '../../types/state';

export const setTeams = (payload: Map<ItemKey, Team>): Action => ({
  type: ActionType.setTeams,
  payload: payload
});
