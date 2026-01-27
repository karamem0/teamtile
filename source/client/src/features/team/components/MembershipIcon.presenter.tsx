//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { Text, Tooltip } from '@fluentui/react-components';
import { ChannelShare16Regular, LockClosed16Regular } from '@fluentui/react-icons';
import { useIntl } from 'react-intl';
import { useTheme } from '../../../providers/ThemeProvider';
import { MembershipType } from '../../../types/Entity';
import messages from '../messages';

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
