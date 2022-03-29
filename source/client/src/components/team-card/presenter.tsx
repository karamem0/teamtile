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

import { EventHandler } from '../../types/common';
import { Item, ItemValue } from '../../types/state';
import { AvatarIcon } from '../avatar-icon';
import { ChannelMenuItem } from '../channel-menu-item';
import { DriveMenuItem } from '../drive-menu-item';
import { MemberMenuItem } from '../member-menu-item';
import { VisibilityIcon } from '../visibility-icon';

interface TeamCardProps {
  item: Item,
  onClick?: EventHandler<ItemValue | null> | undefined
}

export default React.memo(function TeamCard ({
  item,
  onClick
}: TeamCardProps): React.ReactElement | null {

  if (!item.visible) {
    return null;
  }

  switch (item.loading) {
    case true:
      return (
        <Skeleton animation="wave">
          <Card
            fluid
            role="listitem">
            <div
              css={css`
                display: grid;
                grid-template-columns: auto 1fr auto;
                grid-template-rows: auto;
                gap: 0.5rem;
                height: 4rem;
              `}>
              <Skeleton.Avatar size="larger" />
              <div
                css={css`
                  display: grid;
                  grid-template-columns: auto;
                  grid-template-rows: auto;
                  gap: 0.25rem;
                `}>
                <Skeleton.Line width="50%" />
                <Skeleton.Line />
                <Skeleton.Line />
              </div>
            </div>
          </Card>
        </Skeleton>
      );
    case false: {
      if (!item.value) {
        throw new Error(`The value should not be null: key: ${item.key}`);
      }
      return (
        <Card
          fluid
          role="listitem">
          <div
            css={css`
              display: grid;
              grid-template-columns: auto 1fr auto;
              grid-template-rows: auto;
              gap: 0.5rem;
              height: 4rem;
            `}>
            <AvatarIcon
              icon={item.value.icon}
              name={item.value.displayName}
              size="larger" />
            <div
              css={css`
                display: grid;
                grid-template-columns: auto;
                grid-template-rows: auto;
                gap: 0.25rem;
              `}>
              <Text
                css={css`
                  cursor: pointer;
                `}
                role="button"
                onClick={(event: React.SyntheticEvent) => onClick && onClick(event, item.value)}>
                {item.value.displayName}
              </Text>
              <div
                css={css`
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                `}>
                <Text size="small">
                  {item.value.description}
                </Text>
              </div>
              <div
                css={css`
                  display: grid;
                  grid-template-columns: auto auto auto;
                  grid-template-rows: auto;
                  gap: 1rem;
                  align-items: center;
                  justify-content: left;
                `}>
                <ChannelMenuItem
                  itemKey={item.key}
                  itemValue={item.value} />
                <MemberMenuItem
                  itemKey={item.key}
                  itemValue={item.value} />
                <DriveMenuItem
                  itemKey={item.key}
                  itemValue={item.value} />
              </div>
            </div>
            <VisibilityIcon visibility={item.value.visibility} />
          </div>
        </Card>
      );
    }
    default:
      return null;
  }

});
