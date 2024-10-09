//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Text, Tooltip } from '@fluentui/react-components';
import { LockIcon } from '@fluentui/react-icons-mdl2';
import { MembershipType } from '../../../types/Entity';
import { css } from '@emotion/react';
import messages from '../messages';
import { useIntl } from 'react-intl';
import { useTheme } from '../../../providers/ThemeProvider';

export interface MembershipIconProps {
  value?: MembershipType
}

function MembershipIcon(props: Readonly<MembershipIconProps>) {

  const { value } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  switch (value) {
    case 'standard':
      return null;
    case 'private':
      return (
        <Tooltip
          content={intl.formatMessage(messages.Private)}
          relationship="label">
          <Text
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${theme.colorNeutralForeground4};
            `}>
            <LockIcon
              css={css`
                width: 1rem;
                height: 1rem;
              `} />
          </Text>
        </Tooltip>
      );
    default:
      return null;
  }

}

export default React.memo(MembershipIcon);
