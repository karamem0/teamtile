//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import { Action, ActionType } from '../../types/reducer';
import { Drive } from '../../types/entity';

export const putDrives = (payload: Map<string, Drive>): Action => ({
  type: ActionType.PutDrives,
  payload: payload
});
