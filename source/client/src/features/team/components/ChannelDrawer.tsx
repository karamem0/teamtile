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
import { useDrawer } from '../../../common/providers/DrawerProvider';

import Presenter from './ChannelDrawer.presenter';

interface ChannelDrawerProps {
  id?: string
}

function ChannelDrawer(props: Readonly<ChannelDrawerProps>) {

  const { id } = props;

  const dispatchError = useError();
  const { setDrawer } = useDrawer();
  const [ state, fetch ] = useAsyncFn((teamId: string) => getChannels(teamId));

  const [ open, setOpen ] = React.useState<boolean>(false);
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

  const handleOpenChange = React.useCallback((_: Event, data?: boolean) => {
    if (data ?? false) {
      return;
    }
    setDrawer({});
    setFilter('');
    setValues([]);
  }, [
    setDrawer
  ]);

  React.useEffect(() => {
    (async () => {
      if (id == null) {
        return;
      }
      setOpen(true);
      setFilter('');
      await fetch(id);
    })();
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
      open={open}
      onClick={handleClick}
      onFilterChange={handleFilterChange}
      onOpenChange={handleOpenChange} />
  );

}

export default ChannelDrawer;
