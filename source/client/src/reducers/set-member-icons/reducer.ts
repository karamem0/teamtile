//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Types
import { KeyValue, State } from '../../types/reducer';

export const setMemberIcons = (state: State, payload: KeyValue<string, Map<string, string>>): State => {
  if (!state.store) {
    return state;
  }
  const { keys, values } = state.store;
  return {
    ...state,
    store: {
      keys: keys,
      values: keys.map((key, index) => (
        key === payload.key
          ? {
              ...values[index],
              members: values[index].members?.map((member) => ({
                ...member,
                icon: member.userId
                  ? payload.value.get(member.userId)
                  : undefined
              }))
            }
          : values[index]
      ))
    }
  };
};
