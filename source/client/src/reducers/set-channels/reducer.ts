//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import { Channel } from '../../types/entity';
import { State } from '../../types/reducer';

export const setChannels = (state: State, payload: Map<string, Channel[]>): State => {
  if (!state.store) {
    return state;
  }
  const { keys, values } = state.store;
  return {
    ...state,
    store: {
      keys: state.store.keys,
      values: keys.map((key, index) => ({
        ...values[index],
        channels: payload.get(key)
      }))
    }
  };
};
