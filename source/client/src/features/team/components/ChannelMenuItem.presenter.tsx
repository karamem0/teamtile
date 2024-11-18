//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Event, EventHandler } from '../../../types/Event';
import { FormattedMessage, useIntl } from 'react-intl';
import { SearchBox, Text } from '@fluentui/react-components';
import CardMenuItem from './CardMenuItem';
import { Channel } from '../../../types/Entity';
import { Channel16Regular } from '@fluentui/react-icons';
import MembershipIcon from './MembershipIcon';
import PrimaryChannelIcon from './PrimaryChannelIcon';
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
            <SearchBox
              placeholder={intl.formatMessage(messages.SearchChannels)}
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
                items.length > 0 ? items.map((item) => (
                  <Text
                    key={item.id}
                    role="button"
                    css={css`
                      display: flex;
                      flex-flow: row;
                      grid-gap: 0.5rem;
                      padding: 0.5rem;
                      &:hover {
                        background-color: ${theme.colorNeutralBackground1Hover};
                      }
                    `}
                    onClick={(e: Event) => onClick?.(e, item)}>
                    <Text truncate>
                      {item.displayName}
                    </Text>
                    <PrimaryChannelIcon primary={item.primary} />
                    <MembershipIcon type={item.membershipType} />
                  </Text>
                )) : (
                  <div
                    css={css`
                      text-align: center;
                    `}>
                    <FormattedMessage {...messages.NoChannelsFound} />
                  </div>
                )
              }
            </div>
          </div>
        ) : null
      }
      renderer={
        ({ onOpenChange }) => (
          <CardMenuItem
            title={intl.formatMessage(messages.ViewChannels)}
            icon={(
              <Channel16Regular />
            )}
            onClick={(event) => onOpenChange?.(event, true)} />
        )
      }
      onOpenChange={onOpenChange} />
  );

}

export default React.memo(ChannelMenuItem);
