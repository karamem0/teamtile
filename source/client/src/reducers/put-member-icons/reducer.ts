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
  KeyValue,
  State
} from '../../types/reducer';

export const putMemberIcons = (state: State, payload: KeyValue<ItemKey, Map<string, string>>): State => {
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
                ? payload.value.get(member.userId)
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
