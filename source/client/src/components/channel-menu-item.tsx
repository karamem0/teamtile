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
// Contexts
import { useReducerContext } from '../contexts/reducer-context';
// Types
import { Channel } from '../types/entity';

export interface ChannelMenuItemProps {
  index: number
}

export const ChannelMenuItem = ({ index }: ChannelMenuItemProps): React.ReactElement | null => {

  const { store } = useReducerContext();

  const values = store?.values && store.values[index].channels;

  const handleClick = React.useCallback((value: Channel) => {
    if (!value.webUrl) {
      return;
    }
    microsoftTeams.executeDeepLink(value.webUrl);
  }, []);

  if (!values) {
    return null;
  }

  return (
    <ChannelMenuItemPresenterMemo
      values={values}
      onClick={handleClick} />
  );

};

interface ChannelMenuItemPresenterProps {
  values: Channel[],
  onClick?: (value: Channel) => void
}

const ChannelMenuItemPresenter = ({ values, onClick }: ChannelMenuItemPresenterProps): React.ReactElement | null => {

  return (
    <div className="card-menu-item">
      <Popup
        content={
          <div className="card-popup-menu">
            <List
              items={
                values.map((value, index) => ({
                  key: index,
                  header: (
                    <Text
                      className="card-popup-menu-item"
                      role="button"
                      onClick={() => onClick && onClick(value)}>
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
              {values.length}
            </Text>
          </Text>
        } />
    </div>
  );

};

const ChannelMenuItemPresenterMemo = React.memo(ChannelMenuItemPresenter);
