//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
import { useIntl } from 'react-intl';

import { SharepointLogoIcon } from '@fluentui/react-icons-mdl2-branded';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';
import messages from '../messages';

import CardMenuItem from './CardMenuItem';

interface DriveMenuItemProps {
  onClick?: EventHandler
}

function DriveMenuItem(props: DriveMenuItemProps) {

  const { onClick } = props;

  const intl = useIntl();

  return (
    <CardMenuItem
      tooltip={intl.formatMessage(messages.OpenInSharePoint)}
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
