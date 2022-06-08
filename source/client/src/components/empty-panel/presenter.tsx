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

import { EventHandler } from '../../types/common';
import { CenterLayout } from '../center-layout';

interface EmptyPanelProps {
  onClick?: EventHandler | undefined
}

export default React.memo(function EmptyPanel ({
  onClick
}: EmptyPanelProps): React.ReactElement | null {

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
            title: 'No items found',
            desc: 'It looks like you are not a member of any teams.'
          }}
          option={CommunicationOptions.Empty}
          onInteraction={() => onClick && onClick} />
      </div>
    </CenterLayout>
  );

});
