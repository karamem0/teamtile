//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { LockIcon } from '@fluentui/react-icons-mdl2';
import { Text, Tooltip } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { MembershipType } from '../../../types/Entity';

export interface MembershipIconProps {
  value?: MembershipType
}

function MembershipIcon(props: MembershipIconProps) {

  const { value } = props;

  switch (value) {
    case MembershipType.private:
      return (
        <Tooltip
          content="Private"
          trigger={(
            <Text>
              <LockIcon
                css={css`
                  width: 0.75rem;
                  height: 0.75rem;
                `} />
            </Text>
        )} />
      );
    default:
      return null;
  }

}

export default React.memo(MembershipIcon);
