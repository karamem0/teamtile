//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useStore } from '../../../providers/StoreProvider';
import { togglePin } from '../../../stores/Action';
import { setPin } from '../managers/TeamManager';

import Presenter from './PinMenuItem.presenter';

interface PinMenuItemProps {
  id?: string,
  pinned?: boolean
}

function PinMenuItem(props: Readonly<PinMenuItemProps>) {

  const {
    id,
    pinned
  } = props;

  const { dispatch } = useStore();

  const handleClick = React.useCallback(async () => {
    if (id == null) {
      return;
    }
    setPin(id, !pinned);
    dispatch(togglePin(id));
  }, [
    id,
    pinned,
    dispatch
  ]);

  return (
    <Presenter
      pinned={pinned}
      onClick={handleClick} />
  );

}

export default PinMenuItem;
