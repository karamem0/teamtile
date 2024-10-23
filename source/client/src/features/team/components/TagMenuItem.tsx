//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useAsyncFn, useError } from 'react-use';
import { Event } from '../../../types/Event';
import Presenter from './TagMenuItem.presenter';
import { Tag } from '../../../types/Entity';
import { getTags } from '../managers/TeamManager';

interface TagMenuItemProps {
  id?: string
}

function TagMenuItem(props: Readonly<TagMenuItemProps>) {

  const { id } = props;

  const [ openItems, setOpenItems ] = React.useState<Tag[]>();
  const dispatchError = useError();
  const [ state, fetch ] = useAsyncFn((teamId: string) => getTags(teamId));

  const handleOpenChange = React.useCallback(async (_: Event, data?: boolean) => {
    if (data == null) {
      return;
    }
    if (id == null) {
      return;
    }
    await fetch(id);
  }, [
    id,
    fetch
  ]);

  const handleToggle = React.useCallback(async (_: Event, data?: Tag[]) => {
    if (data == null) {
      return;
    }
    setOpenItems(data);
  }, []);

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
      id={id}
      items={state.value}
      loading={state.loading}
      openItems={openItems}
      onOpenChange={handleOpenChange}
      onToggle={handleToggle} />
  );

}

export default TagMenuItem;
