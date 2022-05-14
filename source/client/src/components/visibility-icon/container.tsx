//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { VisibilityType } from '../../types/entity';

import Presenter from './presenter';

interface VisibilityIconProps {
  visibility: VisibilityType | null | undefined
}

export default function VisibilityIcon ({
  visibility
}: VisibilityIconProps): React.ReactElement | null {

  return (
    <Presenter visibility={visibility || undefined} />
  );

}
