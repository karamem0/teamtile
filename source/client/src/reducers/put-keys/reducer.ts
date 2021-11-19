//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import { ItemKey, State } from '../../types/reducer';

export const putKeys = (state: State, payload: ItemKey[]): State => ({
  ...state,
  items: payload.map((key) => ({
    key,
    value: null,
    visible: true
  }))
});
