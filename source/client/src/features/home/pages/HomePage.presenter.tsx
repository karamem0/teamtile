//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage } from 'react-intl';

import {
  Button,
  Image,
  Link,
  Text
} from '@fluentui/react-components';
import { GitHubLogoIcon } from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';
import messages from '../messages';

interface HomePageProps {
  onLinkClick?: EventHandler<string>
}

function HomePage(props: HomePageProps) {

  const { onLinkClick } = props;

  return (
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
            <GitHubLogoIcon
              css={css`
                width: 1rem;
                height: 1rem;
              `} />
          )}
          onClick={(e) => onLinkClick?.(e, 'GitHub')}>
          <FormattedMessage {...messages.GitHubTitle} />
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
          background-color: #90d0f0;
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
                color: #fff;
                text-align: center;
              `}>
              <FormattedMessage {...messages.AppTitle} />
            </Text>
            <Text
              css={css`
                color: #fff;
              `}>
              <FormattedMessage {...messages.AppDescription} />
            </Text>
          </div>
          <Image
            fit="contain"
            src="/assets/screenshot.png"
            css={css`
              height: auto;
            `} />
        </div>
      </section>
      <section
        css={css`
          display: flex;
          flex-flow: column;
          grid-gap: 1rem;
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
        <div
          css={css`
            display: flex;
            flex-flow: column;
            grid-gap: 0.5rem;
            align-items: center;
            justify-content: center;
          `}>
          <Text>
            <FormattedMessage {...messages.FeaturesDescription1} />
          </Text>
          <Text>
            <FormattedMessage {...messages.FeaturesDescription2} />
          </Text>
          <Text>
            <FormattedMessage {...messages.FeaturesDescription3} />
          </Text>
          <Text>
            <FormattedMessage {...messages.FeaturesDescription4} />
          </Text>
        </div>
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
          onClick={(e) => onLinkClick?.(e, 'TermsOfUse')}>
          <FormattedMessage {...messages.TermsOfUseTitle} />
        </Link>
        <Text
          css={css`
            padding: 0 0.25rem;
          `}>
          |
        </Text>
        <Link
          as="button"
          onClick={(e) => onLinkClick?.(e, 'PrivacyPolicy')}>
          <FormattedMessage {...messages.PrivacyPolicyTitle} />
        </Link>
      </footer>
    </div>
  );

}

export default React.memo(HomePage);
