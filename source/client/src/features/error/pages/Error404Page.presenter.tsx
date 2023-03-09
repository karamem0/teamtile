//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
import { useIntl } from 'react-intl';

import { Header } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import messages from '../messages';

function Error404Page() {

  const intl = useIntl();

  return (
    <div
      css={css`
        display: flex;
        flex-flow: column;
      `}>
      <Header
        as="h1"
        content={intl.formatMessage(messages.Error404Title)}
        description={intl.formatMessage(messages.Error404Description)}
        css={css`
          font-size: 3rem;
          line-height: calc(3rem * 1.25);
          text-align: center;
        `} />
    </div>
  );

}

export default React.memo(Error404Page);
