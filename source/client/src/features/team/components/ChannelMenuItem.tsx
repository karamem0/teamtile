//
// Copyright (c) 2022 karamem0
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

import { InputProps } from '@fluentui/react-northstar';

import { app } from '@microsoft/teams-js';

import { Channel } from '../../../types/Entity';
import { Item } from '../../../types/Store';
import { search } from '../../../utils/String';
import { getChannels } from '../managers/TeamManager';

import Presenter from './ChannelMenuItem.presenter';

interface ChannelMenuItemProps {
  item?: Item
}

function ChannelMenuItem(props: ChannelMenuItemProps) {

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

  const handleClick = React.useCallback((_, data?: Channel) => {
    if (!data?.webUrl) {
      return;
    }
    app.openLink(data.webUrl);
  }, []);

  const handleFilterChange = React.useCallback((_, data?: InputProps & { value: string }) => {
    setFilter(data?.value);
  }, []);

  const handleOpenChange = React.useCallback(async (_, data?: boolean) => {
    if (!data) {
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
