//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import {
  ItemKey,
  ItemValue,
  State
} from '../../types/state';
import { Team } from '../../types/entity';

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
