//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { ArrowClockwise16Regular, MoreVertical16Regular } from '@fluentui/react-icons';
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
import { FormattedMessage, useIntl } from 'react-intl';
import DrawerFactory from './DrawerFactory';
import { EventHandler } from '../../../types/Event';
import { GrGithub } from 'react-icons/gr';
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

  const intl = useIntl();

  return (
    <div
      css={css`
        display: flex;
        flex-flow: column;
        gap: 0.5rem;
      `}>
      <div
        css={css`
          display: grid;
          grid-template-rows: auto;
          grid-template-columns: 1fr auto;
          gap: 0.25rem;
        `}>
        <SearchBox
          placeholder={intl.formatMessage(messages.SearchTeams)}
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
                <MoreVertical16Regular />
              )} />
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuGroup>
                <MenuItem
                  icon={(
                    <ArrowClockwise16Regular />
                  )}
                  onClick={onRefreshClick}>
                  <FormattedMessage {...messages.Refresh} />
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuItem
                  icon={(
                    <GrGithub
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
      <DrawerFactory />
    </div>
  );

}

export default React.memo(TeamPanel);
