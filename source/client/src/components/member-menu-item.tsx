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
import { core } from '@microsoft/teams-js';
// Fluent UI
import {
  List,
  Popup,
  Text
} from '@fluentui/react-northstar';
import { GroupIcon } from '@fluentui/react-icons-mdl2';
// Components
import { MemberIcon } from './member-icon';
import { MemberMenuItemFilter } from './member-menu-item-filter';
// Contexts
import { useReducerContext } from '../contexts/reducer-context';
// Hooks
import { useMemberIcons } from '../hooks/use-member-icons';
// Types
import { Icon, Member } from '../types/entity';
import { ItemKey, ItemValue } from '../types/state';

export interface MemberMenuItemProps {
  itemKey: ItemKey,
  itemValue: ItemValue
}

export const MemberMenuItem = ({ itemKey, itemValue: { members } }: MemberMenuItemProps): React.ReactElement | null => {

  const { dispatchMemberIcons } = useReducerContext();
  const [ getMemberIcons ] = useMemberIcons();

  const handleClick = React.useCallback((value: string | null | undefined) => {
    if (!value) {
      return;
    }
    core.executeDeepLink(`https://teams.microsoft.com/l/chat/0/0?users=${value}`);
  }, []);

  const handleOpenChange = React.useCallback(() => {
    if (!members) {
      return;
    }
    (async () => {
      dispatchMemberIcons({
        key: itemKey,
        value: await getMemberIcons(members
          .map(member => member.userId)
          .filter((key): key is Exclude<typeof key, null | undefined> => Boolean(key)))
      });
    })();
  }, [
    itemKey,
    members,
    getMemberIcons,
    dispatchMemberIcons
  ]);

  if (!members) {
    return null;
  }

  return (
    <MemberMenuItemPresenterMemo
      members={members}
      onClick={handleClick}
      onOpenChange={handleOpenChange} />
  );

};

interface MemberMenuItemPresenterProps {
  members: (Member & Icon)[],
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
            <MemberMenuItemFilter
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
