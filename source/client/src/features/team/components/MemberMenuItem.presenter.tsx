//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  Button,
  Input,
  Text
} from '@fluentui/react-components';
import { Event, EventHandler } from '../../../types/Event';
import { GroupIcon, SearchIcon } from '@fluentui/react-icons-mdl2';
import AvatarIcon from './AvatarIcon';
import CardMenuItem from './CardMenuItem';
import { Member } from '../../../types/Entity';
import SidePanel from '../../../common/components/SidePanel';
import { css } from '@emotion/react';
import messages from '../messages';
import { useIntl } from 'react-intl';
import { useTheme } from '../../../providers/ThemeProvider';

interface MemberMenuItemProps {
  items?: Member[],
  loading?: boolean,
  onClick?: EventHandler<Member>,
  onFilterChange?: EventHandler<string>,
  onOpenChange?: EventHandler<boolean>
}

function MemberMenuItem(props: Readonly<MemberMenuItemProps>) {

  const {
    items,
    loading,
    onClick,
    onFilterChange,
    onOpenChange
  } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  return (
    <SidePanel
      loading={loading}
      title={intl.formatMessage(messages.Members)}
      content={
        items ? (
          <div
            css={css`
              display: flex;
              flex-flow: column;
              grid-gap: 0.5rem;
            `}>
            <Input
              contentBefore={<SearchIcon />}
              onChange={(e, data) => onFilterChange?.(e, data.value)} />
            <div
              css={css`
                display: flex;
                flex-flow: column;
                grid-gap: 0.5rem;
                height: calc(100vh - 8rem);
                overflow: auto;
              `}>
              {
                items.map((item) => (
                  <Text
                    key={item.id}
                    role="button"
                    css={css`
                      display: grid;
                      grid-template-columns: auto auto;
                      grid-gap: 0.5rem;
                      align-items: center;
                      justify-content: left;
                      padding: 0.5rem;
                      &:hover {
                        background-color: ${theme.colorNeutralBackground1Hover};
                      }
                    `}
                    onClick={(e: Event) => onClick?.(e, item)}>
                    <AvatarIcon
                      icon={item.icon}
                      name={item.displayName}
                      size={24} />
                    <Text truncate>
                      {item.displayName}
                    </Text>
                  </Text>
                ))
              }
            </div>
          </div>
        ) : null
      }
      renderer={
        ({ onOpenChange }) => (
          <CardMenuItem tooltip={intl.formatMessage(messages.ViewMembers)}>
            <Button
              appearance="transparent"
              icon={(
                <GroupIcon
                  css={css`
                    width: 1rem;
                    height: 1rem;
                  `} />
              )}
              onClick={(e) => onOpenChange?.(e, true)} />
          </CardMenuItem>
        )
      }
      onOpenChange={onOpenChange} />
  );
}

export default React.memo(MemberMenuItem);
