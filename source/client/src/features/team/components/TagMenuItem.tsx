//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useDrawer } from '../../../common/providers/DrawerProvider';

import Presenter from './TagMenuItem.presenter';

interface TagMenuItemProps {
  id?: string
}

function TagMenuItem(props: Readonly<TagMenuItemProps>) {

  const { id } = props;

  const { setDrawer } = useDrawer();

  const handleClick = React.useCallback(() => {
    setDrawer({
      data: id,
      type: 'tag'
    });
  }, [
    id,
    setDrawer
  ]);

  return (
    <Presenter onClick={handleClick} />
  );

}

export default TagMenuItem;
