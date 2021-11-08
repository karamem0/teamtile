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
  if (!state.store) {
    return state;
  }
  const { keys, values } = state.store;
  return {
    ...state,
    store: {
      keys: keys,
      values: values.map((value) => {
        if (!payload) {
          return {
            ...value,
            enabled: true
          };
        }
        if (value?.displayName) {
          if (value.displayName.search(new RegExp(payload, 'i')) >= 0) {
            return {
              ...value,
              enabled: true
            };
          }
        }
        if (value?.description) {
          if (value.description.search(new RegExp(payload, 'i')) >= 0) {
            return {
              ...value,
              enabled: true
            };
          }
        }
        return {
          ...value,
          enabled: false
        };
      })
    }
  };
};
