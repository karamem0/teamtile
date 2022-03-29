//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import {
  ItemKey,
  State
} from '../../types/state';

export const setLoadingValues = (state: State, payload: Map<ItemKey, boolean>): State => {
  const { items } = state;
  return {
    ...state,
    items: items.map((item) => ({
      ...item,
      loading: payload.has(item.key)
        ? payload.get(item.key)
        : item.loading
    }))
  };
};
