//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { CalendarIcon } from '@fluentui/react-icons-mdl2';
import { Loader } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { EventHandler } from '../../types/common';
import { TeamWithMail } from '../../types/entity';
import { CardMenuItem } from '../card-menu-item';

interface CalendarMenuItemProps {
  team: TeamWithMail,
  loading: boolean,
  onClick?: EventHandler<TeamWithMail> | undefined
}

export default React.memo(function CalendarMenuItem ({
  team,
  loading,
  onClick
}: CalendarMenuItemProps): React.ReactElement | null {

  return (
    <CardMenuItem
      content={undefined}
      icon={
        loading
          ? (
            <Loader
              css={css`
                & > div {
                  width: 1rem;
                  height: 1rem;
                }
                & > div > div::before {
                  animation-timing-function: steps(90);
                  width: 1rem;
                }
              `}
              size="smallest" />
            )
          : (
            <CalendarIcon
              css={css`
                width: 1rem;
                height: 1rem;
              `} />
            )
        }
      onClick={(event) => onClick && onClick(event, team)} />
  );

});
