//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { MembershipType } from '../../../types/Entity';

import Presenter from './MembershipIcon.presenter';

export interface MembershipIconProps {
  value?: MembershipType
}

function MembershipIcon(props: MembershipIconProps) {

  const { value } = props;

  return (
    <Presenter value={value} />
  );

}

export default MembershipIcon;
