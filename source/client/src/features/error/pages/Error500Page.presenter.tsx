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
import messages from '../messages';

interface Error500PageProps {
  error?: string
}

function Error500Page(props: Error500PageProps) {

  const { error } = props;

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
            title: intl.formatMessage(messages.Error500Description),
            desc: error
          }} />
      </div>
    </CenterLayout>
  );

}

export default React.memo(Error500Page);
