//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { app } from '@microsoft/teams-js';

import { Drive } from '../../types/entity';
import { ItemKey, ItemValue } from '../../types/state';

import Presenter from './presenter';

interface DriveMenuItemProps {
  itemKey: ItemKey,
  itemValue: ItemValue
}

export default function DriveMenuItem ({
  itemValue
}: DriveMenuItemProps): React.ReactElement | null {

  const handleClick = React.useCallback((_, data: Drive | undefined) => {
    if (!data?.webUrl) {
      return;
    }
    app.openLink(data.webUrl);
  }, []);

  if (!itemValue.drive) {
    return null;
  }

  return (
    <Presenter
      drive={itemValue.drive}
      onClick={handleClick} />
  );

}
