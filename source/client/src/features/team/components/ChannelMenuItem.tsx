//
// Copyright (c) 2021-2025 karamem0
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
import { Channel } from '../../../types/Entity';
import { Event } from '../../../types/Event';
import { app } from '@microsoft/teams-js';
import { getChannels } from '../managers/TeamManager';
import { search } from '../../../utils/String';

import Presenter from './ChannelMenuItem.presenter';

interface ChannelMenuItemProps {
  id?: string
}

function ChannelMenuItem(props: Readonly<ChannelMenuItemProps>) {

  const { id } = props;

  const dispatchError = useError();
  const [ state, fetch ] = useAsyncFn((teamId: string) => getChannels(teamId));

  const [ values, setValues ] = React.useState<Channel[]>();
  const [ filter, setFilter ] = React.useState<string>();

  useDebounce(() => {
    setValues(state.value?.filter((item) => search(item.displayName, filter)));
  }, 500, [
    state.value,
    filter
  ]);

  const handleClick = React.useCallback((_: Event, data?: Channel) => {
    if (data?.webUrl == null) {
      return;
    }
    app.openLink(data.webUrl);
  }, []);

  const handleFilterChange = React.useCallback((_: Event, data?: string) => {
    setFilter(data);
  }, []);

  const handleOpenChange = React.useCallback(async (_: Event, data?: boolean) => {
    if (!(data ?? false)) {
      return;
    }
    if (id == null) {
      return;
    }
    setFilter('');
    await fetch(id);
  }, [
    id,
    fetch
  ]);

  React.useEffect(() => {
    if (state.error == null) {
      return;
    }
    dispatchError(state.error);
  }, [
    state.error,
    dispatchError
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
