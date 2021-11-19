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
  ItemKey,
  KeyValue
} from '../../types/reducer';

export const putMemberIcons = (payload: KeyValue<ItemKey, Map<string, string>>): Action => ({
  type: ActionType.PutMemberIcons,
  payload: payload
});
