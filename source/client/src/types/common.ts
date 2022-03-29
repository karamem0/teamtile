//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

export interface KeyValue<K, V> {
  key: K,
  value: V
}

export type EventHandler<T = undefined> = (event: React.SyntheticEvent, data?: T | undefined) => void;
