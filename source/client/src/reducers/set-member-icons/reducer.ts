//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import {
  ItemKey,
  ItemValue,
  State
} from '../../types/state';
import { KeyValue } from '../../types/common';

export const setMemberIcons = (state: State, payload: KeyValue<ItemKey, Map<string, string | null>>): State => {
  const { items } = state;
  return {
    ...state,
    items: items.map((item) => {
      if (item.key === payload.key) {
        return {
          ...item,
          value: {
            ...item.value,
            members: item.value?.members?.map((member) => ({
              ...member,
              icon: member.userId
                ? payload.value.get(member.userId) || null
                : undefined
            }))
          } as ItemValue
        };
      } else {
        return item;
      }
    })
  };
};
