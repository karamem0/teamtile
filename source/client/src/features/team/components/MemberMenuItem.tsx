//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useDrawer } from '../../../common/providers/DrawerProvider';

import Presenter from './MemberMenuItem.presenter';

interface MemberMenuItemProps {
  id?: string
}

function MemberMenuItem(props: Readonly<MemberMenuItemProps>) {

  const { id } = props;

  const { setDrawer } = useDrawer();

  const handleClick = React.useCallback(() => {
    setDrawer({
      data: id,
      type: 'member'
    });
  }, [
    id,
    setDrawer
  ]);

  return (
    <Presenter onClick={handleClick} />
  );

}

export default MemberMenuItem;
