//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  Button,
  Image,
  Link,
  Text
} from '@fluentui/react-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { EventHandler } from '../../../types/Event';
import { GrGithub } from 'react-icons/gr';
import { css } from '@emotion/react';
import messages from '../messages';
import { useTheme } from '../../../providers/ThemeProvider';

interface HomePageProps {
  onLinkClick?: EventHandler<string>
}

function HomePage(props: Readonly<HomePageProps>) {

  const {
    onLinkClick
  } = props;

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
      <meta
        content={intl.formatMessage(messages.AppTitle)}
        property="og:title" />
      <meta
        content="website"
        property="og:type" />
      <meta
        content={`${location.origin}/assets/screenshots/001.png`}
        property="og:image" />
      <meta
        content={location.origin}
        property="og:url" />
      <meta
        content={intl.formatMessage(messages.AppDescription)}
        property="og:description" />
      <title>
        {intl.formatMessage(messages.AppTitle)}
      </title>
      <div
        css={css`
          display: flex;
          flex-flow: column;
        `}>
        <header
          css={css`
            display: grid;
            grid-template-rows: auto;
            grid-template-columns: auto;
            align-items: center;
            justify-content: end;
            width: 100%;
            height: 2rem;
            padding: 0 1rem;
          `}>
          <Button
            appearance="transparent"
            as="a"
            icon={(
              <GrGithub
                css={css`
                  font-size: 1rem;
                  line-height: 1rem;
                `} />
            )}
            onClick={(event) => onLinkClick?.(event, 'GitHub')}>
            <FormattedMessage {...messages.GitHub} />
          </Button>
        </header>
        <section
          css={css`
            display: grid;
            grid-template-rows: auto;
            grid-template-columns: auto;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 2rem;
            background: linear-gradient(${theme.colorBrandBackgroundHover}, ${theme.colorBrandBackground});
            @media (width >= 960px) {
              padding: 4rem 2rem;
            }
          `}>
          <div
            css={css`
              display: grid;
              grid-template-rows: auto;
              grid-template-columns: auto;
              align-items: center;
              justify-content: center;
              @media (width >= 960px) {
                grid-template-rows: auto;
                grid-template-columns: 1fr 1fr;
              }
            `}>
            <div
              css={css`
                display: grid;
                align-items: center;
                justify-content: center;
              `}>
              <Text
                as="h1"
                css={css`
                  font-size: 3rem;
                  font-weight: 700;
                  line-height: calc(3rem * 1.25);
                  color: ${theme.colorNeutralForegroundInverted};
                  text-align: center;
                `}>
                <FormattedMessage {...messages.AppTitle} />
              </Text>
              <Text
                css={css`
                  color: ${theme.colorNeutralForegroundInverted};
                `}>
                <FormattedMessage {...messages.AppDescription} />
              </Text>
            </div>
            <Image
              alt={intl.formatMessage(messages.AppTitle)}
              fit="contain"
              src="/assets/screenshots/001.png"
              css={css`
                height: auto;
              `} />
          </div>
        </section>
        <section
          css={css`
            display: flex;
            flex-flow: column;
            gap: 1rem;
            align-items: center;
            justify-content: center;
            padding: 2rem 0;
          `}>
          <Text
            as="h2"
            css={css`
              font-size: 2rem;
              font-weight: 700;
              line-height: calc(2rem * 1.25);
              text-align: center;
            `}>
            <FormattedMessage {...messages.FeaturesTitle} />
          </Text>
          <Text
            css={css`
              text-align: center;
            `}>
            <FormattedMessage {...messages.FeaturesSubtitle} />
          </Text>
          <ul
            css={css`
              display: flex;
              flex-flow: column;
              gap: 0.5rem;
              align-items: center;
              justify-content: center;
              list-style: none;
            `}>
            <li>
              <FormattedMessage {...messages.FeaturesDescription1} />
            </li>
            <li>
              <FormattedMessage {...messages.FeaturesDescription2} />
            </li>
            <li>
              <FormattedMessage {...messages.FeaturesDescription3} />
            </li>
            <li>
              <FormattedMessage {...messages.FeaturesDescription4} />
            </li>
            <li>
              <FormattedMessage {...messages.FeaturesDescription5} />
            </li>
            <li>
              <FormattedMessage {...messages.FeaturesDescription6} />
            </li>
          </ul>
        </section>
        <footer
          css={css`
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: center;
            padding: 2rem 0;
          `}>
          <Link
            as="button"
            onClick={(event) => onLinkClick?.(event, 'TermsOfUse')}>
            <FormattedMessage {...messages.TermsOfUse} />
          </Link>
          <Text
            css={css`
              padding: 0 0.25rem;
            `}>
            |
          </Text>
          <Link
            as="button"
            onClick={(event) => onLinkClick?.(event, 'PrivacyPolicy')}>
            <FormattedMessage {...messages.PrivacyPolicy} />
          </Link>
        </footer>
      </div>
    </React.Fragment>
  );

}

export default React.memo(HomePage);
