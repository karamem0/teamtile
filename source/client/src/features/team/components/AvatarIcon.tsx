//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { SizeValue } from '@fluentui/react-northstar';

import Presenter from './AvatarIcon.presenter';

interface AvatarIconProps {
  icon?: string,
  name?: string,
  size?: SizeValue
}

function AvatarIcon(props: AvatarIconProps) {

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
