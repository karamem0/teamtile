//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import { Drive } from '../../types/entity';
import { State } from '../../types/reducer';

export const putDrives = (state: State, payload: Map<string, Drive>): State => {
  if (!state.store) {
    return state;
  }
  const { keys, values } = state.store;
  return {
    ...state,
    store: {
      keys: keys,
      values: keys.map((key, index) => ({
        ...values[index],
        drive: payload.get(key)
      }))
    }
  };
};
