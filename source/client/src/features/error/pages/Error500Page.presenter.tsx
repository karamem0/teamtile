//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Image, Text } from '@fluentui/react-components';
import { css } from '@emotion/react';
import messages from '../messages';
import { useTheme } from '../../../providers/ThemeProvider';

interface Error500PageProps {
  error?: string
}

function Error500Page(props: Readonly<Error500PageProps>) {

  const { error } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet>
          <meta
            content={intl.formatMessage(messages.AppCreator)}
            name="author" />
          <meta
            content={intl.formatMessage(messages.AppDescription)}
            name="description" />
          <title>
            {`${intl.formatMessage(messages.Error500Title)} - ${intl.formatMessage(messages.AppTitle)}`}
          </title>
        </Helmet>
      </HelmetProvider>
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
            grid-gap: 1rem;
            align-items: center;
            justify-content: center;
          `}>
          <Text as="h1">
            <Image
              alt={intl.formatMessage(messages.Error500Title)}
              src="/assets/errors/500.svg"
              css={css`
                max-width: 32rem;
                max-height: 24rem;
              `} />
          </Text>
          <Text
            css={css`
              color: ${theme.colorNeutralForegroundDisabled};
            `}>
            <FormattedMessage {...messages.Error500Description} />
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

export default React.memo(Error500Page);
