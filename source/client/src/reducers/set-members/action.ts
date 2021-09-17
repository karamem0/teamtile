//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import { Action, ActionType } from '../../types/reducer';
import { Member } from '../../types/entity';

export const setMembers = (payload: Map<string, Member[]>): Action => ({
  type: ActionType.SetMembers,
  payload: payload
});
