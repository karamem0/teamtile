//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Card, Text } from '@fluentui/react-northstar';

import { app } from '@microsoft/teams-js';

import { css } from '@emotion/react';

import { KeyValue } from '../types/common';
import {
  Item,
  ItemKey,
  ItemValue
} from '../types/state';

import { ChannelMenuItem } from './channel-menu-item';
import { DriveMenuItem } from './drive-menu-item';
import { MemberMenuItem } from './member-menu-item';
import { TeamIcon } from './team-icon';
import { VisibilityIcon } from './visibility-icon';

export interface TeamCardProps {
  item: Item
}

export const TeamCard = ({ item }: TeamCardProps): React.ReactElement | null => {

  if (!item.value) {
    return null;
  }

  if (!item.visible) {
    return null;
  }

  return (
    <TeamCardPresenterMemo
      item={{
        key: item.key,
        value: item.value
      }}
      onClick={(value) => app.openLink(value)} />
  );

};

interface TeamCardPresenterProps {
  item: KeyValue<ItemKey, ItemValue>,
  onClick: (value: string) => void
}

const TeamCardPresenter = ({
  item,
  onClick
}: TeamCardPresenterProps): React.ReactElement | null => {

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
        <TeamIcon
          icon={item.value.icon}
          name={item.value.displayName} />
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
            onClick={() => item.value.webUrl && onClick(item.value.webUrl)}>
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
            <ChannelMenuItem item={item} />
            <MemberMenuItem item={item} />
            <DriveMenuItem item={item} />
          </div>
        </div>
        <VisibilityIcon visibility={item.value.visibility} />
      </div>
    </Card>
  );

};

const TeamCardPresenterMemo = React.memo(TeamCardPresenter);
