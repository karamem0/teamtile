//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { GitHubLogoIcon } from '@fluentui/react-icons-mdl2';
import {
  Button,
  Header,
  Image,
  Text
} from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';

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
          content="GitHub"
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
            @media (max-width: 959px) {
              grid-template-rows: auto;
              grid-template-columns: auto;
            }
            @media (min-width: 960px) {
              grid-template-rows: auto;
              grid-template-columns: 1fr 1fr;
            }
            align-items: center;
            justify-content: center;
          `}>
          <div
            css={css`
              display: grid;
              align-items: center;
              justify-content: center;
            `}>
            <Header
              as="h1"
              content="Teamtile"
              css={css`
                font-size: 3rem;
                line-height: 3rem;
                color: #fff;
                text-align: center;
              `} />
            <Text
              content="Tile your teams for quick access."
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
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
        `}>
        <Header
          as="h2"
          content="Features"
          css={css`
            font-size: 2rem;
            line-height: 2rem;
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
          <Text content="View your joined teams as tiles" />
          <Text content="View team members and channels" />
          <Text content="Link to SharePoint Document Library" />
          <Text content="Filter teams, channels, members" />
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
          content="Terms of Use"
          text
          onClick={(event) => onLinkClick?.(event, 'TermsOfUse')} />
        <Text content="|" />
        <Button
          content="Privacy Policy"
          text
          onClick={(event) => onLinkClick?.(event, 'PrivacyPolicy')} />
      </footer>
    </div>
  );

}

export default React.memo(HomePage);
