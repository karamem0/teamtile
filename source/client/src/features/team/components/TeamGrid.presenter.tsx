//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Accordion } from '@fluentui/react-components';
import { FormattedMessage } from 'react-intl';
import TeamAccordionItem from './TeamAccordionItem';
import { TeamCard } from '../../../types/Store';
import messages from '../messages';

interface TeamGridProps {
  cards?: TeamCard[]
}

function TeamGrid(props: Readonly<TeamGridProps>) {

  const { cards } = props;

  return (
    <Accordion
      collapsible
      defaultOpenItems={[ 'all', 'pinned' ]}
      multiple>
      <TeamAccordionItem
        key="pinned"
        cards={cards?.filter((card) => card.visible && card.pinned)}
        value="pinned"
        header={(
          <FormattedMessage {...messages.PinnedTeams} />
        )} />
      <TeamAccordionItem
        key="all"
        cards={cards?.filter((card) => card.visible && !card.team.archived)}
        value="all"
        header={(
          <FormattedMessage {...messages.AllTeams} />
        )} />
      <TeamAccordionItem
        key="archived"
        cards={cards?.filter((card) => card.visible && card.team.archived)}
        value="archived"
        header={(
          <FormattedMessage {...messages.ArchivedTeams} />
        )} />
    </Accordion>
  );

}

export default React.memo(TeamGrid);
