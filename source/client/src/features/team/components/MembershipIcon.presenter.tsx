//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { ChannelShare16Regular, LockClosed16Regular } from '@fluentui/react-icons';
import { Text, Tooltip } from '@fluentui/react-components';
import { MembershipType } from '../../../types/Entity';
import { css } from '@emotion/react';
import messages from '../messages';
import { useIntl } from 'react-intl';
import { useTheme } from '../../../providers/ThemeProvider';

export interface MembershipIconProps {
  type?: MembershipType
}

function MembershipIcon(props: Readonly<MembershipIconProps>) {

  const { type } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  switch (type) {
    case 'shared':
      return (
        <Tooltip
          content={intl.formatMessage(messages.SharedChannel)}
          relationship="label">
          <Text
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${theme.colorNeutralForeground4};
            `}>
            <ChannelShare16Regular />
          </Text>
        </Tooltip>
      );
    case 'standard':
      return null;
    case 'private':
      return (
        <Tooltip
          content={intl.formatMessage(messages.PrivateChannel)}
          relationship="label">
          <Text
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${theme.colorNeutralForeground4};
            `}>
            <LockClosed16Regular />
          </Text>
        </Tooltip>
      );
    default:
      return null;
  }

}

export default React.memo(MembershipIcon);
