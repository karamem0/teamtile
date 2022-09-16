//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { RefreshIcon, SearchIcon } from '@fluentui/react-icons-mdl2';
import {
  Button,
  ButtonProps,
  Input,
  InputProps
} from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';

import TeamGrid from './TeamGrid';

interface TeamPanelProps {
  onFilterChange?: EventHandler<InputProps & { value: string }>,
  onRefreshClick?: EventHandler<ButtonProps>
}

function TeamPanel(props: TeamPanelProps) {

  const {
    onFilterChange,
    onRefreshClick
  } = props;

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
          grid-template-rows: auto;
          grid-template-columns: 1fr auto;
          gap: 0.25rem;
        `}>
        <Input
          clearable
          fluid
          icon={<SearchIcon />}
          css={css`
            min-height: 2.25rem;
            input {
              background-color: #fff;
            }
            @media (min-width: 600px) {
              max-width: 20rem;
            }
          `}
          onChange={onFilterChange} />
        <Button
          icon={<RefreshIcon />}
          iconOnly
          text
          onClick={onRefreshClick} />
      </div>
      <TeamGrid />
    </div>
  );

}

export default TeamPanel;
