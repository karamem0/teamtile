//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  useAsyncFn,
  useError
} from 'react-use';
import { useDrawer } from '../../../common/providers/DrawerProvider';
import { Tag } from '../../../types/Entity';
import { Event } from '../../../types/Event';
import { getTags } from '../managers/TeamManager';

import Presenter from './TagDrawer.presenter';

interface TagDrawerProps {
  id?: string
}

function TagDrawer(props: Readonly<TagDrawerProps>) {

  const { id } = props;

  const dispatchError = useError();
  const { setDrawer } = useDrawer();
  const [ state, fetch ] = useAsyncFn((teamId: string) => getTags(teamId));

  const [ open, setOpen ] = React.useState<boolean>(false);
  const [ openItems, setOpenItems ] = React.useState<Tag[]>();

  const handleOpenChange = React.useCallback(async (_: Event, data?: boolean) => {
    if (data ?? false) {
      return;
    }
    setDrawer({});
    setOpenItems([]);
  }, [
    setDrawer
  ]);

  const handleToggle = React.useCallback(async (_: Event, data?: Tag[]) => {
    if (data == null) {
      return;
    }
    setOpenItems(data);
  }, []);

  React.useEffect(() => {
    (async () => {
      if (id == null) {
        return;
      }
      setOpen(true);
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
      id={id}
      items={state.value}
      loading={state.loading}
      open={open}
      openItems={openItems}
      onOpenChange={handleOpenChange}
      onToggle={handleToggle} />
  );

}

export default TagDrawer;
