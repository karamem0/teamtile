//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import {
  Button,
  Card,
  Menu,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Skeleton,
  SkeletonItem,
  Text
} from '@fluentui/react-components';
import {
  MoreVertical16Regular,
  PersonAccount16Regular,
  PersonGuest16Regular,
  PersonRibbon16Regular
} from '@fluentui/react-icons';
import { useIntl } from 'react-intl';
import { useTheme } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import { TeamCard } from '../../../types/Store';
import messages from '../messages';
import AvatarIcon from './AvatarIcon';
import CalendarMenuItem from './CalendarMenuItem';
import ChannelMenuItem from './ChannelMenuItem';
import DriveMenuItem from './DriveMenuItem';
import MemberMenuItem from './MemberMenuItem';
import PinMenuItem from './PinMenuItem';
import SensitivityLabel from './SensitivityLabel';
import SummaryIcon from './SummaryIcon';
import TagMenuItem from './TagMenuItem';
import VisibilityIcon from './VisibilityIcon';

interface TeamGridItemProps {
  card: TeamCard,
  onClick?: EventHandler
}

function TeamGridItem(props: Readonly<TeamGridItemProps>) {

  const {
    card: {
      id,
      loading,
      pinned,
      team,
      visible
    },
    onClick
  } = props;

  const { theme } = useTheme();
  const intl = useIntl();

  switch (loading) {
    case true:
      return (
        <Card role="listitem">
          <Skeleton animation="pulse">
            <div
              css={css`
                display: grid;
                grid-template-rows: auto;
                grid-template-columns: auto 1fr auto;
                gap: 0.5rem;
              `}>
              <SkeletonItem
                shape="circle"
                size={48} />
              <div
                css={css`
                  display: grid;
                  grid-template-rows: auto;
                  grid-template-columns: auto;
                  gap: 0.25rem;
                `}>
                <SkeletonItem
                  shape="rectangle"
                  size={24} />
                <SkeletonItem
                  shape="rectangle"
                  size={24} />
                <SkeletonItem
                  shape="rectangle"
                  size={96} />
              </div>
            </div>
          </Skeleton>
        </Card>
      );
    case false: {
      return visible ? (
        <React.Fragment>
          <Card role="listitem">
            <div
              css={css`
                display: grid;
                grid-template-rows: auto;
                grid-template-columns: auto 1fr;
                gap: 0.5rem;
              `}>
              <AvatarIcon
                icon={team.icon}
                name={team.displayName}
                size={48} />
              <div
                css={css`
                  display: grid;
                  grid-template-rows: auto auto auto auto;
                  grid-template-columns: 1fr auto;
                  gap: 0.25rem;
                `}>
                <div
                  css={css`
                    grid-row: 1 / 2;
                    grid-column: 1 / 2;
                    height: 1.5rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  `}>
                  <Text
                    role="button"
                    css={css`
                      font-weight: 600;
                      color: ${theme.colorBrandForeground1};
                      white-space: nowrap;
                      cursor: pointer;
                    `}
                    onClick={onClick}>
                    {team.displayName}
                  </Text>
                </div>
                <div
                  css={css`
                    grid-row: 1 / 3;
                    grid-column: 2 / 3;
                  `}>
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
                        <ChannelMenuItem {...team} />
                        <MemberMenuItem {...team} />
                        <TagMenuItem id={id} />
                        <DriveMenuItem {...team} />
                        <CalendarMenuItem {...team} />
                        <PinMenuItem
                          id={id}
                          pinned={pinned} />
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                </div>
                <div
                  css={css`
                    display: flex;
                    grid-row: 2 / 3;
                    grid-column: 1 / 2;
                    gap: 0.25rem;
                    align-items: center;
                    justify-content: left;
                    height: 1.25rem;
                  `}>
                  <VisibilityIcon type={team.visibility} />
                  {
                    team.sensitivityLabel ? (
                      <SensitivityLabel label={team.sensitivityLabel} />
                    ) : (
                      <div />
                    )
                  }
                  <div />
                </div>
                <div
                  css={css`
                    display: flex;
                    flex-direction: row;
                    grid-row: 3 / 4;
                    grid-column: 1 / 3;
                    align-items: center;
                    justify-content: left;
                    height: 1.25rem;
                    gap: 0.5rem;
                    color: ${theme.colorNeutralForeground4};
                  `}>
                  <SummaryIcon
                    count={team.ownersCount}
                    tooltip={intl.formatMessage(messages.Owners)}
                    icon={(
                      <PersonRibbon16Regular />
                    )} />
                  <SummaryIcon
                    count={team.membersCount}
                    tooltip={intl.formatMessage(messages.Members)}
                    icon={(
                      <PersonAccount16Regular />
                    )} />
                  <SummaryIcon
                    count={team.guestsCount}
                    tooltip={intl.formatMessage(messages.Guests)}
                    icon={(
                      <PersonGuest16Regular />
                    )} />
                </div>
                <div
                  css={css`
                    grid-row: 4 / 5;
                    grid-column: 1 / 3;
                    height: 6.25rem;
                  `}>
                  <div
                    css={css`
                      display: -webkit-box;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      -webkit-line-clamp: 5;
                      line-height: 1.25rem;
                      -webkit-box-orient: vertical;
                    `}>
                    {team.description}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </React.Fragment>
      ) : null;
    }
    default:
      return null;
  }

}

export default React.memo(TeamGridItem);
