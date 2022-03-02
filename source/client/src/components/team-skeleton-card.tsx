//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Card, Skeleton } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

export const TeamSkeletonCard = (): React.ReactElement | null => {

  return (
    <Skeleton animation="wave">
      <Card
        fluid
        role="listitem">
        <div
          css={css`
          display: grid;
          grid-template-columns: auto 1fr auto;
          grid-template-rows: auto;
          gap: 0.5rem;
          height: 4rem;
        `}>
          <Skeleton.Avatar size="larger" />
          <div
            css={css`
            display: grid;
            grid-template-columns: auto;
            grid-template-rows: auto;
            gap: 0.25rem;
          `}>
            <Skeleton.Line width="50%" />
            <Skeleton.Line />
            <Skeleton.Line />
          </div>
        </div>
      </Card>
    </Skeleton>
  );

};
