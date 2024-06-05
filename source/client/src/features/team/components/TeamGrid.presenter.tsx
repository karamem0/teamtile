//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage } from 'react-intl';

import { Accordion } from '@fluentui/react-components';

import { AccordionType } from '../../../types/Entity';
import { Item } from '../../../types/Store';
import messages from '../messages';

import TeamAccordionItem from './TeamAccordionItem';

interface TeamGridProps {
  items?: Item[]
}

function TeamGrid(props: Readonly<TeamGridProps>) {

  const { items } = props;

  return (
    <Accordion
      collapsible
      defaultOpenItems={[ AccordionType.pinned, AccordionType.all ]}
      multiple>
      <TeamAccordionItem
        items={items?.filter((item) => item.pinned)}
        key={AccordionType.pinned}
        value={AccordionType.pinned}
        header={
          <FormattedMessage {...messages.PinnedTeams} />
        } />
      <TeamAccordionItem
        items={items?.filter((item) => item.visible && !item.value.archived)}
        key={AccordionType.all}
        value={AccordionType.all}
        header={
          <FormattedMessage {...messages.AllTeams} />
        } />
      <TeamAccordionItem
        items={items?.filter((item) => item.visible && item.value.archived)}
        key={AccordionType.archived}
        value={AccordionType.archived}
        header={
          <FormattedMessage {...messages.ArchivedTeams} />
        } />
    </Accordion>
  );

}

export default React.memo(TeamGrid);
