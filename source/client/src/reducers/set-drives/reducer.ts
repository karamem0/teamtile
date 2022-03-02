//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Drive } from '../../types/entity';
import {
  ItemKey,
  ItemValue,
  State
} from '../../types/state';

export const setDrives = (state: State, payload: Map<ItemKey, Drive>): State => {
  const { items } = state;
  return {
    ...state,
    items: items.map((item) => ({
      ...item,
      value: {
        ...item.value,
        drive: payload.get(item.key)
      } as ItemValue
    }))
  };
};
