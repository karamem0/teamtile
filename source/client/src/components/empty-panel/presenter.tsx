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

import { EventHandler } from '../../types/common';
import { CenterLayout } from '../center-layout';

interface EmptyPanelProps {
  onClick?: EventHandler | undefined
}

export default React.memo(function EmptyPanel ({
  onClick
}: EmptyPanelProps): React.ReactElement | null {

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
          onClick={(event: React.SyntheticEvent) => onClick && onClick(event)} />
      </div>
    </CenterLayout>
  );

});
