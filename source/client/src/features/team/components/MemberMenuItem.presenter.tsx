//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { SearchBox, Text } from '@fluentui/react-components';
import AvatarIcon from './AvatarIcon';
import CardMenuItem from './CardMenuItem';
import { EventHandler } from '../../../types/Event';
import { GroupIcon } from '@fluentui/react-icons-mdl2';
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
            <SearchBox
              placeholder={intl.formatMessage(messages.SearchMembers)}
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
                    onClick={(event) => onClick?.(event, item)}>
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
          <CardMenuItem
            title={intl.formatMessage(messages.ViewMembers)}
            icon={(
              <GroupIcon
                css={css`
                  font-size: 1rem;
                  line-height: 1rem;
                `} />
            )}
            onClick={(event) => onOpenChange?.(event, true)} />
        )
      }
      onOpenChange={onOpenChange} />
  );

}

export default React.memo(MemberMenuItem);
