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
  PopupProps,
  Text
} from '@fluentui/react-northstar';
import { GroupIcon } from '@fluentui/react-icons-mdl2';
// Components
import { MemberIcon } from './member-icon';
// Hooks
import { useMemberIcons } from '../hooks/use-member-icons';
// Types
import { Icon, Member } from '../types/entity';
import { KeyValue, StateKey } from '../types/reducer';

export interface MemberMenuItemProps {
  item: KeyValue<StateKey, (Member & Icon)[] | undefined>
}

export const MemberMenuItem = ({ item }: MemberMenuItemProps): React.ReactElement | null => {

  const { key, value } = item;
  const [ getMemberIcons ] = useMemberIcons();

  const handleClick = React.useCallback((member: Member) => {
    if (!member.email) {
      return;
    }
    microsoftTeams.executeDeepLink(`https://teams.microsoft.com/l/chat/0/0?users=${member.email}`);
  }, []);

  const handleOpenChange = React.useCallback((_, props?: PopupProps) => {
    if (!key) {
      return;
    }
    if (!value) {
      return;
    }
    if (!props?.open) {
      return;
    }
    (async () => {
      await getMemberIcons(
        key,
        value
          .map((member) => member.userId)
          .filter((key): key is Exclude<typeof key, undefined> => Boolean(key))
      );
    })();
  }, [
    key,
    value,
    getMemberIcons
  ]);

  return (
    <div className="card-menu-item">
      <Popup
        content={
          <div className="card-popup-menu">
            <List
              items={
                value?.map((member) => ({
                  key: member.id,
                  header: (
                    <Text
                      className="card-popup-menu-item"
                      role="button"
                      onClick={() => handleClick(member)}>
                      <MemberIcon
                        icon={member.icon}
                        name={member.displayName} />
                      <Text
                        className="card-popup-menu-item-text"
                        truncated>
                        {member.displayName}
                      </Text>
                    </Text>
                  )
                }))
              }
              navigable />
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
              {value?.length}
            </Text>
          </Text>
        }
        onOpenChange={handleOpenChange} />
    </div>
  );

};
