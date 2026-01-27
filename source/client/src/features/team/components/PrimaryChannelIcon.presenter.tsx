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
import { Home16Regular } from '@fluentui/react-icons';
import { useIntl } from 'react-intl';
import { useTheme } from '../../../providers/ThemeProvider';
import messages from '../messages';

export interface PrimaryChannelIconProps {
  primary?: boolean
}

function PrimaryChannelIcon(props: Readonly<PrimaryChannelIconProps>) {

  const { primary } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  return primary ? (
    <Tooltip
      content={intl.formatMessage(messages.PrimaryChannel)}
      relationship="label">
      <Text
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${theme.colorNeutralForeground4};
        `}>
        <Home16Regular />
      </Text>
    </Tooltip>
  ) : null;

}

export default React.memo(PrimaryChannelIcon);
