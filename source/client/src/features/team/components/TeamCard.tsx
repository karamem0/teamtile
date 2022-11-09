//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { app } from '@microsoft/teams-js';

import { Item } from '../../../types/Store';

import Presenter from './TeamCard.presenter';

export interface TeamCardProps {
  item: Item
}

function TeamCard(props: TeamCardProps) {

  const { item } = props;

  const handleClick = React.useCallback(() => {
    if (!item.value.webUrl) {
      return;
    }
    app.openLink(item.value.webUrl);
  }, [ item ]);

  return (
    <Presenter
      item={item}
      onClick={handleClick} />
  );

}

export default TeamCard;
