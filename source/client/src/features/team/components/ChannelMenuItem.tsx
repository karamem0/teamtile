//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  useAsyncFn,
  useDebounce,
  useError
} from 'react-use';

import { app } from '@microsoft/teams-js';

import { Channel } from '../../../types/Entity';
import { Event } from '../../../types/Event';
import { Item } from '../../../types/Store';
import { search } from '../../../utils/String';
import { getChannels } from '../managers/TeamManager';

import Presenter from './ChannelMenuItem.presenter';

interface ChannelMenuItemProps {
  item?: Item
}

function ChannelMenuItem(props: Readonly<ChannelMenuItemProps>) {

  const { item } = props;

  const dispatchError = useError();
  const [ state, fetch ] = useAsyncFn((teamId: string) => getChannels(teamId));

  const [ values, setValues ] = React.useState<Channel[]>();
  const [ filter, setFilter ] = React.useState<string>();

  React.useEffect(() => {
    if (!state.error) {
      return;
    }
    dispatchError(state.error);
  }, [
    dispatchError,
    state.error
  ]);

  useDebounce(() => {
    setValues(state.value?.filter((item) => search(item.displayName, filter)));
  }, 500, [
    state.value,
    filter
  ]);

  const handleClick = React.useCallback((_?: Event, data?: Channel) => {
    if (!data?.webUrl) {
      return;
    }
    app.openLink(data.webUrl);
  }, []);

  const handleFilterChange = React.useCallback((_?: Event, data?: string) => {
    setFilter(data);
  }, []);

  const handleOpenChange = React.useCallback(async (_?: Event, data?: boolean) => {
    if (data == null) {
      return;
    }
    if (!item?.id) {
      return;
    }
    await fetch(item.id);
  }, [
    fetch,
    item
  ]);

  return (
    <Presenter
      items={values}
      loading={state.loading}
      onClick={handleClick}
      onFilterChange={handleFilterChange}
      onOpenChange={handleOpenChange} />
  );

}

export default ChannelMenuItem;
