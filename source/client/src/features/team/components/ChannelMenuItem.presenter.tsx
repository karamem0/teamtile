//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Channel16Regular } from '@fluentui/react-icons';
import { useIntl } from 'react-intl';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';
import CardMenuItem from './CardMenuItem';

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
