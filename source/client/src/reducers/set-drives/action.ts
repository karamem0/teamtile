//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Drive } from '../../types/entity';
import {
  Action,
  ActionType
} from '../../types/reducer';
import { ItemKey } from '../../types/state';

export const setDrives = (payload: Map<ItemKey, Drive>): Action => ({
  type: ActionType.setDrives,
  payload: payload
});
