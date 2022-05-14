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
  Group,
  MemberWithIcon,
  TeamWithIcon
} from './entity';

export type Item = (
  KeyValue<ItemKey, ItemValue | null> &
  {
    loading: boolean | undefined,
    visible: boolean | undefined
  }
)

export type ItemKey = string;

export type ItemValue = (
  TeamWithIcon &
  Group &
  {
    channels: Channel[] | undefined,
    drive: Drive | undefined,
    members: MemberWithIcon[] | undefined
  }
);

export interface State {
  itemFilter: string | null | undefined,
  items: Item[],
  loading: boolean | undefined
}
