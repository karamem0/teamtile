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
import { Channel } from '../../types/entity';

export const putChannels = (payload: Map<ItemKey, Channel[]>): Action => ({
  type: ActionType.PutChannels,
  payload: payload
});
