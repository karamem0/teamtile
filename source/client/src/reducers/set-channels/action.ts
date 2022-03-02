//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Channel } from '../../types/entity';
import {
  Action,
  ActionType
} from '../../types/reducer';
import { ItemKey } from '../../types/state';

export const setChannels = (payload: Map<ItemKey, Channel[]>): Action => ({
  type: ActionType.setChannels,
  payload: payload
});
