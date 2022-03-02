//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { RefreshIcon, BreakfastIcon } from '@fluentui/react-icons-mdl2';
import { Button, Text } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { useReducerContext } from '../contexts/reducer-context';
import { Loading } from '../types/state';

import { CenterLayout } from './center-layout';

export interface EmptyPanelProps {
  onClick: () => void
}

export const EmptyPanel = ({ onClick }: EmptyPanelProps): React.ReactElement | null => {

  const { dispatchLoading } = useReducerContext();

  const handleClick = React.useCallback(() => {
    dispatchLoading(Loading.none);
    onClick();
  }, [
    dispatchLoading,
    onClick
  ]);

  return (
    <CenterLayout>
      <div
        css={css`
          text-align: center;
        `}>
        <BreakfastIcon
          css={css`
            color: #e8ebfa;
            width: 4rem;
            height: 4rem;
            margin: 0.5rem;
          `} />
        <Text
          content="It looks like you are not a member of any teams."
          css={css`
            display: block;
          `} />
        <Button
          content="Retry"
          css={css`
            margin: 1rem;
          `}
          icon={<RefreshIcon />}
          primary
          onClick={handleClick} />
      </div>
    </CenterLayout>
  );

};
