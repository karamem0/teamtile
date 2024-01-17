//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useReducer } from '../../../providers/ReducerProvider';
import { Event } from '../../../types/Event';
import { Item } from '../../../types/Store';
import { setPin } from '../managers/TeamManager';

import Presenter from './PinMenuItem.presenter';

interface PinMenuItemProps {
  item?: Item
}

function PinMenuItem(props: Readonly<PinMenuItemProps>) {

  const { item } = props;

  const { dispatchers } = useReducer();

  const handleClick = React.useCallback(async (_?: Event, data?: boolean) => {
    if (!item?.id) {
      return;
    }
    const pinned = data ?? false;
    setPin(item.id, pinned);
    dispatchers.setItem({
      ...item,
      pinned
    });
  }, [
    dispatchers,
    item
  ]);

  return (
    <Presenter
      pinned={item?.pinned}
      onClick={handleClick} />
  );

}

export default PinMenuItem;
