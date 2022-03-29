//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Icon } from '../../types/entity';
import {
  ItemKey,
  ItemValue,
  State
} from '../../types/state';

export const setTeamIcons = (state: State, payload: Map<ItemKey, Icon | null>): State => {
  const { items } = state;
  return {
    ...state,
    items: items.map((item) => ({
      ...item,
      value: {
        ...item.value,
        icon: payload.has(item.key)
          ? payload.get(item.key)
          : item.value?.icon
      } as ItemValue
    }))
  };
};
