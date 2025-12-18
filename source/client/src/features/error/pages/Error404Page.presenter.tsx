//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { Image, Text } from '@fluentui/react-components';
import { css } from '@emotion/react';
import messages from '../messages';
import { useTheme } from '../../../providers/ThemeProvider';

interface Error404PageProps {
  error?: string
}

function Error404Page(props: Readonly<Error404PageProps>) {

  const { error } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  return (
    <React.Fragment>
      <meta
        content={intl.formatMessage(messages.AppCreator)}
        name="author" />
      <meta
        content={intl.formatMessage(messages.AppDescription)}
        name="description" />
      <title>
        {`${intl.formatMessage(messages.Error404Title)} - ${intl.formatMessage(messages.AppTitle)}`}
      </title>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: ${theme.colorNeutralBackground3};
        `}>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            justify-content: center;
          `}>
          <Text as="h1">
            <Image
              alt={intl.formatMessage(messages.Error404Title)}
              src="/assets/errors/404.svg"
              css={css`
                max-width: 32rem;
                max-height: 24rem;
              `} />
          </Text>
          <Text
            css={css`
              color: ${theme.colorNeutralForegroundDisabled};
            `}>
            <FormattedMessage {...messages.Error404Description} />
          </Text>
          <Text
            css={css`
              font-size: 0.75rem;
              line-height: calc(0.75rem * 1.25);
              color: ${theme.colorNeutralForegroundDisabled};
            `}>
            {error}
          </Text>
        </div>
      </div>
    </React.Fragment>
  );

}

export default React.memo(Error404Page);
