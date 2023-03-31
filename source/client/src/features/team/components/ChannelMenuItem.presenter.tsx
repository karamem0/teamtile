//
// Copyright (c) 2023 karamem0
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
  Spinner,
  Text
} from '@fluentui/react-components';
import { ContextMenuIcon, SearchIcon } from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import SidePanel from '../../../common/components/SidePanel';
import { useTheme } from '../../../providers/ThemeProvider';
import { Channel } from '../../../types/Entity';
import { Event, EventHandler } from '../../../types/Event';
import messages from '../messages';

import CardMenuItem from './CardMenuItem';
import MembershipIcon from './MembershipIcon';

interface ChannelMenuItemProps {
  items?: Channel[],
  loading?: boolean,
  onClick?: EventHandler<Channel>,
  onFilterChange?: EventHandler<string>,
  onOpenChange?: EventHandler<boolean>
}

function ChannelMenuItem(props: ChannelMenuItemProps) {

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
      title={intl.formatMessage(messages.Channels)}
      content={
        loading ? (
          <Spinner />
        ) : (
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
        )
      }
      onOpenChange={onOpenChange}>
      <CardMenuItem tooltip={intl.formatMessage(messages.ViewChannels)}>
        <Button
          appearance="transparent"
          icon={(
            <ContextMenuIcon
              css={css`
              width: 1rem;
              height: 1rem;
            `} />
          )} />
      </CardMenuItem>
    </SidePanel>
  );

}

export default React.memo(ChannelMenuItem);
