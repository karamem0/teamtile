//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel
} from '@fluentui/react-components';
import { FormattedMessage } from 'react-intl';
import GridLayout from '../../../common/components/GridLayout';
import { TeamCard } from '../../../types/Store';
import TeamGridItem from './TeamGridItem';
import { css } from '@emotion/react';
import messages from '../messages';

interface TeamAccordionItemProps {
  header?: React.ReactNode,
  cards?: TeamCard[],
  value?: unknown
}

function TeamAccordionItem(props: Readonly<TeamAccordionItemProps>) {

  const {
    header,
    cards,
    value
  } = props;

  return (
    <AccordionItem value={value}>
      <AccordionHeader>
        {header}
      </AccordionHeader>
      <AccordionPanel
        css={css`
          padding: 0.25rem;
        `}>
        {
          cards?.length ? (
            <GridLayout>
              {
                cards.map((card) => (
                  <TeamGridItem
                    key={card.id}
                    card={card} />
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
              `}>
              <FormattedMessage {...messages.NoTeamsFound} />
            </div>
          )
        }
      </AccordionPanel>
    </AccordionItem>
  );

}

export default React.memo(TeamAccordionItem);
