//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { GlobeIcon, LockIcon } from '@fluentui/react-icons-mdl2';
import { Text, Tooltip } from '@fluentui/react-components';
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
          <Text
            role="button"
            css={css`
              line-height: 1rem;
              color: ${theme.colorBrandForeground1};
              vertical-align: baseline;
            `}>
            <GlobeIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          </Text>
        </Tooltip>
      );
    case 'private':
      return (
        <Tooltip
          content={intl.formatMessage(messages.Private)}
          relationship="label">
          <Text
            role="button"
            css={css`
              line-height: 1rem;
              color: ${theme.colorBrandForeground1};
              vertical-align: baseline;
            `}>
            <LockIcon
              css={css`
                font-size: 1rem;
                line-height: 1rem;
              `} />
          </Text>
        </Tooltip>
      );
    default:
      return null;
  }

}

export default React.memo(VisibilityIcon);
