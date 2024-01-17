//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useAsyncFn, useError } from 'react-use';

import { app } from '@microsoft/teams-js';

import { Item } from '../../../types/Store';
import { getDrive } from '../managers/TeamManager';

import Presenter from './DriveMenuItem.presenter';

interface DriveMenuItemProps {
  item?: Item
}

function DriveMenuItem(props: Readonly<DriveMenuItemProps>) {

  const { item } = props;

  const dispatchError = useError();
  const [ state, fetch ] = useAsyncFn((teamId: string) => getDrive(teamId));

  React.useEffect(() => {
    if (!state.error) {
      return;
    }
    dispatchError(state.error);
  }, [
    dispatchError,
    state.error
  ]);

  const handleClick = React.useCallback(async () => {
    if (!item?.id) {
      return;
    }
    const value = await fetch(item.id);
    if (value?.webUrl) {
      app.openLink(value.webUrl);
    }
  }, [
    fetch,
    item
  ]);

  return (
    <Presenter onClick={handleClick} />
  );

}

export default DriveMenuItem;
