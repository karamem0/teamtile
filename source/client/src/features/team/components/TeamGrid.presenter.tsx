//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage } from 'react-intl';

import { Text } from '@fluentui/react-components';

import { css } from '@emotion/react';

import GridLayout from '../../../common/components/GridLayout';
import { useTheme } from '../../../providers/ThemeProvider';
import { Item } from '../../../types/Store';
import messages from '../messages';

import TeamCard from './TeamCard';

interface TeamGridProps {
  items?: Item[]
}

function TeamGrid(props: TeamGridProps) {

  const { items } = props;

  const { theme } = useTheme();

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
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 5rem);
        `}>
        <div
          css={css`
          display: flex;
          flex-direction: column;
          grid-gap: 0.5rem;
          align-items: center;
          justify-content: center;
        `}>
          <Text
            as="h1"
            css={css`
              font-size: 2rem;
              line-height: calc(2rem * 1.25);
              color: ${theme.colorNeutralForegroundDisabled};
            `}>
            <FormattedMessage {...messages.NoItemsFoundTitle} />
          </Text>
          <Text
            css={css`
              color: ${theme.colorNeutralForegroundDisabled};
            `}>
            <FormattedMessage {...messages.NoItemsFoundDescription2} />
          </Text>
        </div>
      </div>
    )
  ) : null;

}

export default React.memo(TeamGrid);
