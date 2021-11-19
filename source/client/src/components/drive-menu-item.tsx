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
import { ItemKey, ItemValue } from '../types/reducer';
import { Drive } from '../types/entity';

export interface DriveMenuItemProps {
  itemKey: ItemKey,
  itemValue: ItemValue
}

export const DriveMenuItem = ({ itemValue }: DriveMenuItemProps): React.ReactElement | null => {

  const handleClick = React.useCallback((value: string | null | undefined) => {
    if (!value) {
      return;
    }
    microsoftTeams.executeDeepLink(value);
  }, []);

  if (!itemValue?.drive) {
    return null;
  }

  return (
    <DriveMenuItemPresenterMemo
      drive={itemValue.drive}
      onClick={handleClick} />
  );

};

interface DriveMenuItemPresenterProps {
  drive: Drive,
  onClick?: (value: string | null | undefined) => void
}

const DriveMenuItemPresenter = ({
  drive,
  onClick
}: DriveMenuItemPresenterProps): React.ReactElement | null => {

  return (
    <div className="card-menu-item">
      <Text
        className="card-menu-item-content"
        color="brand"
        role="button"
        onClick={() => onClick && onClick(drive.webUrl)}>
        <SharepointLogoIcon className="card-menu-item-icon" />
      </Text>
    </div>
  );

};

const DriveMenuItemPresenterMemo = React.memo(DriveMenuItemPresenter);
