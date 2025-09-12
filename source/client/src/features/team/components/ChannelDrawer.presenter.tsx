//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { SearchBox, Text } from '@fluentui/react-components';
import { Channel } from '../../../types/Entity';
import Drawer from '../../../common/components/Drawer';
import { EventHandler } from '../../../types/Event';
import MembershipIcon from './MembershipIcon';
import PrimaryChannelIcon from './PrimaryChannelIcon';
import { css } from '@emotion/react';
import messages from '../messages';
import { useTheme } from '../../../providers/ThemeProvider';

interface ChannelDrawerProps {
  items?: Channel[],
  loading?: boolean,
  open?: boolean,
  onClick?: EventHandler<Channel>,
  onFilterChange?: EventHandler<string>,
  onOpenChange?: EventHandler<boolean>
}

function ChannelDrawer(props: Readonly<ChannelDrawerProps>) {

  const {
    items,
    loading,
    open,
    onClick,
    onFilterChange,
    onOpenChange
  } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  return (
    <Drawer
      loading={loading}
      open={open}
      title={intl.formatMessage(messages.Channels)}
      onOpenChange={onOpenChange}>
      {
        items ? (
          <div
            css={css`
                display: flex;
                flex-flow: column;
                gap: 0.5rem;
              `}>
            <SearchBox
              placeholder={intl.formatMessage(messages.SearchChannels)}
              onChange={(e, data) => onFilterChange?.(e, data.value)} />
            <div
              css={css`
                  display: flex;
                  flex-flow: column;
                  gap: 0.5rem;
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
                        gap: 0.5rem;
                        padding: 0.5rem;
                        :hover {
                          background-color: ${theme.colorNeutralBackground1Hover};
                        }
                      `}
                    onClick={(event) => onClick?.(event, item)}>
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
    </Drawer>
  );

}

export default React.memo(ChannelDrawer);
