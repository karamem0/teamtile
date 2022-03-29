//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { State } from '../../types/state';

export const setLoadingKeys = (state: State, payload: boolean): State => ({
  ...state,
  loading: payload
});
