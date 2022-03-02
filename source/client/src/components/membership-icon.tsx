//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { LockIcon } from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import { MembershipType } from '../types/entity';

export interface MembershipIconProps {
  membership: MembershipType | null | undefined
}

export const MembershipIcon = ({ membership }: MembershipIconProps): React.ReactElement | null => {

  switch (membership) {
    case MembershipType.private:
      return (
        <LockIcon
          css={css`
            width: '0.75rem';
            height: '0.75rem';
          `} />
      );
    default:
      return null;
  }

};
