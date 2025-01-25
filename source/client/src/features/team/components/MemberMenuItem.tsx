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
import { Event } from '../../../types/Event';
import { Member } from '../../../types/Entity';
import Presenter from './MemberMenuItem.presenter';
import { app } from '@microsoft/teams-js';
import { getMembers } from '../managers/TeamManager';
import { search } from '../../../utils/String';

interface MemberMenuItemProps {
  id?: string
}

function MemberMenuItem(props: Readonly<MemberMenuItemProps>) {

  const { id } = props;

  const dispatchError = useError();
  const [ state, fetch ] = useAsyncFn((teamId: string) => getMembers(teamId));

  const [ values, setValues ] = React.useState<Member[]>();
  const [ filter, setFilter ] = React.useState<string>();

  useDebounce(() => {
    setValues(state.value?.filter((item) => search(item.displayName, filter)));
  }, 500, [
    state.value,
    filter
  ]);

  const handleClick = React.useCallback((_: Event, data?: Member) => {
    if (data?.email == null) {
      return;
    }
    app.openLink(`https://teams.microsoft.com/l/chat/0/0?users=${data.email}`);
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

export default MemberMenuItem;
