//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import { State } from '../../types/reducer';

export const setTeamIcons = (state: State, payload: Map<string, string>): State => {
  const { keys, values } = state;
  return {
    ...state,
    values: keys && values
      ? keys.map((key, index) => ({
        ...values[index],
        icon: payload.get(key)
      }))
      : undefined
  };
};
