//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Button, Input } from '@fluentui/react-components';
import { RefreshIcon, SearchIcon } from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';

import TeamGrid from './TeamGrid';

interface TeamPanelProps {
  onFilterChange?: EventHandler<string>,
  onRefreshClick?: EventHandler
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
        grid-gap: 0.5rem;
      `}>
      <div
        css={css`
          display: grid;
          grid-template-rows: auto;
          grid-template-columns: 1fr auto;
          grid-gap: 0.25rem;
        `}>
        <Input
          contentBefore={<SearchIcon />}
          css={css`
            min-height: 2.25rem;
            @media (min-width: 600px) {
              max-width: 20rem;
            }
          `}
          onChange={(e, data) => onFilterChange?.(e, data.value)} />
        <Button
          appearance="transparent"
          icon={(
            <RefreshIcon
              css={css`
                width: 1rem;
                height: 1rem;
              `} />
          )}
          onClick={onRefreshClick} />
      </div>
      <TeamGrid />
    </div>
  );

}

export default TeamPanel;
