//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Avatar, SizeValue } from '@fluentui/react-northstar';

import { Icon } from '../../types/entity';

interface AvatarIconProps {
  icon: Icon | undefined,
  name: string | null | undefined,
  size: SizeValue | undefined
}

export default React.memo(function AvatarIcon ({
  name,
  icon,
  size
}: AvatarIconProps): React.ReactElement | null {

  return (
    <Avatar
      image={icon ? `data:${icon.type};base64,${icon.data}` : undefined}
      name={name || undefined}
      size={size} />
  );

});
