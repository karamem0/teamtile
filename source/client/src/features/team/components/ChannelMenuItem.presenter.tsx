//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import CardMenuItem from './CardMenuItem';
import { Channel16Regular } from '@fluentui/react-icons';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';
import { useIntl } from 'react-intl';

interface ChannelMenuItemProps {
  onClick?: EventHandler
}

function ChannelMenuItem(props: Readonly<ChannelMenuItemProps>) {

  const { onClick } = props;

  const intl = useIntl();

  return (
    <React.Fragment>
      <CardMenuItem
        title={intl.formatMessage(messages.ViewChannels)}
        icon={(
          <Channel16Regular />
        )}
        onClick={onClick} />
    </React.Fragment>
  );

}

export default React.memo(ChannelMenuItem);
