//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  Communication,
  CommunicationOptions
} from '@fluentui/react-teams';

import { css } from '@emotion/react';

import GridLayout from '../../../components/GridLayout';
import { Item } from '../../../types/Store';

import TeamCard from './TeamCard';

interface TeamGridProps {
  items?: Item[]
}

function TeamGrid(props: TeamGridProps) {

  const { items } = props;

  return items ? (
    items.some((item) => item.visible) ? (
      <GridLayout>
        {
          items.map((item) => (
            <TeamCard
              item={item}
              key={item.id} />
          ))
        }
      </GridLayout>
    ) : (
      <div
        css={css`
          & > div {
            flex-basis: auto;
          }
        `}>
        <Communication
          option={CommunicationOptions.Empty}
          fields={{
            title: 'No items found',
            desc: 'There are no items matching the keyword.'
          }} />
      </div>
    )
  ) : null;

}

export default React.memo(TeamGrid);
