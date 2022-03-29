//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Icon } from '../../types/entity';
import {
  Action,
  ActionType
} from '../../types/reducer';
import { ItemKey } from '../../types/state';

export const setTeamIcons = (payload: Map<ItemKey, Icon | null>): Action => ({
  type: ActionType.setTeamIcons,
  payload: payload
});
