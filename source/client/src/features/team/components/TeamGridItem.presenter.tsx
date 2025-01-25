//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  Card,
  Skeleton,
  SkeletonItem,
  Text
} from '@fluentui/react-components';
import AvatarIcon from './AvatarIcon';
import CalendarMenuItem from './CalendarMenuItem';
import ChannelMenuItem from './ChannelMenuItem';
import DriveMenuItem from './DriveMenuItem';
import { EventHandler } from '../../../types/Event';
import MemberMenuItem from './MemberMenuItem';
import PinMenuItem from './PinMenuItem';
import SensitivityLabel from './SensitivityLabel';
import TagMenuItem from './TagMenuItem';
import { TeamCard } from '../../../types/Store';
import VisibilityIcon from './VisibilityIcon';
import { css } from '@emotion/react';
import { useTheme } from '../../../providers/ThemeProvider';

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

  switch (loading) {
    case true:
      return (
        <Card
          role="listitem"
          css={css`
            height: 6.5rem;
          `}>
          <Skeleton animation="pulse">
            <div
              css={css`
                display: grid;
                grid-template-rows: auto;
                grid-template-columns: auto 1fr auto;
                grid-gap: 0.5rem;
              `}>
              <SkeletonItem
                shape="circle"
                size={48} />
              <div
                css={css`
                  display: grid;
                  grid-template-rows: auto;
                  grid-template-columns: auto;
                  grid-gap: 0.25rem;
                `}>
                <SkeletonItem
                  shape="rectangle"
                  size={24} />
                <SkeletonItem
                  shape="rectangle"
                  size={20} />
                <SkeletonItem
                  shape="rectangle"
                  size={20} />
              </div>
            </div>
          </Skeleton>
        </Card>
      );
    case false: {
      return visible ? (
        <Card
          role="listitem"
          css={css`
            height: 6.5rem;
          `}>
          <div
            css={css`
              display: grid;
              grid-template-rows: auto;
              grid-template-columns: auto 1fr;
              grid-gap: 0.5rem;
            `}>
            <AvatarIcon
              icon={team.icon}
              name={team.displayName}
              size={48} />
            <div
              css={css`
                display: grid;
                grid-template-rows: 1.25rem 1.25rem 2rem;
                grid-template-columns: 1fr;
                grid-gap: 0.25rem;
              `}>
              <div
                css={css`
                  display: grid;
                  grid-template-rows: auto;
                  grid-template-columns: 1fr auto auto;
                  grid-gap: 0.25rem;
                  align-items: center;
                  justify-content: center;
                `}>
                <div
                  css={css`
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  `}>
                  <Text
                    role="button"
                    css={css`
                      cursor: pointer;
                    `}
                    onClick={onClick}>
                    <Text
                      css={css`
                        font-weight: 600;
                        color: ${theme.colorBrandForeground1};
                      `}>
                      {team.displayName}
                    </Text>
                  </Text>
                </div>
                <SensitivityLabel label={team.sensitivityLabel} />
                <VisibilityIcon type={team.visibility} />
              </div>
              <div
                css={css`
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                `}>
                {team.description}
              </div>
              <div
                css={css`
                  display: grid;
                  grid-template-rows: auto;
                  grid-template-columns: auto auto auto auto auto auto;
                  align-items: center;
                  justify-content: left;
                `}>
                <ChannelMenuItem {...team} />
                <MemberMenuItem {...team} />
                <TagMenuItem id={id} />
                <DriveMenuItem {...team} />
                <CalendarMenuItem {...team} />
                <PinMenuItem
                  id={id}
                  pinned={pinned} />
              </div>
            </div>
          </div>
        </Card>
      ) : null;
    }
    default:
      return null;
  }

}

export default React.memo(TeamGridItem);
