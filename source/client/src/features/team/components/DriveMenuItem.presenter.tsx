//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import CardMenuItem from './CardMenuItem';
import { EventHandler } from '../../../types/Event';
import { SharepointLogoIcon } from '@fluentui/react-icons-mdl2-branded';
import { css } from '@emotion/react';
import messages from '../messages';
import { useIntl } from 'react-intl';

interface DriveMenuItemProps {
  onClick?: EventHandler
}

function DriveMenuItem(props: Readonly<DriveMenuItemProps>) {

  const { onClick } = props;

  const intl = useIntl();

  return (
    <CardMenuItem
      title={intl.formatMessage(messages.OpenInSharePoint)}
      icon={(
        <SharepointLogoIcon
          css={css`
            font-size: 1rem;
            line-height: 1rem;
          `} />
      )}
      onClick={onClick} />
  );

}

export default React.memo(DriveMenuItem);
