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
  const { keys, values } = state;
  return {
    ...state,
    values: keys && values
      ? values.map((value, index) => ({
        ...value,
        channels: payload.get(keys[index])
      }))
      : undefined
  };
};
