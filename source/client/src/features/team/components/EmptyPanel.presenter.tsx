//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
import { useIntl } from 'react-intl';

import { Communication, CommunicationOptions } from '@fluentui/react-teams';

import { css } from '@emotion/react';

import CenterLayout from '../../../common/components/CenterLayout';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';

interface EmptyPanelProps {
  onClick?: EventHandler
}

function EmptyPanel(props: EmptyPanelProps) {

  const { onClick } = props;

  const intl = useIntl();

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
            title: intl.formatMessage(messages.NoItemsFoundTitle),
            desc: intl.formatMessage(messages.NoItemsFoundDescription1),
            actions: {
              primary: {
                label: intl.formatMessage(messages.Reload),
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
