//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';
import Presenter from './CardMenuItem.presenter';

interface CardMenuItemProps {
  tooltip?: string,
  onClick?: EventHandler
}

function CardMenuItem(props: Readonly<React.PropsWithChildren<CardMenuItemProps>>) {

  const {
    children,
    tooltip,
    onClick
  } = props;

  return (
    <Presenter
      tooltip={tooltip}
      onClick={onClick}>
      {children}
    </Presenter>
  );

}

export default CardMenuItem;
