//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Action, ActionType } from '../../types/reducer';

export const setFilter = (payload: string | null): Action => ({
  type: ActionType.setFilter,
  payload: payload
});
