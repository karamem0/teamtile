//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

interface CenterLayoutProps {
  children?: React.ReactNode
}

function CenterLayout(props: CenterLayoutProps) {

  const { children } = props;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - 0.5rem);
        @media (width >= 600px) {
          min-height: calc(100vh - 2rem);
        }
      `}>
      {children}
    </div>
  );

}

export default React.memo(CenterLayout);