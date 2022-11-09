//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Avatar, SizeValue } from '@fluentui/react-northstar';

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
    <Avatar
      image={icon}
      name={name}
      size={size} />
  );

}

export default React.memo(AvatarIcon);
