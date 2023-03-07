//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { SharepointLogoIcon } from '@fluentui/react-icons-mdl2-branded';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';

import CardMenuItem from './CardMenuItem';

interface DriveMenuItemProps {
  onClick?: EventHandler
}

function DriveMenuItem(props: DriveMenuItemProps) {

  const { onClick } = props;

  return (
    <CardMenuItem
      tooltip="Open in SharePoint"
      icon={
        <SharepointLogoIcon
          css={css`
            width: 1rem;
            height: 1rem;
          `} />
      }
      onClick={onClick} />
  );

}

export default React.memo(DriveMenuItem);
