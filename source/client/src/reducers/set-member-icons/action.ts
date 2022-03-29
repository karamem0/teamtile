//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { KeyValue } from '../../types/common';
import { Icon } from '../../types/entity';
import {
  Action,
  ActionType
} from '../../types/reducer';
import { ItemKey } from '../../types/state';

export const setMemberIcons = (payload: KeyValue<ItemKey, Map<string, Icon | null>>): Action => ({
  type: ActionType.setMemberIcons,
  payload: payload
});
