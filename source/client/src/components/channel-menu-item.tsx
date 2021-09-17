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
import * as microsoftTeams from '@microsoft/teams-js';
// Fluent UI
import {
  List,
  Popup,
  Text
} from '@fluentui/react-northstar';
import { ContextMenuIcon } from '@fluentui/react-icons-mdl2';
// Types
import { KeyValue, StateKey } from '../types/reducer';
import { Channel } from '../types/entity';

export interface ChannelMenuItemProps {
  item: KeyValue<StateKey, Channel[] | undefined>
}

export const ChannelMenuItem = ({ item }: ChannelMenuItemProps): React.ReactElement | null => {

  const { value } = item;

  const handleClick = React.useCallback((channel: Channel) => {
    if (!channel.webUrl) {
      return;
    }
    microsoftTeams.executeDeepLink(channel.webUrl);
  }, []);

  return (
    <div className="card-menu-item">
      <Popup
        content={
          <div className="card-popup-menu">
            <List
              items={
                value?.map((channel) => ({
                  key: channel.id,
                  header: (
                    <Text
                      className="card-popup-menu-item"
                      role="button"
                      onClick={() => handleClick(channel)}>
                      <Text
                        className="card-popup-menu-item-text"
                        truncated>
                        {channel.displayName}
                      </Text>
                    </Text>
                  )
                }))
              }
              navigable />
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
              {value?.length}
            </Text>
          </Text>
        } />
    </div>
  );

};
