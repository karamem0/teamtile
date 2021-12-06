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
import { Member } from '../../types/entity';

export const setMembers = (state: State, payload: Map<ItemKey, Member[]>): State => {
  const { items } = state;
  return {
    ...state,
    items: items.map((item) => ({
      ...item,
      value: {
        ...item.value,
        members: payload.get(item.key)
      } as ItemValue
    }))
  };
};
