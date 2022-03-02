//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import { KeyValue } from './common';
import {
  Channel,
  Drive,
  Icon,
  Member,
  Team
} from './entity';

export type ItemKey = string;

export type ItemValue = (
  Team &
  Icon &
  {
    channels: Channel[] | undefined,
    members: (Member & Icon)[] | undefined,
    drive: Drive | undefined
  }
);

export type Item = (
  KeyValue<ItemKey, ItemValue | null> &
  {
    visible: boolean | undefined
  }
);

export enum Loading {
  none = 0,
  keys = 1,
  values = 2,
  done = 255,
}

export interface State {
  loading: Loading,
  itemFilter: string | null | undefined,
  items: Item[]
}
