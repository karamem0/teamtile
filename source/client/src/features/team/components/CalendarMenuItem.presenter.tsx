//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { CalendarIcon } from '@fluentui/react-icons-mdl2';
import CardMenuItem from './CardMenuItem';
import { EventHandler } from '../../../types/Event';
import { css } from '@emotion/react';
import messages from '../messages';
import { useIntl } from 'react-intl';

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
        <CalendarIcon
          css={css`
            font-size: 1rem;
            line-height: 1rem;
          `} />
      )}
      onClick={onClick} />
  );

}

export default React.memo(CalendarMenuItem);
