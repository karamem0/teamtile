//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Fluent UI
import { GlobeIcon, LockIcon } from '@fluentui/react-icons-mdl2';
import { Text } from '@fluentui/react-northstar';
// Types
import { VisibilityType } from '../types/entity';

export interface TeamVisibilityIconProps {
  visibility: VisibilityType | null | undefined
}

export const TeamVisibilityIcon = ({ visibility }: TeamVisibilityIconProps): React.ReactElement | null => {

  switch (visibility) {
    case VisibilityType.public:
      return (
        <Text color="brand">
          <GlobeIcon className="card-visibility-icon" />
        </Text>
      );
    case VisibilityType.private:
      return (
        <Text color="brand">
          <LockIcon className="card-visibility-icon" />
        </Text>
      );
    default:
      return null;
  }

};
