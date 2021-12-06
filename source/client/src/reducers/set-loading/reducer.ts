//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import { State } from '../../types/state';

export const setLoading = (state: State, payload: boolean): State => ({
  ...state,
  loading: payload
});
