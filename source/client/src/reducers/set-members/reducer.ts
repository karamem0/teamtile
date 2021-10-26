//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import { Member } from '../../types/entity';
import { State } from '../../types/reducer';

export const setMembers = (state: State, payload: Map<string, Member[]>): State => {
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
        members: payload.get(key)
      }))
    }
  };
};
