//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Header } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

function NotFoundPage() {

  return (
    <div
      css={css`
        display: flex;
        flex-flow: column;
      `}>
      <Header
        as="h1"
        content="404"
        description="page not found"
        css={css`
          font-size: 3rem;
          line-height: 3rem;
          text-align: center;
        `} />
    </div>
  );

}

export default React.memo(NotFoundPage);
