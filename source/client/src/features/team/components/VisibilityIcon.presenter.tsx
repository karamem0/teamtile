//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Globe16Regular, LockClosed16Regular } from '@fluentui/react-icons';
import { Tooltip } from '@fluentui/react-components';
import { VisibilityType } from '../../../types/Entity';
import { css } from '@emotion/react';
import messages from '../messages';
import { useIntl } from 'react-intl';
import { useTheme } from '../../../providers/ThemeProvider';

interface VisibilityIconProps {
  type?: VisibilityType
}

function VisibilityIcon(props: Readonly<VisibilityIconProps>) {

  const { type } = props;

  const { theme } = useTheme();
  const intl = useIntl();

  switch (type) {
    case 'public':
      return (
        <Tooltip
          content={intl.formatMessage(messages.Public)}
          relationship="label">
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${theme.colorBrandForeground1};
            `}>
            <Globe16Regular />
          </div>
        </Tooltip>
      );
    case 'private':
      return (
        <Tooltip
          content={intl.formatMessage(messages.Private)}
          relationship="label">
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${theme.colorBrandForeground1};
            `}>
            <LockClosed16Regular />
          </div>
        </Tooltip>
      );
    default:
      return null;
  }

}

export default React.memo(VisibilityIcon);
