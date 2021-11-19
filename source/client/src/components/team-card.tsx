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
import { Card, Text } from '@fluentui/react-northstar';
// Components
import { ChannelMenuItem } from './channel-menu-item';
import { DriveMenuItem } from './drive-menu-item';
import { MemberMenuItem } from './member-menu-item';
import { TeamIcon } from './team-icon';
import { TeamVisibilityIcon } from './team-visibility-icon';
// Types
import {
  Item,
  ItemKey,
  ItemValue
} from '../types/reducer';

export interface TeamCardProps {
  item: Item
}

export const TeamCard = ({ item: { key, value, visible } }: TeamCardProps): React.ReactElement | null => {

  const handleClick = React.useCallback((value: string | null | undefined) => {
    if (!value) {
      return;
    }
    microsoftTeams.executeDeepLink(value);
  }, []);

  if (!value) {
    return null;
  }

  if (!visible) {
    return null;
  }

  return (
    <TeamCardPresenterMemo
      itemKey={key}
      itemValue={value}
      onClick={handleClick} />
  );

};

interface TeamCardPresenterProps {
  itemKey: ItemKey,
  itemValue: ItemValue,
  onClick?: (value: string | null | undefined) => void
}

const TeamCardPresenter = ({
  itemKey,
  itemValue,
  onClick
}: TeamCardPresenterProps): React.ReactElement | null => {

  return (
    <Card
      className="card"
      fluid
      role="listitem">
      <div className="card-fade-in">
        <div className="card-column">
          <div className="card-column-item">
            <TeamIcon
              icon={itemValue.icon}
              name={itemValue.displayName} />
          </div>
          <div className="card-column-item">
            <div className="card-row">
              <Text
                className="card-name"
                role="button"
                onClick={() => onClick && onClick(itemValue.webUrl)}>
                {itemValue.displayName}
              </Text>
              <div className="card-description">
                <Text size="small">
                  {itemValue.description}
                </Text>
              </div>
              <div className="card-menu">
                <ChannelMenuItem
                  itemKey={itemKey}
                  itemValue={itemValue} />
                <MemberMenuItem
                  itemKey={itemKey}
                  itemValue={itemValue} />
                <DriveMenuItem
                  itemKey={itemKey}
                  itemValue={itemValue} />
              </div>
            </div>
          </div>
          <div className="card-column-item">
            <TeamVisibilityIcon visibility={itemValue.visibility} />
          </div>
        </div>
      </div>
    </Card>
  );

};

const TeamCardPresenterMemo = React.memo(TeamCardPresenter);
