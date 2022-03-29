//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { GlobeIcon, LockIcon } from '@fluentui/react-icons-mdl2';
import { Text } from '@fluentui/react-northstar';

import { css } from '@emotion/react';

import { VisibilityType } from '../../types/entity';

export interface VisibilityIconProps {
  visibility: VisibilityType | null | undefined
}

export default React.memo(function VisibilityIcon ({
  visibility
}: VisibilityIconProps): React.ReactElement | null {

  switch (visibility) {
    case VisibilityType.public:
      return (
        <Text color="brand">
          <GlobeIcon
            css={css`
            width: 1rem;
            height: 1rem;
            vertical-align: top;
          `} />
        </Text>
      );
    case VisibilityType.private:
      return (
        <Text color="brand">
          <LockIcon
            css={css`
            width: 1rem;
            height: 1rem;
            vertical-align: top;
          `} />
        </Text>
      );
    default:
      return null;
  }

});
