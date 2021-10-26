//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import { Action, ActionType } from '../../types/reducer';
import { Team } from '../../types/entity';

export const setTeams = (payload: Map<string, Team>): Action => ({
  type: ActionType.SetTeams,
  payload: payload
});