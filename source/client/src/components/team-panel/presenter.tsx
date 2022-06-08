//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { SearchIcon, RefreshIcon } from '@fluentui/react-icons-mdl2';
import {
  Button,
  ButtonProps,
  Input,
  InputProps
} from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { EventHandler } from '../../types/common';

interface TeamPanelProps {
  children: React.ReactNode,
  filter: string | null | undefined,
  onButtonClick?: EventHandler<ButtonProps> | undefined,
  onInputChange?: EventHandler<InputProps & { value: string }> | undefined
}

export default React.memo(function TeamPanel ({
  children,
  filter,
  onButtonClick,
  onInputChange
}: TeamPanelProps): React.ReactElement | null {

  return (
    <div
      css={css`
        display: flex;
        flex-flow: column;
        gap: 0.5rem;
      `}>
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: auto;
          gap: 0.25rem;
        `}>
        <Input
          clearable
          css={css`
            min-height: 2.25rem;
            input {
              background-color: #ffffff
            }
            @media (min-width: 600px) {
              max-width: 20rem;
            }
          `}
          fluid
          icon={<SearchIcon />}
          value={filter || undefined}
          onChange={(event, data) => onInputChange && onInputChange(event, data)} />
        <Button
          css={css`
            justify-content: end;
          `}
          icon={<RefreshIcon />}
          iconOnly
          text
          onClick={(event, data) => onButtonClick && onButtonClick(event, data)} />
      </div>
      {children}
    </div>
  );

});
