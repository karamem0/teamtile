//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { ContextMenuIcon } from '@fluentui/react-icons-mdl2';
import {
  List,
  Text
} from '@fluentui/react-northstar';

import { app } from '@microsoft/teams-js';

import { css } from '@emotion/react';

import { KeyValue } from '../types/common';
import { Channel } from '../types/entity';
import { ItemKey, ItemValue } from '../types/state';

import { CardMenuItem } from './card-menu-item';
import { CardPopup } from './card-popup';
import { MembershipIcon } from './membership-icon';

export interface ChannelMenuItemProps {
  item: KeyValue<ItemKey, ItemValue>
}

export const ChannelMenuItem = ({ item }: ChannelMenuItemProps): React.ReactElement | null => {

  if (!item.value.channels) {
    return null;
  }

  return (
    <ChannelMenuItemPresenterMemo
      channels={item.value.channels}
      onClick={(value) => app.openLink(value)} />
  );

};

interface ChannelMenuItemPresenterProps {
  channels: Channel[],
  onClick: (value: string) => void
}

const ChannelMenuItemPresenter = ({
  channels,
  onClick
}: ChannelMenuItemPresenterProps): React.ReactElement | null => {

  return (
    <CardPopup
      predicate={(filter, value) => {
        if (value.displayName) {
          if (value.displayName.search(new RegExp(filter, 'i')) >= 0) {
            return true;
          }
        }
        return false;
      }}
      renderer={(values) => (
        <List
          items={
            values.map((value) => ({
              key: value.id,
              header: (
                <Text
                  css={css`
                    display: grid;
                    grid-template-columns: auto auto;
                    gap: 0.25rem;
                    align-items: center;
                    justify-content: left;
                    margin: 0 -0.5rem 0 -0.5rem;
                  `}
                  role="button"
                  onClick={() => value.webUrl && onClick(value.webUrl)}>
                  <Text truncated>
                    {value.displayName}
                  </Text>
                  <MembershipIcon membership={value.membershipType} />
                </Text>
              )
            }))
          }
          navigable />
      )}
      trigger={
        <CardMenuItem
          content={channels.length}
          icon={<ContextMenuIcon />} />
      }
      values={channels} />
  );

};

const ChannelMenuItemPresenterMemo = React.memo(ChannelMenuItemPresenter);
