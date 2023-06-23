//
// Copyright (c) 2023 karamem0
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

import { css } from '@emotion/react';

import { useTheme } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import { Item } from '../../../types/Store';

import AvatarIcon from './AvatarIcon';
import CalendarMenuItem from './CalendarMenuItem';
import ChannelMenuItem from './ChannelMenuItem';
import DriveMenuItem from './DriveMenuItem';
import MemberMenuItem from './MemberMenuItem';
import SensitivityLabel from './SensitivityLabel';
import VisibilityIcon from './VisibilityIcon';

interface TeamCardProps {
  item: Item,
  onClick?: EventHandler
}

function TeamCard(props: TeamCardProps) {

  const {
    item,
    onClick
  } = props;

  const { theme } = useTheme();

  switch (item.loading) {
    case true:
      return (
        <Card
          role="listitem"
          css={css`
            height: 6rem;
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
      return item.visible ? (
        <Card
          role="listitem"
          css={css`
            height: 6rem;
          `}>
          <div
            css={css`
              display: grid;
              grid-template-rows: auto;
              grid-template-columns: auto 1fr;
              grid-gap: 0.5rem;
            `}>
            <AvatarIcon
              icon={item.value.icon}
              name={item.value.displayName}
              size={48} />
            <div
              css={css`
                display: grid;
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
                      {item.value.displayName}
                    </Text>
                  </Text>
                </div>
                <SensitivityLabel value={item.value.sensitivityLabel} />
                <VisibilityIcon value={item.value.visibility} />
              </div>
              <div
                css={css`
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                `}>
                {item.value.description}
              </div>
              <div
                css={css`
                  display: grid;
                  grid-template-rows: auto;
                  grid-template-columns: auto auto auto auto;
                  align-items: center;
                  justify-content: left;
                `}>
                <ChannelMenuItem item={item} />
                <MemberMenuItem item={item} />
                <DriveMenuItem item={item} />
                <CalendarMenuItem item={item} />
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

export default React.memo(TeamCard);
