//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import {
  ItemKey,
  ItemValue,
  State
} from '../../types/state';

export const setTeamIcons = (state: State, payload: Map<ItemKey, string | null>): State => {
  const { items } = state;
  return {
    ...state,
    items: items.map((item) => ({
      ...item,
      value: {
        ...item.value,
        icon: payload.get(item.key) || null
      } as ItemValue
    }))
  };
};
