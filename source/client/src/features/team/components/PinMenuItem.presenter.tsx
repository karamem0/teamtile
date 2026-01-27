//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Pin16Regular, PinOff16Regular } from '@fluentui/react-icons';
import { useIntl } from 'react-intl';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';
import CardMenuItem from './CardMenuItem';

interface PinMenuItemProps {
  pinned?: boolean,
  onClick?: EventHandler<boolean>
}

function PinMenuItem(props: Readonly<PinMenuItemProps>) {

  const {
    pinned,
    onClick
  } = props;

  const intl = useIntl();

  return (
    <CardMenuItem
      title={pinned ? intl.formatMessage(messages.Unpin) : intl.formatMessage(messages.Pin)}
      icon={
        pinned ? (
          <PinOff16Regular />
        ) : (
          <Pin16Regular />
        )
      }
      onClick={onClick} />
  );

}

export default React.memo(PinMenuItem);
