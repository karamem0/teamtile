//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Button } from '@fluentui/react-components';
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
      tooltip={intl.formatMessage(messages.OpenInSharePoint)}
      onClick={onClick}>
      <Button
        appearance="transparent"
        icon={(
          <SharepointLogoIcon
            css={css`
              width: 1rem;
              height: 1rem;
            `} />
        )} />
    </CardMenuItem>
  );

}

export default React.memo(DriveMenuItem);
