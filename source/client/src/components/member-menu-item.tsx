//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { GroupIcon } from '@fluentui/react-icons-mdl2';
import {
  List,
  Text
} from '@fluentui/react-northstar';

import { app } from '@microsoft/teams-js';

import { css } from '@emotion/react';

import { useItemLoader } from '../hooks/use-item-loader';
import { KeyValue } from '../types/common';
import { Icon, Member } from '../types/entity';
import { ItemKey, ItemValue } from '../types/state';

import { CardMenuItem } from './card-menu-item';
import { CardPopup } from './card-popup';
import { MemberIcon } from './member-icon';

export interface MemberMenuItemProps {
  item: KeyValue<ItemKey, ItemValue>
}

export const MemberMenuItem = ({ item }: MemberMenuItemProps): React.ReactElement | null => {

  const { loadMemberIcons } = useItemLoader();

  if (!item.value.members) {
    return null;
  }

  return (
    <MemberMenuItemPresenterMemo
      members={item.value.members}
      onClick={(value) => app.openLink(`https://teams.microsoft.com/l/chat/0/0?users=${value}`)}
      onOpenChange={() => loadMemberIcons(item)} />
  );

};

interface MemberMenuItemPresenterProps {
  members: (Member & Icon)[],
  onClick: (value: string) => void,
  onOpenChange: () => void
}

const MemberMenuItemPresenter = ({
  members,
  onClick,
  onOpenChange
}: MemberMenuItemPresenterProps): React.ReactElement | null => {

  return (
    <CardPopup
      predicate={(filter, value) => {
        if (value.displayName) {
          if (value.displayName.search(new RegExp(filter, 'i')) >= 0) {
            return true;
          }
        }
        return false;
      }}
      renderer={(values) => (
        <List
          items={
            values.map((value) => ({
              key: value.id,
              header: (
                <Text
                  css={css`
                    display: grid;
                    grid-template-columns: auto auto;
                    gap: 0.25rem;
                    align-items: center;
                    justify-content: left;
                    margin: 0 -0.5rem 0 -0.5rem;
                  `}
                  role="button"
                  onClick={() => value.email && onClick(value.email)}>
                  <MemberIcon
                    icon={value.icon}
                    name={value.displayName} />
                  <Text truncated>
                    {value.displayName}
                  </Text>
                </Text>
              )
            }))
          }
          navigable />
      )}
      trigger={
        <CardMenuItem
          content={members.length}
          icon={<GroupIcon />} />
      }
      values={members}
      onOpenChange={(_, props) => props?.open && onOpenChange()} />
  );

};

const MemberMenuItemPresenterMemo = React.memo(MemberMenuItemPresenter);
