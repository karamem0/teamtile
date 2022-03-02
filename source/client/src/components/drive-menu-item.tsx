//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { SharepointLogoIcon } from '@fluentui/react-icons-mdl2-branded';

import { app } from '@microsoft/teams-js';

import { KeyValue } from '../types/common';
import { Drive } from '../types/entity';
import { ItemKey, ItemValue } from '../types/state';

import { CardMenuItem } from './card-menu-item';

export interface DriveMenuItemProps {
  item: KeyValue<ItemKey, ItemValue>
}

export const DriveMenuItem = ({ item }: DriveMenuItemProps): React.ReactElement | null => {

  if (!item.value.drive) {
    return null;
  }

  return (
    <DriveMenuItemPresenterMemo
      drive={item.value.drive}
      onClick={(value) => app.openLink(value)} />
  );

};

interface DriveMenuItemPresenterProps {
  drive: Drive,
  onClick: (value: string) => void
}

const DriveMenuItemPresenter = ({
  drive,
  onClick
}: DriveMenuItemPresenterProps): React.ReactElement | null => {

  return (
    <CardMenuItem
      icon={<SharepointLogoIcon />}
      onClick={() => drive.webUrl && onClick(drive.webUrl)} />
  );

};

const DriveMenuItemPresenterMemo = React.memo(DriveMenuItemPresenter);
