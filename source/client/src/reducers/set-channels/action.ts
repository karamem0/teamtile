//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import { Action, ActionType } from '../../types/reducer';
import { Channel } from '../../types/entity';

export const setChannels = (payload: Map<string, Channel[]>): Action => ({
  type: ActionType.SetChannels,
  payload: payload
});
