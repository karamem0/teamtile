//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import { State } from '../../types/reducer';

export const putKeys = (state: State, payload: string[]): State => ({
  ...state,
  store: {
    keys: payload,
    values: payload.map(() => ({
      enabled: true
    }))
  }
});
