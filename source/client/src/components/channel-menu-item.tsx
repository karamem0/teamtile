//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Microsoft Teams
import { core } from '@microsoft/teams-js';
// Fluent UI
import {
  List,
  Popup,
  Text
} from '@fluentui/react-northstar';
import { ContextMenuIcon } from '@fluentui/react-icons-mdl2';
// Components
import { ChannelMenuItemFilter } from './channel-menu-item-filter';
// Types
import { ItemKey, ItemValue } from '../types/state';
import { Channel } from '../types/entity';

export interface ChannelMenuItemProps {
  itemKey: ItemKey,
  itemValue: ItemValue
}

export const ChannelMenuItem = ({ itemValue: { channels } }: ChannelMenuItemProps): React.ReactElement | null => {

  const handleClick = React.useCallback((value: string | null | undefined) => {
    if (!value) {
      return;
    }
    core.executeDeepLink(value);
  }, []);

  if (!channels) {
    return null;
  }

  return (
    <ChannelMenuItemPresenterMemo
      channels={channels}
      onClick={handleClick} />
  );

};

interface ChannelMenuItemPresenterProps {
  channels: Channel[],
  onClick?: (value: string | null | undefined) => void
}

const ChannelMenuItemPresenter = ({
  channels,
  onClick
}: ChannelMenuItemPresenterProps): React.ReactElement | null => {

  return (
    <div className="card-menu-item">
      <Popup
        content={
          <div className="card-popup-menu">
            <ChannelMenuItemFilter
              renderer={(channels: Channel[]) => (
                <List
                  items={
                    channels.map((value) => ({
                      key: value.id,
                      header: (
                        <Text
                          className="card-popup-menu-item"
                          role="button"
                          onClick={() => onClick && onClick(value.webUrl)}>
                          <Text
                            className="card-popup-menu-item-text"
                            truncated>
                            {value.displayName}
                          </Text>
                        </Text>
                      )
                    }))
                  }
                  navigable />
              )}
              values={channels} />
          </div>
        }
        trigger={
          <Text
            className="card-menu-item-content"
            color="brand"
            role="button">
            <ContextMenuIcon className="card-menu-item-icon" />
            <Text
              className="card-menu-item-text"
              size="small">
              {channels.length}
            </Text>
          </Text>
        } />
    </div>
  );

};

const ChannelMenuItemPresenterMemo = React.memo(ChannelMenuItemPresenter);
