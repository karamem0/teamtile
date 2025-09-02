//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import ChannelDrawer from './ChannelDrawer';
import { DrawerType } from '../../../types/Drawer';
import MemberDrawer from './MemberDrawer';
import TagDrawer from './TagDrawer';

interface DrawerFactoryProps {
  data?: unknown,
  type?: DrawerType
}

function DrawerFactory(props: Readonly<DrawerFactoryProps>) {

  const {
    data,
    type
  } = props;

  switch (type) {
    case 'channel':
      return (
        <ChannelDrawer id={data as string} />
      );
    case 'member':
      return (
        <MemberDrawer id={data as string} />
      );
    case 'tag':
      return (
        <TagDrawer id={data as string} />
      );
    default:
      return null;
  }

}

export default React.memo(DrawerFactory);
