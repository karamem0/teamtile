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

export interface CardMenuItemProps {
  icon?: React.ReactNode,
  content?: React.ReactNode,
  onClick?: React.MouseEventHandler
}

export const CardMenuItem = ({
  icon,
  content,
  onClick
}: CardMenuItemProps): React.ReactElement | null => {

  return (
    <Text
      color="brand"
      css={css`
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto;
        grid-gap: 0.25rem;
        align-items: flex-end;
        justify-content: flex-end;
        cursor: pointer;
      `}
      role="button"
      onClick={onClick}>
      {
        icon && (
          <span
            css={css`
            line-height: 1rem;
            width: 1rem;
            height: 1rem;
          `}>
            {icon}
          </span>
        )
      }
      {
        content && (
          <Text
            content={content}
            css={css`
              line-height: 0.75rem;
            `}
            size="small" />
        )
      }
    </Text>
  );

};
