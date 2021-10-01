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
// Contexts
import { useReducerContext } from '../contexts/reducer-context';

export interface DriveMenuItemProps {
  index: number
}

export const DriveMenuItem = ({ index }: DriveMenuItemProps): React.ReactElement | null => {

  const { store } = useReducerContext();

  const value = store?.values && store.values[index].drive;

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
    <DriveMenuItemPresenterMemo onClick={handleClick} />
  );

};

interface DriveMenuItemPresenterProps {
  onClick?: () => void
}

const DriveMenuItemPresenter = ({ onClick }: DriveMenuItemPresenterProps): React.ReactElement | null => {

  return (
    <div className="card-menu-item">
      <Text
        className="card-menu-item-content"
        color="brand"
        role="button"
        onClick={() => onClick && onClick()}>
        <SharepointLogoIcon className="card-menu-item-icon" />
      </Text>
    </div>
  );

};

const DriveMenuItemPresenterMemo = React.memo(DriveMenuItemPresenter);
