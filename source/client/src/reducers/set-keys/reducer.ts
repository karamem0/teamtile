//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import { State } from '../../types/reducer';

export const setKeys = (state: State, payload: string[]): State => ({
  ...state,
  keys: payload,
  values: new Array(payload.length)
});
