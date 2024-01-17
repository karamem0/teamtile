//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Item } from '../../../types/Store';

import Presenter from './TeamAccordionItem.presenter';

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
    <Presenter
      header={header}
      items={items}
      value={value} />
  );

}

export default TeamAccordionItem;
