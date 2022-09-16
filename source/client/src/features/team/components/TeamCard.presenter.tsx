//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  Card,
  Skeleton,
  Text
} from '@fluentui/react-northstar';

import { css } from '@emotion/react';

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

  switch (item.loading) {
    case true:
      return (
        <Card
          fluid
          role="listitem"
          css={css`
            height: 6rem;
          `}>
          <Skeleton animation="wave">
            <div
              css={css`
                display: grid;
                grid-template-rows: auto;
                grid-template-columns: auto 1fr auto;
                gap: 0.5rem;
              `}>
              <Skeleton.Avatar size="larger" />
              <div
                css={css`
                  display: grid;
                  grid-template-rows: auto;
                  grid-template-columns: auto;
                  gap: 0.25rem;
                `}>
                <Skeleton.Line width="50%" />
                <Skeleton.Line />
                <Skeleton.Line />
              </div>
            </div>
          </Skeleton>
        </Card>
      );
    case false: {
      return item.visible ? (
        <Card
          fluid
          role="listitem"
          css={css`
            height: 6rem;
          `}>
          <div
            css={css`
              display: grid;
              grid-template-rows: auto;
              grid-template-columns: auto 1fr;
              gap: 0.5rem;
            `}>
            <AvatarIcon
              icon={item.value.icon}
              name={item.value.displayName}
              size="larger" />
            <div
              css={css`
                display: grid;
                gap: 0.25rem;
              `}>
              <div
                css={css`
                  display: grid;
                  grid-template-rows: auto;
                  grid-template-columns: 1fr auto auto;
                  gap: 0.25rem;
                  align-items: end;
                `}>
                <div
                  css={css`
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  `}>
                  <Text
                    role="button"
                    weight="semibold"
                    css={css`
                      cursor: pointer;
                    `}
                    onClick={onClick}>
                    {item.value.displayName}
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
                <Text>
                  {item.value.description}
                </Text>
              </div>
              <div
                css={css`
                  display: grid;
                  grid-template-rows: auto;
                  grid-template-columns: auto auto auto auto;
                  gap: 1rem;
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
