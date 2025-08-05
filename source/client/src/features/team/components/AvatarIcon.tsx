//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { AvatarSize } from '@fluentui/react-components';

import Presenter from './AvatarIcon.presenter';

interface AvatarIconProps {
  icon?: string,
  name?: string,
  size?: AvatarSize
}

function AvatarIcon(props: Readonly<AvatarIconProps>) {

  const {
    icon,
    name,
    size
  } = props;

  return (
    <Presenter
      icon={icon}
      name={name}
      size={size} />
  );

}

export default AvatarIcon;
