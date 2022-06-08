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

import { css } from '@emotion/react';

import { EventHandler } from '../../types/common';
import { Channel } from '../../types/entity';
import { CardMenuItem } from '../card-menu-item';
import { CardPopup } from '../card-popup';
import { MembershipIcon } from '../membership-icon';

interface ChannelMenuItemProps {
  channels: Channel[],
  onClick?: EventHandler<Channel> | undefined
}

export default React.memo(function ChannelMenuItem ({
  channels,
  onClick
}: ChannelMenuItemProps): React.ReactElement | null {

  return (
    <CardPopup<Channel>
      items={channels}
      predicate={(filter, item) => {
        if (item.displayName) {
          if (item.displayName.search(new RegExp(filter, 'i')) >= 0) {
            return true;
          }
        }
        return false;
      }}
      renderer={(items) => (
        <List
          items={
            items.map((item) => ({
              key: item.id,
              header: (
                <Text
                  css={css`
                    display: grid;
                    grid-template-columns: auto auto;
                    gap: 0.25rem;
                    align-items: center;
                    justify-content: left;
                    margin: 0 -0.5rem;
                  `}
                  role="button"
                  onClick={(event: React.SyntheticEvent) => onClick && onClick(event, item)}>
                  <Text truncated>
                    {item.displayName}
                  </Text>
                  <MembershipIcon membership={item.membershipType} />
                </Text>
              )
            }))
          }
          navigable />
      )}
      trigger={
        <CardMenuItem
          content={channels.length}
          icon={
            <ContextMenuIcon
              css={css`
                width: 1rem;
                height: 1rem;
              `} />
          } />
      } />
  );

});
