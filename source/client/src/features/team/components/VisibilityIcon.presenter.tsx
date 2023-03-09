//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
import { useIntl } from 'react-intl';

import { GlobeIcon, LockIcon } from '@fluentui/react-icons-mdl2';
import { Text, Tooltip } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { VisibilityType } from '../../../types/Entity';
import messages from '../messages';

interface VisibilityIconProps {
  value?: VisibilityType
}

function VisibilityIcon(props: VisibilityIconProps) {

  const { value } = props;

  const intl = useIntl();

  switch (value) {
    case VisibilityType.public:
      return (
        <Tooltip
          content={intl.formatMessage(messages.Public)}
          trigger={(
            <Text color="brand">
              <GlobeIcon
                css={css`
                  width: 1rem;
                  height: 1rem;
                  vertical-align: top;
                `} />
            </Text>
        )} />
      );
    case VisibilityType.private:
      return (
        <Tooltip
          content={intl.formatMessage(messages.Private)}
          trigger={(
            <Text color="brand">
              <LockIcon
                css={css`
                  width: 1rem;
                  height: 1rem;
                  vertical-align: top;
                `} />
            </Text>
        )} />
      );
    default:
      return null;
  }

}

export default React.memo(VisibilityIcon);
