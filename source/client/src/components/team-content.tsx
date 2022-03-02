//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useReducerContext } from '../contexts/reducer-context';

import { GridLayout } from './grid-layout';
import { TeamCard } from './team-card';

export const TeamContent = (): React.ReactElement | null => {

  const { state: { items } } = useReducerContext();

  return (
    <GridLayout>
      {
        items.map((item) => (
          <TeamCard
            item={item}
            key={item.key} />
        ))
      }
    </GridLayout>
  );

};
