//
// Copyright (c) 2021-2024 karamem0
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
  payload
});

export const setItem = (payload?: Item): Action => ({
  type: ActionType.setItem,
  payload
});

export const setItems = (payload?: Item[]): Action => ({
  type: ActionType.setItems,
  payload
});

export const setLoading = (payload?: boolean): Action => ({
  type: ActionType.setLoading,
  payload
});
