//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';

import Presenter from './CardMenuItem.presenter';

interface CardMenuItemProps {
  content?: React.ReactNode,
  icon?: React.ReactNode,
  tooltip?: React.ReactNode,
  onClick?: EventHandler
}

function CardMenuItem(props: CardMenuItemProps) {

  const {
    content,
    icon,
    tooltip,
    onClick
  } = props;

  return (
    <Presenter
      content={content}
      icon={icon}
      tooltip={tooltip}
      onClick={onClick} />
  );

}

export default CardMenuItem;
