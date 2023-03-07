//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { CalendarIcon } from '@fluentui/react-icons-mdl2';
import { Loader } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';

import CardMenuItem from './CardMenuItem';

interface CalendarMenuItemProps {
  loading?: boolean,
  onClick?: EventHandler
}

function CalendarMenuItem(props: CalendarMenuItemProps) {

  const {
    loading,
    onClick
  } = props;

  return (
    <CardMenuItem
      tooltip="Open channel calendar"
      icon={
        loading ? (
          <Loader
            size="smallest"
            css={css`
              & > div {
                width: 1rem;
                height: 1rem;
              }
              & > div > div::before {
                width: 1rem;
                animation-timing-function: steps(90);
              }
            `} />
        ) : (
          <CalendarIcon
            css={css`
              width: 1rem;
              height: 1rem;
            `} />
        )
      }
      onClick={onClick} />
  );

}

export default React.memo(CalendarMenuItem);
