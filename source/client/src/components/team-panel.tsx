//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { SearchIcon } from '@fluentui/react-icons-mdl2';
import { Input } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { useItemFilter } from '../hooks/use-item-filter';

export interface MenuItemFilterProps {
  children?: React.ReactNode
}

export const TeamPanel = ({ children }: MenuItemFilterProps): React.ReactElement | null => {

  const { filter, setFilter } = useItemFilter();

  return (
    <div
      css={css`
        display: flex;
        flex-flow: column;
        gap: 0.5rem;
      `}>
      <Input
        clearable
        css={css`
          min-height: 2.25rem;
        `}
        fluid
        icon={<SearchIcon />}
        value={filter || undefined}
        onChange={(_, props) => setFilter(props?.value || '')} />
      {children}
    </div>
  );

};
