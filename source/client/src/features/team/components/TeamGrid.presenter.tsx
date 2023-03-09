//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
import { useIntl } from 'react-intl';

import {
  Communication,
  CommunicationOptions
} from '@fluentui/react-teams';

import { css } from '@emotion/react';

import GridLayout from '../../../common/components/GridLayout';
import { Item } from '../../../types/Store';
import messages from '../messages';

import TeamCard from './TeamCard';

interface TeamGridProps {
  items?: Item[]
}

function TeamGrid(props: TeamGridProps) {

  const { items } = props;

  const intl = useIntl();

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
            title: intl.formatMessage(messages.NoItemsFoundTitle),
            desc: intl.formatMessage(messages.NoItemsFoundDescription2)
          }} />
      </div>
    )
  ) : null;

}

export default React.memo(TeamGrid);
