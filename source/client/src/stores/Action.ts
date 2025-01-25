//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Action, TeamCard } from '../types/Store';

export const setFilter = (payload?: string): Action => ({
  type: 'setFilter',
  payload
});

export const setCard = (payload?: TeamCard): Action => ({
  type: 'setCard',
  payload
});

export const setCards = (payload?: TeamCard[]): Action => ({
  type: 'setCards',
  payload
});

export const setLoading = (payload?: boolean): Action => ({
  type: 'setLoading',
  payload
});

export const togglePin = (payload?: string): Action => ({
  type: 'togglePin',
  payload
});
