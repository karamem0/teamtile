//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Member } from '../../types/entity';
import {
  Action,
  ActionType
} from '../../types/reducer';
import { ItemKey } from '../../types/state';

export const setMembers = (payload: Map<ItemKey, Member[]>): Action => ({
  type: ActionType.setMembers,
  payload: payload
});
