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
  TeamCard
} from '../types/Store';

export const setFilter = (payload?: string): Action => ({
  type: ActionType.setFilter,
  payload
});

export const setCard = (payload?: TeamCard): Action => ({
  type: ActionType.setCard,
  payload
});

export const setCards = (payload?: TeamCard[]): Action => ({
  type: ActionType.setCards,
  payload
});

export const setLoading = (payload?: boolean): Action => ({
  type: ActionType.setLoading,
  payload
});

export const togglePin = (payload?: string): Action => ({
  type: ActionType.togglePin,
  payload
});
