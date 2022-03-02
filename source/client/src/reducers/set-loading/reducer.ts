//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Loading, State } from '../../types/state';

export const setLoading = (state: State, payload: Loading): State => ({
  ...state,
  loading: payload
});
