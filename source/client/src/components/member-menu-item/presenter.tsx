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
  PopupProps,
  Text
} from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { EventHandler } from '../../types/common';
import { MemberWithIcon } from '../../types/entity';
import { AvatarIcon } from '../avatar-icon';
import { CardMenuItem } from '../card-menu-item';
import { CardPopup } from '../card-popup';

interface MemberMenuItemProps {
  members: MemberWithIcon[],
  onClick?: EventHandler<MemberWithIcon> | undefined,
  onOpenChange?: EventHandler<PopupProps> | undefined
}

export default React.memo(function MemberMenuItem ({
  members,
  onClick,
  onOpenChange
}: MemberMenuItemProps): React.ReactElement | null {

  return (
    <CardPopup<MemberWithIcon>
      items={members}
      predicate={(filter, item) => {
        if (item.displayName) {
          if (item.displayName.search(new RegExp(filter, 'i')) >= 0) {
            return true;
          }
        }
        return false;
      }}
      renderer={(items) => (
        <List
          items={
            items.map((item) => ({
              key: item.id,
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
                  onClick={(event: React.SyntheticEvent) => onClick && onClick(event, item)}>
                  <AvatarIcon
                    icon={item.icon}
                    name={item.displayName}
                    size="small" />
                  <Text truncated>
                    {item.displayName}
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
      onOpenChange={onOpenChange} />
  );

});
