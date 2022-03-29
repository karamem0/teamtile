//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Item } from '../../types/state';
import { GridLayout } from '../grid-layout';
import { TeamCard } from '../team-card';

interface TeamContentProps {
  items: Item[]
}

export default React.memo(function TeamContent ({
  items
}: TeamContentProps): React.ReactElement | null {

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

});
