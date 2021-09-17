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

export const setDrives = (state: State, payload: Map<string, Drive>): State => {
  const { keys, values } = state;
  return {
    ...state,
    values: keys && values
      ? values.map((value, index) => ({
        ...value,
        drive: payload.get(keys[index])
      }))
      : undefined
  };
};
