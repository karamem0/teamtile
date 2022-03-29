//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { PopupProps } from '@fluentui/react-northstar';

import { app } from '@microsoft/teams-js';

import { useItemLoader } from '../../hooks/use-item-loader';
import { MemberWithIcon } from '../../types/entity';
import {
  ItemKey,
  ItemValue
} from '../../types/state';

import Presenter from './presenter';

interface MemberMenuItemProps {
  itemKey: ItemKey,
  itemValue: ItemValue
}

export default function MemberMenuItem ({
  itemKey,
  itemValue
}: MemberMenuItemProps): React.ReactElement | null {

  const { loadMemberIcons } = useItemLoader();

  const handleClick = React.useCallback((_, data: MemberWithIcon | undefined) => {
    if (!data?.email) {
      return;
    }
    app.openLink(`https://teams.microsoft.com/l/chat/0/0?users=${data.email}`);
  }, []);

  const handleOpenChange = React.useCallback((_, data: PopupProps | undefined) => {
    if (!data?.open) {
      return;
    }
    loadMemberIcons({
      key: itemKey,
      value: itemValue
    });
  }, [
    itemKey,
    itemValue,
    loadMemberIcons
  ]);

  if (!itemValue.members) {
    return null;
  }

  return (
    <Presenter
      members={itemValue.members}
      onClick={handleClick}
      onOpenChange={handleOpenChange} />
  );

}
