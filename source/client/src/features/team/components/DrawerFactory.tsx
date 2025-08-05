//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useDrawer } from '../../../common/providers/DrawerProvider';

import Presenter from './DrawerFactory.presenter';

function DrawerFactory() {

  const { drawer } = useDrawer();

  return (
    <Presenter {...drawer} />
  );

}

export default DrawerFactory;
