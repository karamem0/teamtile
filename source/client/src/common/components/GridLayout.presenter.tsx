//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

function GridLayout(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  return (
    <div
      role="list"
      css={css`
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
        grid-gap: 0.5rem;
        @media (width >= 600px) {
          grid-gap: 1rem;
        }
      `}>
      {children}
    </div>
  );

}

export default React.memo(GridLayout);
