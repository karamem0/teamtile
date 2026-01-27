//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { Button, Text } from '@fluentui/react-components';
import { FormattedMessage } from 'react-intl';
import CenterLayout from '../../../common/components/CenterLayout';
import { useTheme } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';

interface EmptyPanelProps {
  onClick?: EventHandler
}

function EmptyPanel(props: Readonly<EmptyPanelProps>) {

  const { onClick } = props;

  const { theme } = useTheme();

  return (
    <CenterLayout>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
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
          <FormattedMessage {...messages.NoTeamsFoundTitle} />
        </Text>
        <Text
          css={css`
            color: ${theme.colorNeutralForegroundDisabled};
          `}>
          <FormattedMessage {...messages.NoTeamsFoundDescription} />
        </Text>
        <Button
          appearance="primary"
          onClick={onClick}>
          <FormattedMessage {...messages.Reload} />
        </Button>
      </div>
    </CenterLayout>
  );

}

export default React.memo(EmptyPanel);
