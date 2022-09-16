//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

export type Event = React.SyntheticEvent | React.SyntheticEvent<unknown> | Record<string, never>;

export type EventHandler<T = never> = (
  event?: Event,
  data?: T
) => void;
