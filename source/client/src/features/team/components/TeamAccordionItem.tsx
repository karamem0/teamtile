//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { TeamCard } from '../../../types/Store';

import Presenter from './TeamAccordionItem.presenter';

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
