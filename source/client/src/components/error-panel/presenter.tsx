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

import { CenterLayout } from '../center-layout';

interface ErrorPanelProps {
  error: string
}

export default React.memo(function ErrorPanel ({
  error
}: ErrorPanelProps): React.ReactElement | null {

  return (
    <CenterLayout>
      <div
        css={css`
        & > div {
          flex-basis: auto;
        }
      `}>
        <Communication
          fields={{
            title: 'Something went wrong',
            desc: error
          }}
          option={CommunicationOptions.Empty} />
      </div>
    </CenterLayout>
  );

});
