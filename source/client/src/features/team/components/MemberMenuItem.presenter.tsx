//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
import { useIntl } from 'react-intl';

import { GroupIcon, SearchIcon } from '@fluentui/react-icons-mdl2';
import {
  Input,
  InputProps,
  List,
  Loader,
  Text
} from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import SidePanel from '../../../common/components/SidePanel';
import { Member } from '../../../types/Entity';
import { Event, EventHandler } from '../../../types/Event';
import messages from '../messages';

import AvatarIcon from './AvatarIcon';
import CardMenuItem from './CardMenuItem';

interface MemberMenuItemProps {
  items?: Member[],
  loading?: boolean,
  onClick?: EventHandler<Member>,
  onFilterChange?: EventHandler<InputProps & { value: string }>,
  onOpenChange?: EventHandler<boolean>
}

function MemberMenuItem(props: MemberMenuItemProps) {

  const {
    items,
    loading,
    onClick,
    onFilterChange,
    onOpenChange
  } = props;

  const intl = useIntl();

  return (
    <SidePanel
      title={intl.formatMessage(messages.Members)}
      content={
        loading ? (
          <Loader />
        ) : (
          items ? (
            <div
              css={css`
                display: flex;
                flex-flow: column;
                gap: 0.5rem;
              `}>
              <Input
                clearable
                fluid
                icon={<SearchIcon />}
                onChange={onFilterChange} />
              <List
                navigable
                items={
                items.map((item) => ({
                  key: item.id,
                  header: (
                    <Text
                      role="button"
                      css={css`
                        display: grid;
                        grid-template-columns: auto auto;
                        gap: 0.25rem;
                        align-items: center;
                        justify-content: left;
                      `}
                      onClick={(event: Event) => onClick?.(event, item)}>
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
              } />
            </div>
          ) : null
        )
      }
      trigger={(
        <CardMenuItem
          tooltip={intl.formatMessage(messages.ViewMembers)}
          icon={(
            <GroupIcon
              css={css`
                width: 1rem;
                height: 1rem;
              `} />
          )} />
      )}
      onOpenChange={onOpenChange} />
  );
}

export default React.memo(MemberMenuItem);
