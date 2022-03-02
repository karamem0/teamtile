//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Team } from '../../types/entity';
import {
  ItemKey,
  ItemValue,
  State
} from '../../types/state';

export const setTeams = (state: State, payload: Map<ItemKey, Team>): State => {
  const { items } = state;
  return {
    ...state,
    items: items.map((item) => ({
      ...item,
      value: {
        ...item.value,
        ...payload.get(item.key)
      } as ItemValue
    }))
  };
};
