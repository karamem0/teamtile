//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Avatar, AvatarSize } from '@fluentui/react-components';

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
    <Avatar
      image={{ src: icon }}
      name={name}
      size={size} />
  );

}

export default React.memo(AvatarIcon);
