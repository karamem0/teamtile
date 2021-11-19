//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import { State } from '../../types/reducer';

export const putFilter = (state: State, payload?: string): State => {
  return {
    ...state,
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
