//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../types/common';

import Presenter from './presenter';

interface CardMenuItemProps {
  icon: React.ReactNode | undefined,
  content: React.ReactNode | undefined,
  onClick?: EventHandler | undefined
}

export default function CardMenuItem ({
  icon,
  content,
  onClick
}: CardMenuItemProps): React.ReactElement | null {

  return (
    <Presenter
      content={content}
      icon={icon}
      onClick={onClick} />
  );

}
