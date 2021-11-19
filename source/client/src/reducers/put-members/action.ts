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
import { Member } from '../../types/entity';

export const putMembers = (payload: Map<ItemKey, Member[]>): Action => ({
  type: ActionType.PutMembers,
  payload: payload
});
