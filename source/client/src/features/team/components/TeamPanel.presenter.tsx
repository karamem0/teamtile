//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  Button,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SearchBox
} from '@fluentui/react-components';
import {
  GitHubLogoIcon,
  MoreVerticalIcon,
  RefreshIcon
} from '@fluentui/react-icons-mdl2';
import { EventHandler } from '../../../types/Event';
import { FormattedMessage } from 'react-intl';
import TeamGrid from './TeamGrid';
import { css } from '@emotion/react';
import messages from '../messages';

interface TeamPanelProps {
  onFilterChange?: EventHandler<string>,
  onLinkToGitHub?: EventHandler,
  onLinkToPrivacyPolicy?: EventHandler,
  onLinkToTermsOfUse?: EventHandler,
  onRefreshClick?: EventHandler
}

function TeamPanel(props: Readonly<TeamPanelProps>) {

  const {
    onFilterChange,
    onLinkToGitHub,
    onLinkToPrivacyPolicy,
    onLinkToTermsOfUse,
    onRefreshClick
  } = props;

  return (
    <div
      css={css`
        display: flex;
        flex-flow: column;
        grid-gap: 0.5rem;
      `}>
      <div
        css={css`
          display: grid;
          grid-template-rows: auto;
          grid-template-columns: 1fr auto;
          grid-gap: 0.25rem;
        `}>
        <SearchBox
          css={css`
            min-height: 2.25rem;
            @media (width >= 600px) {
              max-width: 20rem;
            }
          `}
          onChange={(e, data) => onFilterChange?.(e, data.value)} />
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button
              appearance="transparent"
              icon={(
                <MoreVerticalIcon
                  css={css`
                    font-size: 1rem;
                    line-height: 1rem;
                  `} />
              )} />
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuGroup>
                <MenuItem
                  icon={(
                    <RefreshIcon
                      css={css`
                        font-size: 1rem;
                        line-height: 1rem;
                      `} />
                  )}
                  onClick={onRefreshClick}>
                  <FormattedMessage {...messages.Refresh} />
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuItem
                  icon={(
                    <GitHubLogoIcon
                      css={css`
                        font-size: 1rem;
                        line-height: 1rem;
                      `} />
                  )}
                  onClick={onLinkToGitHub}>
                  <FormattedMessage {...messages.GitHub} />
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuItem onClick={onLinkToTermsOfUse}>
                  <FormattedMessage {...messages.TermsOfUse} />
                </MenuItem>
                <MenuItem onClick={onLinkToPrivacyPolicy}>
                  <FormattedMessage {...messages.PrivacyPolicy} />
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
      <TeamGrid />
    </div>
  );

}

export default React.memo(TeamPanel);
