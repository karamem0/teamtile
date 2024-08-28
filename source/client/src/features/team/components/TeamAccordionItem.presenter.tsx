//
// Copyright (c) 2021-2024 karamem0
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
import { Item } from '../../../types/Store';
import TeamCard from './TeamCard';
import { css } from '@emotion/react';
import messages from '../messages';

interface TeamAccordionItemProps {
  header?: React.ReactNode,
  items?: Item[],
  value?: unknown
}

function TeamAccordionItem(props: Readonly<TeamAccordionItemProps>) {

  const {
    header,
    items,
    value
  } = props;

  return (
    <AccordionItem value={value}>
      <AccordionHeader>
        {header}
      </AccordionHeader>
      <AccordionPanel>
        {
          items?.length ? (
            <GridLayout>
              {
                items.map((item) => (
                  <TeamCard
                    key={item.id}
                    item={item} />
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
