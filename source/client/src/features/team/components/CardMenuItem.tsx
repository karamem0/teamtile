//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../../types/Event';
import Presenter from './CardMenuItem.presenter';

interface CardMenuItemProps {
  icon?: React.ReactElement,
  title?: string,
  onClick?: EventHandler
}

function CardMenuItem(props: Readonly<React.PropsWithChildren<CardMenuItemProps>>) {

  const {
    icon,
    title,
    onClick
  } = props;

  return (
    <Presenter
      icon={icon}
      title={title}
      onClick={onClick} />
  );

}

export default CardMenuItem;
