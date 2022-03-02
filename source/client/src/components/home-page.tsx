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

export const HomePage = (): React.ReactElement | null => {

  return (
    <HomePagePresenter
      onGitHubClick={() => window.open('https://github.com/karamem0/teamtile', '_blank')}
      onPrivacyClick={() => window.open('https://github.com/karamem0/teamtile/blob/main/PRIVACY.md', '_blank')}
      onTermsOfUseClick={() => window.open('https://github.com/karamem0/teamtile/blob/main/TERMS_OF_USE.md', '_blank') } />
  );

};

interface HomePagePresenterProps {
  onGitHubClick: () => void,
  onPrivacyClick: () => void,
  onTermsOfUseClick: () => void
}

const HomePagePresenter = ({
  onGitHubClick,
  onTermsOfUseClick,
  onPrivacyClick
}: HomePagePresenterProps): React.ReactElement | null => {

  return (
    <div
      css={css`
        display: flex;
        flex-flow: column;
      `}>
      <header
        css={css`
          display: grid;
          grid-template-columns: auto;
          grid-template-rows: auto;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
          height: 2rem;
          padding: 0 1rem 0 1rem;
        `}>
        <Button
          content="GitHub"
          icon={<GitHubLogoIcon />}
          text
          onClick={onGitHubClick} />
      </header>
      <section
        css={css`
          display: grid;
          grid-template-columns: auto;
          grid-template-rows: auto;
          align-items: center;
          justify-content: center;
          background-color: #90d0f0;
          width: 100%;
          @media (max-width: 959px) {
            padding: 2rem 2rem 2rem 2rem;
          }
          @media (min-width: 960px) {
            padding: 4rem 2rem 4rem 2rem;
          }
        `}>
        <div
          css={css`
            display: grid;
            @media (max-width: 959px) {
              grid-template-columns: auto;
              grid-template-rows: auto;
            }
            @media (min-width: 960px) {
              grid-template-columns: 1fr 1fr;
              grid-template-rows: auto;
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
                color: #ffffff;
                font-size: 3rem;
                line-height: 3rem;
                text-align: center;
              `} />
            <Text
              content="Tile your teams for quick access."
              css={css`
              color: #ffffff;
              font-size: 1rem;
              line-height: 1rem;
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
          css={css`
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          `}
          size="large">
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
          padding: 2rem 0 2rem 0;
        `}>
        <Button
          content="Terms of Use"
          text
          onClick={onTermsOfUseClick} />
        <Text content="|" />
        <Button
          content="Privacy Policy"
          text
          onClick={onPrivacyClick} />
      </footer>
    </div>
  );

};
