//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Calendar16Regular } from '@fluentui/react-icons';
import { useIntl } from 'react-intl';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';
import CardMenuItem from './CardMenuItem';

interface CalendarMenuItemProps {
  onClick?: EventHandler
}

function CalendarMenuItem(props: Readonly<CalendarMenuItemProps>) {

  const {
    onClick
  } = props;

  const intl = useIntl();

  return (
    <CardMenuItem
      title={intl.formatMessage(messages.OpenChannelCalendar)}
      icon={(
        <Calendar16Regular />
      )}
      onClick={onClick} />
  );

}

export default React.memo(CalendarMenuItem);
