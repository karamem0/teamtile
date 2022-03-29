//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { MembershipType } from '../../types/entity';

import Presenter from './presenter';

export interface MembershipIconProps {
  membership: MembershipType | null | undefined
}

export default function MembershipIcon ({
  membership
}: MembershipIconProps): React.ReactElement | null {

  return (
    <Presenter membership={membership} />
  );

}
