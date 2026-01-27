//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Action, TeamCard } from '../types/Store';

export const setFilter = (payload?: string): Action => ({
  payload,
  type: 'setFilter'
});

export const setCard = (payload?: TeamCard): Action => ({
  payload,
  type: 'setCard'
});

export const setCards = (payload?: TeamCard[]): Action => ({
  payload,
  type: 'setCards'
});

export const setLoading = (payload?: boolean): Action => ({
  payload,
  type: 'setLoading'
});

export const togglePin = (payload?: string): Action => ({
  payload,
  type: 'togglePin'
});
