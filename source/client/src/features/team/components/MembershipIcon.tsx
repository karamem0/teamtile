//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { MembershipType } from '../../../types/Entity';

import Presenter from './MembershipIcon.presenter';

export interface MembershipIconProps {
  type?: MembershipType
}

function MembershipIcon(props: Readonly<MembershipIconProps>) {

  const { type } = props;

  return (
    <Presenter type={type} />
  );

}

export default MembershipIcon;
