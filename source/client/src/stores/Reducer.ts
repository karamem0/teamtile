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
  Item,
  State
} from '../types/Store';
import { search } from '../utils/String';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.setFilter: {
      const { items } = state;
      const payload = action.payload as string | undefined;
      return {
        ...state,
        filter: payload,
        items: items?.map((item) => {
          if (!payload) {
            return {
              ...item,
              visible: true
            };
          }
          if (search(item.value.displayName, payload) ||
              search(item.value.description, payload)) {
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
    }
    case ActionType.setItems: {
      const payload = action.payload as Item[] | undefined;
      return {
        ...state,
        items: payload ? [ ...payload ] : undefined
      };
    }
    case ActionType.setLoading: {
      const payload = action.payload as boolean | undefined;
      return {
        ...state,
        loading: payload
      };
    }
    default:
      return state;
  }
};
