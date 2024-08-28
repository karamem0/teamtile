//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Text, Tooltip } from '@fluentui/react-components';
import { LockIcon } from '@fluentui/react-icons-mdl2';
import { MembershipType } from '../../../types/Entity';
import { css } from '@emotion/react';
import messages from '../messages';
import { useIntl } from 'react-intl';

export interface MembershipIconProps {
  value?: MembershipType
}

function MembershipIcon(props: Readonly<MembershipIconProps>) {

  const { value } = props;

  const intl = useIntl();

  switch (value) {
    case MembershipType.standard:
      return null;
    case MembershipType.private:
      return (
        <Tooltip
          content={intl.formatMessage(messages.Private)}
          relationship="label">
          <Text>
            <LockIcon
              css={css`
                width: 0.75rem;
                height: 0.75rem;
              `} />
          </Text>
        </Tooltip>
      );
    default:
      return null;
  }

}

export default React.memo(MembershipIcon);
