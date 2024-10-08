//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './TeamGridItem.presenter';
import { TeamCard } from '../../../types/Store';
import { app } from '@microsoft/teams-js';

export interface TeamGridItemProps {
  card: TeamCard
}

function TeamCardView(props: Readonly<TeamGridItemProps>) {

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

export default TeamCardView;
