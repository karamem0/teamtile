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
import { PersonAccount16Regular, PersonRibbon16Regular } from '@fluentui/react-icons';
import { useIntl } from 'react-intl';
import { useTheme } from '../../../providers/ThemeProvider';
import { MemberRoleType } from '../../../types/Entity';
import messages from '../messages';

export interface MemberRoleIconProps {
  type?: MemberRoleType
}

function MemberRoleIcon(props: Readonly<MemberRoleIconProps>) {

  const { type } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  switch (type) {
    case 'member':
      return (
        <Tooltip
          content={intl.formatMessage(messages.Members)}
          relationship="label">
          <Text
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${theme.colorNeutralForeground4};
            `}>
            <PersonAccount16Regular />
          </Text>
        </Tooltip>
      );
    case 'owner':
      return (
        <Tooltip
          content={intl.formatMessage(messages.Owners)}
          relationship="label">
          <Text
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${theme.colorNeutralForeground4};
            `}>
            <PersonRibbon16Regular />
          </Text>
        </Tooltip>
      );
    default:
      return null;
  }

}

export default React.memo(MemberRoleIcon);
