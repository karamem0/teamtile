//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './TeamAccordionItem.presenter';
import { TeamCard } from '../../../types/Store';

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
    <Presenter
      cards={cards}
      header={header}
      value={value} />
  );

}

export default TeamAccordionItem;
