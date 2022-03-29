//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { SizeValue } from '@fluentui/react-northstar';

import { Icon } from '../../types/entity';

import Presenter from './presenter';

interface AvatarIconProps {
  icon: Icon | undefined,
  name: string | null | undefined,
  size: SizeValue | undefined
}

export default function AvatarIcon ({
  icon,
  name,
  size
}: AvatarIconProps): React.ReactElement | null {

  return (
    <Presenter
      icon={icon}
      name={name}
      size={size} />
  );

}
