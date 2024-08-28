//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import CenterLayout from '../../../common/components/CenterLayout';
import { FormattedMessage } from 'react-intl';
import { Text } from '@fluentui/react-components';
import { css } from '@emotion/react';
import messages from '../messages';
import { useTheme } from '../../../providers/ThemeProvider';

function Error404Page() {

  const { theme } = useTheme();

  return (
    <CenterLayout>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          grid-gap: 0.5rem;
          align-items: center;
          justify-content: center;
        `}>
        <Text
          as="h1"
          css={css`
            font-size: 3rem;
            line-height: calc(3rem * 1.25);
            color: ${theme.colorNeutralForegroundDisabled};
          `}>
          <FormattedMessage {...messages.Error404Title} />
        </Text>
        <Text
          css={css`
            color: ${theme.colorNeutralForegroundDisabled};
          `}>
          <FormattedMessage {...messages.Error404Description} />
        </Text>
      </div>
    </CenterLayout>
  );

}

export default React.memo(Error404Page);
