//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { State } from '../../types/state';

export const setItemFilter = (state: State, payload: string | null): State => {
  return {
    ...state,
    itemFilter: payload,
    items: state.items.map((item) => {
      const { value } = item;
      if (!value) {
        return item;
      }
      if (!payload) {
        return {
          ...item,
          visible: true
        };
      }
      if (value.displayName) {
        if (value.displayName.search(new RegExp(payload, 'i')) >= 0) {
          return {
            ...item,
            visible: true
          };
        }
      }
      if (value.description) {
        if (value.description.search(new RegExp(payload, 'i')) >= 0) {
          return {
            ...item,
            visible: true
          };
        }
      }
      return {
        ...item,
        visible: false
      };
    })
  };
};
