//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

export type Event = globalThis.Event | React.SyntheticEvent | Record<string, never>;

export type EventHandler<T = never> = (
  event: Event,
  data?: T
) => void;
