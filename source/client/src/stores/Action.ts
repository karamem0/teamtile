//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import {
  Action,
  ActionType,
  Item
} from '../types/Store';

export const setFilter = (payload?: string): Action => ({
  type: ActionType.setFilter,
  payload: payload
});

export const setItems = (payload?: Item[]): Action => ({
  type: ActionType.setItems,
  payload: payload
});

export const setLoading = (payload?: boolean): Action => ({
  type: ActionType.setLoading,
  payload: payload
});
