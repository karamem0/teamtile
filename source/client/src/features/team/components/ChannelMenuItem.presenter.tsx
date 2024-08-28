//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useIntl } from 'react-intl';

import {
  Button,
  Input,
  Text
} from '@fluentui/react-components';
import { ContextMenuIcon, SearchIcon } from '@fluentui/react-icons-mdl2';
import { Event, EventHandler } from '../../../types/Event';
import CardMenuItem from './CardMenuItem';
import { Channel } from '../../../types/Entity';
import MembershipIcon from './MembershipIcon';
import SidePanel from '../../../common/components/SidePanel';
import { css } from '@emotion/react';
import messages from '../messages';
import { useTheme } from '../../../providers/ThemeProvider';

interface ChannelMenuItemProps {
  items?: Channel[],
  loading?: boolean,
  onClick?: EventHandler<Channel>,
  onFilterChange?: EventHandler<string>,
  onOpenChange?: EventHandler<boolean>
}

function ChannelMenuItem(props: Readonly<ChannelMenuItemProps>) {

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
      title={intl.formatMessage(messages.Channels)}
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
                      grid-template-rows: auto;
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
                    <Text truncate>
                      {item.displayName}
                    </Text>
                    <MembershipIcon value={item.membershipType} />
                  </Text>
                ))
              }
            </div>
          </div>
        ) : null
      }
      renderer={
        ({ onOpenChange }) => (
          <CardMenuItem tooltip={intl.formatMessage(messages.ViewChannels)}>
            <Button
              appearance="transparent"
              icon={(
                <ContextMenuIcon
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

export default React.memo(ChannelMenuItem);
