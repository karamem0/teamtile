//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { TeamCard } from '../../../types/Store';
import { app } from '@microsoft/teams-js';

import Presenter from './TeamGridItem.presenter';

export interface TeamGridItemProps {
  card: TeamCard
}

function TeamGridItem(props: Readonly<TeamGridItemProps>) {

  const { card } = props;

  const handleClick = React.useCallback(() => {
    if (card.team.webUrl == null) {
      return;
    }
    app.openLink(card.team.webUrl);
  }, [
    card
  ]);

  return (
    <Presenter
      card={card}
      onClick={handleClick} />
  );

}

export default TeamGridItem;
