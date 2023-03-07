//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Text, Tooltip } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';

interface CardMenuItemProps {
  content?: React.ReactNode,
  icon?: React.ReactNode,
  tooltip?: React.ReactNode,
  onClick?: EventHandler
}

function CardMenuItem(props: CardMenuItemProps) {

  const {
    content,
    icon,
    tooltip,
    onClick
  } = props;

  return (
    <Tooltip
      content={tooltip}
      trigger={(
        <Text
          color="brand"
          role="button"
          css={css`
          display: grid;
          grid-template-rows: auto;
          grid-template-columns: auto auto;
          gap: 0.25rem;
          align-items: center;
          justify-content: start;
          cursor: pointer;
        `}
          onClick={onClick}>
          {
          icon ? (
            <span
              css={css`
                line-height: 1rem;
              `}>
              {icon}
            </span>
          ) : null
        }
          {
          content ? (
            <Text
              content={content}
              css={css`
                line-height: 1rem;
              `} />
          ) : null
        }
        </Text>
    )} />
  );

}

export default React.memo(CardMenuItem);
