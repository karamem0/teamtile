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
// Contexts
import { useReducerContext } from '../contexts/reducer-context';
// Hooks
import { useMemberIcons } from '../hooks/use-member-icons';
// Types
import { Icon, Member } from '../types/entity';

export interface MemberMenuItemProps {
  index: number
}

export const MemberMenuItem = ({ index }: MemberMenuItemProps): React.ReactElement | null => {

  const { store } = useReducerContext();
  const [ dispatchMemberIcons ] = useMemberIcons();

  const key = store?.keys && store.keys[index];
  const values = store?.values && store.values[index].members;

  const handleClick = React.useCallback((value: Member) => {
    if (!value.email) {
      return;
    }
    microsoftTeams.executeDeepLink(`https://teams.microsoft.com/l/chat/0/0?users=${value.email}`);
  }, []);

  const handleOpenChange = React.useCallback((open?: boolean) => {
    if (!key) {
      return;
    }
    if (!values) {
      return;
    }
    if (!open) {
      return;
    }
    (async () => {
      await dispatchMemberIcons(
        key,
        values
          .map((value) => value.userId)
          .filter((key): key is Exclude<typeof key, undefined> => Boolean(key))
      );
    })();
  }, [
    key,
    values,
    dispatchMemberIcons
  ]);

  if (!key) {
    return null;
  }

  if (!values) {
    return null;
  }

  return (
    <MemberMenuItemPresenterMemo
      values={values}
      onClick={handleClick}
      onOpenChange={handleOpenChange} />
  );

};

interface MemberMenuItemPresenterProps {
  values: (Member & Icon)[],
  onClick?: (value: Member) => void,
  onOpenChange?: (open?: boolean) => void
}

const MemberMenuItemPresenter = ({
  values,
  onClick,
  onOpenChange
}: MemberMenuItemPresenterProps): React.ReactElement | null => {

  return (
    <div className="card-menu-item">
      <Popup
        content={
          <div className="card-popup-menu">
            <MenuItemFilter
              renderer={(values: (Member & Icon)[]) => (
                <List
                  items={
                    values.map((value, index) => ({
                      key: index,
                      header: (
                        <Text
                          className="card-popup-menu-item"
                          role="button"
                          onClick={() => onClick && onClick(value)}>
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
              values={values} />
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
              {values.length}
            </Text>
          </Text>
        }
        onOpenChange={(_, props) => onOpenChange && onOpenChange(props?.open)} />
    </div>
  );

};

const MemberMenuItemPresenterMemo = React.memo(MemberMenuItemPresenter);
