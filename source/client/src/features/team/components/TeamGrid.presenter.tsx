//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Accordion } from '@fluentui/react-components';
import { FormattedMessage } from 'react-intl';
import { TeamCard } from '../../../types/Store';
import messages from '../messages';
import TeamAccordionItem from './TeamAccordionItem';

interface TeamGridProps {
  cards?: TeamCard[]
}

function TeamGrid(props: Readonly<TeamGridProps>) {

  const { cards } = props;

  return (
    <Accordion
      collapsible
      multiple
      defaultOpenItems={[ 'all', 'pinned' ]}>
      <TeamAccordionItem
        cards={cards?.filter((card) => card.visible && card.pinned)}
        key="pinned"
        value="pinned"
        header={(
          <FormattedMessage {...messages.PinnedTeams} />
        )} />
      <TeamAccordionItem
        cards={cards?.filter((card) => card.visible && !card.team.archived)}
        key="all"
        value="all"
        header={(
          <FormattedMessage {...messages.AllTeams} />
        )} />
      <TeamAccordionItem
        cards={cards?.filter((card) => card.visible && card.team.archived)}
        key="archived"
        value="archived"
        header={(
          <FormattedMessage {...messages.ArchivedTeams} />
        )} />
    </Accordion>
  );

}

export default React.memo(TeamGrid);
