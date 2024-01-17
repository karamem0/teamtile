//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import {
  Action,
  Item,
  State
} from '../types/Store';
import { search } from '../utils/String';

const actions = {
  setFilter: (state: State, payload: unknown) => {
    const data = payload as string | undefined;
    const { items } = state;
    return {
      ...state,
      filter: data,
      items: items?.map((item) => {
        if (data == null) {
          return {
            ...item,
            visible: true
          };
        }
        if (search(item.value.displayName, data) ||
            search(item.value.description, data)) {
          return {
            ...item,
            visible: true
          };
        }
        return {
          ...item,
          visible: false
        };
      })
    };
  },
  setItem: (state: State, payload: unknown) => {
    const data = payload as Item | undefined;
    if (data == null) {
      return state;
    }
    return {
      ...state,
      items: state.items ? (
        state.items.map((item) => item.id === data.id ? data : item)
      ) : undefined
    };
  },
  setItems: (state: State, payload: unknown) => {
    const data = payload as Item[] | undefined;
    return {
      ...state,
      items: data ? [ ...data ] : undefined
    };
  },
  setLoading: (state: State, payload: unknown) => {
    const data = payload as boolean | undefined;
    return {
      ...state,
      loading: data
    };
  }
};

export const reducer = (state: State, action: Action): State => actions[action.type]?.(state, action.payload) ?? state;
