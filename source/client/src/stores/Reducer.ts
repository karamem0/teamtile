//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import {
  Action,
  State,
  TeamCard
} from '../types/Store';
import { search } from '../utils/String';

const actions = {
  setFilter: (state: State, payload: unknown) => {
    const data = payload as string | undefined;
    const { cards } = state;
    return {
      ...state,
      filter: data,
      cards: cards?.map((card) => {
        if (data == null) {
          return {
            ...card,
            visible: true
          };
        }
        if (search(card.team.displayName, data) || search(card.team.description, data)) {
          return {
            ...card,
            visible: true
          };
        }
        return {
          ...card,
          visible: false
        };
      })
    };
  },
  setCard: (state: State, payload: unknown) => {
    const data = payload as TeamCard | undefined;
    if (data == null) {
      return state;
    }
    return {
      ...state,
      cards: state.cards ? (
        state.cards.map((card) => card.id === data.id ? data : card)
      ) : undefined
    };
  },
  setCards: (state: State, payload: unknown) => {
    const data = payload as TeamCard[] | undefined;
    if (data == null) {
      return state;
    }
    return {
      ...state,
      cards: data ? [ ...data ] : undefined
    };
  },
  setLoading: (state: State, payload: unknown) => {
    const data = payload as boolean | undefined;
    if (data == null) {
      return state;
    }
    return {
      ...state,
      loading: data
    };
  },
  togglePin: (state: State, payload: unknown) => {
    const data = payload as string | undefined;
    if (data == null) {
      return state;
    }
    return {
      ...state,
      cards: state.cards ? (
        state.cards.map((card) => card.id === data ? { ...card, pinned: !card.pinned } : card)
      ) : undefined
    };
  }
};

export const reducer = (state: State, action: Action): State => actions[action.type]?.(state, action.payload) ?? state;
