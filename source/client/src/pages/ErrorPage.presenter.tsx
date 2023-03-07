//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Communication, CommunicationOptions } from '@fluentui/react-teams';

import { css } from '@emotion/react';

import CenterLayout from '../components/CenterLayout';

interface ErrorPageProps {
  error?: string
}

function ErrorPage(props: ErrorPageProps) {

  const { error } = props;

  return (
    <CenterLayout>
      <div
        css={css`
          & > div {
            flex-basis: auto;
          }
        `}>
        <Communication
          option={CommunicationOptions.Empty}
          fields={{
            title: 'Something went wrong',
            desc: error
          }} />
      </div>
    </CenterLayout>
  );

}

export default React.memo(ErrorPage);
