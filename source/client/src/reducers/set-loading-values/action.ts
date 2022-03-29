//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import {
  Action,
  ActionType
} from '../../types/reducer';
import { ItemKey } from '../../types/state';

export const setLoadingValues = (payload: Map<ItemKey, boolean>): Action => ({
  type: ActionType.setLoadingValues,
  payload: payload
});
