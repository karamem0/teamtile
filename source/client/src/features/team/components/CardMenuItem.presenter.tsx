//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Text, Tooltip } from '@fluentui/react-components';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';

interface CardMenuItemProps {
  children?: React.ReactNode,
  tooltip?: string,
  onClick?: EventHandler
}

function CardMenuItem(props: Readonly<CardMenuItemProps>) {

  const {
    children,
    tooltip,
    onClick
  } = props;

  return (
    <Tooltip
      content={tooltip ?? ''}
      relationship="label">
      <Text
        role="button"
        css={css`
          display: grid;
          grid-template-rows: auto;
          grid-template-columns: auto auto;
          grid-gap: 0.25rem;
          align-items: center;
          justify-content: start;
          cursor: pointer;
        `}
        onClick={onClick}>
        {children}
      </Text>
    </Tooltip>
  );

}

export default React.memo(CardMenuItem);
