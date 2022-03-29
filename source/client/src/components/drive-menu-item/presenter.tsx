//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { SharepointLogoIcon } from '@fluentui/react-icons-mdl2-branded';

import { EventHandler } from '../../types/common';
import { Drive } from '../../types/entity';
import { CardMenuItem } from '../card-menu-item';

interface DriveMenuItemProps {
  drive: Drive,
  onClick?: EventHandler<Drive> | undefined
}

export default React.memo(function DriveMenuItemPresenter ({
  drive,
  onClick
}: DriveMenuItemProps): React.ReactElement | null {

  return (
    <CardMenuItem
      content={undefined}
      icon={<SharepointLogoIcon />}
      onClick={(event) => onClick && onClick(event, drive)} />
  );

});
