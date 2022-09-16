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

import CenterLayout from '../../../components/CenterLayout';
import { EventHandler } from '../../../types/Event';

interface EmptyPanelProps {
  onClick?: EventHandler
}

function EmptyPanel(props: EmptyPanelProps) {

  const { onClick } = props;

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
            title: 'No items found',
            desc: 'It looks like you are not a member of any teams.',
            actions: {
              primary: {
                label: 'Reload',
                target: 'Reload'
              }
            }
          }}
          onInteraction={() => onClick?.(undefined)} />
      </div>
    </CenterLayout>
  );

}

export default EmptyPanel;
