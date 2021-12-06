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
import { Channel } from '../../types/entity';

export const setChannels = (state: State, payload: Map<ItemKey, Channel[]>): State => {
  const { items } = state;
  return {
    ...state,
    items: items.map((item) => ({
      ...item,
      value: {
        ...item.value,
        channels: payload.get(item.key)
      } as ItemValue
    }))
  };
};
