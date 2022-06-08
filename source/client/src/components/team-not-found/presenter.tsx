//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Communication, CommunicationOptions } from '@fluentui/react-teams';

import { css } from '@emotion/react';

export default React.memo(function TeamNotFoundContent (): React.ReactElement | null {

  return (
    <div
      css={css`
        & > div {
          flex-basis: auto;
        }
      `}>
      <Communication
        fields={{
          title: 'No items found',
          desc: 'There are no items matching the keyword.'
        }}
        option={CommunicationOptions.Empty} />
    </div>
  );

});
