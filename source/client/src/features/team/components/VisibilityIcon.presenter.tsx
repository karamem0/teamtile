//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useIntl } from 'react-intl';

import { Text, Tooltip } from '@fluentui/react-components';
import { GlobeIcon, LockIcon } from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import { useTheme } from '../../../providers/ThemeProvider';
import { VisibilityType } from '../../../types/Entity';
import messages from '../messages';

interface VisibilityIconProps {
  value?: VisibilityType
}

function VisibilityIcon(props: Readonly<VisibilityIconProps>) {

  const { value } = props;

  const { theme } = useTheme();
  const intl = useIntl();

  switch (value) {
    case VisibilityType.public:
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
                width: 1rem;
                height: 1rem;
              `} />
          </Text>
        </Tooltip>
      );
    case VisibilityType.private:
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

export default React.memo(VisibilityIcon);
