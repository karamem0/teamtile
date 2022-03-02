//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Action, ActionType } from '../../types/reducer';
import { Loading } from '../../types/state';

export const setLoading = (payload: Loading): Action => ({
  type: ActionType.setLoading,
  payload: payload
});
