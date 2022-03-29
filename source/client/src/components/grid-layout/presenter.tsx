//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';

interface GridLayoutProps {
  children: React.ReactNode
}

export default React.memo(function GridLayout ({
  children
}: GridLayoutProps): React.ReactElement | null {

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
        @media (max-width: 599px) {
          gap: 0.5rem;
        }
        @media (min-width: 600px) {
          gap: 1rem;
        }
      `}
      role="list">
      {children}
    </div>
  );

});
