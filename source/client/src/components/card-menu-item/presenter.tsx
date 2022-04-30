//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Text } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { EventHandler } from '../../types/common';

interface CardMenuItemProps {
  icon: React.ReactNode | undefined,
  content: React.ReactNode | undefined,
  onClick?: EventHandler | undefined
}

export default React.memo(function CardMenuItem ({
  icon,
  content,
  onClick
}: CardMenuItemProps): React.ReactElement | null {

  return (
    <Text
      color="brand"
      css={css`
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: auto auto;
        grid-gap: 0.25rem;
        align-items: flex-end;
        justify-content: flex-end;
        cursor: pointer;
      `}
      role="button"
      onClick={(event: React.SyntheticEvent) => onClick && onClick(event)}>
      {
        icon &&
        (
          <span
            css={css`
            width: 1rem;
            height: 1rem;
            line-height: 1rem;
          `}>
            {icon}
          </span>
        )
      }
      <Text
        content={content}
        css={css`
          line-height: 0.75rem;
        `}
        size="small" />
    </Text>
  );

});
