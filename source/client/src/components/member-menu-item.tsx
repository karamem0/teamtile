//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Microsoft Teams
import * as microsoftTeams from '@microsoft/teams-js';
// Fluent UI
import {
  List,
  Popup,
  Text
} from '@fluentui/react-northstar';
import { GroupIcon } from '@fluentui/react-icons-mdl2';
// Components
import { MemberIcon } from './member-icon';
import { MenuItemFilter } from './menu-item-filter';
// Hooks
import { useMemberIcons } from '../hooks/use-member-icons';
// Types
import { Icon, Member } from '../types/entity';
import { ItemKey, ItemValue } from '../types/reducer';

export interface MemberMenuItemProps {
  itemKey: ItemKey,
  itemValue: ItemValue
}

export const MemberMenuItem = ({ itemKey, itemValue }: MemberMenuItemProps): React.ReactElement | null => {

  const [ getMemberIcons, dispatchMemberIcons ] = useMemberIcons();

  const handleClick = React.useCallback((value: string | null | undefined) => {
    if (!value) {
      return;
    }
    microsoftTeams.executeDeepLink(`https://teams.microsoft.com/l/chat/0/0?users=${value}`);
  }, []);

  const handleOpenChange = React.useCallback(() => {
    (async () => {
      if (!itemValue?.members) {
        return;
      }
      const icons = await getMemberIcons(itemValue.members
        .map(member => member.userId)
        .filter((key): key is Exclude<typeof key, null | undefined> => Boolean(key)));
      if (!icons) {
        return;
      }
      await dispatchMemberIcons(itemKey, icons);
    })();
  }, [
    itemKey,
    itemValue,
    getMemberIcons,
    dispatchMemberIcons
  ]);

  if (!itemValue?.members) {
    return null;
  }

  return (
    <MemberMenuItemPresenterMemo
      members={itemValue.members}
      onClick={handleClick}
      onOpenChange={handleOpenChange} />
  );

};

interface MemberMenuItemPresenterProps {
  members: Member[],
  onClick?: (value: string | null | undefined) => void,
  onOpenChange?: () => void
}

const MemberMenuItemPresenter = ({
  members,
  onClick,
  onOpenChange
}: MemberMenuItemPresenterProps): React.ReactElement | null => {

  return (
    <div className="card-menu-item">
      <Popup
        content={
          <div className="card-popup-menu">
            <MenuItemFilter
              renderer={(members: (Member & Icon)[]) => (
                <List
                  items={
                    members.map((value) => ({
                      key: value.id,
                      header: (
                        <Text
                          className="card-popup-menu-item"
                          role="button"
                          onClick={() => onClick && onClick(value.email)}>
                          <MemberIcon
                            icon={value.icon}
                            name={value.displayName} />
                          <Text
                            className="card-popup-menu-item-text"
                            truncated>
                            {value.displayName}
                          </Text>
                        </Text>
                      )
                    }))
                  }
                  navigable />
              )}
              values={members} />
          </div>
        }
        trigger={
          <Text
            className="card-menu-item-content"
            color="brand"
            role="button">
            <GroupIcon className="card-menu-item-icon" />
            <Text
              className="card-menu-item-text"
              size="small">
              {members.length}
            </Text>
          </Text>
        }
        onOpenChange={(_, props) =>
          props?.open &&
          onOpenChange &&
          onOpenChange()} />
    </div>
  );

};

const MemberMenuItemPresenterMemo = React.memo(MemberMenuItemPresenter);
