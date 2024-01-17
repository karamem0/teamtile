//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useIntl } from 'react-intl';

import { Button } from '@fluentui/react-components';
import { CalendarIcon } from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';
import messages from '../messages';

import CardMenuItem from './CardMenuItem';

interface CalendarMenuItemProps {
  loading?: boolean,
  onClick?: EventHandler
}

function CalendarMenuItem(props: Readonly<CalendarMenuItemProps>) {

  const {
    // loading,
    onClick
  } = props;

  const intl = useIntl();

  return (
    <CardMenuItem
      tooltip={intl.formatMessage(messages.OpenChannelCalendar)}
      onClick={onClick}>
      {
        <Button
          appearance="transparent"
          icon={(
            <CalendarIcon
              css={css`
                width: 1rem;
                height: 1rem;
              `} />
          )} />
        }
    </CardMenuItem>
  );

}

export default React.memo(CalendarMenuItem);
