//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { ErrorBadgeIcon } from '@fluentui/react-icons-mdl2';
import { Text } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { CenterLayout } from '../center-layout';

export default React.memo(function ErrorPanel (): React.ReactElement | null {

  return (
    <CenterLayout>
      <div
        css={css`
          text-align: center;
        `}>
        <ErrorBadgeIcon
          css={css`
            width: 2rem;
            height: 2rem;
            margin: 0.5rem;
          `} />
        <Text
          content="Something went wrong."
          css={css`
            display: block;
          `} />
      </div>
    </CenterLayout>
  );

});
