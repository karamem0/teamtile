//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { app } from '@microsoft/teams-js';

import { Channel } from '../../types/entity';
import { ItemKey, ItemValue } from '../../types/state';

import Presenter from './presenter';

interface ChannelMenuItemProps {
  itemKey: ItemKey,
  itemValue: ItemValue
}

export default function ChannelMenuItem ({
  itemValue
}: ChannelMenuItemProps): React.ReactElement | null {

  const handleClick = React.useCallback((_, data: Channel | undefined) => {
    if (!data?.webUrl) {
      return;
    }
    app.openLink(data.webUrl);
  }, []);

  if (!itemValue.channels) {
    return null;
  }

  return (
    <Presenter
      channels={itemValue.channels}
      onClick={handleClick} />
  );

}
