//
// Copyright (c) 2021-2024 karamem0
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

function MembershipIcon(props: Readonly<MembershipIconProps>) {

  const { value } = props;

  return (
    <Presenter value={value} />
  );

}

export default MembershipIcon;
