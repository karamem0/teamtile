//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { Group } from '../../types/entity';
import { ItemKey, ItemValue, State } from '../../types/state';

export const setGroups = (state: State, payload: Map<ItemKey, Group>): State => ({
  ...state,
  items: Array.from(payload).map(([ key, value ]) => ({
    key,
    value: {
      id: value.id,
      mail: value.mail,
      sensitivityLabel: value.sensitivityLabel
    } as ItemValue,
    loading: true,
    visible: true
  }))
});
