//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { KeyValue } from '../../types/common';
import { Icon } from '../../types/entity';
import {
  ItemKey,
  ItemValue,
  State
} from '../../types/state';

export const setMemberIcons = (state: State, payload: KeyValue<ItemKey, Map<string, Icon | null>>): State => {
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
                ? payload.value.has(member.userId)
                  ? payload.value.get(member.userId)
                  : member.icon
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
