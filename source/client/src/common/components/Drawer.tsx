//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { EventHandler } from '../../types/Event';

import Presenter from './Drawer.presenter';

interface DrawerProps {
  loading?: boolean,
  open?: boolean,
  title?: React.ReactNode,
  onOpenChange?: EventHandler<boolean>
}

function Drawer(props: Readonly<React.PropsWithChildren<DrawerProps>>) {

  const {
    children,
    loading,
    open,
    title,
    onOpenChange
  } = props;

  return (
    <Presenter
      loading={loading}
      open={open}
      title={title}
      onOpenChange={onOpenChange}>
      {children}
    </Presenter>
  );

}

export default Drawer;
