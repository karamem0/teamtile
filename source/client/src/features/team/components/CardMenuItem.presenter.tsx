//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { MenuItem } from '@fluentui/react-components';
import { EventHandler } from '../../../types/Event';

interface CardMenuItemProps {
  icon?: React.ReactElement,
  title?: string,
  onClick?: EventHandler
}

function CardMenuItem(props: Readonly<CardMenuItemProps>) {

  const {
    icon,
    title,
    onClick
  } = props;

  return (
    <MenuItem
      icon={icon}
      onClick={onClick}>
      {title}
    </MenuItem>
  );

}

export default React.memo(CardMenuItem);
