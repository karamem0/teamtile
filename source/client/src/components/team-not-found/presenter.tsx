//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { FilterIcon } from '@fluentui/react-icons-mdl2';
import { Text } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

export default React.memo(function TeamNotFoundContent (): React.ReactElement | null {

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        color: gray;
        @media (max-width: 599px) {
          min-height: calc(100vh - 3.25rem);
        }
        @media (min-width: 600px) {
          min-height: calc(100vh - 4.75rem);
        }
      `}>
      <div
        css={css`
          text-align: center;
        `}>
        <FilterIcon
          css={css`
            color: #e8ebfa;
            width: 4rem;
            height: 4rem;
            margin: 0.5rem;
          `} />
        <Text
          content="No items found."
          css={css`
            display: block;
          `} />
      </div>
    </div>
  );

});
