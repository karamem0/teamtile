//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

interface GridLayoutProps {
  children?: React.ReactNode
}

function GridLayout(props: GridLayoutProps) {

  const { children } = props;

  return (
    <div
      role="list"
      css={css`
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
        @media (max-width: 599px) {
          gap: 0.5rem;
        }
        @media (min-width: 600px) {
          gap: 1rem;
        }
      `}>
      {children}
    </div>
  );

}

export default React.memo(GridLayout);
