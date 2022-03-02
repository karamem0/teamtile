//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { ItemKey, State } from '../../types/state';

export const setKeys = (state: State, payload: ItemKey[]): State => ({
  ...state,
  items: payload.map((key) => ({
    key,
    value: null,
    visible: true
  }))
});
