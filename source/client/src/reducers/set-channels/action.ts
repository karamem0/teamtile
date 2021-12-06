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
  ActionType
} from '../../types/reducer';
import { Channel } from '../../types/entity';
import { ItemKey } from '../../types/state';

export const setChannels = (payload: Map<ItemKey, Channel[]>): Action => ({
  type: ActionType.setChannels,
  payload: payload
});
