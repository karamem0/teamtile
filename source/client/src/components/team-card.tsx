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
// Contexts
import { useReducerContext } from '../contexts/reducer-context';
// Types
import { StoreValue } from '../types/reducer';

export interface TeamCardProps {
  index: number
}

export const TeamCard = ({ index }: TeamCardProps): React.ReactElement | null => {

  const { store } = useReducerContext();

  const value = store?.values && store.values[index];

  const handleClick = React.useCallback(() => {
    if (!value?.webUrl) {
      return;
    }
    microsoftTeams.executeDeepLink(value.webUrl);
  }, [ value ]);

  if (!value) {
    return null;
  }

  return (
    <TeamCardPresenterMemo
      index={index}
      value={value}
      onClick={handleClick} />
  );

};

interface TeamCardPresenterProps {
  index: number,
  value: StoreValue,
  onClick?: () => void
}

const TeamCardPresenter = ({
  index,
  value,
  onClick
}: TeamCardPresenterProps): React.ReactElement | null => {

  return (
    <Card
      className="card"
      fluid
      role="listitem">
      <div className="card-column">
        <div className="card-column-item">
          <TeamIcon
            icon={value.icon}
            name={value.displayName} />
        </div>
        <div className="card-column-item">
          <div className="card-row">
            <Text
              className="card-name"
              role="button"
              onClick={() => onClick && onClick()}>
              {value.displayName}
            </Text>
            <div className="card-description">
              <Text
                size="small"
                truncated>
                {value.description}
              </Text>
            </div>
            <div className="card-menu">
              <ChannelMenuItem index={index} />
              <MemberMenuItem index={index} />
              <DriveMenuItem index={index} />
            </div>
          </div>
        </div>
        <div className="card-column-item">
          <TeamVisibilityIcon visibility={value.visibility} />
        </div>
      </div>
    </Card>
  );

};

const TeamCardPresenterMemo = React.memo(TeamCardPresenter);
