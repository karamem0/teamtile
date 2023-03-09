//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
import { useIntl } from 'react-intl';

import { GitHubLogoIcon } from '@fluentui/react-icons-mdl2';
import {
  Button,
  Header,
  Image,
  Text
} from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';
import messages from '../messages';

interface HomePageProps {
  onLinkClick?: EventHandler<string>
}

function HomePage(props: HomePageProps) {

  const { onLinkClick } = props;

  const intl = useIntl();

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
          content={intl.formatMessage(messages.GitHubTitle)}
          icon={<GitHubLogoIcon />}
          text
          onClick={(event) => onLinkClick?.(event, 'GitHub')} />
      </header>
      <section
        css={css`
          display: grid;
          grid-template-rows: auto;
          grid-template-columns: auto;
          align-items: center;
          justify-content: center;
          width: 100%;
          background-color: #90d0f0;
          @media (max-width: 959px) {
            padding: 2rem;
          }
          @media (min-width: 960px) {
            padding: 4rem 2rem;
          }
        `}>
        <div
          css={css`
            display: grid;
            align-items: center;
            justify-content: center;
            @media (max-width: 959px) {
              grid-template-rows: auto;
              grid-template-columns: auto;
            }
            @media (min-width: 960px) {
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
            <Header
              as="h1"
              content={intl.formatMessage(messages.AppTitle)}
              css={css`
                font-size: 3rem;
                line-height: calc(3rem * 1.25);
                color: #fff;
                text-align: center;
              `} />
            <Text
              content={intl.formatMessage(messages.AppDescription)}
              css={css`
                font-size: 1rem;
                line-height: 1rem;
                color: #fff;
                text-align: center;
              `} />
          </div>
          <Image
            fluid
            src="/assets/screenshot.png" />
        </div>
      </section>
      <section
        css={css`
          padding: 2rem 0;
          display: flex;
          flex-flow: column;
          grid-gap: 1rem;
          align-items: center;
          justify-content: center;
        `}>
        <Header
          as="h2"
          content={intl.formatMessage(messages.FeaturesTitle)}
          css={css`
            font-size: 2rem;
            line-height: calc(2rem * 1.25);
            text-align: center;
          `} />
        <Text
          size="large"
          css={css`
            display: flex;
            flex-flow: column;
            gap: 0.5rem;
            align-items: center;
            justify-content: center;
          `}>
          <Text content={intl.formatMessage(messages.FeaturesDescription1)} />
          <Text content={intl.formatMessage(messages.FeaturesDescription2)} />
          <Text content={intl.formatMessage(messages.FeaturesDescription3)} />
          <Text content={intl.formatMessage(messages.FeaturesDescription4)} />
        </Text>
      </section>
      <footer
        css={css`
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
        `}>
        <Button
          content={intl.formatMessage(messages.TermsOfUseTitle)}
          text
          onClick={(event) => onLinkClick?.(event, 'TermsOfUse')} />
        <Text content="|" />
        <Button
          content={intl.formatMessage(messages.PrivacyPolicyTitle)}
          text
          onClick={(event) => onLinkClick?.(event, 'PrivacyPolicy')} />
      </footer>
    </div>
  );

}

export default React.memo(HomePage);
