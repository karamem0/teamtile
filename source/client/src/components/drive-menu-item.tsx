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
import { SharepointLogoIcon } from '@fluentui/react-icons-mdl2-branded';
import { Text } from '@fluentui/react-northstar';
// Types
import { KeyValue, StateKey } from '../types/reducer';
import { Drive } from '../types/entity';

export interface DriveMenuItemProps {
  item: KeyValue<StateKey, Drive | undefined>
}

export const DriveMenuItem = ({ item }: DriveMenuItemProps): React.ReactElement | null => {

  const { value } = item;

  const handleClick = React.useCallback(() => {
    if (!value?.webUrl) {
      return;
    }
    microsoftTeams.executeDeepLink(value.webUrl);
  }, [ value ]);

  return (
    <div className="card-menu-item">
      <Text
        className="card-menu-item-content"
        color="brand"
        role="button"
        onClick={handleClick}>
        <SharepointLogoIcon className="card-menu-item-icon" />
      </Text>
    </div>
  );

};
