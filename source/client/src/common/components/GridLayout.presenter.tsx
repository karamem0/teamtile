//
// Copyright (c) 2021-2026 karamem0
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
        grid-template-rows: 12.5rem;
        grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
        gap: 0.5rem;
        @media (width >= 600px) {
          gap: 1rem;
        }
      `}>
      {children}
    </div>
  );

}

export default React.memo(GridLayout);
