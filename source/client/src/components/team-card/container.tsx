//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { app } from '@microsoft/teams-js';

import { Item, ItemValue } from '../../types/state';

import Presenter from './presenter';

export interface TeamCardProps {
  item: Item
}

export default function TeamCard ({ item }: TeamCardProps): React.ReactElement | null {

  const handleClick = React.useCallback((_, value: ItemValue | null | undefined) => {
    if (!value?.webUrl) {
      return;
    }
    app.openLink(value.webUrl);
  }, []);

  return (
    <Presenter
      item={item}
      onClick={handleClick} />
  );

}
