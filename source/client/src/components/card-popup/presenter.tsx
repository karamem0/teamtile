//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { SearchIcon } from '@fluentui/react-icons-mdl2';
import {
  Input,
  InputProps,
  Popup,
  PopupProps
} from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { EventHandler } from '../../types/common';
import { memo } from '../../utils/memo';

interface CardPopupProps<T> {
  items: T[],
  renderer: (items: T[]) => React.ReactNode,
  trigger: React.ReactElement,
  onInputChange?: EventHandler<InputProps & { value: string }>,
  onOpenChange?: EventHandler<PopupProps>
}

export default memo(function CardPopup <T> ({
  items,
  renderer,
  trigger,
  onInputChange,
  onOpenChange
}: CardPopupProps<T>): React.ReactElement | null {

  return (
    <Popup
      content={
        <div
          css={css`
            width: 12rem;
            max-height: 24rem;
            margin: -0.5rem;
            overflow: auto;
          `}>
          <div
            css={css`
              display: flex;
              flex-flow: column;
              gap: 0.25rem;
            `}>
            <Input
              clearable
              fluid
              icon={<SearchIcon />}
              onChange={(event, data) => onInputChange && onInputChange(event, data)} />
            {renderer(items)}
          </div>
        </div>
      }
      trigger={trigger}
      onOpenChange={(event, data) => onOpenChange && onOpenChange(event, data)} />
  );

});
