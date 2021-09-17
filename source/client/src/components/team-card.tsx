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
  Card,
  Skeleton,
  Text
} from '@fluentui/react-northstar';
// Components
import { ChannelMenuItem } from './channel-menu-item';
import { DriveMenuItem } from './drive-menu-item';
import { MemberMenuItem } from './member-menu-item';
import { TeamIcon } from './team-icon';
import { TeamVisibilityIcon } from './team-visibility-icon';
// Types
import {
  KeyValue,
  StateKey,
  StateValue
} from '../types/reducer';

export interface TeamCardProps {
  item: KeyValue<StateKey, StateValue | undefined>
}

export const TeamCard = ({ item }: TeamCardProps): React.ReactElement | null => {

  const { key, value } = item;

  const handleClick = React.useCallback(() => {
    if (!value?.webUrl) {
      return;
    }
    microsoftTeams.executeDeepLink(value.webUrl);
  }, [ value ]);

  if (!value) {
    return (
      <Skeleton animation="wave">
        <Card
          className="card"
          fluid>
          <div className="card-column">
            <div className="card-column-item">
              <Skeleton.Avatar size="larger" />
            </div>
            <div className="card-column-item">
              <div className="card-row">
                <div className="card-skelton">
                  <Skeleton.Line width="50%" />
                </div>
                <div className="card-skelton">
                  <Skeleton.Line />
                </div>
                <div className="card-skelton">
                  <Skeleton.Line />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Skeleton>
    );
  }

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
              onClick={handleClick}>
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
              <ChannelMenuItem item={{ key, value: value.channels }} />
              <MemberMenuItem item={{ key, value: value.members }} />
              <DriveMenuItem item={{ key, value: value.drive }} />
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
